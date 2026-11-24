import { mockCandidates } from "@/data/mock-candidates";
import { getMockWorkerProfileDetails } from "@/data/mock-worker-profiles";
import type { WorkerProfile } from "../types/worker";

/*
 * Public worker profiles. Phase 2: `GET /workers/:slug` — same signature.
 * Only approved workers are public; anything else resolves to null (→ 404).
 */

export async function getWorkerProfileBySlug(slug: string): Promise<WorkerProfile | null> {
  "use cache";
  const candidate = mockCandidates.find((c) => c.slug === slug && c.status === "approved");
  if (!candidate) return null;
  return { ...candidate, ...getMockWorkerProfileDetails(candidate) };
}

export async function getPublicWorkerSlugs(): Promise<string[]> {
  "use cache";
  return mockCandidates.filter((c) => c.status === "approved").map((c) => c.slug);
}
