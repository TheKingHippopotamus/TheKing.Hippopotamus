export type StationSlug =
  | "financial"
  | "agents"
  | "dev-tools"
  | "infra"
  | "labs";

export type EmbedStrategy =
  | "iframe"
  | "html-proxy"
  | "internal-md"
  | "internal-terminal"
  | "internal-pdf"
  | "internal-json"
  | "internal-agents"
  | "internal-equity"
  | "internal-forensic"
  | "none";

export type ProjectEntry = {
  slug: string;
  name: string;
  station: StationSlug;
  description: string;
  githubRepo: string;
  embed: EmbedStrategy;
  /** Public deploy URL for iframe embeds (optional) */
  embedUrl?: string;
  /** Path inside repo for html-proxy (default index.html) */
  htmlPath?: string;
  language?: string;
  featured?: boolean;
};

export type StationMeta = {
  slug: StationSlug;
  title: string;
  tagline: string;
  accent: string;
};
