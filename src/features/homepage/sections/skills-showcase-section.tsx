import Image from "next/image";
import type { ReactNode } from "react";
import { Check, Info, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionIntro } from "@/components/shared/section-intro";
import { siteImages } from "@/config/images";

const profileParts = [
  "Primary trade and specialised skills",
  "Years of experience and the kinds of projects",
  "Tools and equipment they can handle",
  "Photos of finished work",
];

/** Example data for the illustrative profile card (not a real person). */
const example = {
  trade: "Electrician",
  years: 8,
  skills: ["Conduit & wiring", "DB installation", "Testing", "Lighting", "Fault finding"],
  workTypes: ["Residential towers", "Shopping malls", "Factories"],
  tools: ["Multimeter", "Insulation tester", "Conduit bender", "Crimping tools"],
  samples: [siteImages.electrical, siteImages.onSite, siteImages.siteAerial],
};

export function SkillsShowcaseSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div aria-hidden className="absolute -right-40 top-10 size-[30rem] rounded-full bg-brand-blue/15 blur-3xl" />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Copy */}
        <div className="flex flex-col gap-8">
          <SectionIntro
            eyebrow="Skills & experience"
            title="A profile that shows"
            highlight="what you can do."
            description="Workers build a structured profile instead of a paper CV, so employers can compare skills at a glance."
          />
          <ul className="flex flex-col gap-3">
            {profileParts.map((part) => (
              <li key={part} className="flex items-center gap-3 text-navy">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald/15 text-emerald">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                <span className="font-medium">{part}</span>
              </li>
            ))}
          </ul>
          <p className="flex gap-2.5 rounded-2xl bg-card/80 p-4 text-sm leading-6 text-muted-foreground ring-1 ring-border/70">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
            Skills are self-declared by the worker. Our team reviews each profile before it’s listed, but a reviewed
            profile is not a skills certification.
          </p>
        </div>

        {/* Visual: example structured profile */}
        <Reveal>
          <div aria-label="Example of a structured skills profile" role="img" className="relative">
            <div className="rounded-[2rem] bg-card p-6 shadow-float ring-1 ring-border/70 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Primary trade</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-navy">
                    <span className="grid size-9 place-items-center rounded-xl bg-sky text-primary">
                      <Wrench className="size-4.5" />
                    </span>
                    {example.trade}
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-b from-brand-blue to-primary px-4 py-2.5 text-center text-white">
                  <p className="text-3xl font-extrabold leading-none">{example.years}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">Years</p>
                </div>
              </div>

              <ExampleGroup label="Specialised skills">
                {example.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    {skill}
                  </span>
                ))}
              </ExampleGroup>

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                <ExampleGroup label="Work types">
                  {example.workTypes.map((type) => (
                    <span key={type} className="rounded-full bg-muted px-3 py-1.5 text-sm text-navy">
                      {type}
                    </span>
                  ))}
                </ExampleGroup>
                <ExampleGroup label="Tools & equipment">
                  {example.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-border px-3 py-1.5 text-sm text-navy">
                      {tool}
                    </span>
                  ))}
                </ExampleGroup>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio samples</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {example.samples.map((sample) => (
                  <div key={sample.src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={sample.src} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <span className="absolute -left-3 -top-4 rounded-full bg-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-float sm:-left-6">
              Example profile
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ExampleGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
