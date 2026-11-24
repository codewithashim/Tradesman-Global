import type { Candidate } from "@/features/candidates";
import type { PortfolioItem, WorkerProfileDetails } from "@/features/workers";

/**
 * Mock profile details, keyed by candidate id — replaced by the API in Phase 2.
 * Three profiles are written out in full; every other approved candidate gets
 * details generated from their directory record so all profile pages render.
 * Media URLs are null: the UI shows placeholders until real uploads exist.
 */

const detailedProfiles: Record<string, WorkerProfileDetails> = {
  cand_1000: {
    bio: "Coded pipe welder with nine years on refinery, pipeline and power-plant projects. I hold an ASME IX 6G qualification and work to WPS on carbon steel and low-alloy pipe. I'm used to radiography-tested joints, permit-to-work systems and night shifts during shutdowns.",
    memberSince: "2025-06-14T00:00:00Z",
    videoResume: { url: null, posterUrl: null, durationSeconds: 94 },
    workHistory: [
      { id: "w1", role: "6G Pipe Welder", employer: "Eastern Refinery Ltd.", location: "Chattogram, Bangladesh", startDate: "2022-02", endDate: null, description: "Root and hot-pass welding on 2–24\" carbon steel process lines during refinery expansion. RT reject rate under 2%." },
      { id: "w2", role: "Pipe Welder", employer: "Delta Power Construction", location: "Bhola, Bangladesh", startDate: "2019-05", endDate: "2022-01", description: "Welded HP steam and feedwater piping on a 220 MW combined-cycle plant." },
      { id: "w3", role: "Welder Helper → Welder", employer: "Karnaphuli Shipyard", location: "Chattogram, Bangladesh", startDate: "2017-01", endDate: "2019-04", description: "Started as helper, qualified on SMAW plate and pipe, then structural welding of hull blocks." },
    ],
    portfolio: [
      { id: "p1", title: "6G test coupon — passed RT", description: "Qualification test piece, 6\" SCH80 carbon steel, SMAW root and fill.", imageUrl: null, year: 2023 },
      { id: "p2", title: "Process line tie-in", description: "Tie-in welds on 12\" process line during a planned shutdown.", imageUrl: null, location: "Chattogram", year: 2024 },
      { id: "p3", title: "Steam header", description: "HP steam header fabrication and welding.", imageUrl: null, location: "Bhola", year: 2021 },
      { id: "p4", title: "Pipe rack spools", description: "Shop-welded spools ready for site installation.", imageUrl: null, year: 2022 },
    ],
  },
  cand_1002: {
    bio: "Mason with eleven years on high-rise residential and hotel projects in Dubai and Dhaka. I work quickly and cleanly on block work and plaster, set out from drawings, and have led a gang of six on my last site.",
    memberSince: "2025-09-02T00:00:00Z",
    videoResume: { url: null, posterUrl: null, durationSeconds: 71 },
    workHistory: [
      { id: "w1", role: "Mason (Gang Leader)", employer: "Bashundhara Building Works", location: "Dhaka, Bangladesh", startDate: "2023-03", endDate: null, description: "Block work and internal plaster for a 14-storey residential tower; leading a gang of six." },
      { id: "w2", role: "Mason", employer: "Gulf Horizon Contracting", location: "Dubai, UAE", startDate: "2017-08", endDate: "2023-01", description: "Block and plaster work on residential and hotel projects across three two-year contracts." },
      { id: "w3", role: "Helper → Mason", employer: "Local contractor", location: "Noakhali, Bangladesh", startDate: "2015-01", endDate: "2017-06", description: "Started as a helper on residential houses and learned block laying and plastering." },
    ],
    portfolio: [
      { id: "p1", title: "Hotel lobby feature wall", description: "Curved block feature wall, plastered and ready for cladding.", imageUrl: null, location: "Dubai", year: 2022 },
      { id: "p2", title: "Tower partition walls", description: "Internal block partitions, levels 6–10.", imageUrl: null, location: "Dhaka", year: 2024 },
      { id: "p3", title: "Boundary wall", description: "Set out and built a 60 m boundary wall from drawings.", imageUrl: null, location: "Noakhali", year: 2023 },
      { id: "p4", title: "External plaster", description: "Two-coat external cement plaster on a villa.", imageUrl: null, location: "Dubai", year: 2021 },
    ],
  },
  cand_1008: {
    bio: "Building electrician with six years on residential towers and shopping complexes. I install conduit, pull cables, wire and dress distribution boards, and test circuits before handover. I'm careful with safety and keep my work neat and labelled.",
    memberSince: "2025-03-21T00:00:00Z",
    videoResume: { url: null, posterUrl: null, durationSeconds: 112 },
    workHistory: [
      { id: "w1", role: "Electrician", employer: "Meghna Electro Engineering", location: "Dhaka, Bangladesh", startDate: "2022-04", endDate: null, description: "Conduit, wiring and DB installation for a 20-storey residential project; testing before handover." },
      { id: "w2", role: "Assistant Electrician", employer: "Narsingdi Power Services", location: "Narsingdi, Bangladesh", startDate: "2020-01", endDate: "2022-03", description: "Wiring for shops and small factories; lighting and socket circuits." },
    ],
    portfolio: [
      { id: "p1", title: "Distribution board", description: "Three-phase DB wired, dressed and labelled.", imageUrl: null, location: "Dhaka", year: 2024 },
      { id: "p2", title: "Conduit run", description: "Surface conduit with neat bends in a plant room.", imageUrl: null, location: "Dhaka", year: 2023 },
      { id: "p3", title: "Apartment wiring", description: "Full apartment wiring before plaster.", imageUrl: null, year: 2023 },
      { id: "p4", title: "Lighting installation", description: "LED panel lighting in a shopping complex corridor.", imageUrl: null, location: "Narsingdi", year: 2021 },
      { id: "p5", title: "Insulation testing", description: "Insulation resistance testing of final circuits.", imageUrl: null, year: 2024 },
    ],
  },
};

function generatedDetails(candidate: Candidate): WorkerProfileDetails {
  const startYear = new Date(candidate.updatedAt).getUTCFullYear() - candidate.yearsOfExperience;
  const portfolio: PortfolioItem[] = Array.from({ length: candidate.portfolioItemCount }, (_, i) => {
    const skill = candidate.skills[i % candidate.skills.length];
    return {
      id: `p${i + 1}`,
      title: `${skill} — project ${i + 1}`,
      description: `${skill} work completed as ${candidate.trade.name.toLowerCase()}.`,
      imageUrl: null,
    };
  });

  return {
    bio: `${candidate.trade.name} from ${candidate.district}, ${candidate.nationality}, with ${candidate.yearsOfExperience} years of experience. ${candidate.headline}. Skilled in ${candidate.skills.join(", ").toLowerCase()}.`,
    memberSince: "2025-08-01T00:00:00Z",
    videoResume: candidate.hasVideoResume ? { url: null, posterUrl: null, durationSeconds: 60 } : null,
    workHistory: [
      {
        id: "w1",
        role: candidate.trade.name,
        employer: "Previous employer (details on request)",
        location: candidate.currentLocation,
        startDate: `${startYear}-01`,
        endDate: null,
        description: candidate.headline,
      },
    ],
    portfolio,
  };
}

export function getMockWorkerProfileDetails(candidate: Candidate): WorkerProfileDetails {
  return detailedProfiles[candidate.id] ?? generatedDetails(candidate);
}
