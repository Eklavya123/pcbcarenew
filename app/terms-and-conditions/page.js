import { buildMetadata } from "../../lib/seo";
import { BUSINESS } from "../../lib/constants";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `Terms and conditions for ${BUSINESS.name}.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <article>
      <h1 style={{ color: "var(--text)", fontSize: 28, marginBottom: 8 }}>Terms &amp; Conditions</h1>
      <p style={{ color: "var(--subtext)", fontSize: 12, marginBottom: 24 }}>
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      {/*
        IMPORTANT: this is a reasonable starting draft, not legal advice.
        I'm not a lawyer, and terms like this are legally binding on your
        customers — have this reviewed by someone qualified before treating
        it as final, especially the liability and pricing sections.
      */}
      <div style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: 15 }}>
        <h2 style={sectionStyle}>1. About These Terms</h2>
        <p>
          These terms govern your use of this website and the repair and sales
          services offered by {BUSINESS.name} ("we", "us", "our"), located at{" "}
          {BUSINESS.address}. By using this website or our services, you agree
          to these terms.
        </p>

        <h2 style={sectionStyle}>2. Our Services</h2>
        <p>
          We provide PCB (printed circuit board) repair and replacement
          services for air conditioners, washing machines, refrigerators, and
          microwaves, and we sell PCB boards and related parts.
        </p>

        <h2 style={sectionStyle}>3. Repair Estimates &amp; Pricing</h2>
        <p>
          Repair costs are estimated after inspecting the device or board.
          Final pricing may differ from an initial estimate if additional
          faults are found during repair. We will inform you before carrying
          out work that exceeds the original estimate.
        </p>

        <h2 style={sectionStyle}>4. Turnaround Time</h2>
        <p>
          Repair timelines vary depending on the fault, parts availability,
          and whether the item is dropped off in person or sent by courier.
          We'll give you a specific estimate for your repair when you contact
          us.
        </p>

        <h2 style={sectionStyle}>5. Courier-Based Repairs</h2>
        <p>
          For customers outside Jabalpur, we accept boards sent by courier
          for repair and return them the same way. You are responsible for
          adequately packaging the item to prevent damage in transit; we are
          not responsible for damage that occurs during shipping to us.
        </p>

        <h2 style={sectionStyle}>6. Warranty</h2>
        <p>
          Repaired boards and boards purchased from us come with a service
          warranty. Contact us directly for the exact warranty period and
          terms applicable to your specific repair or purchase.
        </p>

        <h2 style={sectionStyle}>7. Limitation of Liability</h2>
        <p>
          While we take care in diagnosing and repairing every board, we are
          not liable for pre-existing damage to the appliance unrelated to
          the board itself, or for issues arising from misuse, water damage,
          or electrical faults outside the board after the repair or sale is
          complete.
        </p>

        <h2 style={sectionStyle}>8. Returns &amp; Refunds</h2>
        <p>
          See our separate{" "}
          <a href="/return-refund-policy" style={{ color: "var(--pc-gold)" }}>
            Return &amp; Refund Policy
          </a>{" "}
          for full details.
        </p>

        <h2 style={sectionStyle}>9. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of our
          services after changes are posted means you accept the updated
          terms.
        </p>

        <h2 style={sectionStyle}>10. Governing Law</h2>
        <p>
          These terms are governed by the laws of India, with courts in
          Jabalpur, Madhya Pradesh having jurisdiction over any disputes.
        </p>

        <h2 style={sectionStyle}>11. Contact</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          {BUSINESS.phone && <a href={`tel:${BUSINESS.phone}`} style={{ color: "var(--pc-gold)" }}>{BUSINESS.phone}</a>}
          {" "}or visit us at {BUSINESS.address}.
        </p>
      </div>
    </article>
  );
}

const sectionStyle = { color: "var(--text)", fontSize: 17, marginTop: 28, marginBottom: 8 };
