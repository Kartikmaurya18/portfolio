/**
 * Calendar-day helpers. A day is a plain "YYYY-MM-DD" string, so there is no
 * time-zone drift: arithmetic is done in UTC on the date alone, and "today" is
 * read in Mumbai time.
 */
export const DAY_MS = 86_400_000;

const toUTC = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

/** Today's date in Mumbai, e.g. "2026-11-15". */
export function todayIST(now: number = Date.now()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function isISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return new Date(toUTC(value)).toISOString().slice(0, 10) === value;
}

export function addDays(iso: string, days: number): string {
  return new Date(toUTC(iso) + days * DAY_MS).toISOString().slice(0, 10);
}

/** Whole days from a to b (b - a). */
export function diffDays(a: string, b: string): number {
  return Math.round((toUTC(b) - toUTC(a)) / DAY_MS);
}

/** 0 = Sunday ... 6 = Saturday. */
export function weekday(iso: string): number {
  return new Date(toUTC(iso)).getUTCDay();
}

export const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const;

export function startOfWeekSunday(iso: string): string {
  return addDays(iso, -weekday(iso));
}

export function startOfWeekMonday(iso: string): string {
  return addDays(iso, -((weekday(iso) + 6) % 7));
}

export function startOfMonth(iso: string): string {
  return `${iso.slice(0, 7)}-01`;
}

export function endOfMonth(iso: string): string {
  const next = new Date(Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)), 1));
  return new Date(next.getTime() - DAY_MS).toISOString().slice(0, 10);
}

const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...opts }).format(toUTC(iso));

/** "November 15, 2026" */
export const formatLong = (iso: string) => fmt(iso, { month: "long", day: "numeric", year: "numeric" });
/** "Nov 15" */
export const formatShort = (iso: string) => fmt(iso, { month: "short", day: "numeric" });
/** "Sunday" */
export const weekdayName = (iso: string) => fmt(iso, { weekday: "long" });
/** "Nov" */
export const monthShort = (iso: string) => fmt(iso, { month: "short" });
