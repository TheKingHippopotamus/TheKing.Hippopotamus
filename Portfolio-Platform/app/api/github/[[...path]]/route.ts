import { NextResponse } from "next/server";
import { GITHUB_OWNER } from "@/lib/projects";

const API = "https://api.github.com";

function isAllowedPath(path: string): boolean {
  const u = `users/${GITHUB_OWNER}`;
  const r = `repos/${GITHUB_OWNER}/`;
  return (
    path === u ||
    path.startsWith(`${u}/`) ||
    path.startsWith(r) ||
    path.startsWith(`repos/${GITHUB_OWNER}?`) // not used; query on our side
  );
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path: segments } = await context.params;
  if (!segments?.length) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  const subPath = segments.join("/");
  if (!isAllowedPath(subPath)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const incoming = new URL(request.url);
  const target = new URL(`${API}/${subPath}`);
  incoming.searchParams.forEach((v, k) => target.searchParams.set(k, v));

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(target.toString(), {
    headers,
    next: { revalidate: 120 },
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "application/json",
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
    },
  });
}
