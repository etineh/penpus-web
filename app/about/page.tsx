import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `The story and mission behind ${site.name} — one clean app for your whole campus.`,
};

export default function About() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">← Back to home</Link>
        <h1>About Penpus</h1>
        <p className="updated">The whole campus, in your pocket.</p>

        <p className="lead">
          Penpus is one clean app for everything a semester throws at you — your course
          mates, your class timetable, past questions, daily quizzes and your school
          community, from your institution all the way down to your level group.
        </p>

        <h2>Why we built it</h2>
        <p>
          Campus life is scattered across six group chats, a folder of PDFs and a photo of
          the timetable someone snapped in class. Important things get buried, newcomers
          feel lost, and nobody knows who’s actually a class rep. We thought students
          deserved better than that — a single place that’s structured the way a school
          really is.
        </p>

        <h2>What Penpus does</h2>
        <ul>
          <li>Joins you to your institution, then down to your faculty, department and level.</li>
          <li>DMs, groups and school communities with voice notes, reactions and your own stickers.</li>
          <li>Your cohort timetable plus personal reminders, with today’s classes on your home screen.</li>
          <li>Past questions and course materials, approved by verified reps and organised per course.</li>
          <li>A daily quiz and AI practice quizzes generated from your own materials.</li>
          <li>A personal study library — save notes, PDFs and links, 5&nbsp;GB free and available offline.</li>
        </ul>

        <h2>Where we’re going</h2>
        <p>
          We started with Nigerian campuses, but the problem is global — students everywhere
          juggle the same mess. Our mission is to give every student, on every campus, one
          calm home for their academic life. We’re building toward a campus marketplace,
          learning games and live quiz competitions, guided by what students actually ask us
          for.
        </p>

        <h2>Who we are</h2>
        <p>
          Penpus is built by software developer and founder Godstime Delord, with a startup
          team of four (4). We read every message, ship fast, and take feedback seriously.
        </p>

        <hr />
        <p>
          Want to talk — press, partnerships, or just an idea? Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>, or find us on{" "}
          <a href={site.social.x} target="_blank" rel="noopener noreferrer">X</a>,{" "}
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>,{" "}
          <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a> and{" "}
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
