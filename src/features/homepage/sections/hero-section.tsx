import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, BadgeCheck, Globe2, Images, Play, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { siteImages } from "@/config/images";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

export function HeroSection({ destinationCount }: { destinationCount: number }) {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero-glow sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative grid grid-cols-1 items-center gap-14 pb-32 pt-10 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10 lg:pb-40 lg:pt-20">
          {/* Copy */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/80 py-1 pl-1 pr-3 text-xs font-semibold text-navy shadow-soft ring-1 ring-border backdrop-blur">
              <span className="grid size-6 place-items-center rounded-full bg-primary text-white">
                <Globe2 aria-hidden className="size-3.5" />
              </span>
              Bangladesh → {destinationCount} destination countries
            </span>

            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy text-balance sm:text-6xl lg:text-[4rem]">
              Hire Skilled Bangladeshi Workers.{" "}
              <span className="bg-gradient-to-r from-primary to-brand-blue bg-clip-text text-transparent">
                See Their Skills Before You Hire.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground text-pretty">
              Discover experienced welders, electricians, plumbers, drivers, chefs, and technicians through real video
              resumes and work portfolios.
            </p>

            <p lang="bn" className="mt-5 max-w-xl border-l-2 border-primary/40 pl-4 text-[15px] text-navy/80">
              আপনার দক্ষতা, কাজের অভিজ্ঞতা ও ভিডিও রিজিউমের মাধ্যমে তৈরি করুন নিজের প্রফেশনাল প্রোফাইল।
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href={routes.register} size="lg">
                Create Free Profile <ArrowRight />
              </ButtonLink>
              <ButtonLink href={routes.findCandidates} variant="secondary" size="lg">
                <Search /> Explore Skilled Workers
              </ButtonLink>
            </div>
          </div>

          {/* Visual: photo + illustrative profile UI */}
          <HeroVisual />
        </Container>
      </div>
    </section>
  );
}

function HeroVisual() {
  const image = siteImages.heroWorker;
  return (
    <figure className="relative mx-auto w-full max-w-[28rem] lg:mr-0">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-float ring-1 ring-white/60">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover object-[50%_62%]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <figcaption className="absolute bottom-5 left-5 right-5 text-white">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">Skills you can see</p>
          <p className="mt-1 text-lg font-bold">Real work, on camera.</p>
        </figcaption>
      </div>

      {/* Floating cards — illustrative UI, not claims about the person pictured. */}
      <div aria-hidden className="pointer-events-none">
        <FloatCard className="-left-4 top-8 sm:-left-12" delay="0s">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-b from-brand-blue to-primary text-white shadow-md">
            <Play className="ml-0.5 size-4" fill="currentColor" />
          </span>
          <span>
            <span className="block text-sm font-bold text-navy">Video Resume</span>
            <span className="block text-xs text-muted-foreground">Available · 1:34</span>
          </span>
        </FloatCard>

        <FloatCard className="-right-3 top-[34%] flex-col !items-start !gap-0 sm:-right-10" delay="1.2s">
          <span className="text-3xl font-extrabold tracking-tight text-primary">5+</span>
          <span className="text-xs font-semibold text-navy">Years experience</span>
        </FloatCard>

        <FloatCard className="-left-6 bottom-28 max-sm:hidden sm:-left-14" delay="2.4s">
          <span className="flex -space-x-2">
            {[siteImages.welding, siteImages.electrical, siteImages.masonry].map((thumb) => (
              <span key={thumb.src} className="relative size-9 overflow-hidden rounded-lg ring-2 ring-white">
                <Image src={thumb.src} alt="" fill sizes="36px" className="object-cover" />
              </span>
            ))}
          </span>
          <span>
            <span className="flex items-center gap-1 text-sm font-bold text-navy">
              <Images className="size-3.5 text-primary" /> Work Portfolio
            </span>
            <span className="block text-xs text-muted-foreground">6 photos added</span>
          </span>
        </FloatCard>

        <FloatCard className="-right-2 bottom-24 sm:-right-8" delay="3.6s">
          <span className="relative grid size-8 place-items-center rounded-full bg-emerald/15 text-emerald">
            <BadgeCheck className="size-4.5" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Admin review
            </span>
            <span className="block text-sm font-bold text-emerald">Approved</span>
          </span>
        </FloatCard>
      </div>
    </figure>
  );
}

function FloatCard({ className, delay, children }: { className?: string; delay: string; children: ReactNode }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={cn(
        "absolute flex animate-float items-center gap-3 rounded-2xl bg-card/95 px-3.5 py-3 shadow-float ring-1 ring-border/70 backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}
