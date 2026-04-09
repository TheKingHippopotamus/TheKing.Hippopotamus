import type { MetadataRoute } from "next";
import { STATIONS } from "@/lib/stations";
import { PROJECTS } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";
  const root = base.replace(/\/$/, "");

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
