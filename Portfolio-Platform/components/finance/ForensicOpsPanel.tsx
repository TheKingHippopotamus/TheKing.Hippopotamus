"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { githubRepoUrl } from "@/lib/projects";

async function fetchBff() {
  const res = await fetch("/api/projects/forensic-analysis");
  return res.json() as Promise<Record<string, unknown>>;
}

export function ForensicOpsPanel() {
  const { data } = useQuery({
    queryKey: ["project-bff", "forensic-analysis"],
    queryFn: fetchBff,
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="border-border/80">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-sm">
            XBRL / Arelle operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Wire <code className="rounded bg-muted px-1">PROJECT_API_FORENSIC_ANALYSIS</code>{" "}
            to your ForensicAnalysis or Arelle-MCP service for live filings,
            validation, and diff views.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">
              Arelle-MCP
            </Badge>
            <Badge variant="secondary" className="text-[10px]">
              BFF
            </Badge>
          </div>
          <Link
            href={githubRepoUrl("ForensicAnalysis")}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "font-mono text-xs")}
          >
            ForensicAnalysis repo
          </Link>
        </CardContent>
      </Card>
      <Card className="border-border/80">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-sm">BFF / API snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="max-h-[280px] overflow-auto rounded-md border border-border/60 bg-background/60 p-3 font-mono text-[10px] text-muted-foreground">
            {JSON.stringify(data, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
