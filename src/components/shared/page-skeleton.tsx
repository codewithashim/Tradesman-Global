import { Container } from "@/components/ui/container";

/**
 * Loading state for detail pages (route `loading.tsx`): the dark hero stage
 * and content cards, so the layout doesn't jump when the page arrives.
 */
export function PageSkeleton() {
  return (
    <div aria-busy aria-label="Loading" className="pb-16">
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-deep sm:rounded-[2.75rem]">
          <div aria-hidden className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-primary/30 blur-[120px]" />
          <div className="relative mx-auto flex min-h-[26rem] max-w-7xl flex-col justify-end gap-4 px-5 pb-10 pt-8 sm:px-8 lg:px-10">
            <div className="mb-auto h-4 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="h-4 w-28 animate-pulse rounded-full bg-white/15" />
            <div className="h-14 w-full max-w-xl animate-pulse rounded-2xl bg-white/10 sm:h-20" />
            <div className="h-5 w-full max-w-md animate-pulse rounded-full bg-white/10" />
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/[0.07]" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Container className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
          <div className="h-64 animate-pulse rounded-[2rem] bg-card ring-1 ring-border/70" />
          <div className="h-80 animate-pulse rounded-[2rem] bg-card ring-1 ring-border/70" />
        </div>
        <div className="hidden h-96 animate-pulse rounded-[1.75rem] bg-card ring-1 ring-border/70 lg:block" />
      </Container>
    </div>
  );
}
