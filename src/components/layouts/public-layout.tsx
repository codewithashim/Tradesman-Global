import type { ReactNode } from "react";
import { MobileTabBar } from "./mobile-tab-bar";
import type { SiteNavData } from "./nav-types";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const emptyNav: SiteNavData = { trades: [], countries: [], tradeCount: 0 };

interface PublicLayoutProps {
  children: ReactNode;
  /** Supplied by the route layout; optional so standalone pages (e.g. 404) still render. */
  nav?: SiteNavData;
}

export function PublicLayout({ children, nav = emptyNav }: PublicLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter nav={nav} />
      <MobileTabBar nav={nav} />
    </>
  );
}
