import { NextResponse } from "next/server";
import { fetchRawRepoFile } from "@/lib/github";
import { GITHUB_OWNER, HTML_PROXY_ALLOWLIST } from "@/lib/projects";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") ?? "index.html";
  if (!repo || !HTML_PROXY_ALLOWLIST.has(repo)) {
    return NextResponse.json({ error: "not allowed" }, { status: 403 });
  }
  if (path.includes("..") || path.startsWith("/")) {
    return NextResponse.json({ error: "invalid path" }, { status: 400 });
  }
  const html = await fetchRawRepoFile(GITHUB_OWNER, repo, path);
  if (html === null) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
