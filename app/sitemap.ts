import type { MetadataRoute } from "next";

import { canonicalSiteUrl } from "@/lib/seo";

const routes = ["", "/services", "/about", "/contact", "/intake"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${canonicalSiteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
