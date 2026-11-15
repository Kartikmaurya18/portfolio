"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { entriesOnDate, fetchAllDates, latestEntry, listCategories, listEntries } from "@/lib/journal/api";
import { addDays, formatLong, isISODate, weekdayName } from "@/lib/journal/dates";
import { useQuery, useSession, useToday } from "@/lib/journal/hooks";
import { parseQuery } from "@/lib/journal/query";
import { countByDate, currentStreak } from "@/lib/journal/stats";
import { journalConfigured } from "@/lib/journal/supabase";
import type { Category, Entry, EntryFilter } from "@/lib/journal/types";
import { EntryBody, EntryCard, TagList, categoryName } from "./entry-parts";
import { Heatmap } from "./heatmap";
import { SetupNotice } from "./setup-notice";

export function JournalHome() {
  if (!journalConfigured) return <SetupNotice />;
  return <Dashboard />;
}

function Retry({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <p role="alert" className="j-error">
      Could not load this: {error}{" "}
      <button type="button" className="text-link" onClick={onRetry}>
        Try again
      </button>
    </p>
  );
}

function Dashboard() {
  const router = useRouter();
  const params = useSearchParams();
  const today = useToday();
  const { owner } = useSession();

  const dateParam = params.get("date");
  const selected = dateParam && isISODate(dateParam) ? dateParam : null;
  const urlQuery = params.get("q") ?? "";

  const dates = useQuery("dates", fetchAllDates);
  const categories = useQuery("categories", listCategories);
  const todays = useQuery(`day:${today}`, () => (today ? entriesOnDate(today) : Promise.resolve([] as Entry[])));
  const latest = useQuery("latest", latestEntry);

  const counts = useMemo(() => countByDate(dates.data ?? []), [dates.data]);
  const streak = today ? currentStreak(counts, today) : 0;
  const select = (date: string) => router.replace(`/journal?date=${date}`, { scroll: false });

  return (
    <>
      <section className="j-top" aria-labelledby="journal-title">
        <h1 id="journal-title">My Learning Journey</h1>
        <p className="j-today-date">{today ? formatLong(today) : " "}</p>

        <dl className="j-stats">
          <div>
            <dt>Total entries</dt>
            <dd>{dates.data ? dates.data.length : "—"}</dd>
          </div>
          <div>
            <dt>Current streak</dt>
            <dd>{dates.data && today ? `${streak} ${streak === 1 ? "day" : "days"}` : "—"}</dd>
          </div>
          <div>
            <dt>Days documented</dt>
            <dd>{dates.data ? counts.size : "—"}</dd>
          </div>
        </dl>
        {dates.error && <Retry error={dates.error} onRetry={dates.reload} />}

        <div className="j-today">
          <h2>Today&apos;s learning</h2>
          {todays.error ? (
            <Retry error={todays.error} onRetry={todays.reload} />
          ) : todays.data && todays.data.length > 0 ? (
            <ul className="j-topics">
              {todays.data.map((entry) => (
                <li key={entry.id}>
                  <Link href={`/journal/${entry.id}`}>{entry.title}</Link>
                  <span>{categoryName(entry)}</span>
                </li>
              ))}
            </ul>
          ) : todays.data ? (
            <p className="j-muted">
              Nothing saved yet today.{" "}
              {owner && today && (
                <Link className="text-link" href={`/journal/write?date=${today}`}>
                  Add today&apos;s learning
                </Link>
              )}
            </p>
          ) : (
            <p className="j-muted">Loading…</p>
          )}
        </div>
      </section>

      <section className="j-section" aria-labelledby="latest-title">
        <h2 id="latest-title" className="j-h2">Latest entry</h2>
        {latest.error ? (
          <Retry error={latest.error} onRetry={latest.reload} />
        ) : latest.loading && !latest.data ? (
          <p className="j-muted">Loading…</p>
        ) : latest.data ? (
          <Latest entry={latest.data} today={today} />
        ) : (
          <p className="j-muted">
            No entries yet.{" "}
            {owner && (
              <Link className="text-link" href="/journal/write">
                Write the first one
              </Link>
            )}
          </p>
        )}
      </section>

      <section className="j-section" aria-labelledby="calendar-title">
        <h2 id="calendar-title" className="j-h2">Learning calendar</h2>
        <p className="j-muted">Each square is a day. Darker means more entries. Pick a day to read what I learned.</p>
        <Heatmap counts={counts} today={today} selected={selected} onSelect={select} />
        {selected && today && (
          <DayPanel
            key={selected}
            date={selected}
            today={today}
            owner={owner}
            onSelect={select}
            onClose={() => router.replace("/journal", { scroll: false })}
          />
        )}
      </section>

      <section className="j-section" aria-labelledby="previous-title">
        <h2 id="previous-title" className="j-h2">Previously learned</h2>
        <Previously key={urlQuery} today={today} categories={categories.data ?? []} initialQuery={urlQuery} />
      </section>
    </>
  );
}

