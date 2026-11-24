import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/lib/constants/routes";
import { MobileNav } from "./mobile-nav";
import { SiteNavLinks } from "./site-nav-links";

export function SiteHeader() {
  return (
    <>
      {/* Announcement strip (reference: thin info bar above the nav). */}
      <div className="border-b border-border/70 bg-card text-xs">
        <Container className="flex h-9 items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-white">
              <Sparkles aria-hidden className="size-2.5" />
            </span>
            <span className="truncate">
              <strong className="font-semibold text-navy">Free profiles for skilled workers.</strong>{" "}
              <span lang="bn" className="hidden sm:inline">
                বিনামূল্যে প্রোফাইল তৈরি করুন
              </span>
            </span>
          </p>
          <Link href={routes.howItWorks} className="hidden shrink-0 font-medium text-primary hover:underline sm:block">
            How profiles are reviewed →
          </Link>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <BrandLogo />
          <SiteNavLinks />
          <div className="flex items-center gap-2">
            <ButtonLink href={routes.login} variant="ghost" size="sm" className="hidden sm:inline-flex">
              Log in
            </ButtonLink>
            <ButtonLink href={routes.register} variant="dark" size="sm" className="hidden sm:inline-flex">
              Create Free Profile
            </ButtonLink>
            <MobileNav />
          </div>
        </Container>
      </header>
    </>
  );
}
