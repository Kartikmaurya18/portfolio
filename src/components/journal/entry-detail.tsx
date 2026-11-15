"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteEntry, getEntry, relatedEntries } from "@/lib/journal/api";
import { formatLong } from "@/lib/journal/dates";
import { useQuery, useSession } from "@/lib/journal/hooks";
import { journalConfigured } from "@/lib/journal/supabase";
import type { Entry } from "@/lib/journal/types";
import { EntryBody, EntryCard, TagList, categoryName } from "./entry-parts";
import { SetupNotice } from "./setup-notice";

export function EntryDetail({ id }: { id: string }) {
  if (!journalConfigured) return <SetupNotice />;
  return <Detail id={id} />;
}

function Detail({ id }: { id: string }) {
  const router = useRouter();
  const { owner } = useSession();
  const entry = useQuery(`entry:${id}`, () => getEntry(id));
  const related = useQuery(`related:${entry.data?.id ?? ""}`, () =>
    entry.data ? relatedEntries(entry.data) : Promise.resolve([] as Entry[]),
  );
  const [error, setError] = useState("");

  if (entry.error) {
    return (
      <p role="alert" className="j-error j-entry">
        Could not load this entry: {entry.error}
      </p>
    );
  }
  if (entry.data === undefined) return <p className="j-muted j-entry">Loading…</p>;
  if (entry.data === null) {
    return (
      <div className="j-entry">
        <h1>Entry not found</h1>
        <p className="j-muted">It may have been deleted.</p>
        <Link className="text-link" href="/journal">
          Back to the journal
        </Link>
      </div>
    );
  }

  const item = entry.data;

  async function remove() {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return;
    try {
      await deleteEntry(item.id);
      router.push(`/journal?date=${item.entry_date}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete.");
    }
  }

  return (
    <article className="j-entry">
      <Link className="j-back" href={`/journal?date=${item.entry_date}`}>
        ← {formatLong(item.entry_date)} on the calendar
      </Link>
      <p className="j-card-meta j-entry-meta">
        <time dateTime={item.entry_date}>{formatLong(item.entry_date)}</time>
        <span>{categoryName(item)}</span>
        <span>Updated {formatLong(item.updated_at.slice(0, 10))}</span>
      </p>
      <h1>{item.title}</h1>
      <TagList tags={item.tags} />
      {owner && (
        <div className="j-actions">
          <Link className="button button-quiet button-sm" href={`/journal/${item.id}/edit`}>
            Edit
          </Link>
          <button type="button" className="button button-quiet button-sm" onClick={remove}>
            Delete
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="j-error">
          {error}
        </p>
      )}

      <EntryBody entry={item} />

      {related.data && related.data.length > 0 && (
        <section className="j-related" aria-labelledby="related-title">
          <h2 id="related-title" className="j-h2">Related entries</h2>
          <ul className="j-list">
            {related.data.map((other) => (
              <EntryCard key={other.id} entry={other} />
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
