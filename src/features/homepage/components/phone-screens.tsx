import Image from "next/image";
import { BadgeCheck, Check, ChefHat, Flame, Hammer, Images, Truck, Upload, Wrench, Zap, type LucideIcon } from "lucide-react";
import { siteImages } from "@/config/images";
import { cn } from "@/lib/utils/cn";

/*
 * Illustrative app screens for "How it works". Decorative only (aria-hidden at
 * the frame). Elements marked data-ui animate in when the screen becomes
 * active; data-fill bars grow to their width; data-digit cells pop in.
 */

function ScreenHeader({ step, title, bn }: { step: number; title: string; bn: string }) {
  return (
    <div data-ui>
      <div className="flex items-center justify-between">
        <span className="grid size-7 place-items-center rounded-lg bg-primary text-[10px] font-bold text-white">TG</span>
        <span className="text-[10px] font-medium text-muted-foreground">Step {step} of 4</span>
      </div>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className={cn("h-1 flex-1 rounded-full", n <= step ? "bg-primary" : "bg-border")} />
        ))}
      </div>
      <p className="type-display mt-5 text-[1.45rem] text-navy">{title}</p>
      <p lang="bn" className="mt-0.5 text-[11px] text-muted-foreground">
        {bn}
      </p>
    </div>
  );
}

export function SignUpScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader step={1} title="Create your profile" bn="আপনার প্রোফাইল তৈরি করুন" />
      <div data-ui className="mt-6">
        <p className="text-[10px] font-medium text-muted-foreground">Mobile number</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-background px-3 py-2.5 ring-1 ring-border">
          <span className="text-xs font-semibold text-navy">+880</span>
          <span className="h-4 w-px bg-border" />
          <span className="text-xs text-navy">17XX-XXXXXX</span>
        </div>
      </div>
      <div data-ui className="mt-4">
        <p className="text-[10px] font-medium text-muted-foreground">Code sent by SMS</p>
        <div className="mt-1.5 grid grid-cols-6 gap-1.5">
          {["4", "8", "1", "9", "", ""].map((d, i) => (
            <span
              key={i}
              data-digit
              className={cn(
                "grid h-10 place-items-center rounded-lg text-sm font-bold",
                d ? "bg-sky text-navy ring-1 ring-primary/30" : "bg-background ring-1 ring-border",
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
      <div data-ui className="mt-auto rounded-xl bg-navy py-3 text-center text-xs font-semibold text-white">Continue</div>
    </div>
  );
}

const tradeTiles: { icon: LucideIcon; label: string }[] = [
  { icon: Flame, label: "Welder" },
  { icon: Zap, label: "Electrician" },
  { icon: Wrench, label: "Plumber" },
  { icon: Hammer, label: "Mason" },
  { icon: Truck, label: "Driver" },
  { icon: ChefHat, label: "Chef" },
];

export function SkillsScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader step={2} title="What’s your trade?" bn="আপনার পেশা নির্বাচন করুন" />
      <div className="mt-5 grid grid-cols-3 gap-2">
        {tradeTiles.map(({ icon: Icon, label }, i) => (
          <span
            key={label}
            data-ui
            className={cn(
              "relative flex flex-col items-center gap-1.5 rounded-xl py-3 text-[10px] font-semibold",
              i === 0 ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-background text-navy ring-1 ring-border",
            )}
          >
            {i === 0 && (
              <span className="absolute right-1.5 top-1.5 grid size-3.5 place-items-center rounded-full bg-white text-primary">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            )}
            <Icon className="size-4" />
            {label}
          </span>
        ))}
      </div>
      <p data-ui className="mt-5 text-[10px] font-medium text-muted-foreground">
        Skills
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {["SMAW", "TIG", "6G pipe", "Structural", "Blueprints"].map((s, i) => (
          <span
            key={s}
            data-ui
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-semibold",
              i < 3 ? "bg-sky text-primary ring-1 ring-primary/25" : "text-navy ring-1 ring-border",
            )}
          >
            {s}
          </span>
        ))}
      </div>
      <div data-ui className="mt-auto rounded-xl bg-navy py-3 text-center text-xs font-semibold text-white">Save skills</div>
    </div>
  );
}

export function VideoScreen() {
  const thumbs = [siteImages.welding, siteImages.masonry, siteImages.electrical];
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader step={3} title="Show your work" bn="ভিডিও ও কাজের ছবি যোগ করুন" />
      <div data-ui className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl">
        <Image src={siteImages.videoResume.src} alt="" fill sizes="260px" className="object-cover" />
        <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-red-500" /> REC 0:42
        </span>
      </div>
      <div data-ui className="mt-4">
        <div className="flex items-center justify-between text-[10px] font-medium text-navy">
          <span className="flex items-center gap-1">
            <Upload className="size-3 text-primary" /> my-video.mp4
          </span>
          <span className="text-primary">Uploading</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
          <div data-fill="78" className="h-full w-[78%] rounded-full bg-linear-to-r from-brand-blue to-primary" />
        </div>
      </div>
      <p data-ui className="mt-4 flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
        <Images className="size-3" /> Work photos
      </p>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {thumbs.map((t) => (
          <span key={t.src} data-ui className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={t.src} alt="" fill sizes="60px" className="object-cover" />
          </span>
        ))}
        <span data-ui className="grid aspect-square place-items-center rounded-lg text-lg text-muted-foreground ring-1 ring-dashed ring-border">
          +
        </span>
      </div>
    </div>
  );
}

export function ReviewScreen() {
  const rows = [
    { label: "Profile submitted", done: true },
    { label: "Checked by our team", done: true },
    { label: "Visible to employers", done: true },
  ];
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader step={4} title="You’re live" bn="আপনার প্রোফাইল এখন দৃশ্যমান" />
      <div data-ui className="mt-5 flex items-center gap-3 rounded-2xl bg-navy p-3 text-white">
        <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-brand-blue to-primary text-sm font-bold">YP</span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1 text-xs font-semibold">
            Your profile <BadgeCheck className="size-3.5 fill-brand-blue text-navy" />
          </span>
          <span className="text-[10px] text-white/60">Welder · 8 yrs</span>
        </span>
        <span className="rounded-full bg-emerald px-2 py-0.5 text-[9px] font-bold">Approved</span>
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {rows.map((row) => (
          <li key={row.label} data-ui className="flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-full bg-emerald text-white">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-xs font-semibold text-navy">{row.label}</span>
          </li>
        ))}
      </ul>
      <div data-ui className="mt-auto rounded-xl bg-sky py-3 text-center text-xs font-semibold text-primary">View my profile</div>
    </div>
  );
}

/** Phone chrome around a screen. */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative rounded-[2.75rem] bg-navy-deep p-2.5 shadow-[0_40px_80px_-20px_rgb(7_29_53/0.55)] ring-1 ring-white/10", className)}>
      <div className="relative h-full overflow-hidden rounded-[2.2rem] bg-card">
        <span aria-hidden className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-deep" />
        <div className="relative h-full px-4 pb-5 pt-10">{children}</div>
      </div>
    </div>
  );
}
