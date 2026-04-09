"use client";

import dynamic from "next/dynamic";
import type { ProjectEntry } from "@/types/project";
import { resolveEmbedUrl } from "@/lib/projects";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { githubRepoUrl } from "@/lib/projects";

const MdPlayground = dynamic(
  () => import("@/components/dev/MdPlayground").then((m) => m.MdPlayground),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const TerminalEmulator = dynamic(
  () =>
    import("@/components/dev/TerminalEmulator").then((m) => m.TerminalEmulator),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const PdfToMarkdownPanel = dynamic(
  () =>
    import("@/components/dev/PdfToMarkdownPanel").then(
      (m) => m.PdfToMarkdownPanel,
    ),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const JsonSchemaPanel = dynamic(
  () =>
    import("@/components/dev/JsonSchemaPanel").then((m) => m.JsonSchemaPanel),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const AgentStatusDashboard = dynamic(
  () =>
    import("@/components/agents/AgentStatusDashboard").then(
      (m) => m.AgentStatusDashboard,
    ),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const EquityDashboard = dynamic(
  () =>
    import("@/components/finance/EquityDashboard").then(
      (m) => m.EquityDashboard,
    ),
  { ssr: false, loading: () => <EmbedLoading /> },
);
const ForensicOpsPanel = dynamic(
  () =>
    import("@/components/finance/ForensicOpsPanel").then(
      (m) => m.ForensicOpsPanel,
    ),
  { ssr: false, loading: () => <EmbedLoading /> },
);

function EmbedLoading() {
  return (
    <div className="flex h-[320px] items-center justify-center font-mono text-sm text-muted-foreground">
      Loading module…
    </div>
  );
}

function Placeholder({
  title,
  project,
}: {
  title: string;
  project: ProjectEntry;
}) {
  return (
    <Card className="border-dashed border-border/80 bg-muted/10">
      <CardContent className="space-y-3 p-6">
        <p className="font-mono text-sm text-[var(--kh-amber)]">{title}</p>
        <p className="text-xs text-muted-foreground">
          Configure deploy URL or backend via environment variables. Source:{" "}
          <Link
            className="text-[var(--kh-green)] underline-offset-2 hover:underline"
            href={githubRepoUrl(project.githubRepo)}
            target="_blank"
          >
            {project.githubRepo}
          </Link>
        </p>
        <Link
          href={githubRepoUrl(project.githubRepo)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "font-mono text-xs",
          )}
        >
          Open GitHub
        </Link>
      </CardContent>
    </Card>
  );
}

export function ProjectEmbed({
  project,
  className,
}: {
  project: ProjectEntry;
  className?: string;
}) {
  const url = resolveEmbedUrl(project);

  switch (project.embed) {
    case "iframe": {
      if (!url) {
        return (
          <Placeholder
            project={project}
            title="Iframe embed URL not configured"
          />
        );
      }
      return (
        <iframe
          title={project.name}
          src={url}
          className={
            className ??
            "h-[min(70vh,720px)] w-full rounded-md border border-border bg-black"
          }
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      );
    }
    case "html-proxy": {
      const src = `/api/raw-html?repo=${encodeURIComponent(project.githubRepo)}&path=${encodeURIComponent(project.htmlPath ?? "index.html")}`;
      return (
        <iframe
          title={project.name}
          src={src}
          className={
            className ??
            "h-[min(70vh,720px)] w-full rounded-md border border-border bg-background"
          }
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      );
    }
    case "internal-md":
      return <MdPlayground />;
    case "internal-terminal":
      return (
        <div className={className ?? "h-[min(70vh,520px)]"}>
          <TerminalEmulator />
        </div>
      );
    case "internal-pdf":
      return <PdfToMarkdownPanel />;
    case "internal-json":
      return <JsonSchemaPanel />;
    case "internal-agents":
      return <AgentStatusDashboard />;
    case "internal-equity":
      return <EquityDashboard />;
    case "internal-forensic":
      return <ForensicOpsPanel />;
    case "none":
    default:
      return (
        <Placeholder
          project={project}
          title="Operational surface not embedded — use GitHub or deploy a web target."
        />
      );
  }
}
