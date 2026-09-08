// Single source of truth for brand + links used across the site and metadata.
export const site = {
  name: "Penpus",
  tagline: "Your campus, in your pocket.",
  description:
    "Everything a student needs is on Penpus: mock exam, course materials, past questions, timetables, a CGPA calculator, a PDF scanner, and a private study library. Penpus lets students play live mock exams against their classmates, generated from their own course materials.",
  url: "https://penpus.com",
  // Update these once the store listings are live.
  appStoreUrl: "https://apps.apple.com/ng/app/penpus-all-campus-hub/id6789201059",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.allcampusapp.allcampus",
  webAppUrl: "https://app.penpus.com",
  email: "support@penpus.com",
  supportEmail: "support@penpus.com",
  social: {
    x: "https://x.com/penpusglobal",
    instagram: "https://www.instagram.com/penpusglobal",
    tiktok: "https://www.tiktok.com/@penpusglobal?_r=1&_t=ZS-98jxCMRfUxh",
    linkedin: "https://www.linkedin.com/company/penpus",
  },
} as const;
