"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { addDays, formatLong, formatShort, monthShort } from "@/lib/journal/dates";
import { buildWeeks, heatLevel, monthLabelIndexes } from "@/lib/journal/stats";

interface Props {
  counts: Map<string, number>;
  today: string;
  /** First and last day shown, "YYYY-MM-DD". Days after today are shown but cannot be opened. */
  start: string;
  end: string;
  selected?: string | null;
  /** Called when a day is chosen (the journal page). */
  onSelect?: (date: string) => void;
  /** Or: make each day a link (the homepage). */
  href?: (date: string) => string;
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/** The calendar. Until the browser knows today's date it shows an empty frame, so nothing mismatches. */
export function Heatmap(props: Props) {
  if (!props.today) return <div className="j-heat-empty" aria-hidden="true" />;
  return <HeatmapGrid {...props} />;
}

function HeatmapGrid({ counts, today, start, end, selected, onSelect, href }: Props) {
  const weeks = useMemo(() => buildWeeks(start, end), [start, end]);
  const labels = monthLabelIndexes(weeks);
  const scroller = useRef<HTMLDivElement>(null);

  // Open scrolled so today sits in the middle, which matters on a phone.
  useEffect(() => {
    const el = scroller.current;
    const cell = el?.querySelector<HTMLElement>(`[data-date="${today}"]`);
    if (el && cell) el.scrollLeft = Math.max(0, cell.offsetLeft - el.clientWidth / 2);
  }, [today, start, end]);

  const inRange = (date: string) => date >= start && date <= end && date <= today;
  const focusDate = selected && inRange(selected) ? selected : inRange(today) ? today : start;

  let total = 0;
  for (const [date, count] of counts) if (date >= start && date <= end) total += count;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key];
    const current = (event.target as HTMLElement).dataset.date;
    if (!step || !current) return;
    const next = addDays(current, step);
    if (!inRange(next)) return;
    event.preventDefault();
    scroller.current?.querySelector<HTMLElement>(`[data-date="${next}"]`)?.focus();
  }

  return (
    <div className="j-heat">
      <div className="j-heat-body">
        <div className="j-heat-days" aria-hidden="true">
          <span className="j-heat-spacer" />
          {DAY_LABELS.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
        <div className="j-heat-scroll" ref={scroller}>
          <div className="j-heat-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, var(--cell))` }} aria-hidden="true">
            {labels.map((label) => (
              <span key={label.index} style={{ gridColumn: label.index + 1 }}>
                {monthShort(label.date)}
              </span>
            ))}
          </div>
          <div className="j-heat-grid" role="group" aria-label="Learning calendar. Use the arrow keys to move between days." onKeyDown={onKeyDown}>
            {weeks.flat().map((cell) => {
              if (!cell.inRange) return <i key={cell.date} className="j-pad" aria-hidden="true" />;
              if (cell.date > today) return <i key={cell.date} className="j-cell future" aria-hidden="true" />;
              const count = counts.get(cell.date) ?? 0;
              const label = `${formatLong(cell.date)}: ${count === 0 ? "nothing saved" : `${count} ${count === 1 ? "entry" : "entries"}`}`;
              const className = `j-cell lv${heatLevel(count)}${cell.date === today ? " is-today" : ""}${cell.date === selected ? " is-selected" : ""}`;
              const shared = { "data-date": cell.date, className, "aria-label": label, title: label, tabIndex: cell.date === focusDate ? 0 : -1 };
              return href ? (
                <Link key={cell.date} href={href(cell.date)} {...shared} />
              ) : (
                <button key={cell.date} type="button" aria-pressed={cell.date === selected} onClick={() => onSelect?.(cell.date)} {...shared} />
              );
            })}
          </div>
        </div>
      </div>

      <div className="j-heat-foot">
        <p>
          {total} {total === 1 ? "entry" : "entries"} since {formatShort(start)}
        </p>
        <div className="j-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className={`j-cell lv${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
