"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { useCandidateNavigation } from "../hooks/use-candidate-navigation";

/** Dims server-rendered results while a filter change is in flight. */
export function CandidateResultsRegion({ children }: { children: ReactNode }) {
  const { isPending } = useCandidateNavigation();
  return (
    <div aria-busy={isPending} className={cn("transition-opacity", isPending && "pointer-events-none opacity-50")}>
      {children}
    </div>
  );
}
