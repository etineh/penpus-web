import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SponsorPage from "./SponsorPage";

export const metadata: Metadata = {
  title: "Sponsor Quiz Night",
  description:
    "Put your brand in front of students every night. Sponsor Penpus Quiz Night — your name on it, your prize in their hands.",
  alternates: { canonical: "/sponsor" },
  openGraph: {
    type: "website",
    title: "Sponsor Quiz Night on Penpus",
    description:
      "Your brand on the nightly student quiz knockout: the Home card, the screen, the notifications — and your prize in the winners' hands.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Penpus" }],
  },
};

export default function Sponsor() {
  return (
    <>
      <Nav />
      <main className="prose">
        <Link href="/" className="backlink">← Back to home</Link>
        <SponsorPage />
      </main>
      <Footer />
    </>
  );
}
