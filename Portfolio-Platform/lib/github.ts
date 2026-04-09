import type { GitHubEvent, GitHubRepo } from "@/types/github";

const API = "https://api.github.com";

function authHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchUserRepos(
  username: string,
  opts?: { perPage?: number },
): Promise<GitHubRepo[]> {
  const perPage = opts?.perPage ?? 30;
  const url = `${API}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`;
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`GitHub repos error: ${res.status}`);
  }
  return (await res.json()) as GitHubRepo[];
}

export async function fetchUserEvents(
  username: string,
  opts?: { perPage?: number },
): Promise<GitHubEvent[]> {
  const perPage = opts?.perPage ?? 20;
  const url = `${API}/users/${encodeURIComponent(username)}/events/public?per_page=${perPage}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    return [];
  }
  return (await res.json()) as GitHubEvent[];
}

export async function fetchReadmeRaw(
  owner: string,
  repo: string,
): Promise<string | null> {
  const url = `${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`;
  const res = await fetch(url, {
    headers: {
      ...authHeaders(),
      Accept: "application/vnd.github.raw",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.text();
}

export async function fetchDefaultBranch(
  owner: string,
  repo: string,
): Promise<string> {
  const url = `${API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  const res = await fetch(url, {
    headers: authHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return "main";
  const data = (await res.json()) as { default_branch?: string };
  return data.default_branch ?? "main";
}

export async function fetchRawRepoFile(
  owner: string,
  repo: string,
  path: string,
): Promise<string | null> {
  const branch = await fetchDefaultBranch(owner, repo);
  const raw = `https://raw.githubusercontent.com/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${path}`;
  const res = await fetch(raw, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.text();
}
