import type { MetadataRoute } from "next";
import { STATIONS } from "@/lib/stations";
import { PROJECTS } from "@/lib/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = getSiteUrl();

  const stationUrls = STATIONS.map((s) => ({
    url: `${root}/station/${s.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectUrls = PROJECTS.map((p) => ({
    url: `${root}/app/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: root, changeFrequency: "daily", priority: 1 },
    { url: `${root}/terminal`, changeFrequency: "monthly", priority: 0.4 },
    ...stationUrls,
    ...projectUrls,
  ];
}
