"use client";

import Link from "next/link";
import type { ProjectEntry } from "@/types/project";
import { githubRepoUrl } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ReadmeViewer } from "@/components/project/ReadmeViewer";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProjectMeta({ project }: { project: ProjectEntry }) {
  const gh = githubRepoUrl(project.githubRepo);

  return (
    <div className="flex h-full flex-col border-l border-border/80 bg-card/30">
      <div className="space-y-2 border-b border-border/60 p-3">
        <h2 className="font-mono text-sm font-semibold leading-tight">
          {project.name}
        </h2>
        <p className="text-xs text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="outline" className="font-mono text-[10px]">
            {project.embed}
          </Badge>
          {project.language && (
            <Badge variant="secondary" className="text-[10px]">
              {project.language}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link
            href={`/app/${project.slug}`}
            className={cn(
              buttonVariants({ size: "sm", variant: "default" }),
              "font-mono text-xs",
            )}
          >
            Fullscreen
          </Link>
          <Link
            href={gh}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "font-mono text-xs",
            )}
          >
            Repository
          </Link>
        </div>
      </div>
      <Separator />
      <div className="min-h-0 flex-1">
        <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          README
        </div>
        <ScrollArea className="h-[min(50vh,420px)]">
          <ReadmeViewer repo={project.githubRepo} />
        </ScrollArea>
      </div>
    </div>
  );
}
