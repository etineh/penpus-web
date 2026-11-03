"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import styles from "./watch.module.css";

// Public by design — the anon key is the browser's key. Everything a watcher
// may see is decided in Postgres by get_spectate_feed, which is granted to
// anon and returns only rounds the players have already finished.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

const POLL_MS = 3000;
const BEAT_MS = 15000;
const TICK_MS = 100;
const REVEAL_HOLD_MS = 3500;

/// A long per-question timer would otherwise replay as minutes of nothing.
/// Past this the round is compressed — real order, real printed times.
const MAX_PLAYBACK_MS = 30000;

const EMOJIS = ["🔥", "👏", "💪", "🧠", "⚡"];
const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.allcampusapp.allcampus";
const APP_STORE =
  "https://apps.apple.com/ng/app/penpus-all-campus-hub/id6789201059";

type Answer = {
  user_id: string;
  option: number | null;
  is_correct: boolean;
  elapsed_ms: number;
  points: number;
};

type Round = {
  round: number;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  answers: Answer[];
  totals: Record<string, number>;
};

type Player = {
  user_id: string | null;
  name: string;
  photo: string | null;
  bot_tier: string | null;
  status: string;
};

type Feed = {
  match: {
    id: string;
    mode: string;
    status: string;
    question_count: number;
    per_question_seconds: number;
    course_title: string | null;
    league: { name: string; matchday: number } | null;
  };
  players: Player[];
  live_round: number | null;
  rounds: Round[];
  watchers: number;
  reactions: Record<string, number>;
  reaction_total: number;
};

async function rpc<T>(fn: string, body: Record<string, unknown>): Promise<T | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// Per-browser, so one person refreshing is one watcher. Falls back to a
// per-session value when storage is blocked rather than a shared constant,
// which would collapse every private-mode viewer into a single seat.
let memoryKey = "";
function viewerKey(): string {
  if (!memoryKey) {
    memoryKey =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Math.random()).slice(2);
  }
  try {
    const stored = localStorage.getItem("penpus_viewer");
    if (stored) return stored;
    localStorage.setItem("penpus_viewer", memoryKey);
  } catch {
    /* private mode — the session value still separates this tab from others */
  }
  return memoryKey;
}

/** 1 normally; below 1 when a round ran past the compression ceiling. */
function scaleOf(r: Round): number {
  const full = r.answers.reduce((m, a) => Math.max(m, a.elapsed_ms), 0);
  return full <= MAX_PLAYBACK_MS || full === 0 ? 1 : MAX_PLAYBACK_MS / full;
}

function playbackMs(r: Round): number {
  return r.answers.reduce((m, a) => Math.max(m, a.elapsed_ms), 0) * scaleOf(r);
}

