"use client";

import Link from "next/link";
import { useMemo } from "react";
import { diffDays, formatLong } from "@/lib/journal/dates";
import { fetchPublicDates } from "@/lib/journal/public";
import { countByDate, currentStreak, journeyRange } from "@/lib/journal/stats";
import { useQuery, useToday } from "@/lib/journal/use-query";
import { Heatmap } from "./heatmap";

/**
 * The learning calendar for the homepage. It reads only the entry dates (one
 * small request); every square links to that day in the journal.
 */
export function HomeCalendar({ start, end }: { start: string; end: string }) {
  const today = useToday();
  const dates = useQuery("home-dates", fetchPublicDates);
  const counts = useMemo(() => countByDate(dates.data ?? []), [dates.data]);
  const range = today ? journeyRange(counts, start, end, today) : { start, end };
  const streak = today ? currentStreak(counts, today) : 0;
  const total = range.end >= range.start ? diffDays(range.start, range.end) + 1 : 0;
  const dayNumber = today ? Math.min(total, Math.max(1, diffDays(start, today) + 1)) : 0;

  return (
    <div>
      <p className="j-home-stats">
        <span>{dates.data ? `${dates.data.length} ${dates.data.length === 1 ? "entry" : "entries"}` : "—"}</span>
        <span>{dates.data && today ? `${streak}-day streak` : "—"}</span>
        <span>{today ? `Day ${dayNumber} of ${diffDays(start, end) + 1}` : "—"}</span>
      </p>
      {dates.error ? (
        <p className="j-muted" role="alert">
          The calendar could not be loaded right now.
        </p>
      ) : (
        <Heatmap counts={counts} today={today} start={range.start} end={range.end} href={(date) => `/journal?date=${date}`} />
      )}
      <p className="j-home-link">
        Journal started {today ? formatLong(start) : ""}.{" "}
        <Link className="text-link" href="/journal">
          Open the journal →
        </Link>
      </p>
    </div>
  );
}
