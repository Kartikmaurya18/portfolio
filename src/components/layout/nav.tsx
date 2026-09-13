"use client";

import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close, Download, Menu, Search } from "@/components/icons";
import { openCommandPalette, ShortcutKeys } from "@/components/ui/client-bits";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { links, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [spy, setSpy] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const activeId = isHome ? spy : null;

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const ids = ["top", ...nav.map((n) => n.id)];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setSpy(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // Mobile menu: lock scroll, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || open
            ? "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-6">
          <Link href="/" onClick={close} className="flex items-center gap-3 rounded-lg">
            <Logo />
            <span className="text-[0.9375rem] font-semibold tracking-tight">{site.name}</span>
          </Link>

          <ul className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-white/10 ring-inset"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command menu"
              className="hidden h-9 items-center gap-2.5 rounded-full pr-1.5 pl-3 text-sm text-subtle ring-1 ring-line ring-inset transition hover:text-fg hover:ring-line-strong lg:flex"
            >
              <Search className="size-3.5" />
              <ShortcutKeys />
            </button>
            {links.resume && (
              <a
                href={links.resume}
                download="Kartik-Maurya-Resume.pdf"
                className="hidden h-9 items-center gap-1.5 rounded-full px-3.5 text-sm text-muted ring-1 ring-line ring-inset transition hover:text-fg hover:ring-line-strong xl:inline-flex"
              >
                <Download className="size-3.5" />
                Resume
              </a>
            )}
            <Link
              href="/#contact"
              className="group hidden h-9 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-bg transition hover:bg-white md:inline-flex"
            >
              Let&apos;s Talk
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command menu"
              className="grid size-9 place-items-center rounded-full text-muted ring-1 ring-line ring-inset md:hidden"
            >
              <Search className="size-4" />
            </button>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-9 place-items-center rounded-full ring-1 ring-line-strong ring-inset md:hidden"
            >
              {open ? <Close className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-page flex flex-col pt-4">
              {nav.map((item, i) => (
                <m.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.04 * i + 0.05, ease }}
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={close}
                    className="flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </Link>
                </m.li>
              ))}
            </ul>
            <div className="container-page pt-8 pb-12">
              <Link
                href="/#contact"
                onClick={close}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-fg font-medium text-bg"
              >
                Let&apos;s Talk <ArrowRight className="size-4" />
              </Link>
              {links.resume && (
                <a
                  href={links.resume}
                  download="Kartik-Maurya-Resume.pdf"
                  onClick={close}
                  className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full font-medium text-fg ring-1 ring-line-strong ring-inset"
                >
                  <Download className="size-4" /> Resume
                </a>
              )}
              <SocialLinks className="mt-8 justify-center" />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
