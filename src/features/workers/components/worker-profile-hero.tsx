import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock, Home, MapPin, MessageSquare, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tradeImage } from "@/config/trade-imagery";
import { availabilityLabels, ExperienceMeter } from "@/features/candidates";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";

function initials(name: string): string {
  const parts = name.replace(/\./g, "").trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** Cover banner (trade imagery, never a portrait) + identity + key facts + primary action. */
export function WorkerProfileHero({ worker }: { worker: WorkerProfile }) {
  const cover = tradeImage(worker.trade.slug);
  const isAbroad = !worker.currentLocation.startsWith(worker.district);

  return (
    <section className="overflow-hidden rounded-[2rem] bg-card shadow-soft ring-1 ring-border/70">
      {/* Cover */}
      <div className="relative h-40 sm:h-56">
        <Image src={cover.src} alt="" fill priority sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/30 to-primary/20" />
        <Link
          href={routes.trade(worker.trade.slug)}
          className="absolute right-5 top-5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/25"
        >
          {worker.trade.name} · view trade
        </Link>
      </div>

      <div className="relative px-6 pb-7 sm:px-10 sm:pb-9">
        {/* Avatar */}
        <div
          aria-hidden
          className="absolute -top-14 left-6 grid size-28 place-items-center rounded-[1.75rem] bg-gradient-to-br from-navy to-primary text-3xl font-extrabold text-white shadow-float ring-[6px] ring-card sm:-top-16 sm:left-10 sm:size-32"
        >
          {initials(worker.fullName)}
        </div>

        <div className="flex flex-col gap-6 pt-20 sm:pt-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">{worker.fullName}</h1>
              {worker.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sky px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
                  <BadgeCheck aria-hidden className="size-3.5" /> Reviewed profile
                </span>
              )}
              {worker.hasVideoResume && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <PlayCircle aria-hidden className="size-3.5" /> Video resume
                </span>
              )}
            </div>
            <p className="mt-1 text-lg font-bold text-primary">{worker.trade.name}</p>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">{worker.headline}</p>
          </div>

          <div className="flex shrink-0 gap-2 max-lg:hidden">
            <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
              <Button size="lg">
                <MessageSquare /> Contact Admin
              </Button>
            </ContactAdminDialog>
          </div>
        </div>

        {/* Facts */}
        <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/70 ring-1 ring-border/70 lg:grid-cols-4">
          <Fact label="Experience">
            <ExperienceMeter years={worker.yearsOfExperience} />
          </Fact>
          <Fact label="Home district" icon={Home}>
            {worker.district}
          </Fact>
          <Fact label={isAbroad ? "Currently in" : "Based in"} icon={MapPin}>
            {worker.currentLocation}
          </Fact>
          <Fact label="Availability" icon={Clock}>
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className={cn("size-2 rounded-full", worker.availability === "immediate" ? "bg-emerald" : "bg-amber-400")}
              />
              {availabilityLabels[worker.availability]}
            </span>
          </Fact>
        </dl>
      </div>
    </section>
  );
}

function Fact({ label, icon: Icon, children }: { label: string; icon?: typeof Home; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 bg-card px-4 py-4 sm:px-5">
      <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {Icon && <Icon aria-hidden className="size-3.5" />}
        {label}
      </dt>
      <dd className="text-sm font-semibold text-navy">{children}</dd>
    </div>
  );
}
