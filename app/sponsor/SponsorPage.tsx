"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import styles from "./sponsor.module.css";

// Public by design — the anon key is the browser's key, as on /watch. It can
// only call get_sponsor_packages and submit_sponsor_inquiry; the inquiries
// table itself is closed to it (RLS, no policies), and the limits live there.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Priced per night: a run pays its tier's rate (the highest min_nights it
// reaches) for every night.
type Rate = {
  id: string;
  title: string;
  min_nights: number;
  prize_per_night_ngn: number;
  fee_per_night_ngn: number;
  per_night_ngn: number;
};
type Rates = { ngn_per_usd: number | null; rates: Rate[] };
type Currency = "NGN" | "USD";

// Shown until the live rates load, or if they can't: the database's values.
const FALLBACK: Rates = {
  ngn_per_usd: null,
  rates: [
    { id: "night", title: "Per night", min_nights: 1, prize_per_night_ngn: 10000, fee_per_night_ngn: 5000, per_night_ngn: 15000 },
    { id: "week", title: "7 nights or more", min_nights: 7, prize_per_night_ngn: 7000, fee_per_night_ngn: 3000, per_night_ngn: 10000 },
  ],
};

const MAX_NIGHTS = 90;

function rateFor(rates: Rate[], nights: number): Rate | undefined {
  return [...rates].sort((a, b) => b.min_nights - a.min_nights).find((r) => r.min_nights <= nights);
}

/** Dollars a night, rounded UP: a little room if the naira moves. */
function usdPerNight(r: Rate, rate: number | null): number | null {
  return rate ? Math.ceil(r.per_night_ngn / rate) : null;
}

const BENEFITS = [
  { title: "On every Home screen", text: "Your name and logo on the Quiz Night card students see all day." },
  { title: "On the night itself", text: "“Sponsored by” you on the Quiz Night screen, linking to your site." },
  { title: "In the notifications", text: "Your name in the night’s pushes: tonight, check-in, the final and the result." },
  { title: "Your prize, their win", text: "Your money is the prize pool: 70% to the champion, 30% to 2nd place." },
  { title: "A report after", text: "How many students saw it, opened it, played, and tapped your link." },
];

const STEPS = [
  "Pick your nights and send the form.",
  "We reply within 48 hours to agree your dates, with payment details.",
  "Your nights are booked once payment arrives, before the first one.",
  "Your nights run. Penpus pays the winners.",
  "You get the numbers.",
];

async function rpc(fn: string, body: Record<string, unknown>): Promise<{ ok: boolean; data?: unknown; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return { ok: false };
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
    const json: unknown = await res.json().catch(() => null);
    if (!res.ok) {
      // The function words its own refusals ("Please add an email…").
      const message = json && typeof (json as { message?: unknown }).message === "string"
        ? (json as { message: string }).message
        : undefined;
      return { ok: false, error: message };
    }
    return { ok: true, data: json };
  } catch {
    return { ok: false };
  }
}

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;
const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;

// A device on Nigerian time sees naira first, everyone else dollars. Nothing
// is looked up or sent anywhere to decide it.
function guessCurrency(): Currency {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Lagos" ? "NGN" : "USD";
  } catch {
    return "NGN";
  }
}

