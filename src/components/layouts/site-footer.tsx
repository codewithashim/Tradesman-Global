import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { routes } from "@/lib/constants/routes";
import { mainNav, siteConfig } from "@/lib/constants/site";

export interface FooterLink {
  label: string;
  href: string;
}

interface SiteFooterProps {
  /** Supplied by the route layout (from the trades / countries features). */
  tradeLinks?: FooterLink[];
  countryLinks?: FooterLink[];
}

export function SiteFooter({ tradeLinks = [], countryLinks = [] }: SiteFooterProps) {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy-deep text-white">
      {/* Glow + oversized background wordmark (reference: dark footer). */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 size-[36rem] rounded-full bg-primary/25 blur-[120px]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-0 select-none text-[clamp(5rem,16vw,13rem)] font-extrabold leading-none tracking-tighter text-white/[0.035]"
      >
        TRADESMAN
      </div>

      <Container className="relative">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">For skilled workers</p>
            <h2 className="mt-4 bg-gradient-to-r from-white via-white to-brand-blue bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
              Get discovered.
            </h2>
            <p className="mt-3 max-w-md text-lg text-white/70">
              Show your skills, your work and your experience — in one professional profile.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <ButtonLink href={routes.register} variant="secondary" size="lg" className="bg-white text-navy ring-0 hover:bg-sky">
              Create Free Profile <ArrowRight />
            </ButtonLink>
            <p lang="bn" className="text-sm text-white/50">
              সম্পূর্ণ বিনামূল্যে
            </p>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
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
          </div>

          <FooterColumn title="Explore" links={[...mainNav, { label: "Create Free Profile", href: routes.register }]} />
          {tradeLinks.length > 0 && <FooterColumn title="Popular trades" links={tradeLinks} />}
          {countryLinks.length > 0 && <FooterColumn title="Destinations" links={countryLinks} />}
        </div>

        {/* Social */}
        <div className="flex flex-wrap items-center gap-2 pb-10">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Follow us</span>
          {siteConfig.social.map((channel) =>
            channel.url ? (
              <a
                key={channel.label}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
              >
                {channel.label}
              </a>
            ) : (
              <span
                key={channel.label}
                title="Coming soon"
                className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/40"
              >
                {channel.label}
              </span>
            ),
          )}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs leading-5 text-white/45 md:flex-row md:justify-between">
          <p className="max-w-3xl">
            Worker information is provided by the workers themselves. A “Verified” badge means our team has reviewed
            the profile — it is not a certification of skills. Tradesman Global does not currently handle recruitment,
            visas or job placement. Photography from Unsplash.
          </p>
          <p className="shrink-0">© {siteConfig.copyrightYear} {siteConfig.name}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-white/75 transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
