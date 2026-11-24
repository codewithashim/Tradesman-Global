"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Briefcase,
  ChevronRight,
  Home,
  LayoutGrid,
  LogIn,
  Mail,
  Phone,
  Plus,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { SocialIcon } from "@/components/shared/social-icon";
import { routes } from "@/lib/constants/routes";
import { siteConfig } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import type { SiteNavData } from "./nav-types";

interface Tab {
  label: string;
  href: string;
  icon: LucideIcon;
  match: (pathname: string) => boolean;
}

const leftTabs: Tab[] = [
  { label: "Home", href: routes.home, icon: Home, match: (p) => p === "/" },
  { label: "Find", href: routes.findCandidates, icon: Search, match: (p) => p.startsWith("/find-candidates") || p.startsWith("/worker/") },
];
const rightTabs: Tab[] = [
  { label: "Trades", href: routes.tradeCategories, icon: Briefcase, match: (p) => p.startsWith("/trade") },
];

/** App-style bottom navigation for phones and small tablets (hidden on lg+). */
export function MobileTabBar({ nav }: { nav: SiteNavData }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = pathname.startsWith("/country/") || pathname.startsWith("/how-it-works");

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-card/90 pb-safe shadow-[0_-8px_30px_-12px_rgb(16_42_67/0.18)] backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto grid h-[4.5rem] max-w-md grid-cols-5 items-center px-2">
          {leftTabs.map((tab) => (
            <TabItem key={tab.href} tab={tab} active={tab.match(pathname)} />
          ))}

          {/* Raised primary action */}
          <li className="flex justify-center">
            <Link
              href={routes.register}
              aria-current={pathname.startsWith(routes.register) ? "page" : undefined}
              className="group -mt-7 flex flex-col items-center gap-1 focus-visible:outline-none"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-b from-brand-blue to-primary text-white shadow-[0_12px_24px_-8px_rgb(37_99_235/0.7)] ring-4 ring-card transition group-active:scale-95 group-focus-visible:ring-ring/40">
                <Plus aria-hidden className="size-6" strokeWidth={2.5} />
              </span>
              <span className="text-[11px] font-bold text-primary">Join free</span>
            </Link>
          </li>

          {rightTabs.map((tab) => (
            <TabItem key={tab.href} tab={tab} active={tab.match(pathname)} />
          ))}

          <li>
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={moreOpen}
              className="group flex w-full flex-col items-center gap-1 py-1 focus-visible:outline-none"
            >
              <TabIcon icon={LayoutGrid} active={moreActive || moreOpen} />
              <span className={cn("text-[11px] font-semibold", moreActive || moreOpen ? "text-primary" : "text-navy/60")}>More</span>
            </button>
          </li>
        </ul>
      </nav>

      <MoreSheet nav={nav} open={moreOpen} onOpenChange={setMoreOpen} />
    </>
  );
}

function TabItem({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <li>
      <Link
        href={tab.href}
        aria-current={active ? "page" : undefined}
        className="group flex flex-col items-center gap-1 py-1 focus-visible:outline-none"
      >
        <TabIcon icon={tab.icon} active={active} />
        <span className={cn("text-[11px] font-semibold", active ? "text-primary" : "text-navy/60")}>{tab.label}</span>
      </Link>
    </li>
  );
}

function TabIcon({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <span
      className={cn(
        "grid h-8 w-14 place-items-center rounded-full transition-all group-active:scale-90 group-focus-visible:ring-4 group-focus-visible:ring-ring/30",
        active ? "bg-sky text-primary" : "text-navy/60",
      )}
    >
      <Icon aria-hidden className="size-[22px]" strokeWidth={active ? 2.4 : 2} />
    </span>
  );
}

function MoreSheet({ nav, open, onOpenChange }: { nav: SiteNavData; open: boolean; onOpenChange: (open: boolean) => void }) {
  const close = () => onOpenChange(false);
  const quickLinks = [
    { label: "How it works", href: routes.howItWorks, icon: BookOpen },
    { label: "Log in", href: routes.login, icon: LogIn },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" showCloseButton={false} className="max-h-[85dvh] gap-0 rounded-t-[2rem] border-0 bg-background p-0 pb-safe">
        <SheetTitle className="sr-only">More</SheetTitle>
        <SheetDescription className="sr-only">More pages, destinations and contact details</SheetDescription>
        <div aria-hidden className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border" />

        <div className="flex flex-col gap-6 overflow-y-auto px-5 pb-6 pt-5">
          {/* Join card */}
          <Link
            href={routes.register}
            onClick={close}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-primary p-5 text-white"
          >
            <span aria-hidden className="absolute -right-10 -top-10 size-36 rounded-full bg-white/10" />
            <span className="relative block text-lg font-bold">Create your free profile</span>
            <span lang="bn" className="relative mt-1 block text-sm text-white/80">
              বিনামূল্যে প্রোফাইল তৈরি করুন
            </span>
            <span className="relative mt-4 inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy">
              Get started <ChevronRight aria-hidden className="size-4" />
            </span>
          </Link>

          <ul className="grid grid-cols-2 gap-2">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
                  className="flex items-center gap-3 rounded-2xl bg-card p-4 text-sm font-semibold text-navy shadow-soft ring-1 ring-border/70 active:scale-[0.98]"
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-sky text-primary">
                    <Icon aria-hidden className="size-[18px]" />
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <section>
            <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Destinations</h2>
            <ul className="grid grid-cols-2 gap-2">
              {nav.countries.map((country) => (
                <li key={country.href}>
                  <Link
                    href={country.href}
                    onClick={close}
                    className="flex items-center gap-2.5 rounded-2xl bg-card px-3 py-2.5 text-sm font-semibold text-navy ring-1 ring-border/70 active:scale-[0.98]"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-navy font-mono text-[10px] font-bold text-white">
                      {country.hint}
                    </span>
                    <span className="truncate">{country.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl bg-sky/70 p-4">
            <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Contact</h2>
            <p className="flex items-center gap-2 text-sm text-navy">
              <Mail aria-hidden className="size-4 text-primary" /> {siteConfig.contact.email}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-navy">
              <Phone aria-hidden className="size-4 text-primary" /> {siteConfig.contact.phone}
            </p>
            <ul className="mt-4 flex gap-2">
              {siteConfig.social.map((channel) => (
                <li key={channel.network}>
                  <span
                    title={channel.url ? channel.label : `${channel.label} — coming soon`}
                    className="grid size-10 place-items-center rounded-full bg-card text-navy/70 ring-1 ring-border/70"
                  >
                    <SocialIcon network={channel.network} className="size-4" />
                    <span className="sr-only">{channel.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
