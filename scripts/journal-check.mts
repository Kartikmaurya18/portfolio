/**
 * Quick self-check for the journal's pure logic (dates, streaks, heat levels,
 * the date-phrase search and form parsing). Run with:
 *
 *   node scripts/journal-check.mts
 *
 * No test framework needed. It exits with an error if anything is wrong.
 */
import assert from "node:assert/strict";
import { addDays, diffDays, endOfMonth, isISODate, startOfWeekMonday, todayIST, weekday } from "../src/lib/journal/dates.ts";
import { draftToInput, parseLinks, parseTags } from "../src/lib/journal/form.ts";
import { parseQuery } from "../src/lib/journal/query.ts";
import { buildWeeks, countByDate, currentStreak, heatLevel, journeyRange, monthLabelIndexes, rollingRange } from "../src/lib/journal/stats.ts";

let passed = 0;
const check = (name: string, fn: () => void) => {
  fn();
  passed += 1;
  console.log(`ok  ${name}`);
};

const TODAY = "2026-11-15"; // a Sunday
const cats = [
  { id: "ai", name: "Artificial Intelligence" },
  { id: "rag", name: "RAG & AI Agents" },
  { id: "sd", name: "System Design" },
  { id: "java", name: "Java & Spring Boot" },
];

check("dates: weekday, add, diff, validation", () => {
  assert.equal(weekday(TODAY), 0);
  assert.equal(addDays("2026-11-30", 1), "2026-12-01");
  assert.equal(addDays("2027-01-01", -1), "2026-12-31");
  assert.equal(diffDays("2025-01-01", "2027-10-31"), 1033);
  assert.equal(isISODate("2026-02-30"), false);
  assert.equal(isISODate("2026-11-15"), true);
  assert.equal(endOfMonth("2026-02-10"), "2026-02-28");
  assert.equal(startOfWeekMonday(TODAY), "2026-11-09");
});

check("today in Mumbai rolls over at 18:30 UTC", () => {
  assert.equal(todayIST(Date.UTC(2026, 10, 14, 18, 29)), "2026-11-14");
  assert.equal(todayIST(Date.UTC(2026, 10, 14, 18, 31)), "2026-11-15");
});

check("heat levels", () => {
  assert.deepEqual([0, 1, 2, 3, 4, 9].map(heatLevel), [0, 1, 2, 3, 4, 4]);
});

check("counts: several entries on one day are combined", () => {
  const counts = countByDate(["2026-11-15", "2026-11-15", "2026-11-15", "2026-11-14"]);
  assert.equal(counts.get("2026-11-15"), 3);
  assert.equal(heatLevel(counts.get("2026-11-15") ?? 0), 3);
  assert.equal(counts.get("2026-11-13"), undefined);
});

check("streak: through today, through yesterday, broken, none", () => {
  const run = (dates: string[]) => currentStreak(countByDate(dates), TODAY);
  assert.equal(run(["2026-11-15", "2026-11-14", "2026-11-13"]), 3);
  assert.equal(run(["2026-11-14", "2026-11-13"]), 2, "no entry yet today keeps the streak alive");
  assert.equal(run(["2026-11-15", "2026-11-13"]), 1, "a gap breaks it");
  assert.equal(run(["2026-11-12"]), 0);
  assert.equal(run([]), 0);
});

check("calendar grid: 53 columns, Sunday first, today inside", () => {
  const { start, end } = rollingRange(TODAY);
  const weeks = buildWeeks(start, end);
  assert.equal(weeks.length, 53);
  assert.ok(weeks.every((w) => w.length === 7 && weekday(w[0].date) === 0));
  const last = weeks[weeks.length - 1];
  assert.equal(last[0].date, TODAY);
  assert.equal(last.filter((c) => c.inRange).length, 1, "only today is in range after Sunday");
  const labels = monthLabelIndexes(weeks);
  assert.ok(labels.length >= 11 && labels.length <= 13);
});

