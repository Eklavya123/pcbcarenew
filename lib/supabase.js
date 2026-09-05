// Read-only, server-side fetch against the same Supabase PostgREST endpoint
// shop.pcbcare.in already uses. No supabase-js client, no writes — this site
// never needs to write to these tables, only render published rows.
//
// Uses Next's fetch caching (`next: { revalidate }`) instead of client-side
// state, since these calls run at build time (SSG) and are re-run on the
// revalidate schedule (ISR) — not on every visitor's page load.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Revalidate every hour by default — content edited in the existing admin
// panel (AdminBlog / AdminPages / AdminWiring in the shop app) shows up here
// within an hour without a manual redeploy. Lower this if that's too slow,
// or wire up an on-demand revalidate API route later if you want it instant.
const DEFAULT_REVALIDATE = 3600;

export async function sbFetch(table, filter = "", { revalidate = DEFAULT_REVALIDATE } = {}) {
  if (!SB_URL || !SB_KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY — check your .env.local"
    );
  }
  const url = `${SB_URL}/rest/v1/${table}${filter}`;
  const res = await fetch(url, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` },
    next: { revalidate },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`${table} fetch failed (${res.status}): ${detail || res.statusText}`);
  }
  const raw = await res.text();
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// ── Blog ─────────────────────────────────────────────────────────────────
export function getPublishedPosts() {
  return sbFetch(
    "blog_posts",
    "?select=id,title,slug,excerpt,featured_image,published_at,tags&status=eq.published&order=published_at.desc"
  );
}

export function getPostBySlug(slug) {
  return sbFetch(
    "blog_posts",
    `?select=*&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`
  ).then((rows) => rows[0] || null);
}

// ── Static Pages (service-area / local landing pages) ──────────────────────
export function getPublishedPages() {
  return sbFetch(
    "pages",
    "?select=id,title,slug,updated_at&status=eq.published"
  );
}

export function getPageBySlug(slug) {
  return sbFetch(
    "pages",
    `?select=*&status=eq.published&slug=eq.${encodeURIComponent(slug)}&limit=1`
  ).then((rows) => rows[0] || null);
}

// ── Wiring Diagrams ──────────────────────────────────────────────────────
export function getWiringDiagrams() {
  return sbFetch("wiring_diagrams", "?select=id,category,title,slug,image_url&order=category");
}

export function getWiringDiagramBySlug(slug) {
  return sbFetch(
    "wiring_diagrams",
    `?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`
  ).then((rows) => rows[0] || null);
}

// ── Cross-links to shop.pcbcare.in ──────────────────────────────────────
// wiring_diagrams.linked_product_ids stores shop_products IDs (see
// AdminWiring in App.js) — same Supabase project, so a plain read works,
// but the resulting links point to shop.pcbcare.in since that's where the
// product pages actually live.
export function getShopProductsByIds(ids) {
  if (!ids || ids.length === 0) return Promise.resolve([]);
  return sbFetch("shop_products", `?select=id,name,slug,images&id=in.(${ids.join(",")})`);
}
