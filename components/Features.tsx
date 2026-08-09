import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Everything a semester throws at you</p>
          <h2>One app, six jobs done properly.</h2>
          <p>No more juggling six group chats, a PDF folder and a photo of the timetable.</p>
        </div>

        <div className={styles.bento}>
          <article className={`${styles.card} ${styles.span6} reveal`}>
            <h3>Your school, properly structured</h3>
            <p>
              Join your institution and Penpus walks you down to your people — faculty,
              department, level. Verified class reps carry a green rank, so you always know
              who’s talking.
            </p>
            <div className={`${styles.art} ${styles.chain}`}>
              <span className={styles.node}><small>Institution</small>UNICAL</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}><small>Faculty</small>Engineering</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}><small>Course</small>Petroleum</span>
              <span className={styles.arrow}>→</span>
              <span className={styles.node}><small>Set</small>400 Level</span>
            </div>
          </article>

          <article className={`${styles.card} ${styles.span3} reveal`}>
            <h3>Chats that feel like home</h3>
            <p>
              DMs and groups with voice notes, reactions and replies — plus stickers you
              make yourself from any photo or meme.
            </p>
            <div className={`${styles.art} ${styles.stickers}`}>
              <span>🎓</span><span>😂</span><span>🔥</span><span>🙏</span><span>💯</span>
            </div>
          </article>

          <article className={`${styles.card} ${styles.span3} reveal`}>
            <h3>Never miss a class again</h3>
            <p>Your cohort timetable plus personal reminders, with today’s classes on your home screen.</p>
            <div className={styles.art}>
              <div className={styles.sched}>
                <div className={styles.row}>
                  <span className={styles.pill}>Lecture</span>
                  <span className={`${styles.pill} ${styles.ok} ${styles.rightEnd}`}>Up next</span>
                </div>
                <b>GST232</b>
                <span className={styles.when}>🕘 9:00 – 11:00 · LT1</span>
              </div>
              <div className={`${styles.sched} ${styles.sched2}`}>
                <div className={styles.row}><span className={styles.pill}>Practical</span></div>
                <b>CSC303</b>
                <span className={styles.when}>🕐 1:00 – 3:00 · Software Lab</span>
              </div>
            </div>
          </article>

          <article className={`${styles.card} ${styles.span3} reveal`}>
            <h3>Past questions, sorted</h3>
            <p>
              Course materials uploaded by students, approved by your rep, organised per
              course — not lost in the chat scroll.
            </p>
            <div className={`${styles.art} ${styles.files}`}>
              <div className={styles.file}>
                <span className={styles.ext}>PDF</span> CSC301 Past Questions 2019–2025
                <span className={styles.approved}>✓ Approved</span>
              </div>
              <div className={styles.file}>
                <span className={`${styles.ext} ${styles.doc}`}>PPT</span> GST232 — Week 6 slides
                <span className={styles.approved}>✓ Approved</span>
              </div>
            </div>
          </article>

          <article className={`${styles.card} ${styles.span3} reveal`}>
            <h3>Quizzes that sharpen you</h3>
            <p>A fresh Quiz of the Day, plus AI practice quizzes generated straight from your course materials.</p>
            <div className={`${styles.art} ${styles.row}`}>
              <span className={styles.pill}>⚡ Daily streak</span>
              <span className={`${styles.pill} ${styles.ok}`}>Best score 9/10</span>
            </div>
          </article>

          <article className={`${styles.card} ${styles.span6} reveal`}>
            <h3>Your personal study library</h3>
            <p>
              Save notes, PDFs and links into your own collections — 5 GB free. Files open
              once and stay available offline, and starred favourites float to the top.
            </p>
            <div className={`${styles.art} ${styles.libWrap}`}>
              <div className={styles.libStore}>
                <b>Your study space</b>
                <span className={styles.libUsed}>1.2 GB of 5 GB used</span>
                <div className={styles.bar}><i style={{ width: "24%" }} /></div>
              </div>
              <div className={styles.libCols}>
                <span className={styles.col}>
                  <i className={`${styles.dot} ${styles.blue}`} />Mathematics<small>3</small>
                </span>
                <span className={styles.col}>
                  <i className={`${styles.dot} ${styles.green}`} />Organic Chemistry<small>2</small>
                </span>
                <span className={styles.col}>
                  <i className={`${styles.dot} ${styles.violet}`} />Data Structures<small>1</small>
                </span>
                <span className={styles.col}>
                  <i className={`${styles.dot} ${styles.amber}`} />★ Favourites<small>4</small>
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
