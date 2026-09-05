// Single source of truth for site-wide values, reading from env (see
// .env.example). Business data below is pulled directly from the real
// ElectronicsStore JSON-LD already live in the existing app's index.html —
// not invented.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pcbcare.in";
export const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.pcbcare.in";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

export const BUSINESS = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "PCB Care",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "",
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
  hours: process.env.NEXT_PUBLIC_BUSINESS_HOURS || "",
  lat: process.env.NEXT_PUBLIC_BUSINESS_LAT || "",
  lng: process.env.NEXT_PUBLIC_BUSINESS_LNG || "",
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  gbpUrl: process.env.NEXT_PUBLIC_GBP_URL || "",
  tagline: "Professional PCB Sales and Service",
};

// TODO: replace with the real list of Jabalpur localities you serve —
// placeholder shape only.
export const SERVICE_AREAS = [
  // { name: "Wright Town", slug: "wright-town" },
];

export const SERVICES = [
  { name: "AC PCB Repair", slug: "ac-pcb-repair", icon: "❄️", color: "#00bcd4" },
  { name: "Washing Machine PCB Repair", slug: "washing-machine-pcb-repair", icon: "🌀", color: "#4caf50" },
  { name: "Refrigerator PCB Repair", slug: "refrigerator-pcb-repair", icon: "🧊", color: "#2196f3" },
  { name: "Microwave PCB Repair", slug: "microwave-pcb-repair", icon: "📡", color: "#ffd700" },
];
