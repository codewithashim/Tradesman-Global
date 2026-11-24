import { BadgeCheck, Clapperboard, Eye, Images, MessageSquareText, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/shared/section-intro";
import { ReviewScreen, SignUpScreen, SkillsScreen, VideoScreen } from "../components/phone-screens";
import { StepStory, type StoryStep } from "../components/step-story";

const steps: StoryStep[] = [
  {
    title: "Create a free profile",
    text: "Sign up with your phone number. It takes a few minutes and costs nothing.",
    screen: <SignUpScreen />,
    notes: [
      { icon: <MessageSquareText />, label: "Code sent by SMS" },
      { icon: <BadgeCheck />, label: "Free, no fees ever" },
    ],
  },
  {
    title: "Show your skills",
    text: "Pick your trade, then the skills, tools and projects you know best.",
    screen: <SkillsScreen />,
    notes: [
      { icon: <Sparkles />, label: "5 skills added" },
      { icon: <BadgeCheck />, label: "Welder, 8 years" },
    ],
  },
  {
    title: "Add a video resume",
    text: "Record one or two minutes of you at work, and add photos of jobs you’ve finished.",
    screen: <VideoScreen />,
    notes: [
      { icon: <Clapperboard />, label: "Video, 1:34" },
      { icon: <Images />, label: "6 work photos" },
    ],
  },
  {
    title: "Get reviewed, get seen",
    text: "Our team checks your profile. Once approved, employers can find you.",
    screen: <ReviewScreen />,
    notes: [
      { icon: <ShieldCheck />, label: "Checked by our team" },
      { icon: <Eye />, label: "Visible to employers" },
    ],
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden bg-linear-to-b from-background via-sky/60 to-background py-20 sm:py-28 lg:py-0">
      <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
      <Container className="relative">
        <StepStory
          intro={<SectionIntro eyebrow="For workers" title="Four steps to a profile employers can see." description="Free from start to finish." />}
          steps={steps}
        />

        <div className="mt-16 flex flex-col gap-4 rounded-[1.75rem] bg-navy p-6 text-white sm:flex-row sm:items-center sm:gap-6 sm:p-8 lg:mb-24 lg:mt-0">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-brand-blue ring-1 ring-white/15">
            <Search aria-hidden className="size-5" />
          </span>
          <p className="text-base leading-7 text-white/80">
            <strong className="font-semibold text-white">Hiring?</strong> Browse reviewed profiles, filter by trade and destination, watch
            video resumes and contact our team about a worker. No account needed.
          </p>
        </div>
      </Container>
    </section>
  );
}
