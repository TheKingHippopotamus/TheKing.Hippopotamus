import { NextResponse } from "next/server";
import { fetchReadmeRaw } from "@/lib/github";
import { GITHUB_OWNER } from "@/lib/projects";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const owner = searchParams.get("owner") ?? GITHUB_OWNER;
  const repo = searchParams.get("repo");
  if (!repo) {
    return NextResponse.json({ error: "repo required" }, { status: 400 });
  }
  const text = await fetchReadmeRaw(owner, repo);
  if (text === null) {
    return NextResponse.json({ error: "readme not found" }, { status: 404 });
  }
  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
