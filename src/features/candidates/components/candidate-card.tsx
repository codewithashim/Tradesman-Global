import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Images, MapPin, PlayCircle, Plane } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { tradeImage } from "@/config/trade-imagery";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Candidate } from "../types/candidate";
import { availabilityLabels, experienceLevel } from "../utils/candidate-options";

const MAX_SKILLS = 2;

/**
 * Directory card. The cover shows the worker's *trade* (never a portrait),
 * so stock photography is never presented as the person.
 *
 * Every row has a fixed line budget so cards in a carousel or grid line up
 * without stretched gaps.
 */
export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const cover = tradeImage(candidate.trade.slug);
  const level = experienceLevel(candidate.yearsOfExperience);
  const isAbroad = !candidate.currentLocation.startsWith(candidate.district);
  const [city, ...rest] = candidate.currentLocation.split(",").map((part) => part.trim());
  const locationValue = isAbroad ? city : candidate.district;
  const locationSub = isAbroad ? [rest.join(", "), `from ${candidate.district}`].filter(Boolean).join(" · ") : "Bangladesh";
  const isImmediate = candidate.availability === "immediate";
  const extraSkills = candidate.skills.length - MAX_SKILLS;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-card shadow-soft ring-1 ring-border/60 transition duration-300 hover:-translate-y-1 hover:shadow-float">
      {/* Cover */}
      <div className="relative h-32 shrink-0 overflow-hidden">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 85vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-navy-deep/55 via-navy-deep/10 to-navy-deep/40" />

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-deep/55 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur-md">
            <span className="relative flex size-2">
              {isImmediate && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-emerald/70" />}
              <span aria-hidden className={cn("relative size-2 rounded-full", isImmediate ? "bg-emerald" : "bg-amber-400")} />
            </span>
            {availabilityLabels[candidate.availability]}
          </span>

          <div className="flex gap-1.5">
            {candidate.hasVideoResume && (
              <span className="grid size-7 place-items-center rounded-full bg-white/90 text-primary shadow-sm backdrop-blur">
                <PlayCircle aria-hidden className="size-4" />
                <span className="sr-only">Has video resume</span>
              </span>
            )}
            {candidate.portfolioItemCount > 0 && (
              <span className="inline-flex h-7 items-center gap-1 rounded-full bg-white/90 px-2 text-[11px] font-bold text-navy shadow-sm backdrop-blur">
                <Images aria-hidden className="size-3.5 text-primary" />
                {candidate.portfolioItemCount}
                <span className="sr-only"> portfolio photos</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-end justify-between gap-3">
          <Avatar
            name={candidate.fullName}
            className="-mt-8 size-16 rounded-2xl text-lg shadow-lg shadow-navy/20 ring-4 ring-card"
          />
          <span className="mb-1 rounded-full bg-sky px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
            {level.label}
          </span>
        </div>

        <div className="mt-3">
          <h3 className="flex items-center gap-1.5 text-lg font-bold leading-tight text-navy">
            {/* Stretched link: whole card is clickable with a single accessible link. */}
            <Link
              href={routes.worker(candidate.slug)}
              className="truncate after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-ring/60"
            >
              {candidate.fullName}
            </Link>
            {candidate.isVerified && <BadgeCheck aria-label="Reviewed profile" className="size-5 shrink-0 fill-primary text-white" />}
          </h3>
          <p className="mt-0.5 text-sm font-semibold text-primary">{candidate.trade.name}</p>
        </div>

        <p className="mt-2.5 line-clamp-2 min-h-11 text-sm leading-[1.375rem] text-muted-foreground">{candidate.headline}</p>

        {/* Key facts */}
        <dl className="mt-4 grid grid-cols-2 divide-x divide-border/70 rounded-2xl bg-background ring-1 ring-border/60">
          <div className="min-w-0 px-3.5 py-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Experience</dt>
            <dd className="mt-1 flex items-center gap-2">
              <span className="text-base font-extrabold text-navy">
                {candidate.yearsOfExperience}
                <span className="ml-0.5 text-xs font-semibold text-muted-foreground">{candidate.yearsOfExperience === 1 ? "yr" : "yrs"}</span>
              </span>
              <span aria-hidden className="flex gap-0.5">
                {[1, 2, 3, 4].map((step) => (
                  <span key={step} className={cn("h-3 w-1 rounded-full", step <= level.step ? "bg-primary" : "bg-border")} />
                ))}
              </span>
            </dd>
          </div>
          <div className="min-w-0 px-3.5 py-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{isAbroad ? "Now in" : "Based in"}</dt>
            <dd className="mt-1">
              <span className="flex items-center gap-1 text-sm font-bold text-navy">
                <MapPin aria-hidden className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{locationValue}</span>
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{locationSub}</span>
            </dd>
          </div>
        </dl>

        {/* Skills: one tidy row */}
        <ul aria-label="Skills" className="mt-4 flex h-7 flex-wrap gap-1.5 overflow-hidden">
          {candidate.skills.slice(0, MAX_SKILLS).map((skill) => (
            <li key={skill} className="whitespace-nowrap rounded-full bg-sky px-2.5 py-1 text-xs font-semibold text-navy">
              {skill}
            </li>
          ))}
          {extraSkills > 0 && (
            <li className="rounded-full px-2 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-inset ring-border">+{extraSkills}</li>
          )}
        </ul>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Plane aria-hidden className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">
            Open to <span className="font-semibold text-navy">{candidate.preferredDestinations.map((d) => d.name).join(", ")}</span>
          </span>
        </p>

        <div className="mt-auto pt-5">
          <span className="flex h-11 items-center justify-between rounded-full bg-navy pl-5 pr-1.5 text-sm font-semibold text-white transition group-hover:bg-primary">
            View profile
            <span className="grid size-8 place-items-center rounded-full bg-white/15 transition group-hover:bg-white/25">
              <ArrowUpRight aria-hidden className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
