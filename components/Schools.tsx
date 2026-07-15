import Link from "next/link";
import { schools } from "@/lib/schools";
import styles from "./Schools.module.css";

export default function Schools() {
  return (
    <section className="section" id="schools">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">Growing campus by campus</p>
          <h2>Find your school on Penpus.</h2>
          <p>
            Search your institution, request your department if it’s not there yet, and
            bring your course mates along.
          </p>
        </div>
        <div className={`${styles.grid} reveal`}>
          {schools.map((s) => (
            <Link key={s.slug} href={`/schools/${s.slug}`} className={styles.school}>
              {s.short}
            </Link>
          ))}
          <span className={`${styles.school} ${styles.more}`}>+ your school</span>
        </div>
      </div>
    </section>
  );
}
