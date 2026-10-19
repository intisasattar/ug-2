import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/how-we-work", priority: 0.8 },
    { path: "/results", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/careers", priority: 0.6 },
  ];
  return pages.map((p) => ({ url: `${siteUrl}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
