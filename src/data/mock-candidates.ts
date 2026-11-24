import type { Candidate, CandidateAvailability, CandidateStatus, EntityRef } from "@/features/candidates";

/**
 * Mock candidate records (Bangladeshi skilled workers) — replaced by the API in Phase 2.
 * Trade/country refs mirror the slugs in the trades and countries features,
 * as a denormalized API response would. All people are fictional.
 */

const trade = {
  mason: { slug: "mason", name: "Mason" },
  carpenter: { slug: "carpenter", name: "Carpenter" },
  steelFixer: { slug: "steel-fixer", name: "Steel Fixer" },
  scaffolder: { slug: "scaffolder", name: "Scaffolder" },
  electrician: { slug: "electrician", name: "Electrician" },
  plumber: { slug: "plumber", name: "Plumber" },
  hvac: { slug: "hvac-technician", name: "HVAC Technician" },
  pipeFitter: { slug: "pipe-fitter", name: "Pipe Fitter" },
  welder: { slug: "welder", name: "Welder" },
  fabricator: { slug: "fabricator", name: "Steel Fabricator" },
  painter: { slug: "painter", name: "Painter" },
  tiler: { slug: "tiler", name: "Tiler" },
  plasterer: { slug: "plasterer", name: "Plasterer" },
  equipment: { slug: "heavy-equipment-operator", name: "Heavy Equipment Operator" },
  crane: { slug: "crane-operator", name: "Crane Operator" },
  heavyDriver: { slug: "heavy-vehicle-driver", name: "Heavy Vehicle Driver" },
  lightDriver: { slug: "light-vehicle-driver", name: "Light Vehicle Driver" },
  chef: { slug: "chef", name: "Chef & Cook" },
  garments: { slug: "garments-machine-operator", name: "Garments Machine Operator" },
} satisfies Record<string, EntityRef>;

const country = {
  sa: { slug: "saudi-arabia", name: "Saudi Arabia" },
  ae: { slug: "united-arab-emirates", name: "United Arab Emirates" },
  qa: { slug: "qatar", name: "Qatar" },
  ro: { slug: "romania", name: "Romania" },
  it: { slug: "italy", name: "Italy" },
  pt: { slug: "portugal", name: "Portugal" },
  sg: { slug: "singapore", name: "Singapore" },
  my: { slug: "malaysia", name: "Malaysia" },
} satisfies Record<string, EntityRef>;

interface Seed {
  name: string;
  trade: EntityRef;
  years: number;
  district: string;
  /** Defaults to "<district>, Bangladesh". */
  location?: string;
  headline: string;
  destinations: EntityRef[];
  skills: string[];
  certifications?: string[];
  languages?: string[];
  availability?: CandidateAvailability;
  video?: boolean;
  verified?: boolean;
  portfolio?: number;
  status?: CandidateStatus;
  updatedAt: string;
}

