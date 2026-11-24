import { Clock, Play } from "lucide-react";
import { formatDuration } from "@/lib/formatters/date";
import type { VideoResume } from "../types/worker";

export function VideoResumePlayer({ video, workerName }: { video: VideoResume; workerName: string }) {
  if (video.url) {
    return (
      <video
        controls
        preload="metadata"
        poster={video.posterUrl ?? undefined}
        className="aspect-video w-full rounded-3xl bg-black shadow-float"
        aria-label={`Video resume of ${workerName}`}
      >
        <source src={video.url} />
      </video>
    );
  }

  // No media yet (frontend-only phase): a clearly labelled placeholder, not a fake player.
  return (
    <div className="relative isolate grid aspect-4/3 w-full sm:aspect-video place-items-center overflow-hidden rounded-3xl bg-navy-deep text-white shadow-float">
      <div aria-hidden className="absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-primary/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -right-10 -z-10 size-72 rounded-full bg-brand-blue/30 blur-3xl" />

      <div className="flex flex-col items-center gap-3 px-6 pb-16 text-center sm:gap-4 sm:pb-10">
        <span className="relative grid size-16 place-items-center rounded-full bg-white text-primary shadow-float sm:size-20">
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.6s]" />
          <Play aria-hidden className="relative ml-1 size-7 sm:size-8" fill="currentColor" />
        </span>
        <div>
          <p className="text-lg font-bold">{workerName.split(" ")[0]}’s video resume</p>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/70">
            <Clock aria-hidden className="size-3.5" /> {formatDuration(video.durationSeconds)}
          </p>
        </div>
      </div>

      <p className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/10 px-4 py-2 text-center text-[11px] text-white/80 ring-1 ring-white/15 backdrop-blur sm:inset-x-5 sm:bottom-5 sm:text-xs">
        Playback will be available once video hosting goes live.
      </p>
    </div>
  );
}
