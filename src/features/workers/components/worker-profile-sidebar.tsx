import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Award, BadgeCheck, Languages, MessageSquare, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants/routes";
import { formatDate } from "@/lib/formatters/date";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";

export function WorkerProfileSidebar({ worker }: { worker: WorkerProfile }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Primary action */}
      <section className="relative overflow-hidden rounded-3xl bg-navy-deep p-6 text-white shadow-float max-lg:hidden">
        <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/40 blur-3xl" />
        <h2 className="relative text-lg font-bold">Interested in {worker.fullName.split(" ").find((p) => !p.endsWith(".")) ?? worker.fullName}?</h2>
        <p className="relative mt-1.5 text-sm leading-6 text-white/70">
          Our admin team handles every enquiry and keeps workers’ contact details private.
        </p>
        <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
          <Button variant="secondary" size="lg" className="relative mt-5 w-full bg-white text-navy ring-0 hover:bg-sky">
            <MessageSquare /> Contact Admin
          </Button>
        </ContactAdminDialog>
      </section>

      <SidebarCard title="Skills & specialties" icon={Sparkles}>
        <ul className="flex flex-wrap gap-2">
          {worker.skills.map((skill) => (
            <li key={skill} className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              {skill}
            </li>
          ))}
        </ul>
      </SidebarCard>

      {worker.certifications.length > 0 && (
        <SidebarCard title="Certificates" icon={Award}>
          <ul className="flex flex-col gap-2.5">
            {worker.certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-2.5 text-sm font-medium text-navy">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky text-primary">
                  <Award aria-hidden className="size-3" />
                </span>
                {cert}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Declared by the worker. Ask our team to see copies.</p>
        </SidebarCard>
      )}

      {worker.languages.length > 0 && (
        <SidebarCard title="Languages" icon={Languages}>
          <ul className="flex flex-wrap gap-2">
            {worker.languages.map((language) => (
              <li key={language} className="rounded-full bg-muted px-3 py-1.5 text-sm text-navy">
                {language}
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}

      <SidebarCard title="Open to work in" icon={Plane}>
        <ul className="flex flex-col gap-1">
          {worker.preferredDestinations.map((country) => (
            <li key={country.slug}>
              <Link
                href={routes.country(country.slug)}
                className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-navy transition hover:bg-sky"
              >
                {country.name}
                <ArrowUpRight aria-hidden className="size-4 text-muted-foreground transition group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </SidebarCard>

      <SidebarCard title="Profile status" icon={ShieldCheck}>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Review</dt>
            <dd className="flex items-center gap-1 font-semibold text-emerald-700">
              <BadgeCheck aria-hidden className="size-4" /> Approved
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Member since</dt>
            <dd className="font-semibold text-navy">{formatDate(worker.memberSince)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Last updated</dt>
            <dd className="font-semibold text-navy">{formatDate(worker.updatedAt)}</dd>
          </div>
        </dl>
      </SidebarCard>
    </div>
  );
}

function SidebarCard({ title, icon: Icon, children }: { title: string; icon: typeof Award; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-soft ring-1 ring-border/70">
      <h2 className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        <Icon aria-hidden className="size-3.5 text-primary" />
        {title}
      </h2>
      {children}
    </section>
  );
}
