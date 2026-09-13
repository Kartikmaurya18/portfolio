import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-8 place-items-center overflow-hidden rounded-[0.6rem] bg-gradient-to-b from-white/[0.12] to-white/[0.03] font-mono text-[0.6875rem] font-semibold tracking-tight text-fg ring-1 ring-white/15",
        className,
      )}
    >
      <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      {site.initials}
    </span>
  );
}
