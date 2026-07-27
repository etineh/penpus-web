// Single source of truth for brand + links used across the site and metadata.
export const site = {
  name: "Penpus",
  tagline: "The whole campus in your pocket.",
  description:
    "Penpus brings your course mates, class timetable, past questions and the daily quiz into one clean chat app — from your institution community down to your level group.",
  url: "https://penpus.com",
  // Update these once the store listings are live.
  appStoreUrl: "https://apps.apple.com/ng/app/penpus-all-campus-hub/id6789201059",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.allcampusapp.allcampus",
  webAppUrl: "https://app.penpus.com",
  email: "hello@penpus.com",
  supportEmail: "support@penpus.com",
  social: {
    x: "https://x.com/penpus",
    instagram: "https://instagram.com/penpus",
    tiktok: "https://tiktok.com/@penpus",
  },
} as const;
