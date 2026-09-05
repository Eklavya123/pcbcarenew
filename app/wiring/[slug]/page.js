import { notFound } from "next/navigation";
import Image from "next/image";
import { buildMetadata, breadcrumbSchema } from "../../../lib/seo";
import { getWiringDiagramBySlug, getWiringDiagrams, getShopProductsByIds } from "../../../lib/supabase";
import { SHOP_URL } from "../../../lib/constants";
import JsonLd from "../../../components/JsonLd";

export async function generateStaticParams() {
  const diagrams = await getWiringDiagrams().catch(() => []);
  return diagrams.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const diagram = await getWiringDiagramBySlug(params.slug);
  if (!diagram) return {};
  // NOTE: wiring_diagrams has no meta_title/meta_description columns today
  // (unlike blog_posts and pages) — title/description are auto-derived
  // here. If you want per-diagram control over the search snippet later,
  // add those two columns to wiring_diagrams and this picks them up with
  // one line changed, same pattern as the blog page.
  return buildMetadata({
    title: `${diagram.title} Wiring Diagram`,
    description: diagram.description?.slice(0, 155),
    path: `/wiring/${diagram.slug}`,
    image: diagram.image_url,
  });
}

export default async function WiringDiagramPage({ params }) {
  const diagram = await getWiringDiagramBySlug(params.slug);
  if (!diagram) notFound();

  const linkedProducts = await getShopProductsByIds(diagram.linked_product_ids);

  const schema = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Wiring Diagrams", path: "/wiring" },
    { name: diagram.title, path: `/wiring/${diagram.slug}` },
  ]);

  return (
    <article>
      <JsonLd data={schema} />
      <div style={{ color: "#ffd700", fontSize: 13, marginBottom: 8 }}>{diagram.category}</div>
      <h1 style={{ color: "#ffffff", fontSize: 26, marginBottom: 16 }}>{diagram.title}</h1>
      {diagram.image_url && (
        <div style={{ position: "relative", width: "100%", maxWidth: 700, height: 500, marginBottom: 20 }}>
          <Image src={diagram.image_url} alt={diagram.title} fill style={{ objectFit: "contain" }} />
        </div>
      )}
      {diagram.description && (
        <p style={{ color: "#b0b8d0", lineHeight: 1.7 }}>{diagram.description}</p>
      )}
      {diagram.tips && diagram.tips.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2 style={{ color: "#ffffff", fontSize: 16, marginBottom: 10 }}>Tips</h2>
          <ul style={{ color: "#b0b8d0", lineHeight: 1.8 }}>
            {diagram.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {linkedProducts.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ color: "#ffffff", fontSize: 16, marginBottom: 10 }}>Related Parts</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {linkedProducts.map((p) => (
              <a
                key={p.id}
                href={`${SHOP_URL}/shop/product/${p.slug}`}
                style={{
                  background: "#1a1f2e",
                  border: "1px solid #2a3050",
                  color: "#ffffff",
                  padding: "10px 16px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                }}
              >
                {p.name} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
