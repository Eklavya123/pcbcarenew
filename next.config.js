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
    ];
  },
};

module.exports = nextConfig;
