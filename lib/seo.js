import { SITE_URL, BUSINESS } from "./constants";

// ── Metadata builders (Next.js App Router <head> API) ───────────────────────
// generateMetadata() in each page uses these. This is what actually fixes
// the core problem: these tags land in the server-rendered HTML on the
// FIRST response, not injected by JS after the page loads.

export function buildMetadata({ title, description, path = "/", image }) {
  const url = `${SITE_URL}${path}`;
  return {
    // { absolute } bypasses the root layout's title template ("%s | PCB
    // Care"). Every title passed in here (whether hardcoded on a static
    // page or admin-authored meta_title from Supabase) is already a
    // complete, fully-branded title — without `absolute`, Next.js appended
    // the site name a second time, producing bugs like
    // "... | PCB Care | PCB Care" on admin-authored pages that already
    // included the brand suffix themselves.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS.name,
      images: image ? [{ url: image }] : undefined,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// ── JSON-LD builders ─────────────────────────────────────────────────────
// Each returns a plain object — pages embed it via:
//   <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />

export function localBusinessSchema() {
  const sameAs = [BUSINESS.facebookUrl, BUSINESS.instagramUrl, BUSINESS.gbpUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    // ElectronicsStore (a Store subtype) — matches the type already used in
    // the existing app's index.html, more specific than generic LocalBusiness.
    "@type": "ElectronicsStore",
    name: BUSINESS.name,
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: BUSINESS.phone || undefined,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address || undefined,
      addressLocality: "Jabalpur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    geo:
      BUSINESS.lat && BUSINESS.lng
        ? { "@type": "GeoCoordinates", latitude: Number(BUSINESS.lat), longitude: Number(BUSINESS.lng) }
        : undefined,
    openingHoursSpecification: BUSINESS.hours
      ? [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "11:00",
            closes: "21:00",
          },
        ]
      : undefined,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    // Deliberately no aggregateRating here. The existing app's index.html has
    // a hardcoded ratingValue/reviewCount that isn't backed by any real
    // query anywhere in the codebase — reviews are scoped per-product and
    // per-blog-post, there's no sitewide aggregation. A fabricated or
    // unverifiable rating in structured data risks a Google manual action.
    // Wire this up for real (e.g. pulled from Google Business Profile) or
    // leave it out — don't reintroduce the static placeholder.
  };
}

export function breadcrumbSchema(items) {
  // items: [{ name, path }] in order, path relative (e.g. "/blog")
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function blogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.meta_description || undefined,
    image: post.featured_image || undefined,
    datePublished: post.published_at || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: { "@type": "Organization", name: BUSINESS.name },
  };
}

// Ported exactly from StaticPage's schema logic in App.js — including the
// reasoning behind it: a page with schema_type "service" uses Service +
// areaServed to legitimately target multiple nearby towns on ONE page,
// instead of spinning up near-duplicate pages per city, which Google treats
// as spammy "doorway pages." Don't build separate city pages as a shortcut
// to more indexed URLs — use this pattern instead.
export function serviceSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: (page.meta_description || page.excerpt || "").slice(0, 160),
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      image: `${SITE_URL}/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
      url: SITE_URL,
    },
    areaServed: (page.service_areas || []).map((city) => ({ "@type": "City", name: city })),
    url: `${SITE_URL}/${page.slug}`,
  };
}

export function webPageSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: (page.meta_description || page.excerpt || "").slice(0, 160),
    image: page.featured_image ? [page.featured_image] : undefined,
    dateModified: page.updated_at || page.published_at || page.created_at || undefined,
    url: `${SITE_URL}/${page.slug}`,
  };
}

export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

