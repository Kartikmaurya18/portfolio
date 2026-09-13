"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, Copy } from "@/components/icons";
import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

/** Server renders ⌘; clients on other platforms switch to Ctrl after hydration. */
export function useIsMac() {
  return useSyncExternalStore(
    noopSubscribe,
    () => /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),
    () => true,
  );
}

export const COMMAND_PALETTE_EVENT = "command-palette:open";

export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_PALETTE_EVENT));
}

export function ShortcutKeys({ className }: { className?: string }) {
  const mac = useIsMac();
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      <kbd className="kbd">{mac ? "⌘" : "Ctrl"}</kbd>
      <kbd className="kbd">K</kbd>
    </span>
  );
}

export function CommandPaletteHint({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCommandPalette}
      className={cn("inline-flex items-center gap-2 transition-colors hover:text-fg", className)}
    >
      Press <ShortcutKeys /> to navigate
    </button>
  );
}

export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); the address stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${value}`}
      className={cn(
        "inline-grid size-8 place-items-center rounded-full text-muted ring-1 ring-line-strong transition hover:bg-white/5 hover:text-fg",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-live" /> : <Copy className="size-4" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
