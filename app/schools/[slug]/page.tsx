import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CtaBand from "@/components/CtaBand";
import ScrollReveal from "@/components/ScrollReveal";
import { schools, getSchool } from "@/lib/schools";
import { site } from "@/lib/site";

// Static export needs the full list of slugs up front.
export function generateStaticParams() {
  return schools.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) return {};
  const title = `${site.name} for ${school.short} — ${school.name}`;
  const description = `Join your ${school.short} course mates on ${site.name}: level group chats, class timetable, past questions and the daily quiz — all in one app.`;
  return {
    title,
    description,
    alternates: { canonical: `/schools/${school.slug}/` },
    openGraph: { title, description, url: `${site.url}/schools/${school.slug}/` },
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();

  return (
    <>
      <Nav />
      <main>
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <Link href="/#schools" className="backlink">← All schools</Link>
            <p className="eyebrow">{school.city}</p>
            <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 800, maxWidth: "16ch" }}>
              {school.name} is on {site.name}.
            </h1>
            <p style={{ color: "var(--ink-soft)", fontSize: "1.15rem", maxWidth: "34em", margin: "18px 0 30px" }}>
              Find your {school.short} faculty, department and level, chat with your course
              mates, get the class timetable, grab past questions and take the daily quiz —
              all in one app.
            </p>
          </div>
        </section>
        <CtaBand
          heading={`Bring your ${school.short} class along.`}
          sub={`Set up your ${school.short} department community before your course mates even hear about it. Free on Android and iOS.`}
        />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
