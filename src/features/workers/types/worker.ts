import type { Candidate } from "@/features/candidates";

/**
 * A worker's full public profile: the directory record (Candidate) plus the
 * detail only shown on the profile page. Mirrors a future
 * `GET /workers/:slug` response.
 */

export interface WorkExperience {
  id: string;
  role: string;
  employer: string;
  location: string;
  /** "YYYY-MM" */
  startDate: string;
  /** "YYYY-MM", or null if current. */
  endDate: string | null;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  /** Null until real uploads exist (Phase 2); UI renders a placeholder. */
  imageUrl: string | null;
  location?: string;
  year?: number;
}

export interface VideoResume {
  /** Null until real uploads exist (Phase 2); UI renders a placeholder. */
  url: string | null;
  posterUrl: string | null;
  durationSeconds: number;
}

export interface WorkerProfileDetails {
  bio: string;
  workHistory: WorkExperience[];
  portfolio: PortfolioItem[];
  videoResume: VideoResume | null;
  /** ISO 8601 */
  memberSince: string;
}

export type WorkerProfile = Candidate & WorkerProfileDetails;
