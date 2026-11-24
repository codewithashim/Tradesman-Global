import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { Magnetic, SplitReveal } from "@/components/animations";
import { siteImages, type SiteImageKey } from "@/config/images";
import { routes } from "@/lib/constants/routes";

const strip: SiteImageKey[] = ["welding", "chef", "electrical", "masonry", "driver", "plumbing", "garments", "hvac"];

export function FinalCtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep pb-16 pt-20 text-white sm:pb-24 sm:pt-28 lg:pt-36">
      <div aria-hidden className="absolute -bottom-40 left-1/2 -z-10 size-[56rem] -translate-x-1/2 rounded-full bg-primary/30 blur-[150px]" />

      <Container className="flex flex-col items-start">
        <SplitReveal as="h2" className="type-display max-w-5xl text-[3.2rem] text-balance sm:text-7xl lg:text-[7.5rem]">
          Your skills deserve a global stage.
        </SplitReveal>
        <div className="mt-10 flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <p className="text-lg leading-8 text-white/70">Build your worker profile today. It’s free, and it’s yours.</p>
          </div>
          <Magnetic>
            <ButtonLink href={routes.register} size="lg" variant="secondary" className="h-16 w-full bg-white px-9 text-lg text-navy ring-0 hover:bg-sky sm:w-auto">
              Create your free profile <ArrowRight />
            </ButtonLink>
          </Magnetic>
        </div>
      </Container>

      {/* A slow reel of the trades on the platform. */}
      <div aria-hidden className="mt-16 -rotate-2 sm:mt-24">
        <div className="flex w-max animate-marquee gap-3 sm:gap-4">
          {[...strip, ...strip].map((key, i) => (
            <div key={i} className="relative h-40 w-56 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80 sm:rounded-3xl">
              <Image src={siteImages[key].src} alt="" fill sizes="(min-width: 640px) 20rem, 14rem" className="object-cover opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
