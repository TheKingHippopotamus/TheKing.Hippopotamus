import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/projects";

export const revalidate = 60;

function envKeyForSlug(slug: string): string {
  return `PROJECT_API_${slug.replace(/-/g, "_").toUpperCase()}`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return NextResponse.json({ error: "unknown project" }, { status: 404 });
  }
  const baseUrl = process.env[envKeyForSlug(slug)];
  if (!baseUrl) {
    return NextResponse.json({
      ok: true,
      mode: "bff_stub",
      project: {
        slug: project.slug,
        name: project.name,
        githubRepo: project.githubRepo,
        embed: project.embed,
      },
      message:
        "Set PROJECT_API_<SLUG> in Vercel env to proxy this project's backend.",
    });
  }
  try {
    const target = new URL(baseUrl);
    const res = await fetch(target.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 30 },
    });
    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "proxy error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
