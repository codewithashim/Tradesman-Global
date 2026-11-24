/** Fallback while search params resolve and results load. Mirrors the directory layout to avoid shift. */
export function CandidateDirectorySkeleton() {
  return (
    <div aria-hidden className="flex animate-pulse flex-col gap-10">
      <div className="h-14 rounded-full bg-card shadow-soft ring-1 ring-border/70" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        <div className="hidden h-[560px] rounded-3xl bg-card ring-1 ring-border/70 lg:block" />
        <div className="flex flex-col gap-6">
          <div className="h-9 w-56 rounded-full bg-muted" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[26rem] overflow-hidden rounded-3xl bg-card ring-1 ring-border/70">
                <div className="h-28 bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
