import type { Stat } from "@/content/stats";
import { hidden } from "@/lib/todo";

const REPEATS = 3;

/**
 * A slow market-style strip. Screen readers get a plain list; the moving copy
 * is hidden from them. It pauses on hover, on focus and with the Pause toggle,
 * and becomes a static row under prefers-reduced-motion.
 */
export function Ticker({ items }: { items: Stat[] }) {
  const visible = items.filter((item) => !hidden(item.value) && !hidden(item.label));
  if (visible.length === 0) return null;

  const half = (halfIndex: number) => (
    <div className="ticker-half" key={halfIndex}>
      {Array.from({ length: REPEATS }, (_, repeat) =>
        visible.map((item) => (
          <span
            key={`${repeat}-${item.label}`}
            className={`ticker-item${halfIndex === 0 && repeat === 0 ? "" : " ticker-rep"}`}
          >
            <strong>{item.value}</strong> {item.label} <span className="ticker-up">▲</span>
          </span>
        )),
      )}
    </div>
  );

  return (
    <section className="ticker" aria-label="Key numbers">
      <ul className="sr-only">
        {visible.map((item) => (
          <li key={item.label}>{item.value} {item.label}</li>
        ))}
      </ul>
      <input type="checkbox" id="ticker-pause" className="ticker-toggle" aria-label="Pause the scrolling numbers" />
      <label htmlFor="ticker-pause" className="ticker-pause" aria-hidden="true">
        <span className="ticker-pause-on">Pause</span>
        <span className="ticker-pause-off">Play</span>
      </label>
      <div className="ticker-viewport" aria-hidden="true">
        <div className="ticker-track">
          {half(0)}
          {half(1)}
        </div>
      </div>
    </section>
  );
}
