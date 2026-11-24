/** Fallback while search params resolve and results load. Mirrors the directory layout to avoid shift. */
export function CandidateDirectorySkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-10 lg:gap-12">
      <div className="flex flex-col gap-4">
        <div className="h-16 rounded-[1.75rem] bg-card shadow-[0_24px_60px_-20px_rgb(7_29_53/0.35)] ring-1 ring-border/70" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-10 w-32 shrink-0 animate-pulse rounded-full bg-card ring-1 ring-border" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[19rem_1fr] xl:gap-10">
        <div className="hidden h-[640px] animate-pulse rounded-[1.75rem] bg-card ring-1 ring-border/70 lg:block" />
        <div className="flex flex-col gap-6">
          <div className="h-12 w-64 animate-pulse rounded-full bg-muted" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[30rem] overflow-hidden rounded-[1.75rem] bg-card ring-1 ring-border/70">
                <div className="h-32 animate-pulse bg-muted" />
                <div className="flex flex-col gap-3 p-5">
                  <div className="-mt-12 size-16 rounded-2xl bg-muted ring-4 ring-card" />
                  <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
                  <div className="mt-2 h-20 animate-pulse rounded-2xl bg-muted/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
