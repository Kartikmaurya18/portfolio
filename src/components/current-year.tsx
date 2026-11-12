"use client";

import { useTicking } from "@/lib/use-ticking";

/**
 * The year for the copyright line. The page is built ahead of time, so the
 * server value is the build year; the browser swaps in the real year on load.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useTicking(() => new Date().getFullYear(), buildYear, 3_600_000);
  return <>{year}</>;
}
