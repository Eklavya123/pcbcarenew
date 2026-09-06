import { BUSINESS } from "../lib/constants";

// No Google Places API involved — that required an API key + billing you
// don't have set up, so it's been removed entirely (see lib/google.js in
// git history if you ever want it back). This just builds two working
// links directly from your Place ID, which needs no key at all.
function placeUrls() {
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!placeId) return null;
  return {
    view: `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    review: `https://search.google.com/local/writereview?placeid=${placeId}`,
  };
}

export default function Testimonials() {
  const urls = placeUrls();
  if (!urls) return null;

  return (
    <section style={{ padding: "40px 0" }}>
      <h2 style={{ color: "var(--text)", fontSize: 22, marginBottom: 20 }}>
        What Customers Say
      </h2>
      <div className="pcb-card" style={{ padding: 24, textAlign: "center" }}>
        <p style={{ color: "var(--muted)", marginBottom: 16 }}>
          See real reviews for {BUSINESS.name} directly on Google, or leave one yourself.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={urls.view} target="_blank" rel="noopener noreferrer" className="pcb-btn-secondary">
            View Reviews on Google
          </a>
          <a href={urls.review} target="_blank" rel="noopener noreferrer" className="pcb-btn-primary">
            Leave a Review
          </a>
        </div>
      </div>
    </section>
  );
}
