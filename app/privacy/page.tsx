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
          {site.name} — your campus, in your pocket · Effective 3 November 2026
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
          <li><b>Verification documents</b> — the student ID card, admission letter or similar document you upload to verify your academic rank. It is checked by an AI service and reviewed by our team, and used only for verification.</li>
          <li><b>Content you create</b> — messages, voice notes, photos, posts, quiz attempts and course materials you share inside the app.</li>
          <li><b>Device information</b> — a push-notification token so we can deliver message alerts and class reminders, and basic diagnostics to keep the app reliable.</li>
          <li><b>Camera, microphone and photo library</b> — used only when you actively take a photo, record a voice note, or attach an image. We never access them in the background.</li>
          <li><b>Contacts</b> — if you grant permission, phone numbers from your address book are checked against {site.name} accounts so we can show you which of your contacts are already here. We do not store your address book, and contact names stay on your device.</li>
          <li><b>Location</b> — if you grant permission, your device location is used once to determine your country when setting up your profile. We keep the country, not your coordinates.</li>
          <li><b>How you use the app</b> — which features you open and complete. See “Usage analytics” below.</li>
        </ul>

        <h2>2. How we use your information</h2>
        <ul>
          <li>To create and secure your account and verify your campus membership.</li>
          <li>To deliver messages, feeds, timetables, reminders and quizzes to you and your communities.</li>
          <li>To generate quizzes from course materials you choose, read handwritten exam answers you photograph, and check the documents you submit for rank verification (processed by an AI service solely for those purposes).</li>
          <li>To send push notifications you can turn off anytime in Settings.</li>
          <li>To prevent abuse and keep communities safe.</li>
          <li>To understand which features are used, so we know what to improve.</li>
        </ul>
        <p>We do not sell your personal information, and we do not use your content for advertising.</p>

        <h2>3. Usage analytics</h2>
        <p>
          We record which features of {site.name} you use — for example opening a challenge,
          completing a scan, or using the CGPA calculator — together with the date and your
          account ID. We record <b>that</b> a feature was used, never its contents: we do not
          record your messages, your documents, your quiz answers, or the files in your
          library.
        </p>
        <p>
          We use this only to understand which parts of {site.name} are useful and which need
          improvement. It stays on our own servers, is never sold, and is never shared with
          advertisers or data brokers. We do not track you across other apps or websites.
        </p>
        <p>
          <b>This data is automatically deleted after 60 days.</b>
        </p>

        <h2>4. Who can see your content</h2>
        <p>
          {site.name} is a community app: your name, profile photo and academic rank are
          visible to members of the communities you join, and messages you send are visible
          to their recipients or channel members. Your quiz scores are private to you.
        </p>

        <h2>5. Services we rely on</h2>
        <p>We use trusted providers to run {site.name}, each processing data only on our behalf:</p>
        <ul>
          <li><b>Google Firebase</b> — authentication and push notifications.</li>
          <li><b>Supabase</b> — application database.</li>
          <li><b>Cloudflare</b> — file storage for photos, voice notes and course materials.</li>
          <li><b>Anthropic and OpenAI</b> — AI processing of course materials, exam answers and verification documents you submit. They process this data only to return a result to us, and do not use it to train their models.</li>
        </ul>

        <h2>6. Data retention &amp; deletion</h2>
        <p>
          We keep your information while your account is active. You can delete your account
          from inside the app (Profile → Settings), which removes your personal data from our
          systems; or email us and we will delete it for you. Some minimal records may be
          retained where required for security or legal compliance.
        </p>
        <p>
          Usage analytics are deleted automatically after 60 days, whether or not your
          account is still active.
        </p>

        <h2>7. Children</h2>
        <p>
          {site.name} is intended for university students and users aged 13 and above. We do
          not knowingly collect data from children under 13; if you believe a child has
          created an account, contact us and we will remove it.
        </p>

        <h2>8. Security</h2>
        <p>
          Data is encrypted in transit, access to production systems is restricted, and
          permissions inside the app are enforced server-side.
        </p>

        <h2>9. Changes to this policy</h2>
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
