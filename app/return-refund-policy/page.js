import { buildMetadata } from "../../lib/seo";
import { BUSINESS } from "../../lib/constants";

export const metadata = buildMetadata({
  title: "Return & Refund Policy",
  description: `Return and refund policy for ${BUSINESS.name}.`,
  path: "/return-refund-policy",
});

export default function ReturnRefundPage() {
  return (
    <article>
      <h1 style={{ color: "var(--text)", fontSize: 28, marginBottom: 8 }}>Return &amp; Refund Policy</h1>
      <p style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 24 }}>
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      {/* Written directly from the specific policy you gave me — not a
          generic template. Still worth a quick legal read-through since
          this affects money changing hands, but the substance here is
          yours, not invented. */}
      <div style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
        <h2 style={sectionStyle}>No Returns — Replacement Only</h2>
        <p>
          We do not offer returns for refund on PCB boards purchased from{" "}
          {BUSINESS.name}. If a board you purchased is faulty, we offer a
          <strong> replacement</strong>, subject to the conditions below.
        </p>

        <h2 style={sectionStyle}>Conditions for Replacement</h2>
        <p>A board is eligible for replacement only if all of the following are true:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>The board is <strong>not physically broken or cracked</strong>.</li>
          <li style={{ marginBottom: 8 }}>The board shows <strong>no signs of water damage</strong>.</li>
          <li style={{ marginBottom: 8 }}>The board has <strong>not been short-circuited</strong> or damaged by incorrect wiring/installation.</li>
        </ul>
        <p>
          If a board shows any of the above, it is not eligible for
          replacement, since this indicates damage occurred after the board
          left our hands rather than a manufacturing or repair fault on our
          part.
        </p>

        <h2 style={sectionStyle}>How to Request a Replacement</h2>
        <p>
          Contact us directly at{" "}
          {BUSINESS.phone && <a href={`tel:${BUSINESS.phone}`} style={{ color: "var(--pc-gold)" }}>{BUSINESS.phone}</a>}
          {" "}with your purchase details and a description of the fault. We'll
          inspect the board to confirm it meets the conditions above before
          processing a replacement.
        </p>

        <h2 style={sectionStyle}>Repaired Boards</h2>
        <p>
          Boards that come to us for repair (rather than purchased new from
          us) are covered under the warranty terms discussed at the time of
          repair, not this replacement policy — contact us for the specific
          terms that applied to your repair.
        </p>

        <h2 style={sectionStyle}>Questions</h2>
        <p>
          If you're unsure whether your situation qualifies, contact us
          before sending anything back — we're happy to talk through it
          first.
        </p>
      </div>
    </article>
  );
}

const sectionStyle = { color: "var(--text)", fontSize: 17, marginTop: 28, marginBottom: 8 };
