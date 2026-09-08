/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vdyyaiapyhwqnxzeujim.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Server-side 301s (not client-side JS redirects) so Googlebot — and every
  // other crawler — follows them and transfers link equity properly. These
  // cover every path that USED to exist under pcbcare.in and now only exists
  // on shop.pcbcare.in. Blog and Wiring are NOT here on purpose: they now
  // live on this domain, not the subdomain.
  async redirects() {
    const SHOP = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.pcbcare.in";
    return [
      { source: "/shop", destination: `${SHOP}/shop`, permanent: true },
      { source: "/shop/:path*", destination: `${SHOP}/shop/:path*`, permanent: true },
      { source: "/error-codes", destination: `${SHOP}/error-codes`, permanent: true },
      { source: "/find-remote", destination: `${SHOP}/find-remote`, permanent: true },
      { source: "/sensor-values", destination: `${SHOP}/sensor-values`, permanent: true },
      { source: "/part-finder", destination: `${SHOP}/part-finder`, permanent: true },
      { source: "/requests", destination: `${SHOP}/requests`, permanent: true },
      { source: "/invoices", destination: `${SHOP}/invoices`, permanent: true },

      // These were duplicate/keyword-stuffed location pages deleted from
      // the `pages` table (e.g. "ac-pcb-in-sihora-air-conditioner-pcb-at-
      // sihora-pcb-care") that likely already got indexed or linked
      // somewhere. Redirecting them to the correct canonical page preserves
      // whatever signal they'd accumulated instead of just 404ing on
      // anyone (or Google) who still has the old URL.
      { source: "/ac-appliance-pcb-repair-services-jabalpur-nearby-towns-pcb-care", destination: "/ac-pcb-repair", permanent: true },
      { source: "/return-refund-policy-pcb-care", destination: "/return-refund-policy", permanent: true },
      { source: "/washing-machine-pcb-in-sihora-pcb-care", destination: "/washing-machine-pcb-repair", permanent: true },
      { source: "/fridge-pcb-in-sihora-refrigerator-pcb-at-sihora-pcb-care", destination: "/refrigerator-pcb-repair", permanent: true },
      { source: "/ac-pcb-in-sihora-air-conditioner-pcb-at-sihora-pcb-care", destination: "/ac-pcb-repair", permanent: true },
      { source: "/washing-machine-pcb-repair-in-narsinghpur", destination: "/washing-machine-pcb-repair", permanent: true },
      { source: "/ac-pcb-repair-in-narsinghpur", destination: "/ac-pcb-repair", permanent: true },
      { source: "/fridge-pcb-repair-in-narsinghpur", destination: "/refrigerator-pcb-repair", permanent: true },
    ];
  },
};

module.exports = nextConfig;
