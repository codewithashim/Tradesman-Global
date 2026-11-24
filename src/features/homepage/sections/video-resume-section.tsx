import Image from "next/image";
import { Eye, Hammer, Images, MessageCircle, Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { SectionIntro } from "@/components/shared/section-intro";
import { siteImages } from "@/config/images";

const benefits = [
  { icon: Hammer, title: "Watch real work demonstrations", text: "See a weld laid, a panel wired or a wall set out — not just a job title." },
  { icon: Eye, title: "Understand practical experience", text: "Hear workers explain the projects, tools and materials they know." },
  { icon: MessageCircle, title: "See communication and presentation", text: "Judge language level and confidence before the first call." },
  { icon: Images, title: "Explore work samples", text: "Every video sits next to a portfolio of photos from real sites." },
];

const chapters = ["Introduction", "Live demonstration", "Tools & safety"];

export function VideoResumeSection() {
  const image = siteImages.videoResume;
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Visual: video resume preview composition */}
        <Reveal>
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy shadow-float sm:aspect-[5/5]">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-center" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent" />

              <div aria-hidden className="absolute inset-0 grid place-items-center">
                <span className="relative grid size-20 place-items-center rounded-full bg-white/95 text-primary shadow-float">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]" />
                  <Play className="relative ml-1 size-8" fill="currentColor" />
                </span>
              </div>

              {/* Player chrome */}
              <div aria-hidden className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/20 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span>Video resume · Welder</span>
                  <span className="tabular-nums text-white/70">0:36 / 1:34</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-brand-blue to-white" />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {chapters.map((chapter, i) => (
                    <span
                      key={chapter}
                      className={i === 1 ? "rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-navy" : "rounded-full bg-white/15 px-2.5 py-1 text-[11px]"}
                    >
                      {chapter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div aria-hidden className="absolute -right-3 top-8 hidden animate-float rounded-2xl bg-card px-4 py-3 shadow-float ring-1 ring-border sm:-right-8 sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Languages</p>
              <p className="mt-0.5 text-sm font-bold text-navy">Bengali · English · Arabic</p>
            </div>
            <figcaption className="mt-4 text-center text-xs text-muted-foreground">Illustration of a video resume layout</figcaption>
          </figure>
        </Reveal>

        {/* Copy */}
        <div className="flex flex-col gap-10">
          <SectionIntro
            eyebrow="Video resumes"
            title="Watch the work,"
            highlight="not just the CV."
            description="A one- to two-minute video lets a worker show their trade in action and introduce themselves in their own words."
          />
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 80} className="h-full">
                  <div className="h-full rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border/70">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-b from-brand-blue to-primary text-white">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="mt-4 font-bold text-navy">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
