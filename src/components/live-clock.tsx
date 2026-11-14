"use client";

import { useTicking } from "@/lib/use-ticking";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const PLACEHOLDER = "--:-- --";

/** Mumbai time. The placeholder has the same width as the real text, so nothing shifts when it fills in. */
export function LiveClock() {
  const time = useTicking(() => formatter.format(new Date()), PLACEHOLDER, 15_000);
  return (
    <p className="clock">
      <span className="clock-time" aria-hidden={time === PLACEHOLDER}>{time}</span>
      <span className="clock-place"> in Mumbai</span>
    </p>
  );
}
