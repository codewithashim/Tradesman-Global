import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Images, MapPin, PlayCircle, Plane } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { tradeImage } from "@/config/trade-imagery";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { Candidate } from "../types/candidate";
import { availabilityLabels } from "../utils/candidate-options";
import { ExperienceMeter } from "./experience-meter";

const MAX_SKILLS = 3;

/**
 * Directory card. The cover shows the worker's *trade* (never a portrait),
 * so stock photography is never presented as the person.
 */
export function CandidateCard({ candidate }: { candidate: Candidate }) {
  const cover = tradeImage(candidate.trade.slug);
  const extraSkills = candidate.skills.length - MAX_SKILLS;
  const isAbroad = !candidate.currentLocation.startsWith(candidate.district);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-float">
      {/* Cover */}
      <div className="relative h-28 shrink-0 overflow-hidden">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 45vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
        <div className="absolute right-3 top-3 flex gap-1.5">
          {candidate.hasVideoResume && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy backdrop-blur">
              <PlayCircle aria-hidden className="size-3.5 text-primary" /> Video
            </span>
          )}
          {candidate.portfolioItemCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy backdrop-blur">
              <Images aria-hidden className="size-3.5 text-primary" />
              {candidate.portfolioItemCount}
              <span className="sr-only"> portfolio photos</span>
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5">
        <Avatar name={candidate.fullName} className="absolute -top-7 left-5 size-14 text-base ring-4 ring-card" />

        <div className="pt-8">
          <h3 className="flex items-center gap-1.5 text-[17px] font-bold text-navy">
            {/* Stretched link: whole card is clickable with a single accessible link. */}
            <Link
              href={routes.worker(candidate.slug)}
              className="truncate after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-ring/60"
            >
              {candidate.fullName}
            </Link>
            {candidate.isVerified && <BadgeCheck aria-label="Reviewed profile" className="size-4.5 shrink-0 text-primary" />}
          </h3>
          <p className="text-sm font-semibold text-primary">{candidate.trade.name}</p>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{candidate.headline}</p>

        <div className="mt-4 flex flex-col gap-2">
          <ExperienceMeter years={candidate.yearsOfExperience} />
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">
              {candidate.district}
              {isAbroad && <span className="text-navy"> · now in {candidate.currentLocation}</span>}
            </span>
          </p>
        </div>

        <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, MAX_SKILLS).map((skill) => (
            <li key={skill} className="rounded-full bg-sky px-2.5 py-1 text-xs font-medium text-navy">
              {skill}
            </li>
          ))}
          {extraSkills > 0 && (
            <li className="rounded-full px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border">
              +{extraSkills}
            </li>
          )}
        </ul>

        <p className="mt-4 flex items-start gap-1.5 text-xs text-muted-foreground">
          <Plane aria-hidden className="mt-0.5 size-3.5 shrink-0 text-primary" />
          <span className="line-clamp-1">
            Open to <span className="font-medium text-navy">{candidate.preferredDestinations.map((d) => d.name).join(", ")}</span>
          </span>
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
            <span className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-navy">
              <span
                aria-hidden
                className={cn("size-2 rounded-full", candidate.availability === "immediate" ? "bg-emerald" : "bg-amber-400")}
              />
              {availabilityLabels[candidate.availability]}
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary">
              View profile
              <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
