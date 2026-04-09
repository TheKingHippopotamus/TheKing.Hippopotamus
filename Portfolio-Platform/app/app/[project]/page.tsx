import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, githubRepoUrl } from "@/lib/projects";
import { ProjectEmbed } from "@/components/project/ProjectEmbed";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

type Props = { params: Promise<{ project: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project: slug } = await params;
  const p = getProjectBySlug(slug);
  return { title: p?.name ?? "Project" };
}

export default async function FullAppPage({ params }: Props) {
  const { project: slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="flex min-h-[calc(100vh-3rem)] flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 bg-card/30 px-3 py-2">
        <Link
          href={`/station/${project.station}?p=${project.slug}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "font-mono text-xs",
          )}
        >
          ← Workspace
        </Link>
        <span className="font-mono text-sm text-foreground">{project.name}</span>
        <Link
          href={githubRepoUrl(project.githubRepo)}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "ml-auto font-mono text-xs",
          )}
        >
          GitHub
        </Link>
      </div>
      <div className="min-h-0 flex-1 p-2 md:p-4">
        <ProjectEmbed
          project={project}
          className="h-[calc(100vh-7rem)] w-full rounded-md border border-border bg-black"
        />
      </div>
    </div>
  );
}
