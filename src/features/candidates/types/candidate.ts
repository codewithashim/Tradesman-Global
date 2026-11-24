/**
 * Candidate = the public, directory-facing view of a worker.
 * Related entities are embedded as small `{ slug, name }` refs, the way an API
 * response would return them, so cards render without cross-feature lookups.
 */

export interface EntityRef {
  slug: string;
  name: string;
}

export type CandidateAvailability = "immediate" | "within-1-month" | "within-3-months";

/** Moderation state. Only `approved` candidates appear in the public directory. */
export type CandidateStatus = "approved" | "pending" | "revision-requested" | "rejected";

export interface Candidate {
  id: string;
  slug: string;
  fullName: string;
  headline: string;
  trade: EntityRef;
  yearsOfExperience: number;
  nationality: string;
  /** Home district in Bangladesh, e.g. "Cumilla". */
  district: string;
  /** Where the candidate is right now — home district or abroad. */
  currentLocation: string;
  /** Destination countries the candidate is willing to work in. */
  preferredDestinations: EntityRef[];
  skills: string[];
  certifications: string[];
  languages: string[];
  availability: CandidateAvailability;
  hasVideoResume: boolean;
  isVerified: boolean;
  portfolioItemCount: number;
  status: CandidateStatus;
  /** ISO 8601 timestamp. */
  updatedAt: string;
}

export type ExperienceBand = "0-2" | "3-5" | "6-10" | "10+";

export type CandidateSort = "recommended" | "experience" | "recent";

export interface CandidateFilters {
  query: string;
  trade: string | null;
  country: string | null;
  experience: ExperienceBand | null;
  availability: CandidateAvailability | null;
  videoOnly: boolean;
  sort: CandidateSort;
  page: number;
}
