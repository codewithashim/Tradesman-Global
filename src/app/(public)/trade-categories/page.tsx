import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageIntro } from "@/components/shared/page-intro";
import { TradeCategoryDirectory, getTradeCategoriesWithTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Trade categories",
  description: "Browse skilled trades by category — construction, M&E, welding, finishing, equipment, hospitality and garments.",
};

export default async function TradeCategoriesPage() {
  const categories = await getTradeCategoriesWithTrades();
  const tradeCount = categories.reduce((total, category) => total + category.trades.length, 0);

  return (
    <>
      <PageIntro
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Trades" }]} />}
        eyebrow={`${tradeCount} trades · ${categories.length} categories`}
        title="Find workers"
        highlight="by trade."
        description="Every worker lists a primary trade. Pick one to see the skills and certificates employers look for — and where those workers are in demand."
      />
      <Container className="-mt-14 pb-16 sm:-mt-16 sm:pb-24">
        <TradeCategoryDirectory categories={categories} />
      </Container>
    </>
  );
}
