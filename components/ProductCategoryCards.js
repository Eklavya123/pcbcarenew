import Image from "next/image";
import fs from "fs";
import path from "path";
import { PRODUCT_CATEGORIES, SHOP_URL } from "../lib/constants";

// Checks whether the real image file has actually been added yet — this
// runs at build time (Server Component), so it's free at runtime. Until you
// drop a file at the exact path listed for each category, that card shows
// a clean placeholder instead of a broken image icon.
function imageExists(publicPath) {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}

export default function ProductCategoryCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
      {PRODUCT_CATEGORIES.map((p) => {
        const hasImage = imageExists(p.image);
        return (
          <div key={p.slug} className="pcb-card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", width: "100%", height: 170, background: "var(--card)" }}>
              {hasImage ? (
                <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} />
              ) : (
                // Placeholder — replace by adding a real photo at the exact
                // path shown here (also visible in lib/constants.js).
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--subtext)",
                    fontSize: 12,
                    textAlign: "center",
                    padding: 12,
                    border: "1px dashed var(--border)",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>🖼️</div>
                  Add photo at
                  <code style={{ color: "var(--pc-gold)", marginTop: 4, wordBreak: "break-all" }}>
                    /public{p.image}
                  </code>
                </div>
              )}
            </div>
            <div style={{ padding: 18, display: "flex", flexDirection: "column", flex: 1 }}>
              <h3 style={{ color: "var(--text)", fontSize: 15, marginBottom: 8 }}>{p.name}</h3>
              <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>
                {p.description}
              </p>
              <a
                href={`${SHOP_URL}/shop`}
                className="pcb-btn-primary"
                style={{ textAlign: "center", padding: "10px 18px", fontSize: 14 }}
              >
                Buy PCB
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
