"use client";

import { progress, totalDays } from "@/lib/deadline";
import { useTicking } from "@/lib/use-ticking";

/** Current time in whole seconds, or 0 until the browser takes over (server render and hydration). */
function useNowSeconds(ms: number) {
  return useTicking(() => Math.floor(Date.now() / 1000), 0, ms);
}

const fmt = (n: number) => n.toLocaleString("en-US");

/** Whole days left. Shows a dash until the browser knows today's date. */
export function DaysLeft({ className }: { className?: string }) {
  const now = useNowSeconds(60_000);
  return <span className={className}>{now === 0 ? "—" : fmt(progress(now * 1000).daysLeft)}</span>;
}

/** Three small tiles: exact days left, weeks left, day N of M. Ticks every second, barely at all with reduced motion. */
export function CountdownDetail() {
  const now = useNowSeconds(1000);
  let items: [string, string][];
  if (now === 0) {
    items = [["—", "exact days"], ["—", "weeks left"], ["Day —", `of ${fmt(totalDays)}`]];
  } else {
    const p = progress(now * 1000);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    items = [
      [p.exact.toFixed(calm ? 2 : 5), "exact days"],
      [fmt(p.weeksLeft), "weeks left"],
      [`Day ${fmt(p.dayNumber)}`, `of ${fmt(totalDays)}`],
    ];
  }
  return (
    <ul className="countdown-detail">
      {items.map(([value, label]) => (
        <li key={label}>
          <strong>{value}</strong> <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

/** One square per day of the road: lived, today, to go. */
export function DayGrid() {
  const now = useNowSeconds(60_000);
  const day = now === 0 ? 0 : progress(now * 1000).dayNumber;
  const label =
    day === 0
      ? `${fmt(totalDays)} days, one square each`
      : `Day ${fmt(day)} of ${fmt(totalDays)}: ${fmt(day - 1)} days lived, ${fmt(totalDays - day)} to go`;
  return (
    <div className="daygrid" role="img" aria-label={label}>
      {Array.from({ length: totalDays }, (_, i) => (
        <i key={i} className={day === 0 ? undefined : i < day - 1 ? "lived" : i === day - 1 ? "today" : undefined} />
      ))}
    </div>
  );
}
