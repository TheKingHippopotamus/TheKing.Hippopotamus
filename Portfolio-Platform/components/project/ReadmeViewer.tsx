"use client";

import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Skeleton } from "@/components/ui/skeleton";

export function ReadmeViewer({ repo }: { repo: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["readme", repo],
    queryFn: async () => {
      const res = await fetch(
        `/api/readme?repo=${encodeURIComponent(repo)}`,
      );
      if (!res.ok) throw new Error("readme");
      return res.text();
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-2 p-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <p className="p-2 text-xs text-muted-foreground">
        README unavailable (private repo or rate limit).
      </p>
    );
  }

  return (
    <div className="prose prose-invert max-w-none p-2 text-xs prose-headings:text-foreground prose-a:text-[var(--kh-green)]">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
    </div>
  );
}
