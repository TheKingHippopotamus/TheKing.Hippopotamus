"use client";

import { useQuery } from "@tanstack/react-query";
import type { GitHubRepo } from "@/types/github";
import { motion } from "framer-motion";

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch("/api/github/repos?per_page=12");
  if (!res.ok) throw new Error("repos");
  return res.json();
}

export function StatusTicker() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-repos-ticker"],
    queryFn: fetchRepos,
  });

  const line =
    !data || isError
      ? "GitHub feed offline — set GITHUB_TOKEN on Vercel for higher limits · BFF: /api/github/repos"
      : data
          .filter((r) => !r.fork)
          .slice(0, 8)
          .map(
            (r) =>
              `${r.name} · ${r.language ?? "?"} · ${new Date(r.pushed_at).toLocaleDateString()}`,
          )
          .join("   ·   ");

  return (
    <div className="relative h-7 overflow-hidden rounded-md border border-border/60 bg-muted/20">
      <motion.div
        className="absolute inset-y-0 flex items-center whitespace-nowrap font-mono text-[11px] text-muted-foreground"
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          duration: isLoading ? 0 : 45,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="pr-16 text-[var(--kh-green)]">LIVE</span>
        {isLoading ? "Syncing repositories…" : line}
      </motion.div>
    </div>
  );
}
