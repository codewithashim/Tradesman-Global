import type { SiteImageKey } from "@/config/images";

/** Editorial content for the homepage. Plain data so it can move to a CMS later. */

export interface PopularTrade {
  /** Trade slug the card links to (must exist in the trades feature). */
  tradeSlug: string;
  title: string;
  description: string;
  image: SiteImageKey;
}

export const popularTrades: PopularTrade[] = [
  { tradeSlug: "welder", title: "Welding & Fabrication", description: "Coded pipe and structural welders, fabricators and fitters.", image: "welding" },
  { tradeSlug: "electrician", title: "Electrical Technician", description: "Building and industrial electricians, panels and testing.", image: "electrical" },
  { tradeSlug: "plumber", title: "Plumbing & Pipe Fitting", description: "Water, drainage and process piping.", image: "plumbing" },
  { tradeSlug: "hvac-technician", title: "HVAC / AC Technician", description: "Split, VRF and chiller installation and servicing.", image: "hvac" },
  { tradeSlug: "mason", title: "Mason & Tile Fitter", description: "Block work, plaster, tiling and stone.", image: "masonry" },
  { tradeSlug: "heavy-vehicle-driver", title: "Heavy & Light Driver", description: "Trailers, tippers, vans and staff transport.", image: "driver" },
  { tradeSlug: "chef", title: "Chef & Hospitality", description: "Hotel, restaurant and catering kitchens.", image: "chef" },
  { tradeSlug: "garments-machine-operator", title: "Garments & Factory", description: "Sewing operators and production staff.", image: "garments" },
];

/** Related trade slugs counted together on a popular-trade card. */
export const popularTradeGroups: Record<string, string[]> = {
  welder: ["welder", "fabricator"],
  plumber: ["plumber", "pipe-fitter"],
  mason: ["mason", "tiler", "plasterer"],
  "heavy-vehicle-driver": ["heavy-vehicle-driver", "light-vehicle-driver"],
};

/** Home districts shown in the hero trust strip. */
export const featuredDistricts = [
  "Dhaka",
  "Chattogram",
  "Cumilla",
  "Sylhet",
  "Noakhali",
  "Tangail",
  "Brahmanbaria",
  "Mymensingh",
  "Narsingdi",
  "Khulna",
  "Rajshahi",
  "Barishal",
];
