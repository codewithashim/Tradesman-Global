import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TradeDemandLevel } from "../types/trade";

const labels: Record<TradeDemandLevel, string> = {
  high: "High demand",
  growing: "Growing demand",
  steady: "Steady demand",
};

export function TradeDemandBadge({ demand, className }: { demand: TradeDemandLevel; className?: string }) {
  return (
    <Badge variant={demand === "high" ? "brand" : "outline"} className={className}>
      {demand !== "steady" && <TrendingUp aria-hidden className="size-3" />}
      {labels[demand]}
    </Badge>
  );
}
