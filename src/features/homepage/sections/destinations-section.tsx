import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/shared/section-intro";
import { CountryFlag } from "@/features/countries";
import { DestinationExplorer } from "../components/destination-explorer";
import type { DestinationRow } from "../types/homepage";

export function DestinationsSection({ destinations }: { destinations: DestinationRow[] }) {
  const flags = Object.fromEntries(
    ["BD", ...destinations.map((d) => d.isoCode)].map((code) => [code, <CountryFlag key={code} code={code} className="w-full" />]),
  );

  return (
    <section id="destinations" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 lg:py-32">
      <div aria-hidden className="absolute -left-40 top-20 size-[32rem] rounded-full bg-primary/10 blur-[120px]" />
      <Container className="relative flex flex-col gap-10 lg:gap-14">
        <SectionIntro
          eyebrow="Global opportunities"
          title={`From Dhaka to ${destinations.length} countries.`}
          description="Workers choose where they’d like to work. Pick a destination to see who’s open to it."
        />
        <DestinationExplorer destinations={destinations} flags={flags} />
      </Container>
    </section>
  );
}
