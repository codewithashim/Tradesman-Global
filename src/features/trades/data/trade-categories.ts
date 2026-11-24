import type { TradeCategory } from "../types/trade";

/** Mock data — replaced by an API call in Phase 2. Order here is display order. */
export const tradeCategories: TradeCategory[] = [
  {
    id: "construction",
    name: "Construction & Civil",
    description: "Structural and site trades that build foundations, frames and formwork.",
  },
  {
    id: "mechanical-electrical",
    name: "Mechanical & Electrical",
    description: "Building services — power, water, ventilation and piping systems.",
  },
  {
    id: "metal-fabrication",
    name: "Welding & Metal Fabrication",
    description: "Certified welders and fabricators for structural steel, pipelines and plant.",
  },
  {
    id: "finishing-interiors",
    name: "Finishing & Interiors",
    description: "The trades that make a building ready to hand over.",
  },
  {
    id: "equipment-operations",
    name: "Equipment & Operations",
    description: "Licensed operators and drivers for heavy machinery and site logistics.",
  },
  {
    id: "hospitality",
    name: "Hospitality & Catering",
    description: "Chefs and kitchen staff for hotels, restaurants and contract catering.",
  },
  {
    id: "manufacturing",
    name: "Garments & Factory",
    description: "Machine operators and production workers for garment and manufacturing plants.",
  },
];
