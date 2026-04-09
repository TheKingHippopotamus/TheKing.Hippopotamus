import { notFound } from "next/navigation";
import { Suspense } from "react";
import { isStationSlug } from "@/lib/stations";
import { getProjectsByStation } from "@/lib/projects";
import { StationWorkspace } from "@/components/station/StationWorkspace";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isStationSlug(slug)) return { title: "Station" };
  const titles: Record<string, string> = {
    financial: "Financial Intelligence",
    agents: "AI Agent Operations",
    "dev-tools": "Developer Tools",
    infra: "Infrastructure & OSS",
    labs: "Labs & Experiments",
  };
  return { title: titles[slug] ?? slug };
}

export default async function StationPage({ params }: Props) {
  const { slug } = await params;
  if (!isStationSlug(slug)) notFound();
  const projects = getProjectsByStation(slug);

  return (
    <Suspense
      fallback={
        <div className="p-6 font-mono text-sm text-muted-foreground">
          Loading station…
        </div>
      }
    >
      <StationWorkspace slug={slug} projects={projects} />
    </Suspense>
  );
}
