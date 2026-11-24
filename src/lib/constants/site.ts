import { routes } from "./routes";

export type SocialNetwork = "facebook" | "youtube" | "whatsapp" | "tiktok" | "instagram";

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
    { network: "facebook", label: "Facebook", url: null },
    { network: "youtube", label: "YouTube", url: null },
    { network: "whatsapp", label: "WhatsApp", url: null },
    { network: "tiktok", label: "TikTok", url: null },
    { network: "instagram", label: "Instagram", url: null },
  ] as { network: SocialNetwork; label: string; url: string | null }[],
} as const;

export const mainNav = [
  { label: "Find Workers", href: routes.findCandidates },
  { label: "Trades", href: routes.tradeCategories },
  { label: "Destinations", href: routes.destinations },
  { label: "How It Works", href: routes.howItWorks },
] as const;
