import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/shared/section-intro";
import { CountryGrid, type Country } from "@/features/countries";

export function DestinationsSection({ destinations }: { destinations: Country[] }) {
  return (
    <section id="destinations" className="scroll-mt-24 bg-sky/60 py-16 sm:py-24 lg:py-32">
      <Container className="flex flex-col gap-10 sm:gap-12">
        <SectionIntro
          eyebrow="Destination countries"
          title="Where Bangladeshi skills"
          highlight="are in demand."
          description="Workers choose the countries they’re open to. Explore what each destination is hiring for."
        />
        <CountryGrid countries={destinations} />
      </Container>
    </section>
  );
}
