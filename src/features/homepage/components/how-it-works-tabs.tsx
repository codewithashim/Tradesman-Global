"use client";

import { useId, useState } from "react";
import { ClipboardCheck, Filter, Images, PlayCircle, Search, Send, UserPlus, Wrench, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type Audience = "workers" | "employers";

interface Step {
  icon: LucideIcon;
  title: string;
  text: string;
}

const steps: Record<Audience, Step[]> = {
  workers: [
    { icon: UserPlus, title: "Create a free profile", text: "Sign up with your phone number — it takes a few minutes." },
    { icon: Wrench, title: "Add skills and experience", text: "Choose your trade, skills, tools and the projects you’ve worked on." },
    { icon: Images, title: "Upload work photos and a video", text: "Show finished work and introduce yourself on camera." },
    { icon: Send, title: "Submit for review", text: "Our team checks your profile before it appears in the directory." },
  ],
  employers: [
    { icon: Search, title: "Discover skilled candidates", text: "Browse reviewed profiles across every major trade." },
    { icon: Filter, title: "Filter by trade and experience", text: "Narrow by destination country, experience and availability." },
    { icon: PlayCircle, title: "Watch video resumes", text: "See workers demonstrate their skills and communicate." },
    { icon: ClipboardCheck, title: "Explore work portfolios", text: "Review photos of real work before you get in touch." },
  ],
};

const tabs: { id: Audience; label: string }[] = [
  { id: "workers", label: "For workers" },
  { id: "employers", label: "For employers" },
];

export function HowItWorksTabs() {
  const [audience, setAudience] = useState<Audience>("workers");
  const baseId = useId();

  return (
    <div className="flex flex-col items-center gap-12">
      <div role="tablist" aria-label="Choose audience" className="inline-flex rounded-full bg-card p-1.5 shadow-soft ring-1 ring-border">
        {tabs.map((tab) => {
          const selected = tab.id === audience;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={selected}
              aria-controls={`${baseId}-${tab.id}-panel`}
              onClick={() => setAudience(tab.id)}
              className={cn(
                "rounded-full px-6 py-2.5 text-sm font-semibold transition",
                selected ? "bg-navy text-white shadow-md" : "text-navy/70 hover:text-navy",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ol
        key={audience}
        role="tabpanel"
        id={`${baseId}-${audience}-panel`}
        aria-labelledby={`${baseId}-${audience}-tab`}
        className="relative grid grid-cols-1 w-full gap-5 animate-in fade-in slide-in-from-bottom-2 duration-500 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Connector line on large screens */}
        <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 lg:block" />
        {steps[audience].map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="relative flex flex-col items-center text-center">
            <span className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-b from-brand-blue to-primary text-white shadow-[0_12px_24px_-10px_rgb(37_99_235/0.7)]">
              <Icon aria-hidden className="size-6" />
              <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-card text-xs font-bold text-navy ring-1 ring-border">
                {i + 1}
              </span>
            </span>
            <div className="mt-5 w-full rounded-2xl bg-card p-5 shadow-soft ring-1 ring-border/70">
              <h3 className="font-bold text-navy">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          </li>
        ))}
      </ol>

      {audience === "employers" && (
        <p className="-mt-4 text-sm text-muted-foreground">
          Browsing is open to everyone. Employer accounts are coming in a later release.
        </p>
      )}
    </div>
  );
}
