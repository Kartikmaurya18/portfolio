import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's one layout idea: a hairline rule, then a 12-column grid whose
 * first three columns are a rail holding an oversized light numeral and a
 * monospace label. Content sits in the remaining nine.
 */
export function SectionLabel({ id, index, label }: { id: string; index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 lg:col-span-3 lg:block">
      <span
        aria-hidden="true"
        className="text-[3.5rem] leading-none font-extralight tracking-[-0.06em] text-fg/40 tabular-nums lg:text-[7rem]"
      >
        {index}
      </span>
      <h2 id={`${id}-heading`} className="meta tracking-[0.12em] uppercase lg:mt-5">
        {label}
      </h2>
    </div>
  );
}

export function Section({
  id,
  index,
  label,
  className,
  children,
}: {
  id: string;
  index: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={cn("border-t border-rule", className)}>
      <div className="page grid-editorial">
        <SectionLabel id={id} index={index} label={label} />
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
