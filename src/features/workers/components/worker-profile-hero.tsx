import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock, Home, MapPin, MessageSquare, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic, SplitReveal } from "@/components/animations";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { tradeImage } from "@/config/trade-imagery";
import { availabilityLabels } from "@/features/candidates";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";

function initials(name: string): string {
  const parts = name.replace(/\./g, "").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

const levelOf = (years: number) => (years <= 2 ? "Junior" : years <= 5 ? "Skilled" : years <= 10 ? "Experienced" : "Senior");

interface WorkerProfileHeroProps {
  worker: WorkerProfile;
  breadcrumbs: ReactNode;
  /** Server-rendered flags keyed by country slug (joined by the route). */
  destinationFlags: Record<string, ReactNode>;
}

/**
 * Dark stage: the trade's photograph bleeds in from the right (trade imagery,
 * never a portrait), identity on the left, key facts on glass tiles below.
 */
export function WorkerProfileHero({ worker, breadcrumbs, destinationFlags }: WorkerProfileHeroProps) {
  const cover = tradeImage(worker.trade.slug);
  const isAbroad = !worker.currentLocation.startsWith(worker.district);
  const isImmediate = worker.availability === "immediate";

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep text-white sm:rounded-[2.75rem]">
        {/* Trade photograph, masked to fade into the stage */}
        <div aria-hidden className="absolute inset-y-0 right-0 -z-20 w-full lg:w-[58%]">
          <Image
            src={cover.src}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover opacity-45 [mask-image:linear-gradient(to_left,black_30%,transparent)] lg:opacity-70"
          />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-navy-deep via-navy-deep/40 to-transparent" />
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[34rem] rounded-full bg-primary/35 blur-[120px]" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-8 lg:px-10 lg:pb-10">
          <div className="pb-10 sm:pb-14">{breadcrumbs}</div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-end">
              {/* Avatar with a slow orbit ring */}
              <div aria-hidden className="relative size-28 shrink-0 sm:size-36">
                <span className="absolute -inset-2 animate-[spin_14s_linear_infinite] rounded-[2.4rem] border border-dashed border-white/25" />
                <span className="grid size-full place-items-center rounded-[2rem] bg-linear-to-br from-brand-blue to-primary text-4xl font-bold shadow-2xl shadow-primary/40 ring-4 ring-white/10 sm:text-5xl">
                  {initials(worker.fullName)}
                </span>
                {worker.isVerified && (
                  <span className="absolute -bottom-1 -right-1 grid size-10 place-items-center rounded-full bg-navy-deep">
                    <BadgeCheck className="size-8 fill-brand-blue text-navy-deep" />
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <Link
                  href={routes.trade(worker.trade.slug)}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition hover:text-white"
                >
                  {worker.trade.name}
                  <ArrowUpRight aria-hidden className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <SplitReveal as="h1" play="load" className="type-display mt-2 text-[2.75rem] sm:text-6xl lg:text-7xl">
                  {worker.fullName}
                </SplitReveal>
                <p className="mt-3 max-w-xl text-base leading-7 text-white/70 sm:text-lg">{worker.headline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {worker.isVerified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">
                      <BadgeCheck aria-hidden className="size-3.5 text-brand-blue" /> Reviewed profile
                    </span>
                  )}
                  {worker.hasVideoResume && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">
                      <PlayCircle aria-hidden className="size-3.5 text-brand-blue" /> Video resume
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">
                    <span className="relative flex size-2">
                      {isImmediate && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald/70" />}
                      <span aria-hidden className={cn("relative size-2 rounded-full", isImmediate ? "bg-emerald" : "bg-amber-400")} />
                    </span>
                    {availabilityLabels[worker.availability]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 max-lg:hidden">
              <Magnetic>
                <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
                  <Button size="lg" variant="secondary" className="h-14 bg-white px-7 text-base text-navy ring-0 hover:bg-white">
                    <MessageSquare /> Contact Admin
                  </Button>
                </ContactAdminDialog>
              </Magnetic>
              {worker.videoResume && (
                <ButtonLink href="#video" size="lg" variant="ghost" className="h-12 text-white ring-1 ring-white/20 hover:bg-white/10 hover:text-white">
                  <PlayCircle /> Watch video
                </ButtonLink>
              )}
            </div>
          </div>

          {/* Facts on glass */}
          <dl className="mt-10 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
            <Glass label="Experience">
              <span className="flex items-baseline gap-1.5">
                <span className="type-display text-3xl">
                  <AnimatedCounter value={worker.yearsOfExperience} />
                </span>
                <span className="text-sm text-white/60">
                  yrs<span className="max-sm:hidden"> · {levelOf(worker.yearsOfExperience)}</span>
                </span>
              </span>
            </Glass>
            <Glass label="Home district" icon={<Home />}>
              {worker.district}
            </Glass>
            <Glass label={isAbroad ? "Currently in" : "Based in"} icon={<MapPin />}>
              {worker.currentLocation}
            </Glass>
            <Glass label="Availability" icon={<Clock />}>
              {availabilityLabels[worker.availability]}
            </Glass>
            <Glass label="Open to" className="col-span-2 lg:col-span-1">
              <span className="flex flex-wrap items-center gap-1.5">
                {worker.preferredDestinations.map((d) => (
                  <span key={d.slug} title={d.name} className="block w-7 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110">
                    {destinationFlags[d.slug]}
                    <span className="sr-only">{d.name}</span>
                  </span>
                ))}
              </span>
            </Glass>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Glass({ label, icon, className, children }: { label: string; icon?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex min-w-0 flex-col justify-between gap-2 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10 backdrop-blur-md sm:p-5", className)}>
      <dt className="flex items-center gap-1.5 text-xs text-white/55 [&_svg]:size-3.5">
        {icon}
        {label}
      </dt>
      <dd className="truncate text-sm font-semibold sm:text-base">{children}</dd>
    </div>
  );
}
