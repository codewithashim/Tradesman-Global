import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Optional element aligned to the right on wide screens, e.g. a "View all" link. */
  action?: ReactNode;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, description, action, as: Heading = "h2" }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{eyebrow}</p>
        )}
        <Heading
          className={
            Heading === "h1"
              ? "text-3xl font-bold tracking-tight text-balance sm:text-4xl"
              : "text-2xl font-bold tracking-tight text-balance"
          }
        >
          {title}
        </Heading>
        {description && <p className="mt-3 text-base leading-7 text-muted-foreground text-pretty">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
