import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Images, MapPin, PlayCircle, Plane, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { tradeImage } from "@/config/trade-imagery";
import { availabilityLabels, type Candidate } from "@/features/candidates";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

/**
 * Large dark showcase card for the homepage's top featured worker. The cover is
 * trade imagery, never a portrait. Smaller cards reuse the directory's CandidateCard.
 */
export function SpotlightWorkerCard({ worker }: { worker: Candidate }) {
  const cover = tradeImage(worker.trade.slug);
  const isImmediate = worker.availability === "immediate";
  const isAbroad = !worker.currentLocation.startsWith(worker.district);
  const location = isAbroad ? worker.currentLocation.split(",")[0] : worker.district;

  const facts = [
    { label: "Experience", value: `${worker.yearsOfExperience} yrs` },
    { label: isAbroad ? "Now in" : "Based in", value: location },
    { label: "Portfolio", value: `${worker.portfolioItemCount} photos` },
  ];

  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-navy-deep text-white shadow-float ring-1 ring-white/10 transition duration-300 hover:-translate-y-1">
      <div aria-hidden className="absolute -bottom-24 -right-24 -z-10 size-72 rounded-full bg-primary/40 blur-[90px]" />

      <div className="relative h-56 shrink-0 overflow-hidden sm:h-72 lg:h-auto lg:min-h-72 lg:flex-1">
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/30 to-navy-deep/30" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-primary to-brand-blue px-3 py-1 text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-primary/30">
            <Sparkles aria-hidden className="size-3.5" /> Featured
          </span>
          <div className="flex gap-1.5">
            {worker.hasVideoResume && (
              <span className="inline-flex h-7 items-center gap-1 rounded-full bg-white/15 px-2.5 text-[11px] font-semibold ring-1 ring-white/20 backdrop-blur-md">
                <PlayCircle aria-hidden className="size-3.5" /> Video
              </span>
            )}
            {worker.portfolioItemCount > 0 && (
              <span className="inline-flex h-7 items-center gap-1 rounded-full bg-white/15 px-2.5 text-[11px] font-semibold ring-1 ring-white/20 backdrop-blur-md">
                <Images aria-hidden className="size-3.5" /> {worker.portfolioItemCount}
                <span className="sr-only"> portfolio photos</span>
              </span>
            )}
          </div>
        </div>

        {/* Identity sits on the image for a magazine-style cover. */}
        <div className="absolute inset-x-5 bottom-4 flex items-end gap-3.5 sm:inset-x-7">
          <Avatar name={worker.fullName} className="size-16 rounded-2xl text-lg ring-4 ring-white/15 sm:size-20 sm:text-xl" />
          <div className="min-w-0 pb-0.5">
            <h3 className="flex items-center gap-1.5 text-xl font-bold leading-tight sm:text-2xl">
              <Link
                href={routes.worker(worker.slug)}
                className="truncate after:absolute after:inset-0 after:rounded-[2rem] focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-ring/60"
              >
                {worker.fullName}
              </Link>
              {worker.isVerified && <BadgeCheck aria-label="Reviewed profile" className="size-5 shrink-0 fill-brand-blue text-navy-deep" />}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-brand-blue">{worker.trade.name}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-5 pb-5 pt-2 sm:px-7 sm:pb-7">
        <p className="line-clamp-2 text-sm leading-6 text-white/70 sm:text-base">{worker.headline}</p>

        <dl className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-2xl bg-white/[0.06] ring-1 ring-white/10">
          {facts.map((fact) => (
            <div key={fact.label} className="min-w-0 px-3 py-3 text-center">
              <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">{fact.label}</dt>
              <dd className="mt-1 truncate text-sm font-bold">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <ul aria-label="Skills" className="mt-4 flex flex-wrap gap-1.5">
          {worker.skills.slice(0, 3).map((skill) => (
            <li key={skill} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-2 text-xs text-white/60">
          <p className="flex items-center gap-1.5">
            <Plane aria-hidden className="size-3.5 shrink-0 text-brand-blue" />
            <span className="truncate">
              Open to <span className="font-semibold text-white">{worker.preferredDestinations.map((d) => d.name).join(", ")}</span>
            </span>
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin aria-hidden className="size-3.5 shrink-0 text-brand-blue" />
            From <span className="font-semibold text-white">{worker.district}, Bangladesh</span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
            <span className={cn("size-2 rounded-full", isImmediate ? "bg-emerald" : "bg-amber-400")} />
            {availabilityLabels[worker.availability]}
          </span>
          <span className="inline-flex h-11 items-center gap-2 rounded-full bg-white pl-5 pr-1.5 text-sm font-semibold text-navy transition group-hover:bg-sky">
            View profile
            <span className="grid size-8 place-items-center rounded-full bg-navy text-white">
              <ArrowUpRight aria-hidden className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}
