import { cn } from "@/lib/utils";

/** Renders nothing when there are no tags. */
export function TagList({ tags, className }: { tags?: readonly string[]; className?: string }) {
  if (!tags?.length) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-white/[0.04] px-2.5 py-1 font-mono text-[0.6875rem] text-muted ring-1 ring-line ring-inset"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
