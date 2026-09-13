import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

/** `id` goes on the heading so the section can use aria-labelledby. */
export function SectionHeader({ id, eyebrow, title, subtitle, align = "left", className, children }: SectionHeaderProps) {
  return (
    <div data-reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className="text-gradient mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[1.04] font-semibold tracking-[-0.04em]"
      >
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>}
      {children}
    </div>
  );
}
