import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/shared/section-intro";
import { HowItWorksTabs } from "../components/how-it-works-tabs";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-sky/60 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-x-0 top-0 h-full bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container className="relative flex flex-col gap-14">
        <SectionIntro
          align="center"
          eyebrow="How it works"
          title="Four simple"
          highlight="steps."
          description="Whether you’re showing your skills or looking for them, getting started takes minutes."
        />
        <HowItWorksTabs />
      </Container>
    </section>
  );
}
