import { isISODate } from "./dates.ts";
import type { EntryInput, EntryLink } from "./types.ts";

/** "RAG, LLM ,  rag" -> ["rag", "llm"]. Lower-case, no #, no duplicates. */
export function parseTags(text: string): string[] {
  const seen = new Set<string>();
  for (const part of text.split(/[,\n]/)) {
    const tag = part.trim().replace(/^#+/, "").toLowerCase();
    if (tag) seen.add(tag);
  }
  return [...seen].slice(0, 20);
}

/** One item per non-empty line. */
export function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean);
}

/** Lines like "Title | https://..." or just "https://...". Returns the links and any bad lines. */
export function parseLinks(text: string): { links: EntryLink[]; invalid: string[] } {
  const links: EntryLink[] = [];
  const invalid: string[] = [];
  for (const line of parseLines(text)) {
    const [first, ...rest] = line.split("|").map((part) => part.trim());
    const url = rest.length ? rest.join("|").trim() : first;
    const title = rest.length ? first : "";
    if (/^https?:\/\/\S+$/i.test(url)) links.push({ title: title || url, url });
    else invalid.push(line);
  }
  return { links, invalid };
}

export const linksToText = (links: EntryLink[]) => links.map((l) => (l.title === l.url ? l.url : `${l.title} | ${l.url}`)).join("\n");

export interface EntryDraft {
  title: string;
  entry_date: string;
  category_id: string;
  tags: string;
  summary: string;
  explanation: string;
  takeaways: string;
  examples: string;
  links: string;
}

/** Checks the form and turns it into what the database stores. */
export function draftToInput(draft: EntryDraft): { input?: EntryInput; errors: string[] } {
  const errors: string[] = [];
  const title = draft.title.trim();
  if (!title) errors.push("Add a title.");
  if (title.length > 200) errors.push("Keep the title under 200 characters.");
  if (!isISODate(draft.entry_date)) errors.push("Pick a valid date.");
  const { links, invalid } = parseLinks(draft.links);
  if (invalid.length) errors.push(`These references are not links starting with http: ${invalid.join("; ")}`);
  if (errors.length) return { errors };
  return {
    errors,
    input: {
      title,
      entry_date: draft.entry_date,
      category_id: draft.category_id || null,
      tags: parseTags(draft.tags),
      summary: draft.summary.trim(),
      explanation: draft.explanation.trim(),
      takeaways: parseLines(draft.takeaways),
      examples: draft.examples.trim(),
      links,
    },
  };
}