export default function SponsorPage() {
  const [data, setData] = useState<Rates>(FALLBACK);
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [today, setToday] = useState("");

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nightsText, setNightsText] = useState("1");
  const [start, setStart] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // only a bot fills this

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrency(guessCurrency());
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    rpc("get_sponsor_packages", {}).then((r) => {
      const live = r.data as Rates | undefined;
      if (r.ok && live && Array.isArray(live.rates) && live.rates.length > 0) setData(live);
    });
  }, []);

  // Dollars only once the rate is known.
  const hasUsd = !!data.ngn_per_usd;
  const showUsd = hasUsd && currency === "USD";

  /** "₦15,000" or "$12" a night, by the chosen currency. */
  const perNight = (r: Rate) => {
    const usd = usdPerNight(r, data.ngn_per_usd);
    return showUsd && usd != null ? dollars(usd) : naira(r.per_night_ngn);
  };

  // The live quote under the nights box.
  const nights = Number.parseInt(nightsText, 10);
  const nightsOk = Number.isInteger(nights) && nights >= 1 && nights <= MAX_NIGHTS;
  const quoteRate = nightsOk ? rateFor(data.rates, nights) : undefined;
  const quote = (() => {
    if (!nightsOk || !quoteRate) return null;
    const ngn = naira(nights * quoteRate.per_night_ngn);
    const usd = usdPerNight(quoteRate, data.ngn_per_usd);
    const usdTotal = usd != null ? dollars(nights * usd) : null;
    const total = showUsd && usdTotal ? `${usdTotal} (${ngn})` : usdTotal ? `${ngn} (about ${usdTotal})` : ngn;
    return `${nights} ${nights === 1 ? "night" : "nights"} · ${total}`;
  })();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setError(null);
    if (!brand.trim() || !name.trim()) {
      setError("Please add your brand and your name.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Please add an email or a phone number.");
      return;
    }
    if (!nightsOk) {
      setError(`Pick between 1 and ${MAX_NIGHTS} nights. For longer, tell us in the message.`);
      return;
    }
    setSending(true);
    const r = await rpc("submit_sponsor_inquiry", {
      p_brand: brand,
      p_contact: name,
      p_email: email.trim() || null,
      p_phone: phone.trim() || null,
      p_nights: nights,
      p_start: start || null,
      p_message: message.trim() || null,
      p_currency: showUsd ? "USD" : "NGN",
      p_trap: trap || null,
    });
    setSending(false);
    if (r.ok) setSent(true);
    else setError(r.error ?? `We couldn’t send that. Please email ${site.supportEmail}.`);
  };

  return (
    <>
      <p className="eyebrow">Quiz Night sponsorship</p>
      <h1>Put your brand in front of students, every night.</h1>
      <p className="lead">
        Quiz Night is the Penpus nightly knockout: students across campuses go head-to-head every
        evening for a cash prize. Sponsor a night and your brand is on all of it.
      </p>

      <h2>What you get</h2>
      <div className={styles.benefits}>
        {BENEFITS.map((b) => (
          <div key={b.title} className={styles.benefit}>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </div>

      <div className={styles.priceHead}>
        <h2>Prices</h2>
        {hasUsd && (
          <div className={styles.toggle} role="group" aria-label="Currency">
            <button
              type="button"
              className={currency === "NGN" ? styles.on : ""}
              onClick={() => setCurrency("NGN")}
            >
              {"₦"} NGN
            </button>
            <button
              type="button"
              className={currency === "USD" ? styles.on : ""}
              onClick={() => setCurrency("USD")}
            >
              $ USD
            </button>
          </div>
        )}
      </div>
      <div className={styles.packages}>
        {data.rates.map((r, i) => {
          const next = data.rates[i + 1];
          const usd = usdPerNight(r, data.ngn_per_usd);
          return (
            <div key={r.id} className={styles.package}>
              <h3>{r.title}</h3>
              <p className={styles.price}>
                <span>{perNight(r)}</span>
                <span className={styles.per}>a night</span>
              </p>
              {usd != null && (
                <p className={styles.alt}>
                  {showUsd ? naira(r.per_night_ngn) : `about ${dollars(usd)}`}
                </p>
              )}
              <p className={styles.detail}>
                {`${naira(r.prize_per_night_ngn)} prize pool for the students each night, and your brand on it.`}
                {next ? ` For ${r.min_nights}–${next.min_nights - 1} nights.` : ""}
                {r.min_nights === 7 ? ` A week: ${showUsd && usd != null ? dollars(7 * usd) : naira(7 * r.per_night_ngn)}.` : ""}
              </p>
            </div>
          );
        })}
        <div className={styles.package}>
          <h3>Longer run</h3>
          <p className={styles.price}>Let&rsquo;s talk</p>
          <p className={styles.detail}>A month, a semester, your own prize. Tell us what you have in mind.</p>
        </div>
      </div>
      <p className={styles.note}>
        Introductory prices.
        {hasUsd && data.ngn_per_usd ? ` Dollar prices at ₦${data.ngn_per_usd.toLocaleString("en-NG")} = $1, rounded up.` : ""}
      </p>

      <h2>How it works</h2>
      <ol className={styles.steps}>
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2 id="ask">Ask to sponsor</h2>
      {sent ? (
        <div className={styles.done} role="status">
          <h3>Thanks, we&rsquo;ve got it.</h3>
          <p>We&rsquo;ll be in touch within 48 hours to agree your nights and send payment details.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.row}>
            <label>
              Brand or company *
              <input value={brand} onChange={(e) => setBrand(e.target.value)} maxLength={80} autoComplete="organization" />
            </label>
            <label>
              Your name *
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="name" />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={120} autoComplete="email" />
            </label>
            <label>
              Phone number
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={40} autoComplete="tel" />
            </label>
          </div>
          <div className={styles.row}>
            <label>
              How many nights?
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={MAX_NIGHTS}
                value={nightsText}
                onChange={(e) => setNightsText(e.target.value)}
              />
            </label>
            <label>
              Start date
              <input type="date" value={start} min={today || undefined} onChange={(e) => setStart(e.target.value)} />
            </label>
          </div>
          {quote && <p className={styles.quote}>{quote}</p>}
          <label>
            Anything else
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} rows={4} />
          </label>
          {/* Hidden from people; a form-filling bot finds it. */}
          <div className={styles.trap} aria-hidden="true">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
            </label>
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={`btn ${styles.submit}`} disabled={sending}>
            {sending ? "Sending…" : "Send request"}
          </button>
          <p className={styles.note}>
            * Required, plus an email or a phone number. We review every request. Penpus runs Quiz
            Night and pays every prize.
          </p>
        </form>
      )}

      <hr />
      <p>
        Rather email? Write to <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
      </p>
    </>
  );
}
