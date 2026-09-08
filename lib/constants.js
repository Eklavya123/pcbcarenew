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

// WhatsApp click-to-chat link. Defaults to the same number as
// NEXT_PUBLIC_BUSINESS_PHONE (stripped to digits, with country code) unless
// a separate WhatsApp Business number is set — some businesses use a
// different number for WhatsApp than their listed landline/phone.
const waDigits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || BUSINESS.phone || "").replace(/[^\d]/g, "");
export const WHATSAPP_URL = waDigits
  ? `https://wa.me/${waDigits}?text=${encodeURIComponent("Hi, I'd like to ask about a PCB repair.")}`
  : "";


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

// Product categories for the "Buy PCBs" section on the homepage. Each
// `image` path is where a real product photo goes — drop a file at that
// exact path in /public/products/ and it appears automatically, no code
// change needed. Until then, ProductCategoryCards renders a placeholder box
// instead of a broken image.
export const PRODUCT_CATEGORIES = [
  {
    name: "Indoor PCB (Inverter & Non-Inverter)",
    slug: "indoor-ac-pcb",
    image: "/products/indoor-ac-pcb.jpg",
    description:
      "Indoor unit control boards for split AC systems, covering both inverter and non-inverter models. Manages fan speed, temperature display, and communication with the outdoor unit.",
  },
  {
    name: "Outdoor PCB",
    slug: "outdoor-ac-pcb",
    image: "/products/outdoor-ac-pcb.jpg",
    description:
      "Outdoor unit control boards for split AC systems, including compressor control and power modules (IPM) for inverter models.",
  },
  {
    name: "Top Load Washing Machine PCB (Inverter & Non-Inverter)",
    slug: "top-load-washing-machine-pcb",
    image: "/products/top-load-washing-machine-pcb.jpg",
    description:
      "Control boards for top load washing machines, covering both inverter and non-inverter motor types. Handles wash cycle timing, spin control, and water level sensing.",
  },
  {
    name: "Front Load Washing Machine PCB (Inverter & Non-Inverter)",
    slug: "front-load-washing-machine-pcb",
    image: "/products/front-load-washing-machine-pcb.jpg",
    description:
      "Control boards for front load washing machines, covering both inverter and non-inverter motor types. Manages drum rotation, cycle sequencing, and door lock control.",
  },
  {
    name: "Microwave PCB",
    slug: "microwave-pcb",
    image: "/products/microwave-pcb.jpg",
    description:
      "Control boards for solo, grill, and convection microwaves. Handles power level control, timer functions, and safety interlocks.",
  },
  {
    name: "Refrigerator PCB (Inverter & Non-Inverter)",
    slug: "refrigerator-pcb",
    image: "/products/refrigerator-pcb.jpg",
    description:
      "Control boards for single-door, double-door, and side-by-side refrigerators, covering both inverter and non-inverter compressor types. Manages compressor cycling, defrost timing, and temperature control.",
  },
];