function toSlug(name: string, index: number): string {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${1000 + index}`;
}

const seeds: Seed[] = [
  /* 0 */ { name: "Rahim Uddin", trade: trade.welder, years: 9, district: "Chattogram", headline: "6G coded pipe welder — refinery and pipeline experience", destinations: [country.sa, country.qa, country.sg], skills: ["SMAW", "GTAW", "6G pipe", "Carbon steel"], certifications: ["ASME IX 6G qualification"], languages: ["Bengali", "English", "Arabic (basic)"], availability: "immediate", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-20T09:00:00Z" },
  /* 1 */ { name: "Md. Kamal Hossain", trade: trade.electrician, years: 12, district: "Cumilla", location: "Riyadh, Saudi Arabia", headline: "Industrial electrician — MV panels, testing and commissioning", destinations: [country.sa, country.ae, country.qa], skills: ["MV/LV panels", "Testing & commissioning", "Cable termination", "Fault finding"], certifications: ["BTEB electrical trade certificate"], languages: ["Bengali", "English", "Arabic"], availability: "within-1-month", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-18T09:00:00Z" },
  /* 2 */ { name: "Abdul Karim", trade: trade.mason, years: 11, district: "Noakhali", headline: "Block and plaster mason for high-rise residential", destinations: [country.ae, country.sa, country.my], skills: ["Block work", "Plastering", "Setting out", "Reading drawings"], languages: ["Bengali", "Hindi", "Arabic (basic)"], availability: "immediate", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-21T09:00:00Z" },
  /* 3 */ { name: "Mizanur Rahman", trade: trade.hvac, years: 6, district: "Sylhet", headline: "AC technician — split, VRF installation and servicing", destinations: [country.qa, country.ae, country.sa], skills: ["Split units", "VRF systems", "Refrigerant handling", "Ducting"], certifications: ["RAC servicing certificate"], languages: ["Bengali", "English"], availability: "within-1-month", video: true, verified: true, portfolio: 3, updatedAt: "2026-11-10T09:00:00Z" },
  /* 4 */ { name: "Shahidul Islam", trade: trade.plumber, years: 8, district: "Brahmanbaria", location: "Doha, Qatar", headline: "Plumber and pipe fitter — hotels and residential towers", destinations: [country.qa, country.ae, country.ro], skills: ["PPR piping", "Sanitary fixtures", "Drainage", "Pressure testing"], languages: ["Bengali", "Hindi", "English (basic)"], availability: "within-3-months", video: true, verified: true, portfolio: 5, updatedAt: "2026-11-15T09:00:00Z" },
  /* 5 */ { name: "Jahangir Alam", trade: trade.heavyDriver, years: 10, district: "Tangail", location: "Dammam, Saudi Arabia", headline: "Heavy vehicle driver — trailers, tippers and transit mixers", destinations: [country.sa, country.ae], skills: ["Trailer", "Tipper", "Transit mixer", "Vehicle inspection"], certifications: ["GCC heavy driving licence"], languages: ["Bengali", "Arabic", "Hindi"], availability: "within-1-month", video: false, verified: true, portfolio: 1, updatedAt: "2026-11-02T09:00:00Z" },
  /* 6 */ { name: "Nazmul Hasan", trade: trade.chef, years: 7, district: "Sylhet", headline: "Line cook — South Asian, Arabic and continental menus", destinations: [country.ae, country.it, country.pt], skills: ["Tandoor", "Arabic grill", "Bulk cooking", "Food hygiene (HACCP)"], certifications: ["Food safety certificate"], languages: ["Bengali", "English", "Italian (basic)"], availability: "immediate", video: true, verified: true, portfolio: 6, updatedAt: "2026-11-19T09:00:00Z" },
  /* 7 */ { name: "Rokeya Begum", trade: trade.garments, years: 9, district: "Gazipur", headline: "Senior sewing operator — knit and woven lines", destinations: [country.ro, country.my, country.it], skills: ["Single-needle", "Overlock / flatlock", "Quality checks", "Line balancing"], certifications: ["Garments skills certificate"], languages: ["Bengali"], availability: "immediate", video: true, verified: true, portfolio: 3, updatedAt: "2026-11-12T09:00:00Z" },
  /* 8 */ { name: "Sumon Mia", trade: trade.electrician, years: 6, district: "Narsingdi", headline: "Building electrician — conduit, wiring and DB installation", destinations: [country.ae, country.ro, country.pt], skills: ["Conduit & wiring", "DB installation", "Lighting", "Testing"], certifications: ["BTEB electrical trade certificate"], languages: ["Bengali", "English (basic)"], availability: "immediate", video: true, verified: true, portfolio: 5, updatedAt: "2026-11-22T09:00:00Z" },
  /* 9 */ { name: "Habibur Rahman", trade: trade.tiler, years: 5, district: "Feni", headline: "Tile fitter — porcelain, marble and bathrooms", destinations: [country.ae, country.qa, country.my], skills: ["Large-format tiles", "Marble", "Waterproofing"], languages: ["Bengali", "Hindi"], availability: "immediate", video: true, verified: false, portfolio: 6, updatedAt: "2026-10-28T09:00:00Z" },
  /* 10 */ { name: "Anwar Hossain", trade: trade.equipment, years: 13, district: "Chandpur", location: "Jeddah, Saudi Arabia", headline: "Excavator and loader operator — road and earthworks", destinations: [country.sa, country.qa], skills: ["Excavator", "Wheel loader", "Grader", "Daily machine checks"], certifications: ["Heavy equipment operator licence"], languages: ["Bengali", "Arabic", "Urdu (basic)"], availability: "within-3-months", video: true, verified: true, portfolio: 2, updatedAt: "2026-11-08T09:00:00Z" },
  /* 11 */ { name: "Rafiqul Islam", trade: trade.carpenter, years: 10, district: "Mymensingh", headline: "Shuttering carpenter — slabs, columns and table formwork", destinations: [country.sa, country.sg, country.ro], skills: ["Shuttering", "Table formwork", "Joinery"], languages: ["Bengali", "Hindi"], availability: "within-1-month", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-14T09:00:00Z" },
  /* 12 */ { name: "Shafiqul Alam", trade: trade.steelFixer, years: 8, district: "Kishoreganj", headline: "Steel fixer — rafts, slabs and columns from BBS", destinations: [country.sg, country.sa, country.my], skills: ["Bar-bending schedules", "Rebar fixing", "Cover checks"], certifications: ["Construction skills test (CoreTrade)"], languages: ["Bengali", "English (basic)"], availability: "immediate", video: false, verified: true, portfolio: 2, updatedAt: "2026-11-05T09:00:00Z" },
  /* 13 */ { name: "Monir Hossain", trade: trade.lightDriver, years: 6, district: "Munshiganj", headline: "Light vehicle driver — staff transport and deliveries", destinations: [country.ae, country.qa, country.pt], skills: ["Staff transport", "Delivery routes", "GPS navigation", "Vehicle checks"], certifications: ["Bangladesh professional driving licence"], languages: ["Bengali", "English (basic)"], availability: "immediate", video: true, verified: false, portfolio: 0, updatedAt: "2026-11-17T09:00:00Z" },
  /* 14 */ { name: "Delwar Hossain", trade: trade.pipeFitter, years: 14, district: "Lakshmipur", location: "Abu Dhabi, UAE", headline: "Senior pipe fitter — oil & gas and fire-fighting systems", destinations: [country.ae, country.qa, country.sg], skills: ["Reading isometrics", "Fit-up", "Hydro testing", "Fire-fighting piping"], certifications: ["Pipe fitter trade certificate"], languages: ["Bengali", "English", "Arabic (basic)"], availability: "within-3-months", video: true, verified: true, portfolio: 3, updatedAt: "2026-11-23T09:00:00Z" },
  /* 15 */ { name: "Alamgir Kabir", trade: trade.welder, years: 4, district: "Narayanganj", headline: "MIG/TIG welder — stainless steel and structural", destinations: [country.ro, country.my, country.qa], skills: ["GMAW", "GTAW", "3G/4G", "Stainless steel"], languages: ["Bengali", "English (basic)"], availability: "within-1-month", video: true, verified: false, portfolio: 3, updatedAt: "2026-11-09T09:00:00Z" },
  /* 16 */ { name: "Shamim Ahmed", trade: trade.painter, years: 9, district: "Faridpur", headline: "Painter — interior finishing and industrial coatings", destinations: [country.qa, country.sa, country.pt], skills: ["Spray painting", "Surface preparation", "Protective coatings"], languages: ["Bengali", "Hindi"], availability: "immediate", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-21T12:00:00Z" },
  /* 17 */ { name: "Taslima Akter", trade: trade.garments, years: 5, district: "Narayanganj", headline: "Overlock and flatlock operator — knitwear", destinations: [country.ro, country.my], skills: ["Overlock / flatlock", "Knitwear", "Production targets"], languages: ["Bengali"], availability: "within-1-month", video: false, verified: true, portfolio: 2, updatedAt: "2026-11-03T09:00:00Z" },
  /* 18 */ { name: "Sohel Rana", trade: trade.scaffolder, years: 7, district: "Jashore", headline: "System and tube-and-fitting scaffolder", destinations: [country.qa, country.sg], skills: ["Tube & fitting", "Cuplock", "Working at height"], certifications: ["Working at Height certificate"], languages: ["Bengali", "English (basic)"], availability: "immediate", video: false, verified: true, portfolio: 2, updatedAt: "2026-11-06T09:00:00Z" },
  /* 19 */ { name: "Billal Hossain", trade: trade.chef, years: 12, district: "Moulvibazar", location: "Dubai, UAE", headline: "Head cook — hotel buffet and labour-camp catering", destinations: [country.ae, country.sa, country.my], skills: ["Bulk cooking", "Kitchen supervision", "Menu costing", "Food hygiene (HACCP)"], certifications: ["Culinary diploma", "Food safety certificate"], languages: ["Bengali", "English", "Arabic (basic)"], availability: "within-3-months", video: true, verified: true, portfolio: 5, updatedAt: "2026-11-24T09:00:00Z" },
  /* 20 */ { name: "Firoz Ahmed", trade: trade.fabricator, years: 8, district: "Bogura", headline: "Steel fabricator — workshop fit-up and site assembly", destinations: [country.sa, country.ro], skills: ["Marking out", "Fit-up", "Fabrication drawings"], languages: ["Bengali", "Hindi"], availability: "within-1-month", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-11T09:00:00Z" },
  /* 21 */ { name: "Kawsar Ahmed", trade: trade.plasterer, years: 6, district: "Habiganj", headline: "Plasterer and gypsum ceiling installer", destinations: [country.ae, country.pt], skills: ["Cement render", "Gypsum ceilings", "Drywall"], languages: ["Bengali"], availability: "immediate", video: true, verified: true, portfolio: 4, updatedAt: "2026-11-16T09:00:00Z" },
  /* 22 */ { name: "Mosharraf Hossain", trade: trade.crane, years: 11, district: "Rajshahi", location: "Riyadh, Saudi Arabia", headline: "Tower and mobile crane operator", destinations: [country.sa, country.ae], skills: ["Tower crane", "Mobile crane", "Load charts"], certifications: ["Third-party crane operator certificate"], languages: ["Bengali", "Arabic", "English (basic)"], availability: "within-3-months", video: true, verified: true, portfolio: 2, updatedAt: "2026-11-04T09:00:00Z" },
  /* 23 */ { name: "Rasel Mahmud", trade: trade.hvac, years: 3, district: "Khulna", headline: "Junior AC technician — installation and gas charging", destinations: [country.my, country.qa], skills: ["Split units", "Gas charging", "Preventive maintenance"], languages: ["Bengali", "English (basic)"], availability: "immediate", video: true, verified: false, portfolio: 2, updatedAt: "2026-11-01T09:00:00Z" },
  /* 24 */ { name: "Nurul Amin", trade: trade.mason, years: 15, district: "Cumilla", headline: "Foreman mason — leads gangs of 10+", destinations: [country.sa, country.qa, country.it], skills: ["Block work", "Gang supervision", "Reading drawings"], languages: ["Bengali", "Arabic", "Hindi"], availability: "within-1-month", video: true, verified: true, portfolio: 5, updatedAt: "2026-11-13T09:00:00Z" },
  /* 25 */ { name: "Arif Hossain", trade: trade.lightDriver, years: 4, district: "Barishal", headline: "Driver — pickups and vans, clean licence record", destinations: [country.my, country.ae], skills: ["Delivery routes", "Vehicle checks", "Logbooks"], languages: ["Bengali"], availability: "immediate", video: false, verified: false, portfolio: 0, updatedAt: "2026-10-25T09:00:00Z" },
  /* 26 */ { name: "Imran Hossain", trade: trade.welder, years: 12, district: "Rangpur", location: "Johor Bahru, Malaysia", headline: "Structural and pipe welder — shipyard and plant", destinations: [country.my, country.sg, country.ro], skills: ["SMAW", "FCAW", "Structural steel", "6G pipe"], certifications: ["Welder qualification test (6G)"], languages: ["Bengali", "Malay (basic)", "English (basic)"], availability: "within-1-month", video: true, verified: true, portfolio: 6, updatedAt: "2026-11-24T12:00:00Z" },
  /* 27 */ { name: "Selim Reza", trade: trade.electrician, years: 3, district: "Jashore", headline: "Assistant electrician — residential wiring", destinations: [country.my, country.ro], skills: ["Residential wiring", "Lighting", "Socket installation"], languages: ["Bengali"], availability: "immediate", video: false, verified: false, portfolio: 1, updatedAt: "2026-11-02T12:00:00Z" },

  // Not yet approved — must never appear in the public directory.
  /* 28 */ { name: "Pending Example", trade: trade.welder, years: 5, district: "Dhaka", headline: "Awaiting review", destinations: [country.ae], skills: ["SMAW"], status: "pending", updatedAt: "2026-11-24T12:00:00Z" },
  /* 29 */ { name: "Revision Example", trade: trade.mason, years: 3, district: "Tangail", headline: "Profile needs changes", destinations: [country.qa], skills: ["Block work"], status: "revision-requested", updatedAt: "2026-11-23T12:00:00Z" },
];

export const mockCandidates: Candidate[] = seeds.map((seed, index) => ({
  id: `cand_${1000 + index}`,
  slug: toSlug(seed.name, index),
  fullName: seed.name,
  headline: seed.headline,
  trade: seed.trade,
  yearsOfExperience: seed.years,
  nationality: "Bangladesh",
  district: seed.district,
  currentLocation: seed.location ?? `${seed.district}, Bangladesh`,
  preferredDestinations: seed.destinations,
  skills: seed.skills,
  certifications: seed.certifications ?? [],
  languages: seed.languages ?? ["Bengali"],
  availability: seed.availability ?? "within-1-month",
  hasVideoResume: seed.video ?? false,
  isVerified: seed.verified ?? false,
  portfolioItemCount: seed.portfolio ?? 0,
  status: seed.status ?? "approved",
  updatedAt: seed.updatedAt,
}));
