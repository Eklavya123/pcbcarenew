import { SITE_URL } from "../lib/constants";
import { getPublishedPosts, getPublishedPages, getWiringDiagrams } from "../lib/supabase";

// Next.js serves whatever this returns at /sitemap.xml automatically — no
// /api/sitemap function needed on this domain (that one stays on
// shop.pcbcare.in for its own products). This is the fix for "no sitemap.xml
// exists" from the audit: this file didn't exist before, now every published
// URL on this domain is in it, regenerated on the same revalidate schedule
// as the pages themselves.
export default async function sitemap() {
  const [posts, pages, diagrams] = await Promise.all([
    getPublishedPosts().catch(() => []),
    getPublishedPages().catch(() => []),
    getWiringDiagrams().catch(() => []),
  ]);

  const staticEntries = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/wiring`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const postEntries = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pageEntries = pages.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: p.updated_at || undefined,
    changeFrequency: "monthly",
    priority: 0.9, // local-service pages are the highest-value pages on this domain
  }));

  const diagramEntries = diagrams.map((d) => ({
    url: `${SITE_URL}/wiring/${d.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...pageEntries, ...postEntries, ...diagramEntries];
}
