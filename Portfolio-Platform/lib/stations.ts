import type { StationMeta, StationSlug } from "@/types/project";

export const STATIONS: StationMeta[] = [
  {
    slug: "financial",
    title: "Financial Intelligence",
    tagline: "Equity research, XBRL forensics, supply chain",
    accent: "from-emerald-500/20 to-cyan-500/10",
  },
  {
    slug: "agents",
    title: "AI Agent Operations",
    tagline: "MCP, watchdog agents, notebooks, 3D control",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    slug: "dev-tools",
    title: "Developer Tools",
    tagline: "CLI, markdown, schema, document pipelines",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    slug: "infra",
    title: "Infrastructure & OSS",
    tagline: "Networks, bunkers, MCP catalogs",
    accent: "from-sky-500/20 to-blue-500/10",
  },
  {
    slug: "labs",
    title: "Labs & Experiments",
    tagline: "Games, icons, systems play",
    accent: "from-rose-500/20 to-pink-500/10",
  },
];

export function getStation(slug: string): StationMeta | undefined {
  return STATIONS.find((s) => s.slug === slug);
}

export function isStationSlug(s: string): s is StationSlug {
  return STATIONS.some((x) => x.slug === s);
}
