"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

async function fetchBff() {
  const res = await fetch("/api/projects/semantic-watchdog-agents");
  return res.json() as Promise<Record<string, unknown>>;
}

const MOCK_AGENTS = [
  { id: "watchdog-1", name: "semantic-watchdog", status: "idle", last: "—" },
  { id: "watchdog-2", name: "diff-sentinel", status: "running", last: "2m" },
  { id: "watchdog-3", name: "policy-guard", status: "degraded", last: "12m" },
];

export function AgentStatusDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["project-bff", "semantic-watchdog-agents"],
    queryFn: fetchBff,
  });

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <Card className="border-border/80 lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-sm">Agent mesh</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[220px] pr-3">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th className="pb-2 font-mono">Agent</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Last tick</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_AGENTS.map((a) => (
                  <tr key={a.id} className="border-t border-border/40">
                    <td className="py-2 font-mono">{a.name}</td>
                    <td className="py-2">
                      <Badge
                        variant="outline"
                        className={
                          a.status === "running"
                            ? "border-[var(--kh-green)]/50 text-[var(--kh-green)]"
                            : a.status === "degraded"
                              ? "border-[var(--kh-amber)]/50 text-[var(--kh-amber)]"
                              : ""
                        }
                      >
                        {a.status}
                      </Badge>
                    </td>
                    <td className="py-2 text-muted-foreground">{a.last}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card className="border-border/80">
        <CardHeader className="pb-2">
          <CardTitle className="font-mono text-sm">BFF payload</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <p className="text-xs text-muted-foreground">Loading…</p>
          )}
          {!isLoading && (
            <pre className="max-h-[220px] overflow-auto rounded-md border border-border/60 bg-background/60 p-2 font-mono text-[10px] text-muted-foreground">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
