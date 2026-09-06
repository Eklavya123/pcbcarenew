// Uses Places API (New) — Place Details. This is Google's current
// officially supported way to pull real reviews/rating; there is no way to
// get real Google reviews without it (scraping a profile page isn't
// reliable and isn't allowed by Google's terms).
//
// Needed in Vercel env vars (NOT prefixed with NEXT_PUBLIC_ — this key must
// never reach the browser bundle):
//   GOOGLE_PLACES_API_KEY  — from Google Cloud Console, Places API (New) enabled
//   GOOGLE_PLACE_ID        — your business's specific Place ID (not the GMB URL)
//
// Long revalidate window (24h) is deliberate — Places API billing is
// per-request beyond Google's free monthly credit, and reviews don't change
// often enough to justify fetching more frequently than that.
const REVALIDATE = 60 * 60 * 24;

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.rating) return null;

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      mapsUrl: data.googleMapsUri,
      // Google's API caps this at 5 reviews, chosen by Google's own
      // "relevance" ranking — there's no way to fetch more via this API.
      reviews: (data.reviews || []).map((r) => ({
        author: r.authorAttribution?.displayName || "Google user",
        rating: r.rating,
        text: r.text?.text || "",
        relativeTime: r.relativePublishTimeDescription || "",
      })),
    };
  } catch {
    return null;
  }
}
