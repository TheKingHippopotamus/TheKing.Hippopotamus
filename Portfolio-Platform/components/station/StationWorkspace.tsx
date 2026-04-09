"use client";

import { useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProjectEntry, StationSlug } from "@/types/project";
import { getStation } from "@/lib/stations";
import { ProjectEmbed } from "@/components/project/ProjectEmbed";
import { ProjectMeta } from "@/components/project/ProjectMeta";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function StationWorkspace({
  slug,
  projects,
}: {
  slug: StationSlug;
  projects: ProjectEntry[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const param = searchParams.get("p");

  const defaultSlug = projects[0]?.slug;
  const activeSlug = useMemo(() => {
    if (param && projects.some((p) => p.slug === param)) return param;
    return defaultSlug;
  }, [param, projects, defaultSlug]);

  const active = projects.find((p) => p.slug === activeSlug) ?? projects[0];

  useEffect(() => {
    if (!defaultSlug) return;
    const valid = Boolean(param && projects.some((p) => p.slug === param));
    if (!valid) {
      const next = new URLSearchParams(searchParams.toString());
      next.set("p", defaultSlug);
      router.replace(`?${next.toString()}`, { scroll: false });
    }
  }, [param, defaultSlug, projects, router, searchParams]);

  const station = getStation(slug);

  if (!active) {
    return (
      <div className="p-6 font-mono text-sm text-muted-foreground">
        No projects in this station yet.
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col lg:flex-row">
      <aside className="w-full shrink-0 border-b border-border lg:w-56 lg:border-b-0 lg:border-r">
        <div className="border-b border-border/60 p-3">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Station
          </div>
          <div className="text-sm font-semibold">{station?.title}</div>
        </div>
        <ScrollArea className="h-[160px] lg:h-[calc(100vh-8rem)]">
          <nav className="flex flex-row gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-x-visible">
            {projects.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => {
                  const next = new URLSearchParams(searchParams.toString());
                  next.set("p", p.slug);
                  router.push(`?${next.toString()}`, { scroll: false });
                }}
                className={cn(
                  "whitespace-nowrap rounded-md px-3 py-2 text-left text-xs transition-colors lg:whitespace-normal",
                  p.slug === active.slug
                    ? "bg-[var(--kh-green)]/15 text-[var(--kh-green)]"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                )}
              >
                {p.name}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <section className="min-w-0 flex-1 p-3 lg:p-4">
        <ProjectEmbed project={active} />
      </section>
      <aside className="hidden w-[min(100%,380px)] shrink-0 xl:block">
        <ProjectMeta project={active} />
      </aside>
    </div>
  );
}
