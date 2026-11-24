import { routes } from "./routes";

export const siteConfig = {
  name: "Tradesman Global",
  tagline: "Skilled Bangladeshi workers, ready for the world.",
  copyrightYear: 2026,
  description:
    "Discover skilled Bangladeshi welders, electricians, plumbers, drivers, chefs and technicians through video resumes and work portfolios.",
  /** Placeholders — replace with real contact details before launch. */
  contact: {
    email: "hello@tradesmanglobal.example",
    phone: "+880 1XXX-XXXXXX",
    address: "Dhaka, Bangladesh",
  },
  /** Social channels. `url: null` renders as "coming soon" until accounts exist. */
  social: [
    { label: "Facebook", url: null },
    { label: "YouTube", url: null },
    { label: "WhatsApp", url: null },
    { label: "LinkedIn", url: null },
  ] as { label: string; url: string | null }[],
} as const;

export const mainNav = [
  { label: "Find Workers", href: routes.findCandidates },
  { label: "Trades", href: routes.tradeCategories },
  { label: "Destinations", href: routes.destinations },
  { label: "How It Works", href: routes.howItWorks },
] as const;
