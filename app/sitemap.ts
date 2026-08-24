import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";

const BASE_URL = "https://life-tools-one.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...["money", "home", "car", "buy", "work", "life"].map((path) => ({
      url: `${BASE_URL}/${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...["about", "privacy", "terms", "contact", "sitemap.html"].map((path) => ({
      url: `${BASE_URL}/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "sitemap.html" ? 0.4 : 0.5,
    })),
  ];

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}
