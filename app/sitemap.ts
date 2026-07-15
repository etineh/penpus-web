import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { schools } from "@/lib/schools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/privacy", "/terms", "/support", "/account-deletion"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const schoolRoutes = schools.map((s) => ({
    url: `${site.url}/schools/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...schoolRoutes];
}
