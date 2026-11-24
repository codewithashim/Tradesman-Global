// Public API of the candidates feature. Import from "@/features/candidates" only.

export type {
  Candidate,
  CandidateAvailability,
  CandidateFilters,
  CandidateSort,
  CandidateStatus,
  EntityRef,
  ExperienceBand,
} from "./types/candidate";

export {
  searchCandidates,
  getSimilarCandidates,
  getFeaturedCandidates,
  getCandidateCountsByTrade,
  getDirectoryStats,
  type DirectoryStats,
} from "./services/candidate-service";
export { availabilityLabels, experienceOptions } from "./utils/candidate-options";

export { CandidateCard } from "./components/candidate-card";
export { ExperienceMeter } from "./components/experience-meter";
export { CandidateDirectory } from "./components/candidate-directory";
export { CandidateDirectorySkeleton } from "./components/candidate-directory-skeleton";
export { CandidateDirectoryHero } from "./components/candidate-directory-hero";
