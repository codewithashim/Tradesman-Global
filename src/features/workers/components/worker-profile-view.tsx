import type { ReactNode } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";
import { PortfolioGallery } from "./portfolio-gallery";
import { VideoResumePlayer } from "./video-resume-player";
import { WorkHistoryTimeline } from "./work-history-timeline";
import { WorkerProfileHero } from "./worker-profile-hero";
import { WorkerProfileSidebar } from "./worker-profile-sidebar";

/** Full public profile: a digital portfolio rather than an application record. */
export function WorkerProfileView({ worker }: { worker: WorkerProfile }) {
  return (
    <div className="flex flex-col gap-8">
      <WorkerProfileHero worker={worker} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex min-w-0 flex-col gap-8">
          <ProfileSection eyebrow="Professional summary" title="About">
            <p className="max-w-prose text-[17px] leading-8 text-navy/85 text-pretty">{worker.bio}</p>
          </ProfileSection>

          {worker.videoResume && (
            <ProfileSection eyebrow="See them work" title="Video resume" tone="sky">
              <VideoResumePlayer video={worker.videoResume} workerName={worker.fullName} />
            </ProfileSection>
          )}

          {worker.portfolio.length > 0 && (
            <ProfileSection eyebrow="Work portfolio" title="Projects & work samples" count={worker.portfolio.length}>
              <PortfolioGallery items={worker.portfolio} />
            </ProfileSection>
          )}

          <ProfileSection eyebrow="Experience" title="Work history">
            <WorkHistoryTimeline entries={worker.workHistory} />
          </ProfileSection>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <WorkerProfileSidebar worker={worker} />
        </aside>
      </div>

      {/* Mobile: persistent primary action */}
      <div className="fixed inset-x-0 bottom-tabbar-raised z-40 px-3 lg:hidden">
        <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
          <Button size="lg" className="w-full shadow-float">
            <MessageSquare /> Contact Admin about {worker.fullName.split(" ").find((p) => !p.endsWith(".")) ?? worker.fullName}
          </Button>
        </ContactAdminDialog>
      </div>
    </div>
  );
}

interface ProfileSectionProps {
  eyebrow: string;
  title: string;
  count?: number;
  tone?: "white" | "sky";
  children: ReactNode;
}

function ProfileSection({ eyebrow, title, count, tone = "white", children }: ProfileSectionProps) {
  return (
    <section
      className={
        tone === "sky"
          ? "rounded-[2rem] bg-sky/70 p-6 ring-1 ring-primary/10 sm:p-8"
          : "rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border/70 sm:p-8"
      }
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mb-6 mt-1.5 flex items-baseline gap-2 text-2xl font-extrabold tracking-tight text-navy">
        {title}
        {count !== undefined && <span className="text-base font-semibold text-muted-foreground">{count}</span>}
      </h2>
      {children}
    </section>
  );
}
