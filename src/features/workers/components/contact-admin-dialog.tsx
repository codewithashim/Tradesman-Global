"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { CheckCircle2, Info, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils/cn";
import { submitContactRequest } from "../services/contact-service";

interface ContactAdminDialogProps {
  workerName: string;
  workerSlug: string;
  /** The element that opens the dialog (a button). */
  children: ReactNode;
}

type State = { status: "idle" | "submitting" } | { status: "sent"; reference: string };

/**
 * Employers contact the Tradesman Global team (not the worker directly), who
 * then coordinate. Phase 1 preview: nothing is actually sent.
 */
export function ContactAdminDialog({ workerName, workerSlug, children }: ContactAdminDialogProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<State>({ status: "idle" });
  const ids = { name: useId(), org: useId(), contact: useId(), message: useId() };
  const firstName = workerName.split(" ").find((part) => !part.endsWith(".")) ?? workerName;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    setState({ status: "submitting" });
    const result = await submitContactRequest({
      workerSlug,
      name: field("name"),
      organisation: field("organisation"),
      contact: field("contact"),
      message: field("message"),
    });
    setState({ status: "sent", reference: result.reference });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setState({ status: "idle" });
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto rounded-3xl border-0 p-0 sm:max-w-lg">
        {state.status === "sent" ? (
          <div className="flex flex-col items-center gap-4 px-8 py-12 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-emerald/15 text-emerald">
              <CheckCircle2 aria-hidden className="size-8" />
            </span>
            <DialogTitle className="text-2xl font-extrabold text-navy">Request recorded</DialogTitle>
            <DialogDescription className="max-w-sm text-muted-foreground">
              Reference <strong className="font-mono text-navy">{state.reference}</strong>. In the live platform, our
              team would follow up with you about {firstName}.
            </DialogDescription>
            <p className="flex items-start gap-2 rounded-2xl bg-sky px-4 py-3 text-left text-xs leading-5 text-navy">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
              Preview only — messages aren’t sent yet. Contact handling arrives with the next release.
            </p>
            <Button className="mt-2" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <div className="bg-hero-glow px-7 pb-6 pt-7">
              <DialogTitle className="text-2xl font-extrabold tracking-tight text-navy">Contact our team</DialogTitle>
              <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground">
                Interested in <strong className="text-navy">{workerName}</strong>? Our admin team handles every
                enquiry, so workers’ contact details stay private.
              </DialogDescription>
            </div>

            <div className="flex flex-col gap-4 px-7 py-6">
              <Field id={ids.name} label="Your name" required>
                <input id={ids.name} name="name" required autoComplete="name" maxLength={80} className={inputClass} />
              </Field>
              <Field id={ids.org} label="Company or organisation">
                <input id={ids.org} name="organisation" autoComplete="organization" maxLength={120} className={inputClass} />
              </Field>
              <Field id={ids.contact} label="Email or phone" required>
                <input id={ids.contact} name="contact" required maxLength={120} className={inputClass} />
              </Field>
              <Field id={ids.message} label="Message" required>
                <textarea
                  id={ids.message}
                  name="message"
                  required
                  rows={4}
                  maxLength={1000}
                  defaultValue={`Hello, I'd like to know more about ${firstName}'s availability and experience.`}
                  className={cn(inputClass, "h-auto resize-none py-3 leading-6")}
                />
              </Field>

              <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                <ShieldCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                Preview: this form doesn’t send anything yet.
              </p>

              <Button type="submit" size="lg" disabled={state.status === "submitting"}>
                {state.status === "submitting" && <Loader2 className="animate-spin" />}
                Send request
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

const inputClass =
  "h-12 w-full rounded-xl border border-input bg-card px-3.5 text-base text-navy sm:h-11 sm:text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/20";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {children}
    </div>
  );
}
