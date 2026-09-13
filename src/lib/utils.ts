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

/** 3 → "03" */
export const pad = (n: number) => String(n).padStart(2, "0");
