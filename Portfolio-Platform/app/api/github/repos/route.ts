import { NextResponse } from "next/server";
import { fetchUserRepos } from "@/lib/github";
import { GITHUB_OWNER } from "@/lib/projects";

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") ?? GITHUB_OWNER;
  const perPage = Math.min(
    100,
    Math.max(1, Number(searchParams.get("per_page") ?? 30)),
  );
  try {
    const repos = await fetchUserRepos(user, { perPage });
    return NextResponse.json(repos);
  } catch (e) {
    const message = e instanceof Error ? e.message : "GitHub error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
