import Link from "next/link";
import { buildMetadata } from "../../lib/seo";
import { getWiringDiagrams } from "../../lib/supabase";

export const metadata = buildMetadata({
  title: "Wiring Diagrams",
  description: "Appliance wiring diagrams for AC, washing machine, refrigerator and microwave.",
  path: "/wiring",
});

export default async function WiringIndexPage() {
  const diagrams = await getWiringDiagrams();

  const byCategory = diagrams.reduce((acc, d) => {
    (acc[d.category] = acc[d.category] || []).push(d);
    return acc;
  }, {});

  return (
    <div>
      <h1 style={{ color: "#ffffff", fontSize: 28, marginBottom: 24 }}>Wiring Diagrams</h1>
      {Object.entries(byCategory).map(([category, items]) => (
        <div key={category} style={{ marginBottom: 32 }}>
          <h2 style={{ color: "#ffd700", fontSize: 18, marginBottom: 12 }}>{category}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {items.map((item) => (
              <Link
                key={item.id}
                href={`/wiring/${item.slug}`}
                style={{
                  display: "block",
                  background: "#1a1f2e",
                  border: "1px solid #2a3050",
                  borderRadius: 10,
                  padding: 16,
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