function Latest({ entry, today }: { entry: Entry; today: string }) {
  return (
    <article className="j-latest">
      <p className="j-kicker">
        <time dateTime={entry.entry_date}>{formatLong(entry.entry_date)}</time> —{" "}
        {entry.entry_date === today ? "Today's learning" : "Latest learning"}
      </p>
      <h3>{entry.title}</h3>
      <p className="j-card-meta">
        <span>{categoryName(entry)}</span>
      </p>
      {entry.takeaways.length > 0 ? (
        <>
          <p className="j-label">What I learned</p>
          <ul className="j-takeaways">
            {entry.takeaways.slice(0, 5).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      ) : (
        entry.summary && <p className="j-summary">{entry.summary}</p>
      )}
      <TagList tags={entry.tags} />
      <Link className="button button-primary j-open" href={`/journal/${entry.id}`}>
        Open complete notes <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function DayPanel({
  date,
  today,
  owner,
  onSelect,
  onClose,
}: {
  date: string;
  today: string;
  owner: boolean;
  onSelect: (date: string) => void;
  onClose: () => void;
}) {
  const day = useQuery(`day:${date}`, () => entriesOnDate(date));
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panel.current?.scrollIntoView({ block: "nearest", behavior: calm ? "auto" : "smooth" });
  }, []);

  return (
    <section className="j-day" ref={panel} aria-labelledby="day-title" aria-live="polite">
      <div className="j-day-head">
        <button type="button" className="j-step" onClick={() => onSelect(addDays(date, -1))} aria-label="Previous day">
          ←
        </button>
        <h3 id="day-title">
          {formatLong(date)} <span>{weekdayName(date)}</span>
        </h3>
        <button type="button" className="j-step" onClick={() => onSelect(addDays(date, 1))} disabled={date >= today} aria-label="Next day">
          →
        </button>
        <button type="button" className="j-close" onClick={onClose}>
          Close
        </button>
      </div>

      {day.error ? (
        <Retry error={day.error} onRetry={day.reload} />
      ) : day.loading && !day.data ? (
        <p className="j-muted">Loading…</p>
      ) : day.data && day.data.length > 0 ? (
        <>
          <ul className="j-day-topics" aria-label="Topics that day">
            {day.data.map((entry) => (
              <li key={entry.id}>{entry.title}</li>
            ))}
          </ul>
          {day.data.map((entry) => (
            <article key={entry.id} className="j-day-entry">
              <h4>
                <Link href={`/journal/${entry.id}`}>{entry.title}</Link>
              </h4>
              <p className="j-card-meta">
                <span>{categoryName(entry)}</span>
              </p>
              <EntryBody entry={entry} />
              <TagList tags={entry.tags} />
            </article>
          ))}
        </>
      ) : (
        <div className="j-empty">
          <p>Nothing was saved on {formatLong(date)}.</p>
          {owner && (
            <Link className="button button-quiet" href={`/journal/write?date=${date}`}>
              Add a learning entry for this date
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

type Tab = "today" | "yesterday" | "week" | "month" | "all";
const TABS: { id: Tab; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "week", label: "Last 7 days" },
  { id: "month", label: "Last 30 days" },
  { id: "all", label: "All" },
];
const PAGE_SIZE = 20;

function tabFilter(tab: Tab, today: string): EntryFilter {
  switch (tab) {
    case "today":
      return { from: today, to: today };
    case "yesterday":
      return { from: addDays(today, -1), to: addDays(today, -1) };
    case "week":
      return { from: addDays(today, -6), to: today };
    case "month":
      return { from: addDays(today, -29), to: today };
    default:
      return {};
  }
}

function Previously({ today, categories, initialQuery }: { today: string; categories: Category[]; initialQuery: string }) {
  const [tab, setTab] = useState<Tab>("week");
  const [categoryId, setCategoryId] = useState("");
  const [input, setInput] = useState(initialQuery);
  const [applied, setApplied] = useState(initialQuery);
  const [pages, setPages] = useState(1);

  const parsed = useMemo(
    () => (applied.trim() && today ? parseQuery(applied, today, categories) : null),
    [applied, today, categories],
  );
  const filter: EntryFilter = parsed
    ? { from: parsed.from, to: parsed.to, text: parsed.text, categoryId: parsed.categoryId ?? (categoryId || undefined) }
    : { ...(today ? tabFilter(tab, today) : {}), categoryId: categoryId || undefined };

  const results = useQuery(`list:${today}:${JSON.stringify(filter)}:${pages}`, () =>
    today ? listEntries(filter, pages * PAGE_SIZE) : Promise.resolve({ rows: [] as Entry[], hasMore: false }),
  );

  function search(event: FormEvent) {
    event.preventDefault();
    setApplied(input);
    setPages(1);
  }
  function pickTab(next: Tab) {
    setTab(next);
    setApplied("");
    setInput("");
    setPages(1);
  }

  return (
    <div>
      <form className="j-search" onSubmit={search} role="search">
        <label htmlFor="journal-search" className="sr-only">
          Ask or search my notes
        </label>
        <input
          id="journal-search"
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Try: what did I learn yesterday? · Kafka · system design last 7 days"
        />
        <button type="submit" className="button button-quiet button-sm">
          Search
        </button>
      </form>

      <div className="j-filters">
        <div className="j-tabs" role="group" aria-label="Period">
          {TABS.map((item) => (
            <button key={item.id} type="button" aria-pressed={!parsed && tab === item.id} onClick={() => pickTab(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
        <label className="j-select">
          <span className="sr-only">Category</span>
          <select
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
              setPages(1);
            }}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {parsed && (
        <p className="j-chip" aria-live="polite">
          Showing: {parsed.summary}{" "}
          <button type="button" className="text-link" onClick={() => pickTab("week")}>
            Clear
          </button>
        </p>
      )}

      {results.error ? (
        <Retry error={results.error} onRetry={results.reload} />
      ) : !results.data ? (
        <p className="j-muted">Loading…</p>
      ) : results.data.rows.length === 0 ? (
        <p className="j-muted">Nothing matches that.</p>
      ) : (
        <>
          <ul className="j-list" aria-busy={results.loading}>
            {results.data.rows.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </ul>
          {results.data.hasMore && (
            <button type="button" className="button button-quiet j-more" onClick={() => setPages((n) => n + 1)}>
              Load more
            </button>
          )}
        </>
      )}
    </div>
  );
}
