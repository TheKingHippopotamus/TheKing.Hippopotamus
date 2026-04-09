/**
 * Public site origin for metadata, sitemap, robots.
 * Order: NEXT_PUBLIC_SITE_URL → VERCEL_URL (auto on Vercel) → production default.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }
  return "https://the-king-hippopotamus.vercel.app";
}
