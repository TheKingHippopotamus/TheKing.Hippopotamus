import { STATIONS } from "@/lib/stations";
import { StationCard } from "@/components/dashboard/StationCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { PROJECTS } from "@/lib/projects";

export default function HomePage() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-[1400px] space-y-8 p-4 md:p-6">
      <header className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--kh-green)]">
          Live operations
        </p>
        <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight md:text-4xl">
          Command Center
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Not a project gallery — a working surface. Jump into stations, run
          embedded tools, and wire your deploys through the Next.js BFF on
          Vercel.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Stations
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {STATIONS.map((s, i) => (
              <StationCard key={s.slug} station={s} index={i} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Signals
          </h2>
          <ActivityFeed />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Featured projects
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li
              key={p.slug}
              className="rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-sm"
            >
              <a
                className="font-medium text-[var(--kh-green)] hover:underline"
                href={`/station/${p.station}?p=${encodeURIComponent(p.slug)}`}
              >
                {p.name}
              </a>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {p.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
