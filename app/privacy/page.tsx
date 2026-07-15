import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your information.`,
};

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">← Back to home</Link>
        <h1>Privacy Policy</h1>
        <p className="updated">
          {site.name} — your campus, in your pocket · Effective 14 July 2026
        </p>

        <p className="lead">
          {site.name} (“we”, “our”, “the app”) helps university students connect with their
          school, classmates, classes and study materials. This policy explains what
          information we collect, how we use it, and the choices you have.
        </p>

        <h2>1. Information we collect</h2>
        <ul>
          <li><b>Account information</b> — when you sign in with Google, we receive your name, email address and profile photo.</li>
          <li><b>Academic information</b> — the school, faculty, department and level you choose or verify, so we can place you in the right campus communities.</li>
          <li><b>Content you create</b> — messages, voice notes, photos, posts, quiz attempts and course materials you share inside the app.</li>
          <li><b>Device information</b> — a push-notification token so we can deliver message alerts and class reminders, and basic diagnostics to keep the app reliable.</li>
          <li><b>Camera, microphone and photo library</b> — used only when you actively take a photo, record a voice note, or attach an image. We never access them in the background.</li>
        </ul>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To create and secure your account and verify your campus membership.</li>
          <li>To deliver messages, feeds, timetables, reminders and quizzes to you and your communities.</li>
          <li>To generate practice-quiz questions from course materials you choose (processed by an AI service solely for that purpose).</li>
          <li>To send push notifications you can turn off anytime in Settings.</li>
          <li>To prevent abuse and keep communities safe.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use your content for advertising.</p>

        <h2>3. Who can see your content</h2>
        <p>
          {site.name} is a community app: your name, profile photo and academic rank are
          visible to members of the communities you join, and messages you send are visible
          to their recipients or channel members. Your quiz scores are private to you.
        </p>

        <h2>4. Services we rely on</h2>
        <p>We use trusted providers to run {site.name}, each processing data only on our behalf:</p>
        <ul>
          <li><b>Google Firebase</b> — authentication and push notifications.</li>
          <li><b>Supabase</b> — application database.</li>
          <li><b>Cloudflare</b> — file storage for photos, voice notes and course materials.</li>
          <li><b>Anthropic</b> — AI processing of course materials you select for quiz generation.</li>
        </ul>

        <h2>5. Data retention &amp; deletion</h2>
        <p>
          We keep your information while your account is active. You can delete your account
          from inside the app (Profile → Settings), which removes your personal data from our
          systems; or email us and we will delete it for you. Some minimal records may be
          retained where required for security or legal compliance.
        </p>

        <h2>6. Children</h2>
        <p>
          {site.name} is intended for university students and users aged 13 and above. We do
          not knowingly collect data from children under 13; if you believe a child has
          created an account, contact us and we will remove it.
        </p>

        <h2>7. Security</h2>
        <p>
          Data is encrypted in transit, access to production systems is restricted, and
          permissions inside the app are enforced server-side.
        </p>

        <h2>8. Changes to this policy</h2>
        <p>
          If we make material changes, we will update this page and note the new effective
          date above.
        </p>

        <hr />
        <h2>Contact &amp; support</h2>
        <p>
          Questions, feedback, or a data request? Email us at{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> — we usually reply
          within 48 hours.
        </p>
      </main>
      <Footer />
    </>
  );
}
