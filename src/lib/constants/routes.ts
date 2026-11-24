/** Single source of truth for app URLs. Features build links through these helpers. */
export const routes = {
  home: "/",
  findCandidates: "/find-candidates",
  /** Candidate directory pre-filtered by trade and/or country slug. */
  findCandidatesFor: (filters: { trade?: string; country?: string; experience?: string }) => {
    const params = new URLSearchParams();
    if (filters.trade) params.set("trade", filters.trade);
    if (filters.country) params.set("country", filters.country);
    if (filters.experience) params.set("experience", filters.experience);
    const query = params.toString();
    return query ? `/find-candidates?${query}` : "/find-candidates";
  },
  tradeCategories: "/trade-categories",
  /** Homepage section anchor until a dedicated destinations page exists. */
  destinations: "/#destinations",
  howItWorks: "/how-it-works",
  login: "/login",
  register: "/register",
  trade: (slug: string) => `/trade/${slug}`,
  country: (slug: string) => `/country/${slug}`,
  worker: (slug: string) => `/worker/${slug}`,
} as const;
