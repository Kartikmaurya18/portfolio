"use client";

import { useTicking } from "@/lib/use-ticking";

const DAY_MS = 86_400_000;

/** Whole days left until `deadlineIso`. Shows a dash until the browser knows the date. */
export function Countdown({ deadlineIso }: { deadlineIso: string }) {
  const days = useTicking(
    () => Math.max(0, Math.ceil((new Date(deadlineIso).getTime() - Date.now()) / DAY_MS)),
    -1,
    60_000,
  );
  return <span className="countdown-num">{days < 0 ? "—" : days.toLocaleString("en-US")}</span>;
}
