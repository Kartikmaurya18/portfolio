import { addDays, startOfWeekSunday } from "./dates.ts";

/** How many entries were saved on each day. */
export function countByDate(dates: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const date of dates) counts.set(date, (counts.get(date) ?? 0) + 1);
  return counts;
}

export type HeatLevel = 0 | 1 | 2 | 3 | 4;

/** 0 = nothing saved, 1-3 = that many entries, 4 = four or more. */
export function heatLevel(count: number): HeatLevel {
  if (count <= 0) return 0;
  return Math.min(4, count) as HeatLevel;
}

/**
 * Days in a row with at least one entry. It counts back from today, or from
 * yesterday if nothing is saved yet today, so the streak survives until the
 * day is over.
 */
export function currentStreak(counts: Map<string, number>, today: string): number {
  let day = counts.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (counts.has(day)) {
    streak += 1;
    day = addDays(day, -1);
  }
  return streak;
}

export interface Cell {
  date: string;
  /** False for padding days that fall outside the shown range. */
  inRange: boolean;
}

/**
 * Weeks as columns, Sunday to Saturday as rows, like GitHub's graph.
 * Days before `start` or after `end` are padding (inRange false).
 */
export function buildWeeks(start: string, end: string): Cell[][] {
  const weeks: Cell[][] = [];
  let cursor = startOfWeekSunday(start);
  while (cursor <= end) {
    const week: Cell[] = [];
    for (let i = 0; i < 7; i += 1) {
      const date = addDays(cursor, i);
      week.push({ date, inRange: date >= start && date <= end });
    }
    weeks.push(week);
    cursor = addDays(cursor, 7);
  }
  return weeks;
}

/**
 * The calendar's range: from the day the journal started (or the first entry,
 * if one was added for an earlier day) to the end date. The end is never
 * before today.
 */
export function journeyRange(counts: Map<string, number>, start: string, end: string, today: string) {
  let first = start;
  for (const date of counts.keys()) if (date < first) first = date;
  return { start: first, end: end < today ? today : end };
}

/** The window for "last 12 months": 53 weeks ending with the week of `today`. */
export function rollingRange(today: string): { start: string; end: string } {
  return { start: addDays(startOfWeekSunday(today), -52 * 7), end: today };
}

export function yearRange(year: number): { start: string; end: string } {
  return { start: `${year}-01-01`, end: `${year}-12-31` };
}

/** A month label above the first week that contains the 1st of a month. */
export function monthLabelIndexes(weeks: Cell[][]): { index: number; date: string }[] {
  const labels: { index: number; date: string }[] = [];
  let lastMonth = "";
  weeks.forEach((week, index) => {
    const first = week.find((cell) => cell.inRange);
    if (!first) return;
    const month = first.date.slice(0, 7);
    if (month !== lastMonth) {
      // Skip a label squeezed right after the previous one.
      const previous = labels[labels.length - 1];
      if (!previous || index - previous.index >= 3) labels.push({ index, date: first.date });
      lastMonth = month;
    }
  });
  return labels;
}