check("calendar range starts on the journal's first day and runs to the deadline", () => {
  const empty = journeyRange(new Map(), "2026-11-15", "2027-10-31", "2026-11-15");
  assert.deepEqual(empty, { start: "2026-11-15", end: "2027-10-31" });
  const weeks = buildWeeks(empty.start, empty.end);
  const days = weeks.flat().filter((c) => c.inRange).length;
  assert.equal(days, 351, "15 Nov 2026 to 31 Oct 2027 inclusive");
  assert.equal(weeks.flat().find((c) => c.inRange)?.date, "2026-11-15");
  assert.equal(weeks.flat().filter((c) => c.inRange).at(-1)?.date, "2027-10-31");
});
check("calendar range widens only for an entry before the start, and never ends before today", () => {
  const early = journeyRange(countByDate(["2026-11-01", "2026-11-20"]), "2026-11-15", "2027-10-31", "2026-11-20");
  assert.equal(early.start, "2026-11-01");
  assert.equal(journeyRange(new Map(), "2026-11-15", "2026-11-10", "2026-11-20").end, "2026-11-20");
});

// The questions from the brief.
check("query: What did I learn yesterday?", () => {
  const q = parseQuery("What did I learn yesterday?", TODAY, cats);
  assert.equal(q.from, "2026-11-14");
  assert.equal(q.to, "2026-11-14");
  assert.equal(q.text, "");
});
check("query: What did I learn last Monday?", () => {
  const q = parseQuery("What did I learn last Monday?", TODAY, cats);
  assert.equal(q.from, "2026-11-09");
  assert.equal(q.to, "2026-11-09");
  assert.equal(weekday(q.from!), 1);
});
check("query: last <today's weekday> means a week ago, not today", () => {
  const q = parseQuery("last sunday", TODAY, cats);
  assert.equal(q.from, "2026-11-08");
});
check("query: What did I learn about RAG?", () => {
  const q = parseQuery("What did I learn about RAG?", TODAY, cats);
  assert.equal(q.text, "rag");
  assert.equal(q.from, undefined);
  assert.equal(q.categoryId, undefined);
});
check("query: When did I study Kafka?", () => {
  const q = parseQuery("When did I study Kafka?", TODAY, cats);
  assert.equal(q.text, "kafka");
});
check("query: Show all my System Design notes", () => {
  const q = parseQuery("Show all my System Design notes", TODAY, cats);
  assert.equal(q.categoryId, "sd");
  assert.equal(q.text, "");
  assert.equal(q.from, undefined);
});
check("query: What were my learnings during the previous week?", () => {
  const q = parseQuery("What were my learnings during the previous week?", TODAY, cats);
  assert.equal(q.from, "2026-11-02");
  assert.equal(q.to, "2026-11-08");
  assert.equal(q.text, "");
});
check("query: combined and other ranges", () => {
  const a = parseQuery("system design last 7 days", TODAY, cats);
  assert.deepEqual([a.from, a.to, a.categoryId], ["2026-11-09", TODAY, "sd"]);
  const b = parseQuery("kafka last month", TODAY, cats);
  assert.deepEqual([b.from, b.to, b.text], ["2026-10-01", "2026-10-31", "kafka"]);
  const c = parseQuery("java & spring boot", TODAY, cats);
  assert.equal(c.categoryId, "java");
  const d = parseQuery("", TODAY, cats);
  assert.equal(d.summary, "Everything I have saved");
});

check("form: tags, lines, links", () => {
  assert.deepEqual(parseTags("RAG, #LLM ,  rag,\nKafka"), ["rag", "llm", "kafka"]);
  const { links, invalid } = parseLinks("Docs | https://example.com/a\nhttps://b.dev\nnot a link\njavascript:alert(1)");
  assert.deepEqual(links, [
    { title: "Docs", url: "https://example.com/a" },
    { title: "https://b.dev", url: "https://b.dev" },
  ]);
  assert.equal(invalid.length, 2, "non-http links are rejected");
});
check("form: validation and conversion", () => {
  const base = { title: "  Tokens  ", entry_date: "2026-11-15", category_id: "", tags: "AI, llm", summary: " s ", explanation: "", takeaways: "- one\n- two", examples: "", links: "" };
  const ok = draftToInput(base);
  assert.equal(ok.errors.length, 0);
  assert.deepEqual(ok.input?.takeaways, ["one", "two"]);
  assert.equal(ok.input?.category_id, null);
  assert.equal(ok.input?.title, "Tokens");
  assert.ok(draftToInput({ ...base, title: " " }).errors.length);
  assert.ok(draftToInput({ ...base, entry_date: "2026-13-01" }).errors.length);
});

console.log(`\n${passed} checks passed`);
