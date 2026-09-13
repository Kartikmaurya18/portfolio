import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.12),0_10px_40px_-12px_rgb(255_155_84/0.45)]",
  secondary:
    "bg-white/[0.04] text-fg ring-1 ring-inset ring-line-strong backdrop-blur hover:bg-white/[0.08] hover:ring-white/25",
  ghost: "text-muted hover:text-fg",
};

interface ButtonLinkProps {
  /** An empty href renders a disabled placeholder instead of a broken link. */
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "sm";
  icon?: ReactNode;
  arrow?: "right" | "up-right" | false;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  icon,
  arrow = "right",
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition duration-300 ease-out-expo",
    size === "md" ? "h-11 px-5 text-[0.9375rem]" : "h-9 px-4 text-sm",
    variants[variant],
    className,
  );

  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <Arrow
          className={cn(
            "size-4 transition-transform duration-300 ease-out-expo",
            arrow === "right" ? "group-hover:translate-x-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
          )}
        />
      )}
    </>
  );

  if (!href) {
    return (
      <span aria-disabled="true" title="Coming soon" className={cn(classes, "cursor-not-allowed opacity-40")}>
        {content}
        <span className="sr-only">(coming soon)</span>
      </span>
    );
  }

  if (isExternal(href)) {
    const newTab = !href.startsWith("mailto:");
    return (
      <a href={href} className={classes} {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}>
        {content}
        {newTab && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
