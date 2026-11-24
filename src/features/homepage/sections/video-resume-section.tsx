import Image from "next/image";
import { Play } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ScrollExpand } from "@/components/animations";
import { SectionIntro } from "@/components/shared/section-intro";
import { siteImages } from "@/config/images";

const chapters = ["Introduction", "Live demonstration", "Tools & safety"];

const points = [
  { title: "See the work", text: "A weld laid, a panel wired, a wall set out — not just a job title." },
  { title: "Hear the experience", text: "Workers explain the projects, tools and materials they know." },
  { title: "Judge communication", text: "Language and confidence, before the first call." },
];

export function VideoResumeSection() {
  const image = siteImages.videoResume;
  const thumbs = [siteImages.welding, siteImages.electrical, siteImages.masonry];

  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28 lg:py-36">
      <div aria-hidden className="absolute left-1/2 top-0 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]" />

      <Container className="relative">
        <SectionIntro
          tone="light"
          eyebrow="Video resumes"
          title="Watch the work, not just the CV."
          description="A one- to two-minute video lets a worker show their trade in action and introduce themselves in their own words."
        />
      </Container>

      <ScrollExpand className="relative mx-auto mt-12 max-w-[96rem] sm:mt-16">
        <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] max-md:mx-4 sm:aspect-[16/9] md:rounded-none">
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/10 to-navy-deep/40" />

          {/* Illustrative player chrome */}
          <div aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-20 place-items-center rounded-full bg-white text-primary shadow-2xl sm:size-28">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.6s]" />
              <Play className="relative ml-1 size-8 sm:size-10" fill="currentColor" />
            </span>
          </div>

          <div aria-hidden className="absolute left-4 top-4 rounded-2xl bg-white/10 px-4 py-2.5 ring-1 ring-white/20 backdrop-blur-md sm:left-10 sm:top-10">
            <p className="text-[11px] text-white/60">Speaks</p>
            <p className="text-sm font-semibold">Bengali, English, Arabic</p>
          </div>

          <div aria-hidden className="absolute right-4 top-4 hidden gap-2 sm:right-10 sm:top-10 sm:flex">
            {thumbs.map((thumb, i) => (
              <span key={thumb.src} style={{ rotate: `${(i - 1) * 4}deg` }} className="relative size-16 overflow-hidden rounded-xl ring-2 ring-white/80 lg:size-20">
                <Image src={thumb.src} alt="" fill sizes="80px" className="object-cover" />
              </span>
            ))}
          </div>

          <div aria-hidden className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-md sm:inset-x-10 sm:bottom-10 sm:p-5 lg:left-auto lg:w-[30rem]">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Video resume, welder</span>
              <span className="tabular-nums text-white/70">0:36 / 1:34</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[38%] rounded-full bg-white" />
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
          <figcaption className="sr-only">Illustration of a video resume layout</figcaption>
        </figure>
      </ScrollExpand>

      <Container className="relative mt-12 sm:mt-16">
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {points.map((point) => (
            <li key={point.title} className="border-t border-white/15 pt-5">
              <h3 className="text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{point.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
