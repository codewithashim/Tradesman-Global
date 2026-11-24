import type { Country } from "../types/country";

/**
 * Mock data — replaced by an API call in Phase 2.
 * Employment notes are deliberately general; immigration rules change and
 * must be confirmed per hire with official sources.
 */
export const countries: Country[] = [
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates",
    isoCode: "AE",
    region: "Middle East",
    capital: "Abu Dhabi",
    currency: "UAE Dirham (AED)",
    summary: "Large-scale construction, hospitality and infrastructure projects.",
    overview:
      "The UAE is one of the largest employers of overseas tradespeople, with continuous demand driven by real estate, transport infrastructure, hospitality and energy projects across Dubai, Abu Dhabi and the northern emirates.",
    keySectors: ["Construction", "Facilities management", "Oil & gas", "Hospitality fit-out"],
    inDemandTradeSlugs: ["electrician", "hvac-technician", "mason", "welder", "plumber", "light-vehicle-driver", "chef"],
    employmentNotes: [
      "Workers are typically hired on employer-sponsored work permits.",
      "Employers usually arrange accommodation and transport on construction projects.",
      "Trade tests may be required on arrival for some roles.",
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Saudi Arabia",
    isoCode: "SA",
    region: "Middle East",
    capital: "Riyadh",
    currency: "Saudi Riyal (SAR)",
    summary: "Giga-projects and industrial expansion driving trade hiring.",
    overview:
      "Saudi Arabia's large development programme — new cities, transport, industrial zones and energy — has made it one of the fastest-growing destinations for skilled trade workers.",
    keySectors: ["Mega-project construction", "Petrochemicals", "Power & water", "Transport infrastructure"],
    inDemandTradeSlugs: ["welder", "pipe-fitter", "steel-fixer", "carpenter", "heavy-equipment-operator", "electrician", "heavy-vehicle-driver"],
    employmentNotes: [
      "Professional verification of trade skills may be required before visa issuance.",
      "Hiring is employer-sponsored; contract terms vary by project.",
    ],
  },
  {
    slug: "qatar",
    name: "Qatar",
    isoCode: "QA",
    region: "Middle East",
    capital: "Doha",
    currency: "Qatari Riyal (QAR)",
    summary: "Infrastructure, LNG and facilities maintenance.",
    overview:
      "Qatar continues to hire tradespeople for infrastructure, LNG expansion and the maintenance of a large portfolio of recently completed venues and buildings.",
    keySectors: ["LNG & energy", "Facilities maintenance", "Infrastructure"],
    inDemandTradeSlugs: ["pipe-fitter", "welder", "hvac-technician", "electrician", "scaffolder"],
    employmentNotes: [
      "Work permits are employer-sponsored.",
      "Energy-sector roles often require international welding or safety certifications.",
    ],
  },
  {
    slug: "romania",
    name: "Romania",
    isoCode: "RO",
    region: "Europe",
    capital: "Bucharest",
    currency: "Romanian Leu (RON)",
    summary: "EU-funded infrastructure and growing construction sector.",
    overview:
      "EU-funded motorways, rail and urban development have increased Romania's demand for overseas tradespeople, alongside an expanding residential market.",
    keySectors: ["Road & rail infrastructure", "Residential construction", "Manufacturing"],
    inDemandTradeSlugs: ["mason", "carpenter", "steel-fixer", "plasterer", "painter"],
    employmentNotes: ["Non-EU workers need a work permit and long-stay visa.", "Annual quotas apply to non-EU workers."],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    isoCode: "MY",
    region: "Asia-Pacific",
    capital: "Kuala Lumpur",
    currency: "Malaysian Ringgit (MYR)",
    summary: "Construction, manufacturing and plantation-sector demand.",
    overview:
      "Malaysia relies on foreign workers across construction and manufacturing, with demand for both general trades and certified specialists.",
    keySectors: ["Construction", "Manufacturing", "Oil & gas"],
    inDemandTradeSlugs: ["mason", "tiler", "welder", "garments-machine-operator", "chef"],
    employmentNotes: [
      "Hiring is limited to approved source countries and sectors.",
      "Employers apply for worker quotas before recruitment.",
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    isoCode: "IT",
    region: "Europe",
    capital: "Rome",
    currency: "Euro (EUR)",
    summary: "Seasonal and non-seasonal quotas for construction, hospitality and agriculture.",
    overview:
      "Italy admits non-EU workers through its annual quota system (Decreto Flussi), with demand in construction, hospitality, food processing and manufacturing across the north.",
    keySectors: ["Construction", "Hospitality", "Manufacturing", "Food processing"],
    inDemandTradeSlugs: ["mason", "electrician", "welder", "chef", "garments-machine-operator"],
    employmentNotes: [
      "Recruitment follows annual quotas; employers apply for a work authorisation (nulla osta).",
      "Basic Italian is a strong advantage on site.",
    ],
  },
  {
    slug: "portugal",
    name: "Portugal",
    isoCode: "PT",
    region: "Europe",
    capital: "Lisbon",
    currency: "Euro (EUR)",
    summary: "Construction boom and tourism-driven hospitality demand.",
    overview:
      "Portugal's construction and tourism sectors have grown quickly, creating steady demand for building trades, drivers and hospitality staff.",
    keySectors: ["Residential construction", "Tourism & hospitality", "Logistics"],
    inDemandTradeSlugs: ["carpenter", "plasterer", "painter", "chef", "light-vehicle-driver"],
    employmentNotes: [
      "Non-EU workers need a work visa backed by a job offer.",
      "Hospitality roles often peak with the tourist season.",
    ],
  },
  {
    slug: "singapore",
    name: "Singapore",
    isoCode: "SG",
    region: "Asia-Pacific",
    capital: "Singapore",
    currency: "Singapore Dollar (SGD)",
    summary: "Construction, marine and process sectors with skills-tested entry.",
    overview:
      "Singapore hires skilled foreign workers for construction, marine shipyards and process plants, with an emphasis on certified skills and safety training.",
    keySectors: ["Construction", "Marine & shipyards", "Process plants"],
    inDemandTradeSlugs: ["welder", "electrician", "pipe-fitter", "steel-fixer", "scaffolder"],
    employmentNotes: [
      "Construction workers typically need a recognised skills test before deployment.",
      "Employers apply for the work permit; quotas and levies apply.",
    ],
  },
];
