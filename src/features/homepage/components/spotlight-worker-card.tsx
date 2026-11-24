import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Images, MapPin, PlayCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { tradeImage } from "@/config/trade-imagery";
import { availabilityLabels, type Candidate } from "@/features/candidates";
import { routes } from "@/lib/constants/routes";

/**
 * Large showcase card for the homepage's top featured worker. The cover is
 * trade imagery, never a portrait. Smaller cards reuse the directory's CandidateCard.
 */
export function SpotlightWorkerCard({ worker }: { worker: Candidate }) {
  const cover = tradeImage(worker.trade.slug);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft ring-1 ring-border/70 transition duration-300 hover:-translate-y-1 hover:shadow-float">
      <div className="relative h-60 shrink-0 overflow-hidden sm:h-72 lg:h-auto lg:min-h-72 lg:flex-1">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-navy-deep/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
          Featured
        </span>
        <div className="absolute right-4 top-4 flex gap-1.5">
          {worker.hasVideoResume && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy backdrop-blur">
              <PlayCircle aria-hidden className="size-3.5 text-primary" /> Video resume
            </span>
          )}
          {worker.portfolioItemCount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-navy backdrop-blur">
              <Images aria-hidden className="size-3.5 text-primary" /> {worker.portfolioItemCount} photos
            </span>
          )}
        </div>
      </div>

      <div className="relative flex flex-col p-6 sm:p-7">
        <Avatar name={worker.fullName} size="lg" className="absolute -top-10 left-6 ring-4 ring-card sm:left-7" />
        <div className="flex items-start justify-between gap-3 pt-12">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1.5 text-2xl font-bold text-navy">
              <Link
                href={routes.worker(worker.slug)}
                className="truncate after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-ring/60"
              >
                {worker.fullName}
              </Link>
              {worker.isVerified && <BadgeCheck aria-label="Reviewed profile" className="size-5 shrink-0 text-primary" />}
            </h3>
            <p className="font-semibold text-primary">{worker.trade.name}</p>
          </div>
          <span className="shrink-0 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald-700">
            {availabilityLabels[worker.availability]}
          </span>
        </div>

        <p className="mt-3 text-muted-foreground">{worker.headline}</p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-navy">
          <li>
            <strong>{worker.yearsOfExperience}</strong> yrs experience
          </li>
          <li className="flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 text-muted-foreground" /> {worker.district}
          </li>
        </ul>

        <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-1.5">
          {worker.skills.slice(0, 4).map((skill) => (
            <li key={skill} className="rounded-full bg-sky px-3 py-1 text-xs font-medium text-navy">
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-5">
          <p className="min-w-0 truncate text-sm text-muted-foreground">
            Open to <span className="font-medium text-navy">{worker.preferredDestinations.map((d) => d.name).join(", ")}</span>
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
            View Profile <ArrowRight aria-hidden className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
