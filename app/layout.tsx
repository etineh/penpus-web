import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "campus app", "student app Nigeria", "university chat app",
    "class timetable", "past questions", "community","daily quiz", site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/logo.png", width: 1060, height: 1060, alt: `${site.name} — ${site.tagline}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/logo-rounded.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: { capable: true, title: site.name },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF5" },
    { media: "(prefers-color-scheme: dark)", color: "#0B182E" },
  ],
};

// Structured data so a Penpus search shows the app card, not a blue link.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
    },
    {
      "@type": "MobileApplication",
      name: site.name,
      operatingSystem: "ANDROID, IOS",
      applicationCategory: "SocialNetworkingApplication",
      description: site.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
    },
  ],
};

// Set the saved theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var t=localStorage.getItem('penpus-theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
