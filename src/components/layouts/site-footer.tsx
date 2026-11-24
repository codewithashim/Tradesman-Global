import Link from "next/link";
import { BadgeCheck, ChevronDown, Lock, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SocialIcon } from "@/components/shared/social-icon";
import { routes } from "@/lib/constants/routes";
import { mainNav, siteConfig } from "@/lib/constants/site";
import type { NavLink, SiteNavData } from "./nav-types";

const trustPoints = [
  { icon: BadgeCheck, title: "Reviewed profiles", text: "Our team checks every profile before it’s listed." },
  { icon: Sparkles, title: "Free for workers", text: "Creating and keeping a profile costs nothing." },
  { icon: Lock, title: "Privacy-first contact", text: "Enquiries go through our team, never straight to workers." },
];

export function SiteFooter({ nav }: { nav: SiteNavData }) {
  const columns: { title: string; links: readonly NavLink[] }[] = [
    { title: "Explore", links: [...mainNav, { label: "Create Free Profile", href: routes.register }] },
    ...(nav.trades.length ? [{ title: "Popular trades", links: nav.trades.slice(0, 6) }] : []),
    ...(nav.countries.length ? [{ title: "Destinations", links: nav.countries }] : []),
  ];

  return (
    // Bottom padding on mobile keeps the footer clear of the tab bar.
    <footer className="relative mt-auto overflow-hidden bg-navy-deep pb-tabbar text-white lg:pb-0">
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[36rem] rounded-full bg-primary/25 blur-[120px]" />
      <div
        aria-hidden
        className="type-display pointer-events-none absolute -bottom-3 right-0 select-none text-[clamp(4.5rem,17vw,15rem)] text-white/[0.035]"
      >
        TRADESMAN
      </div>

      <Container className="relative">
        {/* Trust strip */}
        <ul className="grid grid-cols-1 gap-3 border-y border-white/10 py-8 sm:grid-cols-3 sm:gap-6">
          {trustPoints.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-brand-blue">
                <Icon aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="mt-0.5 block text-sm text-white/60">{text}</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Brand + links */}
        <div className="grid gap-10 py-10 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:py-14">
          <div className="flex flex-col gap-5">
            <BrandLogo tone="light" />
            <p className="max-w-xs text-sm leading-6 text-white/60">{siteConfig.description}</p>
            <ul className="flex flex-col gap-2.5 text-sm text-white/80">
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4 text-brand-blue" /> {siteConfig.contact.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 text-brand-blue" /> {siteConfig.contact.email}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden className="size-4 text-brand-blue" /> {siteConfig.contact.phone}
              </li>
            </ul>
            <ul aria-label="Social media" className="flex gap-2">
              {siteConfig.social.map((channel) => (
                <li key={channel.network}>
                  {channel.url ? (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white hover:text-navy"
                    >
                      <SocialIcon network={channel.network} className="size-4" />
                      <span className="sr-only">{channel.label}</span>
                    </a>
                  ) : (
                    <span
                      title={`${channel.label} — coming soon`}
                      className="grid size-10 place-items-center rounded-full bg-white/5 text-white/45 ring-1 ring-white/10"
                    >
                      <SocialIcon network={channel.network} className="size-4" />
                      <span className="sr-only">{channel.label} (coming soon)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: open columns */}
          {columns.map((column) => (
            <div key={column.title} className="hidden lg:block">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{column.title}</h3>
              <FooterLinks links={column.links} />
            </div>
          ))}

          {/* Mobile: accordions (native <details>, no JS) */}
          <div className="divide-y divide-white/10 border-y border-white/10 lg:hidden">
            {columns.map((column) => (
              <details key={column.title} className="group">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
                  {column.title}
                  <ChevronDown aria-hidden className="size-4 text-white/50 transition group-open:rotate-180" />
                </summary>
                <div className="pb-5 pt-1">
                  <FooterLinks links={column.links} compact />
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs leading-5 text-white/45 md:flex-row md:justify-between md:gap-8">
          <p className="max-w-3xl">
            Worker information is provided by the workers themselves. A “Reviewed” badge means our team has checked the
            profile — it is not a certification of skills. Tradesman Global does not currently handle recruitment,
            visas or job placement. Photography from Unsplash.
          </p>
          <p className="shrink-0">
            © {siteConfig.copyrightYear} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterLinks({ links, compact }: { links: readonly NavLink[]; compact?: boolean }) {
  return (
    <ul className={compact ? "grid grid-cols-2 gap-x-4 gap-y-3.5 text-sm" : "mt-5 flex flex-col gap-3 text-sm"}>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="text-white/75 transition hover:text-white">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
