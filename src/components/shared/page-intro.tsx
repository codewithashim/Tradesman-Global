import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "./section-intro";

interface PageIntroProps {
  breadcrumbs?: ReactNode;
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: ReactNode;
  /** Extra content under the heading (e.g. stats). */
  children?: ReactNode;
}

/** Soft-blue rounded intro band used at the top of inner pages (mirrors the homepage hero). */
export function PageIntro({ breadcrumbs, eyebrow, title, highlight, description, children }: PageIntroProps) {
  return (
    <section className="px-3 pt-3 sm:px-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-hero-glow sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative flex flex-col gap-8 pb-24 pt-10 sm:pb-28 sm:pt-12">
          {breadcrumbs}
          <SectionIntro as="h1" eyebrow={eyebrow} title={title} highlight={highlight} description={description} />
          {children}
        </Container>
      </div>
    </section>
  );
}
