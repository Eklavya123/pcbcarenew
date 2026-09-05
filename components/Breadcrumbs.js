import Link from "next/link";

// items: [{ name, path }] — same shape passed to breadcrumbSchema() in
// lib/seo.js, so the visible trail and the JSON-LD always match. Internal
// links like these are how Google actually discovers and crawls page
// hierarchy — sitemap.xml is a secondary signal, links are the primary one.
export default function Breadcrumbs({ items }) {
  if (!items || items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 20, fontSize: 13 }}>
      {items.map((item, i) => (
        <span key={item.path}>
          {i > 0 && <span style={{ color: "var(--border)", margin: "0 8px" }}>/</span>}
          {i === items.length - 1 ? (
            <span style={{ color: "var(--muted)" }}>{item.name}</span>
          ) : (
            <Link href={item.path} style={{ color: "var(--pc-gold)", textDecoration: "none" }}>
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
