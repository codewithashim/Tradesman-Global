import { ViewTransition, type ReactNode } from "react";

/**
 * Wrap a page's content so route changes cross-fade and rise in
 * (CSS in globals.css under `.page`). Lives in each page, not a layout —
 * layouts persist across navigations so they never enter or exit.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
