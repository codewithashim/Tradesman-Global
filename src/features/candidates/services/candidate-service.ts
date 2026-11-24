import { mockCandidates } from "@/data/mock-candidates";
import type { Paginated } from "@/types/common";
import type { Candidate, CandidateFilters, CandidateSort } from "../types/candidate";
import { CANDIDATES_PAGE_SIZE, experienceRanges } from "../utils/candidate-options";

/*
 * Data access for the public candidate directory. In Phase 2 this becomes a
 * single API call (`GET /candidates?…`) doing the same filtering server-side;
 * the signature stays the same.
 */

/** Public directory search. Only approved candidates are ever returned. */
export async function searchCandidates(filters: CandidateFilters): Promise<Paginated<Candidate>> {
  "use cache";
  const tokens = filters.query.toLowerCase().split(/\s+/).filter(Boolean);
  const range = filters.experience ? experienceRanges[filters.experience] : null;

  const matches = mockCandidates.filter((candidate) => {
    if (candidate.status !== "approved") return false;
    if (filters.trade && candidate.trade.slug !== filters.trade) return false;
    if (filters.country && !candidate.preferredDestinations.some((d) => d.slug === filters.country)) return false;
    if (filters.availability && candidate.availability !== filters.availability) return false;
    if (filters.videoOnly && !candidate.hasVideoResume) return false;
    if (range && (candidate.yearsOfExperience < range.min || candidate.yearsOfExperience > range.max)) return false;
    if (tokens.length > 0) {
      const haystack = searchableText(candidate);
      if (!tokens.every((token) => haystack.includes(token))) return false;
    }
    return true;
  });

  const sorted = matches.toSorted(comparators[filters.sort]);
  const pageSize = CANDIDATES_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const page = Math.min(filters.page, pageCount);

  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize),
    total: sorted.length,
    page,
    pageSize,
    pageCount,
  };
}

/** Other approved candidates in the same trade, best matches first. */
export async function getSimilarCandidates(candidateId: string, tradeSlug: string, limit = 3): Promise<Candidate[]> {
  "use cache";
  return mockCandidates
    .filter((c) => c.status === "approved" && c.id !== candidateId && c.trade.slug === tradeSlug)
    .toSorted(comparators.recommended)
    .slice(0, limit);
}

/** Strongest public profiles (verified, video resume, portfolio) for showcases. */
export async function getFeaturedCandidates(limit = 5): Promise<Candidate[]> {
  "use cache";
  return mockCandidates
    .filter((c) => c.status === "approved" && c.isVerified && c.hasVideoResume && c.portfolioItemCount > 0)
    .toSorted((a, b) => b.portfolioItemCount + b.yearsOfExperience - (a.portfolioItemCount + a.yearsOfExperience))
    .slice(0, limit);
}

/** Number of public profiles per trade slug. */
export async function getCandidateCountsByTrade(): Promise<Record<string, number>> {
  "use cache";
  const counts: Record<string, number> = {};
  for (const c of mockCandidates) {
    if (c.status === "approved") counts[c.trade.slug] = (counts[c.trade.slug] ?? 0) + 1;
  }
  return counts;
}

export interface DirectoryStats {
  profiles: number;
  withVideo: number;
  districts: number;
}

export async function getDirectoryStats(): Promise<DirectoryStats> {
  "use cache";
  const approved = mockCandidates.filter((c) => c.status === "approved");
  return {
    profiles: approved.length,
    withVideo: approved.filter((c) => c.hasVideoResume).length,
    districts: new Set(approved.map((c) => c.district)).size,
  };
}

function searchableText(candidate: Candidate): string {
  return [
    candidate.fullName,
    candidate.headline,
    candidate.trade.name,
    candidate.nationality,
    candidate.currentLocation,
    ...candidate.skills,
    ...candidate.certifications,
  ]
    .join(" ")
    .toLowerCase();
}

/** Profile completeness signals employers value most. */
function recommendationScore(candidate: Candidate): number {
  return (
    (candidate.isVerified ? 3 : 0) +
    (candidate.hasVideoResume ? 2 : 0) +
    (candidate.portfolioItemCount > 0 ? 1 : 0) +
    (candidate.availability === "immediate" ? 1 : 0)
  );
}

const byRecent = (a: Candidate, b: Candidate) => b.updatedAt.localeCompare(a.updatedAt);

const comparators: Record<CandidateSort, (a: Candidate, b: Candidate) => number> = {
  recommended: (a, b) => recommendationScore(b) - recommendationScore(a) || byRecent(a, b),
  experience: (a, b) => b.yearsOfExperience - a.yearsOfExperience || byRecent(a, b),
  recent: byRecent,
};
