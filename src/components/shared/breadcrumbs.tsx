import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/** `tone="light"` for use on dark heroes. */
export function Breadcrumbs({ items, tone = "dark" }: { items: BreadcrumbItem[]; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", light ? "text-white/60" : "text-muted-foreground")}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link href={item.href} className={light ? "hover:text-white" : "hover:text-foreground"}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={light ? "text-white" : "text-foreground"}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight aria-hidden className="size-3.5" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
