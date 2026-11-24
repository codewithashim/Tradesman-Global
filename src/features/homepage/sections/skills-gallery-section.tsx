import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionIntro } from "@/components/shared/section-intro";
import { routes } from "@/lib/constants/routes";
import { TradeShowcase } from "../components/trade-showcase";
import type { PopularTradeCardData } from "../types/homepage";

export function SkillsGallerySection({ trades }: { trades: PopularTradeCardData[] }) {
  return (
    <section className="bg-card py-20 sm:py-28 lg:py-32">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <SectionIntro
          eyebrow="Explore by trade"
          title="Skilled hands for every kind of work."
          action={
            <ButtonLink href={routes.tradeCategories} variant="secondary">
              All trades <ArrowUpRight />
            </ButtonLink>
          }
        />
        <TradeShowcase trades={trades} />
      </Container>
    </section>
  );
}
