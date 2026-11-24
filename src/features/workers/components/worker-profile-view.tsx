import type { ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionNav, type SectionNavItem } from "@/components/shared/section-nav";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";
import { PortfolioGallery } from "./portfolio-gallery";
import { VideoResumePlayer } from "./video-resume-player";
import { WorkHistoryTimeline } from "./work-history-timeline";
import { WorkerProfileHero } from "./worker-profile-hero";
import { WorkerProfileSidebar } from "./worker-profile-sidebar";

interface WorkerProfileViewProps {
  worker: WorkerProfile;
  breadcrumbs: ReactNode;
  /** Server-rendered flags keyed by country slug; the route joins them in. */
  destinationFlags: Record<string, ReactNode>;
}

/** Full public profile, presented as a digital portfolio. */
export function WorkerProfileView({ worker, breadcrumbs, destinationFlags }: WorkerProfileViewProps) {
  const firstName = worker.fullName.split(" ").find((p) => !p.endsWith(".")) ?? worker.fullName;

  const nav: SectionNavItem[] = [
    { id: "about", label: "About" },
    ...(worker.videoResume ? [{ id: "video", label: "Video" }] : []),
    ...(worker.portfolio.length > 0 ? [{ id: "portfolio", label: "Portfolio", badge: worker.portfolio.length }] : []),
    { id: "experience", label: "Experience", badge: worker.workHistory.length },
  ];

  const glance = [
    { value: worker.yearsOfExperience, label: "years in the trade" },
    { value: worker.workHistory.length, label: "jobs listed" },
    { value: worker.portfolio.length, label: "work samples" },
    { value: worker.languages.length, label: worker.languages.length === 1 ? "language" : "languages" },
  ];

  return (
    <>
      <WorkerProfileHero worker={worker} breadcrumbs={breadcrumbs} destinationFlags={destinationFlags} />

      <Container className="pb-16 pt-8 sm:pt-10">
        <SectionNav items={nav} label="Profile sections" className="sticky top-[4.5rem] z-30 mb-8 w-fit max-w-full lg:top-[5.25rem]" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_22rem] xl:gap-10">
          <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
            <ProfileSection id="about" title={`About ${firstName}`}>
              <p className="max-w-prose text-lg leading-8 text-navy/85 text-pretty sm:text-xl sm:leading-9">{worker.bio}</p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border/70 ring-1 ring-border/70 sm:grid-cols-4">
                {glance.map((g) => (
                  <div key={g.label} className="flex flex-col-reverse bg-card p-4 sm:p-5">
                    <dt className="mt-1 text-xs text-muted-foreground">{g.label}</dt>
                    <dd className="type-display text-4xl text-navy">{g.value}</dd>
                  </div>
                ))}
              </dl>
            </ProfileSection>

            {worker.videoResume && (
              <section id="video" aria-labelledby="video-title" className="scroll-mt-40">
                <h2 id="video-title" className="type-display mb-5 text-3xl text-navy sm:text-4xl">
                  Watch {firstName} at work
                </h2>
                <VideoResumePlayer video={worker.videoResume} workerName={worker.fullName} tradeName={worker.trade.name} languages={worker.languages} />
              </section>
            )}

            {worker.portfolio.length > 0 && (
              <ProfileSection id="portfolio" title="Projects & work samples" count={worker.portfolio.length}>
                <PortfolioGallery items={worker.portfolio} />
              </ProfileSection>
            )}

            <ProfileSection id="experience" title="Work history">
              <WorkHistoryTimeline entries={worker.workHistory} />
            </ProfileSection>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <WorkerProfileSidebar worker={worker} destinationFlags={destinationFlags} />
          </aside>
        </div>
      </Container>

      {/* Mobile: persistent primary action, above the tab bar's raised button */}
      <div className="fixed inset-x-0 bottom-tabbar-raised z-40 px-3 lg:hidden">
        <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
          <Button size="lg" variant="dark" className="h-14 w-full shadow-[0_20px_40px_-12px_rgb(7_29_53/0.6)] ring-1 ring-white/10">
            <MessageSquare /> Contact Admin about {firstName}
          </Button>
        </ContactAdminDialog>
      </div>
    </>
  );
}

function ProfileSection({ id, title, count, children }: { id: string; title: string; count?: number; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-40 rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/70 sm:p-9">
      <h2 id={`${id}-title`} className="type-display mb-6 flex items-baseline gap-3 text-3xl text-navy sm:text-4xl">
        {title}
        {count !== undefined && <span className="font-sans text-base font-semibold tracking-normal text-muted-foreground">{count}</span>}
      </h2>
      {children}
    </section>
  );
}
