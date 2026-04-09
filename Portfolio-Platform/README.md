# King Hippopotamus — Command Center (Next.js)

חלק מהמונורפו **[TheKing.Hippopotamus](https://github.com/TheKingHippopotamus/TheKing.Hippopotamus)** — לא ריפו נפרד.

Next.js (App Router) **BFF** על **Vercel**: משטח פעולה לסטיישנים (פיננסים, סוכנים, dev-tools, infra, labs), embeds, BFF ל-GitHub, ופרוקסי לפרויקטים.

## Develop

מהשורש של המונורפו:

```bash
cd Portfolio-Platform
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy (Vercel)

1. Create a Vercel project (or let the first GitHub Actions deploy create/link one).
2. Copy [`.env.example`](./.env.example) variables into the Vercel project **Settings → Environment Variables** (especially `NEXT_PUBLIC_SITE_URL` for OG / sitemap).
3. Set `GITHUB_TOKEN` on Vercel for higher GitHub API limits from the BFF (optional but recommended).

### GitHub Actions

In the GitHub repo: **Settings → Secrets and variables → Actions**, add:

| Name | Value |
|------|--------|
| **`VERCEL`** | Vercel token ([Account → Tokens](https://vercel.com/account/tokens)) — same value as `VERCEL_TOKEN` for the CLI. |

Optional: **`VERCEL_TEAM_SLUG`** — defaults to `kinghippos-projects` if unset.

Pushes to **`main`** (monorepo root) run [`.github/workflows/deploy-vercel.yml`](../.github/workflows/deploy-vercel.yml) with **`working-directory: Portfolio-Platform`**. On Vercel, set **Root Directory** to **`Portfolio-Platform`**.

### CLI (local)

```bash
cd Portfolio-Platform
export VERCEL_TOKEN="your_token"
npx vercel deploy --prod --yes --scope kinghippos-projects
```

## Environment

See [`.env.example`](./.env.example) for `NEXT_PUBLIC_SITE_URL`, `GITHUB_TOKEN`, `PROJECT_API_*`, and `NEXT_PUBLIC_EMBED_*` iframe URLs.

## Routes

| Route | Purpose |
|--------|---------|
| `/` | Command center (stations, activity, featured projects) |
| `/station/[slug]` | Workspace with project list + embed + README |
| `/app/[project]` | Full-screen embed |
| `/terminal` | Full-page terminal (also `` ` `` toggle) |
| `/api/github/repos` | List repos (BFF) |
| `/api/github/events` | Public events (BFF) |
| `/api/github/*` | Whitelisted GitHub API proxy |
| `/api/readme` | Raw README (markdown) |
| `/api/raw-html` | Allowlisted repo HTML for iframes |
| `/api/projects/[slug]` | Stub or proxy to `PROJECT_API_*` |

## Stack

Next.js 16, React 19, Tailwind v4, shadcn/ui, TanStack Query, Zustand, Framer Motion, xterm.js, react-markdown.
