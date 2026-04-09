"use client";

import { useQuery } from "@tanstack/react-query";
import type { GitHubEvent } from "@/types/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

async function fetchEvents(): Promise<GitHubEvent[]> {
  const res = await fetch("/api/github/events?per_page=20");
  if (!res.ok) return [];
  return res.json();
}

function summarize(ev: GitHubEvent): string {
  if (ev.type === "PushEvent" && ev.payload?.commits?.length) {
    const m = ev.payload.commits[0]?.message ?? "";
    return m.split("\n")[0].slice(0, 80);
  }
  return ev.type.replace("Event", "");
}

export function ActivityFeed() {
  const { data, isLoading } = useQuery({
    queryKey: ["github-events"],
    queryFn: fetchEvents,
  });

  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-2">
        <CardTitle className="font-mono text-sm tracking-wide">
          Activity feed
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[280px] pr-3">
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading events…</p>
          )}
          {!isLoading && (!data || data.length === 0) && (
            <p className="text-sm text-muted-foreground">
              No public events returned (normal for some accounts). Commits
              still sync via repos API.
            </p>
          )}
          <ul className="space-y-3">
            {data?.map((ev) => (
              <li
                key={ev.id}
                className="rounded-md border border-border/50 bg-background/40 p-2 text-xs"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {ev.type.replace("Event", "")}
                  </Badge>
                  <span className="text-muted-foreground">
                    {new Date(ev.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 font-mono text-[11px] text-foreground">
                  {ev.repo?.name}
                </div>
                <div className="text-muted-foreground">{summarize(ev)}</div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
