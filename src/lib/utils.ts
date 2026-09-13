import type { CSSProperties } from "react";

/** Staggers `.enter` / `[data-reveal]` transitions. */
export const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** 3 → "03" */
export const pad = (n: number) => String(n).padStart(2, "0");

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** "https://www.bombaylab.in/" → "bombaylab.in" */
export function displayUrl(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}

/** "https://github.com/octocat" → "octocat" */
export function githubUsername(url: string) {
  return url.match(/github\.com\/([^/?#]+)/i)?.[1] ?? "";
}

/** Splits "text with **emphasis**" into plain and emphasised parts. */
export function splitEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => ({ text: part, strong: i % 2 === 1 }));
}
