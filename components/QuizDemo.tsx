"use client";
import { useState } from "react";
import styles from "./QuizDemo.module.css";

const options = [
  { tag: "A", text: "35", correct: true },
  { tag: "B", text: "45", correct: false },
  { tag: "C", text: "60", correct: false },
  { tag: "D", text: "50", correct: false },
];

export default function QuizDemo() {
  const [picked, setPicked] = useState<string | null>(null);
  const answered = picked !== null;
  const gotIt = options.find((o) => o.tag === picked)?.correct ?? false;

  return (
    <section className="section" id="quiz">
      <div className={`container ${styles.wrap}`}>
        <div className="section-head reveal" style={{ marginBottom: 0 }}>
          <p className="eyebrow">Try it right here</p>
          <h2>Quiz of the Day, every day at 8am.</h2>
          <p>
            Ten quick questions to warm your brain up before lectures — logic, aptitude,
            vocabulary. Score it, read the working, retake it. Go on, tap an answer.
          </p>
        </div>

        <div className={`${styles.card} reveal`}>
          <div className={styles.head}>
            <div className={styles.bolt}>⚡</div>
            <div>
              <div className={styles.title}>Quiz of the Day</div>
              <div className={styles.sub}>Aptitude · Question 9 of 10</div>
            </div>
          </div>

          <p className={styles.prompt}>Solve: 9 × 5 − 10 = ?</p>

          <div className={styles.grid}>
            {options.map((o) => {
              const state =
                !answered ? "" : o.correct ? styles.right : o.tag === picked ? styles.wrong : "";
              return (
                <button
                  key={o.tag}
                  className={`${styles.opt} ${state} ${answered ? styles.locked : ""}`}
                  onClick={() => !answered && setPicked(o.tag)}
                  disabled={answered}
                >
                  <span className={styles.tag}>{o.tag}</span>
                  {o.text}
                  <span className={styles.mark}>
                    {answered && o.correct ? "✓" : answered && o.tag === picked ? "✕" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={styles.expl}>
              <b>{gotIt ? "Nice one! 🎉" : "Not quite —"}</b>
              💡 Multiply first: 9 × 5 = 45. Then subtract 10: 45 − 10 = <b style={{ display: "inline" }}>35</b>.
            </div>
          )}

          <div className={styles.foot}>
            <span>
              {!answered
                ? "No pressure — scores are private to you."
                : gotIt
                ? "1/1 — you’d smash the real thing."
                : "Explanations after every question."}
            </span>
            {answered && (
              <button className={styles.retry} onClick={() => setPicked(null)}>
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
