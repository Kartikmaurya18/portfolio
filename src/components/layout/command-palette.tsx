"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  Agent,
  ArrowUpRight,
  Browser,
  CornerDownLeft,
  GitHub,
  Hash,
  Layers,
  LinkedIn,
  Mail,
  Search,
  Server,
} from "@/components/icons";
import { COMMAND_PALETTE_EVENT } from "@/components/ui/client-bits";
import { contactLinks } from "@/lib/links";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  group: "Navigate" | "Links";
  label: string;
  href: string;
  icon: ReactNode;
  keywords?: string;
}

const iconClass = "size-4";

const commands: Command[] = [
  { id: "about", group: "Navigate", label: "About me", href: "/#about", icon: <Hash className={iconClass} /> },
  { id: "experience", group: "Navigate", label: "Experience", href: "/#experience", icon: <Server className={iconClass} />, keywords: "work insolutions global" },
  { id: "projects", group: "Navigate", label: "Projects", href: "/#projects", icon: <Layers className={iconClass} />, keywords: "work built" },
  { id: "freelance", group: "Navigate", label: "Freelance work", href: "/#freelance", icon: <Browser className={iconClass} />, keywords: "clients websites" },
  { id: "archive", group: "Navigate", label: "All projects", href: "/projects", icon: <Layers className={iconClass} />, keywords: "archive filter websites" },
  { id: "ai", group: "Navigate", label: "Agentic AI", href: "/#ai", icon: <Agent className={iconClass} />, keywords: "agents llm rag" },
  { id: "contact", group: "Navigate", label: "Contact", href: "/#contact", icon: <Mail className={iconClass} />, keywords: "email hire talk" },
  ...contactLinks.map(({ id, label, href }) => ({
    id,
    group: "Links" as const,
    label,
    href,
    icon: id === "github" ? <GitHub className={iconClass} /> : id === "linkedin" ? <LinkedIn className={iconClass} /> : <Mail className={iconClass} />,
  })),
];

const groups = ["Navigate", "Links"] as const;

export function CommandPalette() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const uid = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
  }, [query]);

  const selectable = results.filter((c) => c.href);
  const active = selectable[Math.min(activeIndex, selectable.length - 1)];

  const show = useCallback(() => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_PALETTE_EVENT, show);
    };
  }, [open, show]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = "";
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!active) return;
    listRef.current?.querySelector(`[data-command="${active.id}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (command: Command) => {
    if (!command.href) return;
    setOpen(false);
    // Navigate after the dialog has closed and released the scroll lock.
    requestAnimationFrame(() => {
      const { href } = command;
      if (href.startsWith("mailto:")) {
        window.location.href = href;
      } else if (/^https?:\/\//.test(href)) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        const [path, hash] = href.split("#");
        if (hash && pathname === (path || "/")) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          document.getElementById(hash)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          history.pushState(null, "", `#${hash}`);
        } else {
          router.push(href);
        }
      }
    });
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const count = selectable.length;
    if (e.key === "ArrowDown" && count) {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp" && count) {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + count) % count);
    } else if (e.key === "Enter" && active) {
      e.preventDefault();
      run(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "Tab") {
      // The input is the only focusable element; keep focus inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="command-palette"
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            initial={{ opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-[#0e0f13]/95 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)] ring-1 ring-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 shrink-0 text-subtle" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls={`${uid}-list`}
                aria-activedescendant={active ? `${uid}-${active.id}` : undefined}
                aria-autocomplete="list"
                aria-label="Search commands"
                placeholder="Where would you like to go?"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                autoComplete="off"
                spellCheck={false}
                className="h-14 w-full bg-transparent text-[0.9375rem] text-fg outline-none placeholder:text-subtle"
              />
              <kbd className="kbd">Esc</kbd>
            </div>

            <div ref={listRef} id={`${uid}-list`} role="listbox" aria-label="Commands" className="max-h-[min(60vh,26rem)] overflow-y-auto p-2">
              {results.length === 0 && <p className="px-3 py-10 text-center text-sm text-subtle">No results for “{query}”</p>}
              {groups.map((group) => {
                const items = results.filter((c) => c.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} role="group" aria-labelledby={`${uid}-${group}`} className="pb-1">
                    <div id={`${uid}-${group}`} className="px-3 pt-2.5 pb-1.5 font-mono text-[0.6875rem] tracking-wider text-subtle uppercase">
                      {group}
                    </div>
                    {items.map((command) => {
                      const disabled = !command.href;
                      const isActive = active?.id === command.id;
                      const external = /^https?:\/\//.test(command.href);
                      return (
                        <div
                          key={command.id}
                          id={`${uid}-${command.id}`}
                          data-command={command.id}
                          role="option"
                          aria-selected={isActive}
                          aria-disabled={disabled || undefined}
                          onMouseMove={() => !disabled && setActiveIndex(selectable.indexOf(command))}
                          onClick={() => run(command)}
                          className={cn(
                            "flex h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors",
                            disabled ? "cursor-default text-subtle/60" : "cursor-pointer text-muted",
                            isActive && "bg-white/[0.06] text-fg",
                          )}
                        >
                          <span className={cn("grid size-7 place-items-center rounded-md ring-1 ring-line", isActive && "text-accent ring-accent/30")}>
                            {command.icon}
                          </span>
                          <span className="flex-1">{command.label}</span>
                          {disabled && <span className="font-mono text-[0.625rem] tracking-wider uppercase">Soon</span>}
                          {isActive && (external ? <ArrowUpRight className="size-4 text-subtle" /> : <CornerDownLeft className="size-4 text-subtle" />)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[0.6875rem] text-subtle">
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↵</kbd> open
              </span>
              <span className="ml-auto hidden sm:inline">kartik@portfolio</span>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