export default function WatchLive() {
  const [, bump] = useReducer((x: number) => x + 1, 0);

  const matchId = useRef("");
  const feed = useRef<Feed | null>(null);
  const queue = useRef<Round[]>([]);
  const history = useRef<Round[]>([]);
  const current = useRef<Round | null>(null);
  const elapsed = useRef(0);
  const lastRound = useRef(-1);
  const state = useRef<"loading" | "ok" | "failed" | "noconfig">("loading");
  const started = useRef(false);

  /** Keep only the newest queued round — staying level with the players
   *  matters more than replaying every question. */
  const dropToLatest = useCallback(() => {
    while (queue.current.length > 1) {
      history.current.push(queue.current.shift()!);
    }
  }, []);

  const advance = useCallback(() => {
    if (current.current) history.current.push(current.current);
    current.current = null;
    elapsed.current = 0;
    dropToLatest();
    if (queue.current.length) current.current = queue.current.shift()!;
  }, [dropToLatest]);

  const load = useCallback(
    async (first: boolean) => {
      const res = await rpc<Feed>("get_spectate_feed", {
        p_match_id: matchId.current,
        p_since_round: lastRound.current,
      });
      if (!res) {
        if (first) {
          state.current = "failed";
          bump();
        }
        return;
      }
      feed.current = res;
      state.current = "ok";
      for (const r of res.rounds ?? []) {
        if (r.round > lastRound.current) lastRound.current = r.round;
        queue.current.push(r);
      }
      // Opening the link late catches straight up to the newest closed round
      // instead of replaying the match from question one.
      if (first) dropToLatest();
      if (!current.current) advance();
      bump();
    },
    [advance, dropToLatest],
  );

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const segs = window.location.pathname.split("/").filter(Boolean);
    matchId.current = segs.length >= 2 && segs[0] === "watch" ? segs[1] : "";

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !matchId.current) {
      state.current = "noconfig";
      bump();
      return;
    }

    void load(true);
    const beat = () =>
      void rpc("spectate_heartbeat", {
        p_match_id: matchId.current,
        p_viewer_key: viewerKey(),
      });
    beat();

    const pollId = window.setInterval(() => void load(false), POLL_MS);
    const beatId = window.setInterval(beat, BEAT_MS);
    const tickId = window.setInterval(() => {
      const r = current.current;
      if (!r) {
        if (queue.current.length) {
          advance();
          bump();
        }
        return;
      }
      elapsed.current += TICK_MS;
      if (elapsed.current >= playbackMs(r) + REVEAL_HOLD_MS) advance();
      bump();
    }, TICK_MS);

    return () => {
      window.clearInterval(pollId);
      window.clearInterval(beatId);
      window.clearInterval(tickId);
    };
  }, [advance, load]);

  const react = async (emoji: string) => {
    const r = current.current ?? history.current[history.current.length - 1];
    if (!r) return;
    await rpc("react_to_match", {
      p_match_id: matchId.current,
      p_round: r.round,
      p_emoji: emoji,
      p_viewer_key: viewerKey(),
    });
    void load(false);
  };

  const f = feed.current;
  const round = current.current;
  const over =
    !!f && (f.match.status === "finished" || f.match.status === "expired") &&
    !round &&
    !queue.current.length;

  if (state.current === "loading") {
    return <Shell><p className={styles.muted}>Loading the match…</p></Shell>;
  }
  if (state.current === "noconfig" || state.current === "failed") {
    return (
      <Shell>
        <h1 className={styles.title}>Match unavailable</h1>
        <p className={styles.muted}>
          This match link could not be opened. It may have finished a while ago.
        </p>
        <Stores />
      </Shell>
    );
  }
  if (!f) return <Shell><p className={styles.muted}>Loading…</p></Shell>;

  const scale = round ? scaleOf(round) : 1;
  const revealed = round ? elapsed.current >= playbackMs(round) : false;
  const visible = round
    ? round.answers.filter((a) => a.elapsed_ms * scale <= elapsed.current)
    : [];
  // Before the reveal, show the score going INTO the round — the post-round
  // total would give away who got it right.
  const totals =
    revealed && round
      ? round.totals
      : history.current.length
        ? history.current[history.current.length - 1].totals
        : {};

  const heading = f.match.league
    ? `${f.match.league.name} · MD${f.match.league.matchday}`
    : f.match.course_title ?? "Penpus match";

  return (
    <Shell wide>
      <header className={styles.head}>
        <div>
          <h1 className={styles.title}>{heading}</h1>
          <p className={styles.muted}>
            {over
              ? "Full time"
              : f.watchers > 1
                ? `${f.watchers} watching · one question behind`
                : "Live · one question behind"}
          </p>
        </div>
      </header>

      <div className={styles.scores}>
        {f.players.map((p, i) => {
          const a = visible.find((x) => x.user_id === p.user_id);
          const status = !a
            ? p.status === "left"
              ? "Walked out"
              : "Thinking…"
            : a.option === null
              ? "Out of time"
              : revealed
                ? `${(a.elapsed_ms / 1000).toFixed(1)}s ${a.is_correct ? "✓" : "✗"}`
                : `${(a.elapsed_ms / 1000).toFixed(1)}s`;
          return (
            <div key={p.user_id ?? i} className={styles.player}>
              <div className={styles.face} data-side={i === 0 ? "a" : "b"}>
                {p.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photo} alt="" />
                ) : (
                  <span>{p.bot_tier ? "🤖" : p.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className={styles.pname}>{p.name}</div>
              <div className={styles.pts} data-side={i === 0 ? "a" : "b"}>
                {totals[p.user_id ?? ""] ?? 0} pts
              </div>
              <div className={styles.muted}>{status}</div>
            </div>
          );
        })}
      </div>

      {over ? (
        <div className={styles.card}>
          <p className={styles.muted}>
            This match is over{f.reaction_total > 0 ? ` · ${f.reaction_total} cheers` : ""}.
            Play your own on Penpus.
          </p>
        </div>
      ) : !round ? (
        <div className={styles.card}>
          <p className={styles.muted}>
            Waiting for the players to finish the question they are on…
          </p>
        </div>
      ) : (
        <>
          <div className={styles.progress}>
            <span>
              Question {round.round + 1} of {f.match.question_count}
            </span>
            {f.live_round !== null && f.live_round > round.round && (
              <span className={styles.muted}>players on {f.live_round + 1}</span>
            )}
          </div>

          <div className={styles.card}>{round.question}</div>

          {round.options.map((opt, i) => {
            const pickers = visible
              .filter((a) => a.option === i)
              .map((a) => f.players.find((p) => p.user_id === a.user_id))
              .filter(Boolean) as Player[];
            const isKey = revealed && i === round.correct_index;
            const isWrong = revealed && !isKey && pickers.length > 0;
            return (
              <div
                key={i}
                className={styles.option}
                data-key={isKey ? "1" : undefined}
                data-wrong={isWrong ? "1" : undefined}
                data-picked={pickers.length ? "1" : undefined}
              >
                <span className={styles.letter}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className={styles.otext}>{opt}</span>
                {pickers.map((p, n) => (
                  <span key={n} className={styles.chip}>
                    {p.name.charAt(0).toUpperCase()}
                  </span>
                ))}
                {isKey && <span className={styles.tick}>✓</span>}
              </div>
            );
          })}

          {revealed && round.explanation && (
            <p className={styles.explain}>{round.explanation}</p>
          )}

          <div className={styles.reacts}>
            {EMOJIS.map((e) => (
              <button key={e} onClick={() => void react(e)} className={styles.react}>
                {e}
              </button>
            ))}
          </div>
          {f.reaction_total > 0 && (
            <p className={styles.muted} style={{ textAlign: "center" }}>
              {f.reaction_total} cheers
            </p>
          )}
        </>
      )}

      <Stores />
    </Shell>
  );
}

function Shell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main className={styles.wrap}>
      <div className={wide ? styles.panelWide : styles.panel}>{children}</div>
    </main>
  );
}

function Stores() {
  return (
    <div className={styles.cta}>
      <p className={styles.muted}>Play your own match on Penpus</p>
      <div className={styles.stores}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href={APP_STORE}><img src="/app_store_badge.png" alt="Download on the App Store" /></a>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href={PLAY_STORE}><img src="/play_store_badge.png" alt="Get it on Google Play" /></a>
      </div>
    </div>
  );
}
