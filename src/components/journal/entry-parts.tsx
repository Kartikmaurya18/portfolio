"use client";

import Link from "next/link";
import { formatLong } from "@/lib/journal/dates";
import type { Entry } from "@/lib/journal/types";
import { Markdown } from "./markdown";

export const categoryName = (entry: Entry) => entry.categories?.name ?? "Uncategorised";

export function TagList({ tags }: { tags: string[] }) {
  if (!tags.length) return null;
  return (
    <ul className="j-tags" aria-label="Topics">
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/journal?q=${encodeURIComponent(tag)}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}

/** The complete notes for one entry: summary, explanation, takeaways, examples and references. */
export function EntryBody({ entry }: { entry: Entry }) {
  return (
    <>
      {entry.summary && <p className="j-summary">{entry.summary}</p>}
      <Markdown>{entry.explanation}</Markdown>
      {entry.takeaways.length > 0 && (
        <section className="j-block">
          <h3>Key takeaways</h3>
          <ul className="j-takeaways">
            {entry.takeaways.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}
      {entry.examples.trim() && (
        <section className="j-block">
          <h3>Examples</h3>
          <Markdown>{entry.examples}</Markdown>
        </section>
      )}
      {entry.links.length > 0 && (
        <section className="j-block">
          <h3>References</h3>
          <ul className="j-refs">
            {entry.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

/** A compact row for lists and search results. */
export function EntryCard({ entry, showDate = true }: { entry: Entry; showDate?: boolean }) {
  return (
    <li className="j-card">
      <p className="j-card-meta">
        {showDate && <time dateTime={entry.entry_date}>{formatLong(entry.entry_date)}</time>}
        <span>{categoryName(entry)}</span>
      </p>
      <h3>
        <Link href={`/journal/${entry.id}`}>{entry.title}</Link>
      </h3>
      {entry.summary && <p>{entry.summary}</p>}
      <TagList tags={entry.tags} />
    </li>
  );
}

