import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/shared/reveal";
import { SectionIntro } from "@/components/shared/section-intro";
import { siteImages } from "@/config/images";
import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { PopularTrade } from "../data/homepage-content";

export interface PopularTradeCardData extends PopularTrade {
  profileCount: number;
}

/* Bento layout on large screens (4 cols × 3 rows): 1 feature, 1 wide, 6 standard. */
const layout = [
  "lg:col-span-2 lg:row-span-2", // feature
  "", "",
  "lg:col-span-2", // wide
  "", "", "", "",
];

export function PopularTradesSection({ trades }: { trades: PopularTradeCardData[] }) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionIntro
          eyebrow="Popular skills & trades"
          title="Skilled hands for"
          highlight="every kind of work."
          description="Browse workers by the trade they know best — from coded welders to hotel chefs."
          action={
            <ButtonLink href={routes.tradeCategories} variant="secondary">
              All trades <ArrowUpRight />
            </ButtonLink>
          }
        />

        <ul className="grid auto-rows-[15rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[14rem]">
          {trades.map((trade, index) => (
            <li key={trade.tradeSlug} className={cn(layout[index])}>
              <Reveal delay={(index % 4) * 80} className="h-full">
                <TradeTile trade={trade} featured={index === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function TradeTile({ trade, featured }: { trade: PopularTradeCardData; featured: boolean }) {
  const image = siteImages[trade.image];
  return (
    <Link
      href={routes.trade(trade.tradeSlug)}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-navy p-5 text-white shadow-soft ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60 sm:p-6"
    >
      <Image
        src={image.src}
        alt=""
        fill
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="object-cover transition duration-700 ease-out group-hover:scale-105"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-navy-deep/5" />

      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md ring-1 ring-white/20">
          {trade.profileCount} {trade.profileCount === 1 ? "profile" : "profiles"}
        </span>
        <span className="grid size-9 place-items-center rounded-full bg-white text-navy transition group-hover:rotate-45">
          <ArrowUpRight aria-hidden className="size-4" />
        </span>
      </div>

      <div className="relative">
        <h3 className={cn("font-bold tracking-tight", featured ? "text-3xl sm:text-4xl" : "text-xl")}>{trade.title}</h3>
        <p className={cn("mt-1.5 text-white/75", featured ? "max-w-sm text-base" : "text-sm")}>{trade.description}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white/90 transition lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
          Explore workers <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}
