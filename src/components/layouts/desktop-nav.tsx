"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { siteImages } from "@/config/images";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { SiteNavData } from "./nav-types";

const itemClass =
  "inline-flex h-10 flex-row items-center gap-1 !rounded-full bg-transparent px-4 py-0 text-sm font-semibold text-navy/75 transition-colors hover:bg-sky hover:text-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 data-[state=open]:bg-sky data-[state=open]:text-navy";

function isActive(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Desktop primary navigation with Trades and Destinations mega-menus. */
export function DesktopNav({ nav }: { nav: SiteNavData }) {
  const pathname = usePathname();
  const tradesActive = isActive(pathname, routes.tradeCategories) || pathname.startsWith("/trade/");
  const destinationsActive = pathname.startsWith("/country/");

  return (
    <NavigationMenu aria-label="Main" className="hidden lg:flex" viewport={false}>
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink asChild active={isActive(pathname, routes.findCandidates)}>
            <Link href={routes.findCandidates} className={cn(itemClass, "data-active:bg-sky data-active:text-primary")}>
              Find Workers
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(itemClass, tradesActive && "bg-sky text-primary")}>Trades</NavigationMenuTrigger>
          <NavigationMenuContent className="!rounded-3xl !border-0 !p-0 !shadow-float ring-1 ring-border/70">
            <div className="grid w-[44rem] grid-cols-[1fr_15rem]">
              <ul className="grid grid-cols-2 gap-1 p-3">
                {nav.trades.map((trade) => (
                  <li key={trade.href}>
                    <NavigationMenuLink asChild>
                      <Link href={trade.href} className="block rounded-2xl p-3 transition hover:bg-sky">
                        <span className="block text-sm font-bold text-navy">{trade.label}</span>
                        {trade.hint && <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">{trade.hint}</span>}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              <NavigationMenuLink asChild>
                <Link href={routes.tradeCategories} className="group relative m-3 ml-0 flex flex-col justify-end overflow-hidden rounded-2xl p-5 text-white">
                  <Image src={siteImages.onSite.src} alt="" fill sizes="240px" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/10" />
                  <span className="relative text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">Explore</span>
                  <span className="relative mt-1 text-lg font-bold leading-snug">All {nav.tradeCount} trades</span>
                  <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                    Browse categories <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(itemClass, destinationsActive && "bg-sky text-primary")}>
            Destinations
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!rounded-3xl !border-0 !p-0 !shadow-float ring-1 ring-border/70">
            <ul className="grid w-[30rem] grid-cols-2 gap-1 p-3">
              {nav.countries.map((country) => (
                <li key={country.href}>
                  <NavigationMenuLink asChild>
                    <Link href={country.href} className="flex items-center gap-3 rounded-2xl p-2.5 transition hover:bg-sky">
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-navy font-mono text-[11px] font-bold text-white">
                        {country.hint}
                      </span>
                      <span className="text-sm font-semibold text-navy">{country.label}</span>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild active={isActive(pathname, routes.howItWorks)}>
            <Link href={routes.howItWorks} className={cn(itemClass, "data-active:bg-sky data-active:text-primary")}>
              How It Works
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
