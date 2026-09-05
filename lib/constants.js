// Single source of truth for site-wide values. Everything here reads from
// env vars (see .env.example) so there's exactly one place to update the
// phone number, address, or hours before launch — not scattered across
// every page file.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pcbcare.in";
export const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.pcbcare.in";

export const BUSINESS = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "PCBcare",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "", // e.g. "+91XXXXXXXXXX"
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "", // e.g. "Mo-Sa 10:00-19:00"
  gbpUrl: process.env.NEXT_PUBLIC_GBP_URL || "",
  tagline: "Professional PCB Sales and Service",
};

// Fill this in with the real localities you serve inside Jabalpur before
// generating local-service pages. Kept as a plain array (not hardcoded into
// page files) so adding an area later doesn't mean touching page code.
// TODO: replace with the real list — this is a placeholder shape only.
export const SERVICE_AREAS = [
  // { name: "Wright Town", slug: "wright-town" },
  // { name: "Napier Town", slug: "napier-town" },
];

export const SERVICES = [
  { name: "AC PCB Repair", slug: "ac-pcb-repair" },
  { name: "Washing Machine PCB Repair", slug: "washing-machine-pcb-repair" },
  { name: "Refrigerator PCB Repair", slug: "refrigerator-pcb-repair" },
  { name: "Microwave PCB Repair", slug: "microwave-pcb-repair" },
];
