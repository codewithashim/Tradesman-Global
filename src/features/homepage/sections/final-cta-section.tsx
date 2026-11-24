import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { siteImages } from "@/config/images";
import { routes } from "@/lib/constants/routes";

export function FinalCtaSection() {
  const image = siteImages.siteAerial;
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep px-5 py-14 text-center shadow-float sm:rounded-[2.5rem] sm:px-16 sm:py-28">
          <Image src={image.src} alt="" fill sizes="(min-width: 1280px) 1152px, 100vw" className="-z-20 object-cover opacity-35" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep via-navy-deep/85 to-primary/60" />
          <div aria-hidden className="absolute -top-32 left-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-blue/30 blur-[120px]" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Free for workers</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-white text-balance sm:text-6xl">
            Your Skills Deserve{" "}
            <span className="bg-gradient-to-r from-brand-blue to-sky bg-clip-text text-transparent">Global Opportunities.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/75">
            Build your professional worker profile and let the world discover what you can do.
          </p>
          <p lang="bn" className="mx-auto mt-2 max-w-xl text-white/60">
            আজই আপনার ফ্রি প্রোফাইল তৈরি করুন।
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={routes.register} size="lg" variant="secondary" className="bg-white text-navy ring-0 hover:bg-sky max-sm:w-full">
              Create Your Free Profile <ArrowRight />
            </ButtonLink>
            <ButtonLink href={routes.findCandidates} size="lg" variant="ghost" className="text-white hover:bg-white/10">
              Explore workers
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
