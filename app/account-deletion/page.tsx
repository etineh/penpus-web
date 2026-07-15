import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import styles from "./account-deletion.module.css";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: `How to permanently delete your ${site.name} account and data.`,
};

const steps = [
  { n: 1, text: "Open Penpus and go to your Profile" },
  { n: 2, text: "Tap Settings, then Account" },
  { n: 3, text: "Tap Delete Account" },
  { n: 4, text: "Type your email address to confirm" },
  { n: 5, text: "Tap Delete My Account" },
];

const removed = [
  "Your profile, posts and quiz history",
  "Your conversations and connections",
  "Saved content and preferences",
  "Account and settings history",
];

export default function AccountDeletion() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">
          ← Back to home
        </Link>
        <h1>Delete Your Account</h1>
        <p className="updated">Two ways to permanently delete your account and data.</p>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>1</span>
            <div>
              <h2 className={styles.cardTitle}>Delete in the app</h2>
              <p className={styles.cardSub}>Quickest — takes under a minute</p>
            </div>
          </div>
          <ol className={styles.steps}>
            {steps.map((s) => (
              <li key={s.n}>{s.text}</li>
            ))}
          </ol>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <span className={styles.badge}>2</span>
            <div>
              <h2 className={styles.cardTitle}>Email our support team</h2>
              <p className={styles.cardSub}>If you no longer have the app installed</p>
            </div>
          </div>
          <p className={styles.emailLead}>
            Send a request to{" "}
            <a href={`mailto:${site.supportEmail}?subject=Account%20Deletion&body=Please%20permanently%20delete%20my%20Penpus%20account%20and%20all%20associated%20data.`}>
              {site.supportEmail}
            </a>{" "}
            from the email address on your account, with the subject &ldquo;Account Deletion&rdquo;.
          </p>
          <a
            className="btn"
            href={`mailto:${site.supportEmail}?subject=Account%20Deletion&body=Please%20permanently%20delete%20my%20Penpus%20account%20and%20all%20associated%20data.`}
          >
            Send email now
          </a>
        </div>

        <div className={styles.warning}>
          <strong>This is permanent.</strong> Once your account is deleted, your data cannot be
          recovered. Make sure you want to proceed before requesting deletion.
        </div>

        <h2>What gets deleted</h2>
        <ul>
          {removed.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p>
          Some minimal records may be retained where required for security or legal compliance.
          Read the full details in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </main>
      <Footer />
    </>
  );
}
