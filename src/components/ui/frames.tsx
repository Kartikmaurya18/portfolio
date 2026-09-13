import Image from "next/image";
import type { Project } from "@/content/types";
import type { Preview } from "@/lib/projects";
import { cn, displayUrl } from "@/lib/utils";

interface FrameProps {
  project: Project;
  preview?: Preview;
  /** next/image `sizes` for responsive loading. */
  sizes: string;
  className?: string;
  /** Load immediately — only for above-the-fold images. */
  eager?: boolean;
}

export function BrowserFrame({ project, preview, sizes, className, eager }: FrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-raised shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-line-strong",
        className,
      )}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line bg-white/[0.025] px-3" aria-hidden="true">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/12" />
          <span className="size-2 rounded-full bg-white/12" />
          <span className="size-2 rounded-full bg-white/12" />
        </div>
        <div className="mx-auto flex h-5 w-full max-w-[65%] items-center justify-center rounded-md bg-white/[0.04] px-2 font-mono text-[0.625rem] text-subtle">
          <span className="truncate">{displayUrl(project.url)}</span>
        </div>
        <div className="w-[38px]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        {preview ? (
          <Image
            src={preview.src}
            alt={`Screenshot of the ${project.name} website`}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            placeholder={preview.blurDataURL ? "blur" : "empty"}
            blurDataURL={preview.blurDataURL}
            className="object-cover object-top transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.035]"
          />
        ) : (
          <PreviewPlaceholder name={project.name} />
        )}
      </div>
    </div>
  );
}

export function PhoneFrame({ project, preview, sizes, className }: FrameProps) {
  if (!preview) return null;
  return (
    <div
      className={cn(
        "rounded-[1.65rem] bg-[#16171c] p-[5px] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/15",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.3rem] bg-surface">
        <Image
          src={preview.src}
          alt={`Mobile screenshot of the ${project.name} website`}
          fill
          sizes={sizes}
          placeholder={preview.blurDataURL ? "blur" : "empty"}
          blurDataURL={preview.blurDataURL}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function PreviewPlaceholder({ name }: { name: string }) {
  return (
    <div className="bg-grid absolute inset-0 grid place-items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(255_155_84/0.12),transparent_60%)]" />
      <div className="relative px-6 text-center">
        <p className="text-xl font-semibold tracking-tight text-fg/90 sm:text-2xl">{name}</p>
        <p className="mt-2 font-mono text-[0.6875rem] tracking-wide text-subtle uppercase">Preview coming soon</p>
      </div>
    </div>
  );
}
