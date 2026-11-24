/**
 * View models for homepage sections. The homepage composes data from other
 * features; the route maps their records into these shapes so this feature
 * stays independent of their internals.
 */

export interface HomepageStats {
  profiles: number;
  trades: number;
  destinations: number;
  districts: number;
}
