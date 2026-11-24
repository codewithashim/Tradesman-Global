import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  page: number;
  pageCount: number;
  /** Builds the URL for a given page number. */
  hrefForPage: (page: number) => string;
}

/** Page numbers to show: first, last, current ±1, with gaps as null. */
function pageWindow(page: number, pageCount: number): Array<number | null> {
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const result: Array<number | null> = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push(null);
    result.push(p);
  });
  return result;
}

const itemClass =
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-semibold tabular-nums transition-all duration-300 focus-visible:outline-2 focus-visible:outline-ring";

export function Pagination({ page, pageCount, hrefForPage }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-2 sm:justify-center">
      <PageArrow href={page > 1 ? hrefForPage(page - 1) : null} label="Previous" direction="prev">
        <ChevronLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
      </PageArrow>
      <div className="flex items-center gap-1 rounded-full bg-card p-1 shadow-soft ring-1 ring-border/70">
      {pageWindow(page, pageCount).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefForPage(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              itemClass,
              p === page ? "bg-navy text-white shadow-[0_8px_16px_-6px_rgb(7_29_53/0.6)]" : "text-navy/70 hover:bg-sky hover:text-navy",
            )}
          >
            {p}
          </Link>
        ),
      )}
      </div>
      <PageArrow href={page < pageCount ? hrefForPage(page + 1) : null} label="Next" direction="next">
        <ChevronRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
      </PageArrow>
    </nav>
  );
}

function PageArrow({ href, label, direction, children }: { href: string | null; label: string; direction: "prev" | "next"; children: ReactNode }) {
  const content = direction === "prev" ? (
    <>
      {children}
      <span className="max-sm:sr-only">{label}</span>
    </>
  ) : (
    <>
      <span className="max-sm:sr-only">{label}</span>
      {children}
    </>
  );
  const base = cn(itemClass, "group gap-1.5 bg-card px-4 shadow-soft ring-1 ring-border/70");
  if (!href) {
    return (
      <span aria-disabled className={cn(base, "text-muted-foreground opacity-40 shadow-none")}>
        {content}
      </span>
    );
  }
  return (
    <Link href={href} className={cn(base, "text-navy hover:-translate-y-0.5 hover:shadow-float hover:ring-primary/30")}>
      {content}
    </Link>
  );
}
