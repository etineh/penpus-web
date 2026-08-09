import Link from "next/link";
import { site } from "@/lib/site";
import { XGlyph, InstagramGlyph, TikTokGlyph, LinkedInGlyph } from "./Icons";
import styles from "./Footer.module.css";

const socials = [
  { href: site.social.x, label: "X", Icon: XGlyph },
  { href: site.social.instagram, label: "Instagram", Icon: InstagramGlyph },
  { href: site.social.tiktok, label: "TikTok", Icon: TikTokGlyph },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInGlyph },
];

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
        <div className={styles.right}>
          <div className={styles.social}>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
          <nav className={styles.links} aria-label="Footer">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/support">Support</Link>
            <Link href="/account-deletion">Delete Account</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
