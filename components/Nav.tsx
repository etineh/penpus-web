import Link from "next/link";
import { site } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark} aria-label="Penpus home">
          <img src="/logo.png" alt="" width={28} height={28} className={styles.logo} />
          {site.name}
        </Link>
        <nav className={styles.links} aria-label="Main">
          <Link href="/#features">Features</Link>
          <Link href="/#quiz">Quiz</Link>
          <Link href="/#schools">Schools</Link>
          <a
            className="btn"
            href={site.playStoreUrl}
            style={{ color: "#fff" }}
          >
            Get the app
          </a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
