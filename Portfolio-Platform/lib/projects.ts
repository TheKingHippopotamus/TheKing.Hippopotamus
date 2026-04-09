import type { ProjectEntry, StationSlug } from "@/types/project";

const OWNER = "TheKingHippopotamus";

export const GITHUB_OWNER = OWNER;

export const PROJECTS: ProjectEntry[] = [
  // Financial
  {
    slug: "hippo-equity-research",
    name: "Hippo Equity Research Platform",
    station: "financial",
    description:
      "Scalable equity research web application — live dashboard when deployed.",
    githubRepo: "Hippo_Equity_ResearchPlatform",
    embed: "internal-equity",
    featured: true,
    language: "TypeScript",
  },
  {
    slug: "forensic-analysis",
    name: "Forensic Analysis (XBRL / Arelle)",
    station: "financial",
    description:
      "XBRL forensics and Arelle MCP tooling — API-driven panels in command center.",
    githubRepo: "ForensicAnalysis",
    embed: "internal-forensic",
    featured: true,
    language: "HTML",
  },
  {
    slug: "supply-chain",
    name: "Supply Chain",
    station: "financial",
    description: "Supply chain visualization and analysis (TypeScript).",
    githubRepo: "SupplyChain",
    embed: "iframe",
    featured: true,
    language: "TypeScript",
  },
  {
    slug: "marketbeat-research",
    name: "HippoResearch Marketbeat",
    station: "financial",
    description: "Market research HTML reports.",
    githubRepo: "HippoResearch_Marketbeat",
    embed: "html-proxy",
    htmlPath: "index.html",
    language: "HTML",
  },
  {
    slug: "meta-sell-side",
    name: "META Sell-Side Research",
    station: "financial",
    description: "Long-form sell-side style research on META / AI CapEx.",
    githubRepo: "META_sell_side_research",
    embed: "html-proxy",
    htmlPath: "index.html",
    language: "HTML",
    featured: true,
  },
  {
    slug: "intel-sell-side",
    name: "Intel Sell-Side Research",
    station: "financial",
    description: "HTML research output.",
    githubRepo: "Intel_sellSide_research",
    embed: "html-proxy",
    htmlPath: "index.html",
    language: "HTML",
  },
  // Agents
  {
    slug: "semantic-watchdog-agents",
    name: "Semantic Watchdog Agents",
    station: "agents",
    description: "Agent monitoring, watchdog flows, and operational telemetry.",
    githubRepo: "semantic-watchdog-agents",
    embed: "internal-agents",
    featured: true,
    language: "TypeScript",
  },
  {
    slug: "195-shades-of-agents",
    name: "195 Shades of Agents",
    station: "agents",
    description: "Agent catalog and experimentation surface.",
    githubRepo: "195_shades_of_agents-",
    embed: "none",
    language: "TypeScript",
  },
  {
    slug: "golem-3dmcp-rhino",
    name: "GOLEM 3D MCP (Rhino)",
    station: "agents",
    description:
      "MCP server for Rhinoceros 3D — geometry, Grasshopper, viewport capture.",
    githubRepo: "GOLEM-3DMCP-Rhino-",
    embed: "iframe",
    featured: true,
    language: "Python",
  },
  {
    slug: "google-colab-mcp",
    name: "Google Colab MCP",
    station: "agents",
    description: "Notebook + MCP bridge patterns.",
    githubRepo: "google_colab-mcp",
    embed: "none",
    language: "Jupyter Notebook",
  },
  {
    slug: "arelle-mcp",
    name: "Arelle MCP",
    station: "agents",
    description: "MCP integration for Arelle / XBRL workflows.",
    githubRepo: "Arelle-MCP",
    embed: "none",
    language: "Python",
  },
  // Dev tools
  {
    slug: "hippo-cli",
    name: "Hippo CLI",
    station: "dev-tools",
    description: "Automation CLI — web terminal preview in the command center.",
    githubRepo: "Hippo-CLI",
    embed: "internal-terminal",
    featured: true,
    language: "Python",
  },
  {
    slug: "md-spawn",
    name: "MD-Spawn (Markdown → HTML)",
    station: "dev-tools",
    description: "Browser-native markdown inside HTML via custom element.",
    githubRepo: "MarkDown_To_Html_Simple_Tag",
    embed: "internal-md",
    featured: true,
    language: "TypeScript",
  },
  {
    slug: "json-schema-generator",
    name: "JSON Schema Generator",
    station: "dev-tools",
    description: "Interactive JSON schema generation utilities.",
    githubRepo: "JSON_Schema_Generator",
    embed: "internal-json",
    language: "JavaScript",
  },
  {
    slug: "pdf2markdown",
    name: "PDF → Markdown",
    station: "dev-tools",
    description: "Document conversion pipeline (wire BFF to your service).",
    githubRepo: "PDF2Markdown_Converter",
    embed: "internal-pdf",
    language: "Python",
  },
  // Infra
  {
    slug: "open-source-network",
    name: "Open Source Network",
    station: "infra",
    description: "Network graph and OSS relationship views.",
    githubRepo: "Open_source_network",
    embed: "iframe",
    language: "Python",
  },
  {
    slug: "irondome-bunker",
    name: "IronDome Bunker",
    station: "infra",
    description: "Astro-based security / bunker themed surface.",
    githubRepo: "IronDome-Bunker",
    embed: "iframe",
    language: "Astro",
  },
  {
    slug: "awesome-mcp-servers",
    name: "Awesome MCP Servers",
    station: "infra",
    description: "Curated MCP server list (fork).",
    githubRepo: "awesome-mcp-servers",
    embed: "iframe",
    embedUrl: "https://glama.ai/mcp/servers",
    language: "Markdown",
  },
  // Labs
  {
    slug: "when-youre-bored",
    name: "When You're Bored",
    station: "labs",
    description: "Games from several Ollama models.",
    githubRepo: "When_you_r_bored",
    embed: "iframe",
    language: "TypeScript",
  },
  {
    slug: "macicons",
    name: "macIcons",
    station: "labs",
    description: "Python icon utilities and gallery hooks.",
    githubRepo: "macIcons",
    embed: "none",
    language: "Python",
  },
  {
    slug: "rust-exercise",
    name: "Rust Exercise",
    station: "labs",
    description: "Rust experiments — WASM demos when compiled.",
    githubRepo: "rust_Exercise",
    embed: "none",
    language: "Rust",
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByStation(station: StationSlug): ProjectEntry[] {
  return PROJECTS.filter((p) => p.station === station);
}

export function githubRepoUrl(repo: string): string {
  return `https://github.com/${OWNER}/${repo}`;
}

export function resolveEmbedUrl(project: ProjectEntry): string | undefined {
  if (project.embedUrl) return project.embedUrl;
  const envKey = `NEXT_PUBLIC_EMBED_${project.slug.replace(/-/g, "_").toUpperCase()}`;
  if (typeof process !== "undefined" && process.env[envKey]) {
    return process.env[envKey];
  }
  return undefined;
}

/** Repos allowed for server-side raw HTML proxy */
export const HTML_PROXY_ALLOWLIST = new Set(
  PROJECTS.filter((p) => p.embed === "html-proxy").map((p) => p.githubRepo),
);
