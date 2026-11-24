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
  "inline-flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-ring";

export function Pagination({ page, pageCount, hrefForPage }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <PageArrow href={page > 1 ? hrefForPage(page - 1) : null} label="Previous page">
        <ChevronLeft aria-hidden className="size-4" />
      </PageArrow>
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
              p === page ? "bg-navy text-white shadow-md" : "text-navy hover:bg-card hover:shadow-soft",
            )}
          >
            {p}
          </Link>
        ),
      )}
      <PageArrow href={page < pageCount ? hrefForPage(page + 1) : null} label="Next page">
        <ChevronRight aria-hidden className="size-4" />
      </PageArrow>
    </nav>
  );
}

function PageArrow({ href, label, children }: { href: string | null; label: string; children: ReactNode }) {
  if (!href) {
    return (
      <span aria-disabled className={cn(itemClass, "px-2 text-muted-foreground opacity-40")}>
        {children}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
  return (
    <Link href={href} className={cn(itemClass, "px-2 text-navy hover:bg-card hover:shadow-soft")}>
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
