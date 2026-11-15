"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { addDays, formatLong, monthShort } from "@/lib/journal/dates";
import { buildWeeks, heatLevel, monthLabelIndexes, rollingRange, yearRange } from "@/lib/journal/stats";

interface Props {
  counts: Map<string, number>;
  today: string;
  selected: string | null;
  onSelect: (date: string) => void;
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

/** The calendar. Until the browser knows today's date it shows an empty frame, so nothing mismatches. */
export function Heatmap(props: Props) {
  if (!props.today) return <div className="j-heat-empty" aria-hidden="true" />;
  return <HeatmapGrid {...props} />;
}

function HeatmapGrid({ counts, today, selected, onSelect }: Props) {
  const years = useMemo(() => {
    const set = new Set([...counts.keys()].map((date) => Number(date.slice(0, 4))));
    return [...set].sort((a, b) => b - a);
  }, [counts]);
  const [mode, setMode] = useState<"rolling" | number>("rolling");
  const range = mode === "rolling" ? rollingRange(today) : yearRange(mode);
  const weeks = useMemo(() => buildWeeks(range.start, range.end), [range.start, range.end]);
  const labels = monthLabelIndexes(weeks);
  const scroller = useRef<HTMLDivElement>(null);

  // Start scrolled to the newest weeks, which matters on a phone.
  useEffect(() => {
    const el = scroller.current;
    if (el && mode === "rolling") el.scrollLeft = el.scrollWidth;
  }, [mode, today]);

  const inRange = (date: string) => date >= range.start && date <= range.end && date <= today;
  const focusDate = selected && inRange(selected) ? selected : inRange(today) ? today : range.end;

  let total = 0;
  for (const [date, count] of counts) if (date >= range.start && date <= range.end) total += count;

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const step = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key];
    const current = (event.target as HTMLElement).dataset.date;
    if (!step || !current) return;
    const next = addDays(current, step);
    if (!inRange(next)) return;
    event.preventDefault();
    scroller.current?.querySelector<HTMLButtonElement>(`[data-date="${next}"]`)?.focus();
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
              const count = counts.get(cell.date) ?? 0;
              const label = `${formatLong(cell.date)}: ${count === 0 ? "nothing saved" : `${count} ${count === 1 ? "entry" : "entries"}`}`;
              if (cell.date > today) return <i key={cell.date} className="j-cell future" aria-hidden="true" />;
              return (
                <button
                  key={cell.date}
                  type="button"
                  data-date={cell.date}
                  className={`j-cell lv${heatLevel(count)}${cell.date === today ? " is-today" : ""}${cell.date === selected ? " is-selected" : ""}`}
                  aria-label={label}
                  aria-pressed={cell.date === selected}
                  title={label}
                  tabIndex={cell.date === focusDate ? 0 : -1}
                  onClick={() => onSelect(cell.date)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="j-heat-foot">
        <p>
          {total} {total === 1 ? "entry" : "entries"} {mode === "rolling" ? "in the last year" : `in ${mode}`}
        </p>
        <div className="j-legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className={`j-cell lv${level}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      {years.length > 0 && (
        <div className="j-years" role="group" aria-label="Choose a period">
          <button type="button" aria-pressed={mode === "rolling"} onClick={() => setMode("rolling")}>
            Last 12 months
          </button>
          {years.map((year) => (
            <button key={year} type="button" aria-pressed={mode === year} onClick={() => setMode(year)}>
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
