import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/animations";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { getCandidateCountsByTrade } from "@/features/candidates";
import { TradeCategoryDirectory, TradesHero, getTradeCategoriesWithTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Trade categories",
  description: "Browse skilled trades by category — construction, M&E, welding, finishing, equipment, hospitality and garments.",
};

export default async function TradeCategoriesPage() {
  const [categories, counts] = await Promise.all([getTradeCategoriesWithTrades(), getCandidateCountsByTrade()]);
  const tradeCount = categories.reduce((total, category) => total + category.trades.length, 0);
  const profileCount = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <PageTransition>
      <div>
        <TradesHero
          breadcrumbs={<Breadcrumbs tone="light" items={[{ label: "Home", href: routes.home }, { label: "Trades" }]} />}
          stats={[
            { value: tradeCount, label: "trades" },
            { value: categories.length, label: "categories" },
            { value: profileCount, label: "reviewed profiles" },
          ]}
        />
        <Container className="pb-20 pt-8 sm:pb-28 sm:pt-10">
          <TradeCategoryDirectory categories={categories} counts={counts} />
        </Container>
      </div>
    </PageTransition>
  );
}
