import {
  WEEKDAYS,
  addDays,
  endOfMonth,
  formatLong,
  formatShort,
  startOfMonth,
  startOfWeekMonday,
  weekday,
  weekdayName,
} from "./dates.ts";

export interface ParsedQuery {
  from?: string;
  to?: string;
  categoryId?: string;
  categoryName?: string;
  /** What is left after dates, categories and filler words are removed. */
  text: string;
  /** The question in plain words, shown above the results. */
  summary: string;
}

const FILLER = new Set(
  (
    "what when did do does i me my we learn learned learnt learning learnings study studied studying show all the a an " +
    "about on in of to for from were was is are during notes note entries entry topics topic find search give list tell " +
    "anything everything last previous past that this"
  ).split(" "),
);

const rangeLabel = (from: string, to: string) =>
  from === to ? formatLong(from) : `${formatShort(from)} to ${formatShort(to)}`;

/**
 * Turns a question like "What did I learn last Monday?" into a date range, a
 * category and a search word. It is a small set of rules, not AI: it only
 * understands today, yesterday, last <weekday>, last/this week, last/this
 * month and "last N days", plus category names and plain keywords.
 */
export function parseQuery(
  raw: string,
  today: string,
  categories: { id: string; name: string }[] = [],
): ParsedQuery {
  let q = ` ${raw.toLowerCase().replace(/[?!.,;:]/g, " ").replace(/\s+/g, " ")} `;
  let from: string | undefined;
  let to: string | undefined;
  let label = "";

  const take = (re: RegExp) => {
    const match = q.match(re);
    if (match) q = q.replace(re, " ");
    return match;
  };

  let m: RegExpMatchArray | null;
  if ((m = take(/ (?:the )?(?:last|past|previous) (\d{1,3}) days /))) {
    const n = Math.max(1, Number(m[1]));
    from = addDays(today, -(n - 1));
    to = today;
    label = `The last ${n} days`;
  } else if ((m = take(/ (?:the )?(?:last|previous) week /))) {
    from = addDays(startOfWeekMonday(today), -7);
    to = addDays(from, 6);
    label = "Last week";
  } else if (take(/ this week /)) {
    from = startOfWeekMonday(today);
    to = today;
    label = "This week";
  } else if (take(/ (?:the )?(?:last|previous) month /)) {
    const prev = addDays(startOfMonth(today), -1);
    from = startOfMonth(prev);
    to = endOfMonth(prev);
    label = "Last month";
  } else if (take(/ this month /)) {
    from = startOfMonth(today);
    to = today;
    label = "This month";
  } else if ((m = take(new RegExp(` (?:on )?(?:last|previous) (${WEEKDAYS.join("|")}) `)))) {
    const target = WEEKDAYS.indexOf(m[1] as (typeof WEEKDAYS)[number]);
    const back = (weekday(today) - target + 7) % 7 || 7;
    from = to = addDays(today, -back);
    label = `Last ${weekdayName(from)}`;
  } else if (take(/ yesterday /)) {
    from = to = addDays(today, -1);
    label = "Yesterday";
  } else if (take(/ today /)) {
    from = to = today;
    label = "Today";
  }

  let categoryId: string | undefined;
  let categoryName: string | undefined;
  const byLength = [...categories].sort((a, b) => b.name.length - a.name.length);
  for (const category of byLength) {
    const name = category.name.toLowerCase().replace(/[?!.,;:]/g, " ").replace(/\s+/g, " ").trim();
    const re = new RegExp(` ${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} `);
    if (re.test(q)) {
      q = q.replace(re, " ");
      categoryId = category.id;
      categoryName = category.name;
      break;
    }
  }

  const text = q
    .split(" ")
    .filter((word) => word && !FILLER.has(word))
    .join(" ");

  const parts = [
    from && to ? `${label} (${rangeLabel(from, to)})` : "",
    categoryName ? `in ${categoryName}` : "",
    text ? `matching “${text}”` : "",
  ].filter(Boolean);

  return { from, to, categoryId, categoryName, text, summary: parts.join(" · ") || "Everything I have saved" };
}
