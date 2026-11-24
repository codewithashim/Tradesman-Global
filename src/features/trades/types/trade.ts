/**
 * Trade domain types. Shapes are plain, serializable objects so they map 1:1
 * to a future API / Mongoose document (slug doubles as the public identifier).
 */

export type TradeCategoryId =
  | "construction"
  | "mechanical-electrical"
  | "metal-fabrication"
  | "finishing-interiors"
  | "equipment-operations"
  | "hospitality"
  | "manufacturing";

/** Icon keys are stored as strings (not components) so data stays serializable. */
export type TradeIconKey =
  | "brick"
  | "hammer"
  | "grid"
  | "scaffold"
  | "zap"
  | "droplet"
  | "wind"
  | "pipe"
  | "flame"
  | "anvil"
  | "paint"
  | "tiles"
  | "trowel"
  | "excavator"
  | "crane"
  | "truck"
  | "car"
  | "chef"
  | "shirt";

export type TradeDemandLevel = "high" | "growing" | "steady";

export interface TradeCategory {
  id: TradeCategoryId;
  name: string;
  description: string;
}

export interface Trade {
  slug: string;
  name: string;
  categoryId: TradeCategoryId;
  icon: TradeIconKey;
  /** One line, used on cards. */
  summary: string;
  /** Longer copy for the trade detail page. */
  description: string;
  keySkills: string[];
  commonCertifications: string[];
  demand: TradeDemandLevel;
}

export interface TradeCategoryWithTrades extends TradeCategory {
  trades: Trade[];
}
