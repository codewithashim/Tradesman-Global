import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  /** Continues the title (kept separate so callers can break long headings). */
  highlight?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}

/** Small context label + display heading, the brand's standard section opener. */
export function SectionIntro({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  tone = "dark",
  action,
  as: Heading = "h2",
  className,
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "flex flex-col items-center")}>
        {eyebrow && (
          <span
            className={cn(
              "mb-4 inline-flex items-center gap-2.5 text-sm font-semibold",
              tone === "dark" ? "text-primary" : "text-brand-blue",
            )}
          >
            <span aria-hidden className="h-px w-6 bg-current" />
            {eyebrow}
          </span>
        )}
        <Heading
          className={cn(
            "type-display text-balance",
            Heading === "h1" ? "text-[2.75rem] sm:text-6xl" : "text-[2.4rem] sm:text-5xl lg:text-6xl",
            tone === "dark" ? "text-navy" : "text-white",
          )}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span>{highlight}</span>
            </>
          )}
        </Heading>
        {description && (
          <p
            className={cn(
              "mt-4 text-base leading-7 text-pretty sm:text-lg",
              tone === "dark" ? "text-muted-foreground" : "text-white/70",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
