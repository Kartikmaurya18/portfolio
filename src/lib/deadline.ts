import { road } from "@/content/site";

export const DAY_MS = 86_400_000;

const start = Date.parse(road.start.iso);
const end = Date.parse(road.deadline.iso);

/** Whole days from the first day of the road to the deadline. */
export const totalDays = Math.round((end - start) / DAY_MS);

/** Everything the countdown shows, for a moment in time (milliseconds). */
export function progress(nowMs: number) {
  const exact = Math.max(0, (end - nowMs) / DAY_MS);
  const dayNumber = Math.min(totalDays, Math.max(1, Math.floor((nowMs - start) / DAY_MS) + 1));
  return {
    exact,
    daysLeft: Math.ceil(exact),
    weeksLeft: Math.floor(exact / 7),
    dayNumber,
  };
}
