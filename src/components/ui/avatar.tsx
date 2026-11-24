import { cn } from "@/lib/utils/cn";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

interface AvatarProps {
  name: string;
  /** Optional photo URL. Falls back to initials. */
  src?: string;
  size?: "md" | "lg";
  className?: string;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const sizeClass = size === "md" ? "size-12 text-sm" : "size-20 text-xl";
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- remote hosts unknown until Phase 2
    return <img src={src} alt="" className={cn("shrink-0 rounded-full object-cover", sizeClass, className)} />;
  }
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-primary font-semibold text-white",
        sizeClass,
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
