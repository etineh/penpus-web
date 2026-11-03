import type { Metadata } from "next";
import WatchLive from "./WatchLive";

// One static page serves every /watch/<matchId> (see the rewrite in
// render.yaml), so the link preview is generic — the match id is only known
// in the browser.
export const metadata: Metadata = {
  title: "Watch live",
  description:
    "Follow a Penpus match question by question — scores, answers and who was fastest.",
  alternates: { canonical: "/watch" },
  openGraph: {
    type: "website",
    title: "Watch this match live on Penpus",
    description:
      "Follow it question by question — scores, answers and who was fastest. No app needed.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Penpus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch this match live on Penpus",
    description:
      "Follow it question by question — scores, answers and who was fastest. No app needed.",
    images: ["/og.png"],
  },
};

export default function Watch() {
  return <WatchLive />;
}
