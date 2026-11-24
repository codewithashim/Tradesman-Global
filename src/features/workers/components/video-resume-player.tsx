import { Clock, Languages, Play } from "lucide-react";
import { formatDuration } from "@/lib/formatters/date";
import type { VideoResume } from "../types/worker";

interface VideoResumePlayerProps {
  video: VideoResume;
  workerName: string;
  tradeName: string;
  languages: string[];
}

/** Bars of a stylised audio waveform (decorative, deterministic heights). */
const WAVE = [30, 55, 40, 75, 50, 90, 65, 45, 80, 35, 60, 95, 55, 70, 40, 85, 50, 65, 30, 75, 45, 60, 35, 55];

export function VideoResumePlayer({ video, workerName, tradeName, languages }: VideoResumePlayerProps) {
  if (video.url) {
    return (
      <video
        controls
        preload="metadata"
        poster={video.posterUrl ?? undefined}
        className="aspect-video w-full rounded-[2rem] bg-black shadow-float"
        aria-label={`Video resume of ${workerName}`}
      >
        <source src={video.url} />
      </video>
    );
  }

  // No media yet (frontend-only phase): a clearly labelled placeholder, not a fake player.
  const first = workerName.split(" ")[0];
  return (
    <div className="relative isolate aspect-4/5 w-full overflow-hidden rounded-[2rem] bg-navy-deep text-white shadow-[0_40px_80px_-30px_rgb(7_29_53/0.6)] sm:aspect-video">
      <div aria-hidden className="absolute -left-24 -top-24 -z-10 size-96 rounded-full bg-primary/45 blur-[100px]" />
      <div aria-hidden className="absolute -bottom-32 -right-10 -z-10 size-80 rounded-full bg-brand-blue/30 blur-[100px]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="flex items-start justify-between gap-3 p-5 sm:p-7">
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15 backdrop-blur">Video resume · {tradeName}</span>
        {languages.length > 0 && (
          <span className="hidden items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur sm:inline-flex">
            <Languages aria-hidden className="size-3.5" /> {languages.join(", ")}
          </span>
        )}
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="relative grid size-20 place-items-center rounded-full bg-white text-primary shadow-2xl sm:size-24">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.6s]" />
            <span aria-hidden className="absolute -inset-3 rounded-full ring-1 ring-white/20" />
            <Play aria-hidden className="relative ml-1 size-8 sm:size-9" fill="currentColor" />
          </span>
          <div>
            <p className="type-display text-2xl sm:text-3xl">{first}’s video resume</p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/65">
              <Clock aria-hidden className="size-3.5" /> {formatDuration(video.durationSeconds)}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md sm:inset-x-7 sm:bottom-7">
        <div aria-hidden className="flex h-8 items-center gap-[3px]">
          {WAVE.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%`, animationDelay: `${(i % 6) * 0.15}s` }}
              className="flex-1 origin-center animate-pulse rounded-full bg-white/50 [animation-duration:1.6s]"
            />
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-white/70 sm:text-xs">Playback will be available once video hosting goes live.</p>
      </div>
    </div>
  );
}
