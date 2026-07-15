import StoreBadges from "./StoreBadges";
import styles from "./CtaBand.module.css";

export default function CtaBand({
  heading = "Be first on your campus.",
  sub = "Free on Android and iOS. Set up your school community before your course mates even hear about it.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <h2>{heading}</h2>
          <p>{sub}</p>
          <div className={styles.center}>
            <StoreBadges />
          </div>
        </div>
      </div>
    </section>
  );
}
