import StoreBadges from "./StoreBadges";
import { Verified } from "./Icons";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.ruling} aria-hidden="true" />
      <div className={styles.margin} aria-hidden="true" />
      <div className={`container ${styles.grid}`}>
        <div>
          <p className="eyebrow">Built for all campuses</p>
          <h1 className={styles.title}>
            <span className={styles.hl}>Your campus</span> in your pocket.
          </h1>
          <p className={styles.lede}>
            Everything a student needs is on Penpus: mock exam, course materials, past questions, daily quiz, timetables, a CGPA calculator, a PDF scanner, and a private study library. Penpus lets students play live mock exams against their classmates, generated from their own course materials.
          </p>
          <StoreBadges withBrowser />
          <span className={styles.scribble}>GST232 — 9am, LT1. Don’t sleep in! ✍︎</span>
        </div>

        <div className={styles.phoneWrap}>
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div
      className={styles.phone}
      role="img"
      aria-label="Penpus chat screen showing a 300 Level Computer Science group conversation"
    >
      <div className={styles.screen}>
        <div className={styles.status}>
          <span>9:41</span>
          <span>▂▄▆ ⌁ 🔋</span>
        </div>
        <div className={styles.appbar}>
          <div className={styles.avatar}>3C</div>
          <div>
            <div className={styles.gname}>300L Computer Science</div>
            <div className={styles.gmeta}>184 members · 12 online</div>
          </div>
        </div>
        <div className={styles.chat}>
          <div className={`${styles.bubble} ${styles.in}`}>
            <div className={styles.sender}>
              <Verified /> Amara · Class Rep
            </div>
            Guys, CSC301 now holds in LT2 by 10am — not the lab 📌
          </div>
          <div className={styles.sticker}>🎓</div>
          <div className={`${styles.bubble} ${styles.out}`}>
            Thank you boss! 🙏
            <div className={styles.meta}>
              9:38 <span className={styles.ticks}>✓✓</span>
            </div>
          </div>
          <div className={`${styles.bubble} ${styles.out}`}>
            <div className={styles.quote}>
              <b>Amara · Class Rep</b>CSC301 now holds in LT2…
            </div>
            I’ll drop the slides here after class
            <div className={styles.meta}>
              9:39 <span className={styles.ticks}>✓✓</span>
            </div>
          </div>
          <div className={styles.typing} aria-label="Someone is typing">
            <i /><i /><i />
          </div>
        </div>
        <div className={styles.input}>
          Message <span className={styles.icons}>📷 😊 🎤</span>
        </div>
      </div>
    </div>
  );
}
