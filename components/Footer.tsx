import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.wordmark}>
          <img src="/logo.png" alt="" width={20} height={20} className={styles.logo} />
          {site.name}
        </Link>
        <span className={styles.copy}>
          © {new Date().getFullYear()} {site.name} · penpus.com
        </span>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/support">Support</Link>
          <Link href="/account-deletion">Delete Account</Link>
        </nav>
      </div>
    </footer>
  );
}
