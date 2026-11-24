import {
  AirVent,
  Anvil,
  BrickWall,
  Car,
  ChefHat,
  Construction,
  Container,
  Droplet,
  Flame,
  Grid3x3,
  Hammer,
  Layers,
  LayoutGrid,
  type LucideIcon,
  PaintRoller,
  Shirt,
  Shovel,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { TradeIconKey } from "../types/trade";

const icons: Record<TradeIconKey, LucideIcon> = {
  brick: BrickWall,
  hammer: Hammer,
  grid: Grid3x3,
  scaffold: Construction,
  zap: Zap,
  droplet: Droplet,
  wind: AirVent,
  pipe: Wrench,
  flame: Flame,
  anvil: Anvil,
  paint: PaintRoller,
  tiles: LayoutGrid,
  trowel: Layers,
  excavator: Shovel,
  crane: Container,
  truck: Truck,
  car: Car,
  chef: ChefHat,
  shirt: Shirt,
};

interface TradeIconProps {
  icon: TradeIconKey;
  size?: "md" | "lg";
  className?: string;
}

export function TradeIcon({ icon, size = "md", className }: TradeIconProps) {
  const Icon = icons[icon];
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-primary/10 text-foreground ring-1 ring-inset ring-primary/30",
        size === "md" ? "size-10" : "size-14",
        className,
      )}
    >
      <Icon className={size === "md" ? "size-5" : "size-7"} strokeWidth={1.75} />
    </span>
  );
}
