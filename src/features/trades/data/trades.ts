import type { Trade } from "../types/trade";

/** Mock data — replaced by an API call in Phase 2. */
export const trades: Trade[] = [
  // Construction & Civil
  {
    slug: "mason",
    name: "Mason",
    categoryId: "construction",
    icon: "brick",
    summary: "Block, brick and stone work for walls, columns and facades.",
    description:
      "Masons lay block, brick and stone to drawings, setting out lines and levels, mixing mortar to spec and finishing joints cleanly. Experienced masons can read structural drawings and lead small gangs.",
    keySkills: ["Block & brick laying", "Setting out & levelling", "Stone cladding", "Reading drawings"],
    commonCertifications: ["NVQ Level 2 Trowel Occupations", "National trade test certificate"],
    demand: "high",
  },
  {
    slug: "carpenter",
    name: "Carpenter",
    categoryId: "construction",
    icon: "hammer",
    summary: "Formwork, framing and joinery on site and in the workshop.",
    description:
      "Carpenters build and strip formwork, erect timber framing, and install doors, frames and fixtures. Shuttering carpenters are especially sought after on concrete-heavy projects.",
    keySkills: ["Shuttering / formwork", "Timber framing", "Door & frame installation", "Power tools"],
    commonCertifications: ["NVQ Level 2 Carpentry", "National trade test certificate"],
    demand: "high",
  },
  {
    slug: "steel-fixer",
    name: "Steel Fixer",
    categoryId: "construction",
    icon: "grid",
    summary: "Cutting, bending and fixing rebar to structural drawings.",
    description:
      "Steel fixers cut, bend and tie reinforcement bars to bar-bending schedules, ensuring correct cover, spacing and laps before concrete is poured.",
    keySkills: ["Reading bar-bending schedules", "Rebar cutting & bending", "Tying & spacing", "Cover checks"],
    commonCertifications: ["National trade test certificate"],
    demand: "high",
  },
  {
    slug: "scaffolder",
    name: "Scaffolder",
    categoryId: "construction",
    icon: "scaffold",
    summary: "Erecting and dismantling safe access scaffolds.",
    description:
      "Scaffolders erect, alter and dismantle tube-and-fitting and system scaffolds, working at height to strict safety standards.",
    keySkills: ["Tube & fitting", "System scaffolding", "Working at height", "Inspection & tagging"],
    commonCertifications: ["CISRS card", "Working at Height certificate"],
    demand: "steady",
  },

  // Mechanical & Electrical
  {
    slug: "electrician",
    name: "Electrician",
    categoryId: "mechanical-electrical",
    icon: "zap",
    summary: "Installation and maintenance of building electrical systems.",
    description:
      "Electricians install conduit, cabling, distribution boards and fittings, then test and commission circuits. Industrial electricians also work on motors, controls and panels.",
    keySkills: ["Wiring & conduit", "DB installation", "Testing & commissioning", "Fault finding"],
    commonCertifications: ["Electrical installation licence", "NVQ Level 3 Electrotechnical"],
    demand: "high",
  },
  {
    slug: "plumber",
    name: "Plumber",
    categoryId: "mechanical-electrical",
    icon: "droplet",
    summary: "Water supply, drainage and sanitary installations.",
    description:
      "Plumbers install and maintain water supply, drainage and sanitary systems in residential and commercial buildings, including pressure testing and fixture installation.",
    keySkills: ["PPR / CPVC / copper piping", "Drainage", "Sanitary fixtures", "Pressure testing"],
    commonCertifications: ["NVQ Level 2 Plumbing", "National trade test certificate"],
    demand: "growing",
  },
  {
    slug: "hvac-technician",
    name: "HVAC Technician",
    categoryId: "mechanical-electrical",
    icon: "wind",
    summary: "Air-conditioning, ventilation and refrigeration systems.",
    description:
      "HVAC technicians install, service and repair split units, chillers, ducting and ventilation systems — essential trades in hot-climate markets.",
    keySkills: ["Split & VRF systems", "Ducting", "Refrigerant handling", "Preventive maintenance"],
    commonCertifications: ["Refrigerant handling certificate", "HVAC diploma"],
    demand: "high",
  },
  {
    slug: "pipe-fitter",
    name: "Pipe Fitter",
    categoryId: "mechanical-electrical",
    icon: "pipe",
    summary: "Industrial piping for plants, refineries and process systems.",
    description:
      "Pipe fitters read isometrics, cut, fit and align carbon and stainless pipework for oil & gas, power and process plants, working closely with welders.",
    keySkills: ["Reading isometrics", "Fit-up & alignment", "Flange & valve installation", "Hydro testing"],
    commonCertifications: ["Pipe fitter trade certificate"],
    demand: "growing",
  },

  // Welding & Metal Fabrication
  {
    slug: "welder",
    name: "Welder",
    categoryId: "metal-fabrication",
    icon: "flame",
    summary: "Coded welders across SMAW, GTAW, GMAW and FCAW processes.",
    description:
      "Welders join structural steel and pipe to qualified procedures. Coded welders holding 6G pipe qualifications are among the most in-demand trades worldwide.",
    keySkills: ["SMAW / Stick", "GTAW / TIG", "GMAW / MIG", "6G pipe positions"],
    commonCertifications: ["ASME IX qualification", "AWS D1.1", "ISO 9606-1"],
    demand: "high",
  },
  {
    slug: "fabricator",
    name: "Steel Fabricator",
    categoryId: "metal-fabrication",
    icon: "anvil",
    summary: "Shop fabrication of structural steel and metalwork.",
    description:
      "Fabricators mark out, cut, drill and assemble steel members and metalwork in the shop, working from fabrication drawings to tight tolerances.",
    keySkills: ["Marking out", "Cutting & drilling", "Fit-up & tacking", "Reading fabrication drawings"],
    commonCertifications: ["Fabrication trade certificate"],
    demand: "steady",
  },

  // Finishing & Interiors
  {
    slug: "painter",
    name: "Painter",
    categoryId: "finishing-interiors",
    icon: "paint",
    summary: "Surface preparation, decorative and protective coatings.",
    description:
      "Painters prepare surfaces and apply decorative and protective coatings by brush, roller and spray, including industrial coatings on steel structures.",
    keySkills: ["Surface preparation", "Spray application", "Decorative finishes", "Protective coatings"],
    commonCertifications: ["NVQ Level 2 Painting & Decorating"],
    demand: "steady",
  },
  {
    slug: "tiler",
    name: "Tiler",
    categoryId: "finishing-interiors",
    icon: "tiles",
    summary: "Ceramic, porcelain and natural stone tiling.",
    description:
      "Tilers set out and fix ceramic, porcelain and stone tiles on floors and walls, including waterproofing and large-format tile work.",
    keySkills: ["Setting out", "Large-format tiles", "Waterproofing", "Stone & marble"],
    commonCertifications: ["NVQ Level 2 Wall & Floor Tiling"],
    demand: "growing",
  },
  {
    slug: "plasterer",
    name: "Plasterer",
    categoryId: "finishing-interiors",
    icon: "trowel",
    summary: "Internal plastering, rendering and gypsum work.",
    description:
      "Plasterers apply cement render and gypsum plaster to walls and ceilings, and install drywall and false ceilings on interior fit-out projects.",
    keySkills: ["Cement render", "Gypsum plaster", "Drywall & false ceilings", "Finishing"],
    commonCertifications: ["NVQ Level 2 Plastering"],
    demand: "steady",
  },

  // Equipment & Operations
  {
    slug: "heavy-equipment-operator",
    name: "Heavy Equipment Operator",
    categoryId: "equipment-operations",
    icon: "excavator",
    summary: "Excavators, loaders, graders and rollers.",
    description:
      "Heavy equipment operators run earthmoving machinery for excavation, grading and compaction on infrastructure and building sites.",
    keySkills: ["Excavator", "Wheel loader", "Grader", "Daily machine checks"],
    commonCertifications: ["Heavy equipment licence", "Third-party operator certificate"],
    demand: "high",
  },
  {
    slug: "crane-operator",
    name: "Crane Operator",
    categoryId: "equipment-operations",
    icon: "crane",
    summary: "Tower, mobile and crawler crane operation.",
    description:
      "Crane operators lift and place loads safely using tower, mobile and crawler cranes, working with riggers and signalmen to lift plans.",
    keySkills: ["Tower crane", "Mobile crane", "Load charts", "Working with riggers"],
    commonCertifications: ["Crane operator licence", "Third-party operator certificate"],
    demand: "growing",
  },
  {
    slug: "heavy-vehicle-driver",
    name: "Heavy Vehicle Driver",
    categoryId: "equipment-operations",
    icon: "truck",
    summary: "Trucks, trailers and site transport.",
    description:
      "Heavy vehicle drivers transport materials and equipment between sites, handling trailers, tippers and transit mixers safely.",
    keySkills: ["Trailer & tipper", "Transit mixer", "Vehicle inspection", "Route planning"],
    commonCertifications: ["Heavy vehicle driving licence"],
    demand: "steady",
  },
  {
    slug: "light-vehicle-driver",
    name: "Light Vehicle Driver",
    categoryId: "equipment-operations",
    icon: "car",
    summary: "Cars, vans and pickups for staff transport and deliveries.",
    description:
      "Light vehicle drivers transport staff, goods and documents safely, keep vehicles inspected and logbooks up to date, and know local traffic rules.",
    keySkills: ["Staff transport", "Delivery routes", "Vehicle checks", "GPS navigation"],
    commonCertifications: ["Light vehicle driving licence"],
    demand: "high",
  },

  // Hospitality & Catering
  {
    slug: "chef",
    name: "Chef & Cook",
    categoryId: "hospitality",
    icon: "chef",
    summary: "Hotel, restaurant and camp kitchens — South Asian, Arabic and continental.",
    description:
      "Chefs and cooks prepare food to recipe and hygiene standards in hotel, restaurant and labour-camp kitchens, from line cooking to running a section.",
    keySkills: ["Food preparation", "Food hygiene (HACCP)", "Bulk cooking", "Menu costing"],
    commonCertifications: ["Food safety certificate", "Culinary diploma"],
    demand: "growing",
  },

  // Garments & Factory
  {
    slug: "garments-machine-operator",
    name: "Garments Machine Operator",
    categoryId: "manufacturing",
    icon: "shirt",
    summary: "Sewing, overlock and finishing for garment factories.",
    description:
      "Garments machine operators run single-needle, overlock and flatlock machines to production targets, with an eye for stitch quality and line efficiency.",
    keySkills: ["Single-needle", "Overlock / flatlock", "Quality checks", "Production targets"],
    commonCertifications: ["Garments skills certificate"],
    demand: "steady",
  },
];
