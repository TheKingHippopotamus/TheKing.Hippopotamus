"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { githubRepoUrl } from "@/lib/projects";

async function fetchBff() {
  const res = await fetch("/api/projects/hippo-equity-research");
  return res.json() as Promise<Record<string, unknown>>;
}

const TILES = [
  { label: "Watchlist", value: "12", delta: "+2 today" },
  { label: "Signals", value: "48", delta: "agents scanning" },
  { label: "Reports", value: "6", delta: "HTML + API" },
  { label: "Latency", value: "120ms", delta: "BFF round-trip" },
];

export function EquityDashboard() {
  const { data } = useQuery({
    queryKey: ["project-bff", "hippo-equity-research"],
    queryFn: fetchBff,
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TILES.map((t) => (
          <Card key={t.label} className="border-border/80 bg-card/60">
            <CardHeader className="pb-1">
              <CardTitle className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {t.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="font-mono text-2xl text-[var(--kh-green)]">
                {t.value}
              </div>
              <div className="text-xs text-muted-foreground">{t.delta}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="border-border/80">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-sm font-mono">
            Hippo Equity Research — live shell
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">embed: internal-equity</Badge>
            <Link
              href={githubRepoUrl("Hippo_Equity_ResearchPlatform")}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "font-mono text-xs",
              )}
            >
              GitHub
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1">NEXT_PUBLIC_EMBED_HIPPO_EQUITY_RESEARCH</code>{" "}
            to your deployed app URL for a full iframe, or{" "}
            <code className="rounded bg-muted px-1">PROJECT_API_HIPPO_EQUITY_RESEARCH</code>{" "}
            for JSON-driven tiles.
          </p>
          <pre className="max-h-[180px] overflow-auto rounded-md border border-border/60 bg-background/60 p-3 font-mono text-[10px] text-muted-foreground">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
