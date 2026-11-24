import Link from "next/link";
import { BadgeCheck, LogIn, Mail, Phone, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/lib/constants/routes";
import { siteConfig } from "@/lib/constants/site";
import { DesktopNav } from "./desktop-nav";
import { HeaderShell } from "./header-shell";
import type { SiteNavData } from "./nav-types";

export function SiteHeader({ nav }: { nav: SiteNavData }) {
  return (
    <>
      {/* Utility strip — desktop only; mobile keeps the screen for content. */}
      <div className="hidden bg-navy-deep text-xs text-white/70 lg:block">
        <Container className="flex h-9 items-center justify-between gap-6">
          <p className="flex items-center gap-2">
            <BadgeCheck aria-hidden className="size-3.5 text-brand-blue" />
            Every profile is reviewed by our team before it’s listed.
            <span lang="bn" className="text-white/50">
              · বিনামূল্যে প্রোফাইল তৈরি করুন
            </span>
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Mail aria-hidden className="size-3.5" /> {siteConfig.contact.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone aria-hidden className="size-3.5" /> {siteConfig.contact.phone}
            </span>
          </div>
        </Container>
      </div>

      <HeaderShell>
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <BrandLogo />
          <DesktopNav nav={nav} />

          <div className="flex items-center gap-2">
            {/* Mobile: quick search + sign in (primary nav lives in the bottom tab bar). */}
            <Link
              href={routes.findCandidates}
              aria-label="Search workers"
              className="grid size-10 place-items-center rounded-full bg-card text-navy shadow-soft ring-1 ring-border/70 lg:hidden"
            >
              <Search aria-hidden className="size-[18px]" />
            </Link>
            <Link
              href={routes.login}
              aria-label="Log in"
              className="grid size-10 place-items-center rounded-full bg-card text-navy shadow-soft ring-1 ring-border/70 lg:hidden"
            >
              <LogIn aria-hidden className="size-[18px]" />
            </Link>

            {/* Desktop actions */}
            <ButtonLink href={routes.login} variant="ghost" size="sm" className="hidden lg:inline-flex">
              Log in
            </ButtonLink>
            <ButtonLink href={routes.register} variant="dark" size="sm" className="hidden lg:inline-flex">
              Create Free Profile
            </ButtonLink>
          </div>
        </Container>
      </HeaderShell>
    </>
  );
}
