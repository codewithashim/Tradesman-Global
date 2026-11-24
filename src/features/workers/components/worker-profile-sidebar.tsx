import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Award, BadgeCheck, Languages, Lock, MessageSquare, Plane, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants/routes";
import { formatDate } from "@/lib/formatters/date";
import type { WorkerProfile } from "../types/worker";
import { ContactAdminDialog } from "./contact-admin-dialog";

export function WorkerProfileSidebar({ worker, destinationFlags }: { worker: WorkerProfile; destinationFlags: Record<string, ReactNode> }) {
  const firstName = worker.fullName.split(" ").find((p) => !p.endsWith(".")) ?? worker.fullName;

  return (
    <div className="flex flex-col gap-4">
      {/* Primary action */}
      <section className="relative isolate overflow-hidden rounded-[1.75rem] bg-navy-deep p-6 text-white shadow-float max-lg:hidden">
        <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-52 rounded-full bg-primary/45 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-10 -z-10 size-40 rounded-full bg-emerald/20 blur-3xl" />
        <h2 className="type-display text-2xl">Interested in {firstName}?</h2>
        <p className="mt-2 text-sm leading-6 text-white/70">Our team handles every enquiry and gets back to you.</p>
        <ContactAdminDialog workerName={worker.fullName} workerSlug={worker.slug}>
          <Button variant="secondary" size="lg" className="mt-5 h-13 w-full bg-white text-navy ring-0 hover:bg-white">
            <MessageSquare /> Contact Admin
          </Button>
        </ContactAdminDialog>
        <p className="mt-4 flex items-center gap-2 text-xs text-white/55">
          <Lock aria-hidden className="size-3.5" /> Workers’ contact details stay private.
        </p>
      </section>

      <SidebarCard title="Skills" icon={<Sparkles />} count={worker.skills.length}>
        <ul className="flex flex-wrap gap-2">
          {worker.skills.map((skill) => (
            <li key={skill} className="rounded-full bg-sky px-3 py-1.5 text-sm font-semibold text-navy ring-1 ring-primary/15 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white">
              {skill}
            </li>
          ))}
        </ul>
      </SidebarCard>

      {worker.certifications.length > 0 && (
        <SidebarCard title="Certificates" icon={<Award />} count={worker.certifications.length}>
          <ul className="flex flex-col gap-2">
            {worker.certifications.map((cert) => (
              <li key={cert} className="flex items-start gap-3 rounded-xl bg-background p-3 text-sm font-medium text-navy ring-1 ring-border/60">
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-amber-300 to-amber-500 text-white shadow-sm">
                  <Award aria-hidden className="size-3.5" />
                </span>
                <span className="pt-1">{cert}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">Declared by the worker. Ask our team to see copies.</p>
        </SidebarCard>
      )}

      {worker.languages.length > 0 && (
        <SidebarCard title="Languages" icon={<Languages />}>
          <ul className="flex flex-wrap gap-2">
            {worker.languages.map((language) => (
              <li key={language} className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-navy">
                {language}
              </li>
            ))}
          </ul>
        </SidebarCard>
      )}

      <SidebarCard title="Open to work in" icon={<Plane />}>
        <ul className="-mx-2 flex flex-col">
          {worker.preferredDestinations.map((country) => (
            <li key={country.slug}>
              <Link
                href={routes.country(country.slug)}
                className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-semibold text-navy transition hover:bg-sky"
              >
                <span className="block w-8 shrink-0 transition-transform duration-300 group-hover:scale-110">{destinationFlags[country.slug]}</span>
                <span className="flex-1">{country.name}</span>
                <ArrowUpRight aria-hidden className="size-4 text-navy/25 transition group-hover:rotate-45 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </SidebarCard>

      <SidebarCard title="Profile status" icon={<ShieldCheck />}>
        <dl className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-muted-foreground">Review</dt>
            <dd className="flex items-center gap-1 rounded-full bg-emerald/10 px-2.5 py-0.5 font-semibold text-emerald-700">
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

function SidebarCard({ title, icon, count, children }: { title: string; icon: ReactNode; count?: number; children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] bg-card p-6 shadow-soft ring-1 ring-border/70">
      <h2 className="mb-4 flex items-center gap-2.5 text-base font-semibold text-navy">
        <span className="grid size-8 place-items-center rounded-xl bg-sky text-primary [&_svg]:size-4">{icon}</span>
        {title}
        {count !== undefined && <span className="ml-auto text-sm font-medium text-muted-foreground">{count}</span>}
      </h2>
      {children}
    </section>
  );
}
