import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/section-heading";
import { TradeCategoryDirectory, getTradeCategoriesWithTrades } from "@/features/trades";
import { routes } from "@/lib/constants/routes";

export const metadata: Metadata = {
  title: "Trade categories",
  description: "Browse skilled trades by category — construction, M&E, welding, finishing and equipment operation.",
};

export default async function TradeCategoriesPage() {
  const categories = await getTradeCategoriesWithTrades();
  const tradeCount = categories.reduce((total, category) => total + category.trades.length, 0);

  return (
    <Container className="flex flex-col gap-10 py-10 sm:py-14">
      <Breadcrumbs items={[{ label: "Home", href: routes.home }, { label: "Trade categories" }]} />
      <SectionHeading
        as="h1"
        eyebrow={`${tradeCount} trades · ${categories.length} categories`}
        title="Find workers by trade"
        description="Every candidate is listed under a primary trade. Pick a trade to see the skills and certifications employers look for, and where those workers are in demand."
      />
      <TradeCategoryDirectory categories={categories} />
    </Container>
  );
}
