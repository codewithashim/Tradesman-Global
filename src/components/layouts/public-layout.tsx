import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter, type FooterLink } from "./site-footer";

interface PublicLayoutProps {
  children: ReactNode;
  footerTradeLinks?: FooterLink[];
  footerCountryLinks?: FooterLink[];
}

export function PublicLayout({ children, footerTradeLinks, footerCountryLinks }: PublicLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter tradeLinks={footerTradeLinks} countryLinks={footerCountryLinks} />
    </>
  );
}
