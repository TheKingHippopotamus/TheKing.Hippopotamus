import { NextResponse } from "next/server";
import { fetchUserEvents } from "@/lib/github";
import { GITHUB_OWNER } from "@/lib/projects";

export const revalidate = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") ?? GITHUB_OWNER;
  const perPage = Math.min(
    30,
    Math.max(1, Number(searchParams.get("per_page") ?? 15)),
  );
  try {
    const events = await fetchUserEvents(user, { perPage });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json([]);
  }
}
