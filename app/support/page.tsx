import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${site.name} — FAQs and how to reach us.`,
};

const faqs = [
  {
    q: "How do I join my school?",
    a: "Open Penpus, search for your institution, then pick your faculty, department and level. If your department isn’t listed yet, you can request it right from the search screen.",
  },
  {
    q: "I’m a class rep — how do I get verified?",
    a: "Submit a verification request from your profile. Once approved, you’ll carry a green rank across your communities and can manage your cohort’s channels, timetable and materials.",
  },
  {
    q: "How do the daily quizzes work?",
    a: "A fresh Quiz of the Day lands each morning — ten quick questions with explanations. You can also generate AI practice quizzes from your course materials. Your scores stay private to you.",
  },
  {
    q: "How do I turn notifications on or off?",
    a: "Go to Profile → Settings → Notifications. You can control message alerts, group activity, class-reminder sounds and quiet hours independently.",
  },
  {
    q: "How do I delete my account?",
    a: "Profile → Settings → delete account. This removes your personal data from our systems. You can also email us and we’ll do it for you.",
  },
];

export default function Support() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">← Back to home</Link>
        <h1>Support</h1>
        <p className="updated">We’re a small team and we read every message.</p>

        <p className="lead">
          The quickest way to reach us is email:{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. We usually reply
          within 48 hours.
        </p>

        <h2>Frequently asked</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <hr />
        <p>
          Found a bug or have an idea? Email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> with your school and
          a screenshot if you can — it helps us fix things faster.
        </p>
      </main>
      <Footer />
    </>
  );
}
