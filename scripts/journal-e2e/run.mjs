/**
 * End-to-end check of the learning journal: drives a real browser through the
 * scenarios in the brief (visitor and owner) against a local fake Supabase.
 *
 * 1. node scripts/journal-e2e/fake-supabase.mjs                      (leave running)
 * 2. build and start the site pointed at it:
 *      NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key npm run build
 *      npx next start -p 3150                                         (leave running)
 * 3. node scripts/journal-e2e/run.mjs
 *
 * Restart the fake server before each run (it holds data in memory). Needs
 * Chrome, Edge or Chromium; set CHROME_PATH if it is not found.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { addDays, formatLong, todayIST } from "../../src/lib/journal/dates.ts";

const SITE = process.env.SITE ?? "http://localhost:3150";
const API = process.env.API ?? "http://localhost:54321";
const OUT = mkdtempSync(path.join(os.tmpdir(), "journal-e2e-"));
const T = todayIST();
const d = (n) => addDays(T, n);

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : `   -> ${detail}`}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- browser
const edge = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((candidate) => candidate && existsSync(candidate));
if (!edge) throw new Error("No Chrome, Edge or Chromium found. Set CHROME_PATH.");
// Extensions and browser-vendor features are switched off so their own scripts cannot add console noise.
const proc = spawn(
  edge,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--remote-debugging-port=9555",
    "--disable-extensions",
    "--disable-component-extensions-with-background-pages",
    "--disable-features=EdgeShopping,msEdgeShopping,EdgeCollections,msEdgeCopilot,Translate",
    `--user-data-dir=${path.join(OUT, "profile")}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);
await sleep(3500);
const targets = await (await fetch("http://127.0.0.1:9555/json")).json();
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result);
  if (msg.method === "Runtime.exceptionThrown") { const x = msg.params.exceptionDetails; errors.push(`${x.exception?.description ?? x.text}  @ ${x.url ?? ""}:${x.lineNumber}:${x.columnNumber} frames=${(x.stackTrace?.callFrames ?? []).slice(0, 4).map((f) => `${f.functionName || "?"}(${f.url.split("/").pop()}:${f.lineNumber})`).join(" < ")}`); }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") errors.push(msg.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 200));
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Runtime.enable");
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 1000, deviceScaleFactor: 1, mobile: false });

const ev = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error(`eval failed: ${r.exceptionDetails.exception?.description ?? r.exceptionDetails.text}\n${expr.slice(0, 150)}`);
  return r.result.value;
};
const waitFor = async (expr, label, ms = 8000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) { try { if (await ev(`Boolean(${expr})`)) return true; } catch {} await sleep(120); }
  throw new Error(`timed out waiting for: ${label ?? expr}`);
};
const goto = async (path) => { await send("Page.navigate", { url: SITE + path }); await sleep(400); };
const setValue = (sel, value) => ev(`(()=>{const el=document.querySelector(${JSON.stringify(sel)});if(!el)throw new Error('no '+${JSON.stringify(sel)});const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));return true})()`);
const click = (sel) => ev(`(()=>{const el=document.querySelector(${JSON.stringify(sel)});if(!el)throw new Error('no '+${JSON.stringify(sel)});el.click();return true})()`);
const clickText = (sel, text) => ev(`(()=>{const el=[...document.querySelectorAll(${JSON.stringify(sel)})].find(e=>e.textContent.trim().includes(${JSON.stringify(text)}));if(!el)throw new Error('no '+${JSON.stringify(sel)}+' with '+${JSON.stringify(text)});el.click();return true})()`);
const texts = (sel) => ev(`[...document.querySelectorAll(${JSON.stringify(sel)})].map(e=>e.textContent.trim())`);
const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(path.join(OUT, `${name}.png`), Buffer.from(s.data, "base64")); };
const cell = (date) => `button.j-cell[data-date="${date}"]`;
const openDay = async (date) => {
  await click(cell(date));
  await waitFor(`document.querySelector('#day-title')?.textContent.includes(${JSON.stringify(formatLong(date))}) && !document.querySelector('.j-day .j-muted')`, `day ${date} loaded`);
};
const ready = () => waitFor(`document.querySelector('.j-stats dd')?.textContent !== '—' && document.querySelector('.j-heat-grid')`, "dashboard loaded");

// ---------- data via the API (as the owner)
const login = await (await fetch(`${API}/auth/v1/token?grant_type=password`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "owner@test.dev", password: "pw" }) })).json();
const H = { "content-type": "application/json", apikey: "anon-key", authorization: `Bearer ${login.access_token}`, prefer: "return=representation" };
const cats = await (await fetch(`${API}/rest/v1/categories`)).json();
const cat = (name) => cats.find((c) => c.name === name).id;
const post = async (row) => { const r = await fetch(`${API}/rest/v1/learning_entries`, { method: "POST", headers: H, body: JSON.stringify(row) }); if (!r.ok) throw new Error(await r.text()); };

const sd = cat("System Design");
for (const [title, tags] of [["System Design Fundamentals", ["architecture"]], ["Load Balancing", ["scaling"]], ["Horizontal vs Vertical Scaling", ["scaling"]]])
  await post({ entry_date: d(-1), title, category_id: sd, tags, summary: `Notes on ${title}.`, explanation: `Full explanation of **${title}**.`, takeaways: ["Point one", "Point two"] });
for (const title of ["Understanding REST APIs", "Spring Boot Request Lifecycle"])
  await post({ entry_date: d(-2), title, category_id: cat("Java & Spring Boot"), tags: ["java"], summary: "Backend notes." });
await post({ entry_date: d(-3), title: "Kafka basics", category_id: cat("Distributed Systems"), tags: ["kafka"], summary: "Topics and partitions." });
await post({ entry_date: d(-10), title: "Intro to RAG", category_id: cat("RAG & AI Agents"), tags: ["rag", "embeddings"], summary: "Retrieval augmented generation basics." });
const other = cat("Other");
for (let i = 0; i < 1050; i++) await post({ entry_date: addDays("2024-01-01", i % 300), title: `Bulk ${i}`, category_id: other });
const seeded = (await (await fetch(`${API}/__count`)).json()).entries;
console.log(`screenshots on failure go to ${OUT}`);
console.log(`seeded ${seeded} entries (${T} is today)\n`);

try {
  // ================= visitor =================
  console.log("--- as a visitor (not logged in)");
  await goto("/journal");
  await ready();
  const stats = await texts(".j-stats dd");
  check("Total entries matches the database even past the 1,000-row API cap", stats[0] === String(seeded), `ui=${stats[0]} db=${seeded}`);
  check("Streak counts back from yesterday when nothing is saved today (3 days)", stats[1] === "3 days", stats[1]);
  const docDays = 300 + 4; // bulk dates + T-1, T-2, T-3, T-10
  check("Days documented = distinct days with entries", stats[2] === String(docDays), `${stats[2]} vs ${docDays}`);
  check("Today's date is shown", (await texts(".j-today-date"))[0] === formatLong(T));
  check("Today's learning says nothing saved, and offers no add link to visitors", (await ev(`document.querySelector('.j-today').textContent.includes('Nothing saved yet today') && !document.querySelector('.j-today a[href*="write"]')`)));
  check("Latest entry shows one of yesterday's topics", (await ev(`document.querySelector('.j-latest h3').textContent`)).length > 0 && (await ev(`document.querySelector('.j-latest .j-kicker').textContent.includes(${JSON.stringify(formatLong(d(-1)))})`)));
  check("Latest entry has an 'Open complete notes' button", await ev(`document.querySelector('.j-latest a.j-open')?.textContent.includes('Open complete notes')`));
  check("Calendar has month labels, weekday labels and a legend", await ev(`document.querySelectorAll('.j-heat-months span').length>=11 && document.querySelector('.j-heat-days').textContent.includes('Mon') && document.querySelector('.j-legend').textContent.includes('Less')`));
  check("Today's square is highlighted", await ev(`document.querySelector(${JSON.stringify(cell(T))}).classList.contains('is-today')`));
  check("Days with 3 / 2 / 1 / 0 entries get different shades", (await ev(`[${[-1, -2, -3, -4].map((n) => `document.querySelector(${JSON.stringify(cell(d(n)))}).className.match(/lv\\d/)[0]`).join(",")}]`)).join() === "lv3,lv2,lv1,lv0");

  // Scenario 3: yesterday's square shows yesterday's records
  await openDay(d(-1));
  const y = await texts(".j-day-topics li");
  check("Scenario 3: clicking yesterday shows yesterday's three topics, not today's", y.join("|") === "System Design Fundamentals|Load Balancing|Horizontal vs Vertical Scaling", y.join("|"));
  check("The panel shows the complete notes, not just titles", await ev(`document.querySelector('.j-day-entry').textContent.includes('Full explanation of') && document.querySelector('.j-day-entry').textContent.includes('Point two')`));
  check("The URL records the selected day", (await ev(`location.search`)) === `?date=${d(-1)}`);
  await shot("visitor-day");

  await click(`.j-day-head button[aria-label="Previous day"]`);
  await waitFor(`document.querySelector('#day-title')?.textContent.includes(${JSON.stringify(formatLong(d(-2)))})`, "previous day");
  check("Previous day navigation loads the day before", (await texts(".j-day-topics li")).join("|") === "Understanding REST APIs|Spring Boot Request Lifecycle");
  await click(`.j-day-head button[aria-label="Next day"]`);
  await waitFor(`document.querySelector('#day-title')?.textContent.includes(${JSON.stringify(formatLong(d(-1)))})`, "next day");
  await click(`.j-day-head button[aria-label="Next day"]`);
  await waitFor(`document.querySelector('#day-title')?.textContent.includes(${JSON.stringify(formatLong(T))})`, "today");
  check("Next day stops at today", await ev(`document.querySelector('.j-day-head button[aria-label="Next day"]').disabled`));

  // Scenario 6 (visitor): empty day
  await openDay(d(-5));
  check("Scenario 6: an empty day shows a clean empty state", await ev(`document.querySelector('.j-empty').textContent.includes('Nothing was saved on')`));
  check("Visitors are not offered 'add entry' on an empty day", await ev(`!document.querySelector('.j-empty a')`));

  // Scenario 5: search RAG
  await setValue("#journal-search", "RAG");
  await click(`.j-search button[type="submit"]`);
  await waitFor(`document.querySelector('.j-chip')`, "search chip");
  await waitFor(`!document.querySelector('.j-list[aria-busy="true"]')`, "results settled");
  const rag = await texts(".j-list .j-card h3");
  check("Scenario 5: searching RAG finds the saved RAG note and nothing unrelated", rag.join("|") === "Intro to RAG", rag.join("|"));
  await setValue("#journal-search", "kafka");
  await click(`.j-search button[type="submit"]`);
  await waitFor(`document.querySelector('.j-list .j-card h3')?.textContent==='Kafka basics'`, "kafka");
  check("When did I study Kafka? shows the date of that entry", (await texts(".j-list .j-card time"))[0] === formatLong(d(-3)));

  await setValue("#journal-search", "What did I learn yesterday?");
  await click(`.j-search button[type="submit"]`);
  await waitFor(`document.querySelectorAll('.j-list .j-card').length===3`, "yesterday results");
  check("'What did I learn yesterday?' returns yesterday's three entries", (await texts(".j-chip"))[0].includes("Yesterday"));
  await setValue("#journal-search", "Show all my System Design notes");
  await click(`.j-search button[type="submit"]`);
  await waitFor(`document.querySelector('.j-chip')?.textContent.includes('System Design')`, "category chip");
  await waitFor(`document.querySelectorAll('.j-list .j-card').length===3`, "category results");
  check("'Show all my System Design notes' returns that category", true);
  await clickText(".j-tabs button", "Yesterday");
  await waitFor(`!document.querySelector('.j-chip') && document.querySelectorAll('.j-list .j-card').length===3`, "yesterday tab");
  check("Yesterday tab lists yesterday's entries", true);
  await clickText(".j-tabs button", "Today");
  await waitFor(`!document.querySelector('.j-chip') && document.querySelector('.j-muted') && document.body.textContent.includes('Nothing matches that')`, "today tab empty");
  check("Today tab is empty before anything is added", true);
  await clickText(".j-tabs button", "Last 7 days");
  await waitFor(`document.querySelectorAll('.j-list .j-card').length===6`, "7-day tab");
  check("Last 7 days tab lists the 6 entries from the last week", true);
  await setValue(".j-select select", cats.find((c) => c.name === "Java & Spring Boot").id);
  await waitFor(`document.querySelectorAll('.j-list .j-card').length===2`, "category filter");
  check("Category filter narrows the list", true);
  await setValue(".j-select select", "");

  // detail page + related
  await goto("/journal");
  await ready();
  await openDay(d(-1));
  await click(".j-day-entry h4 a");
  await waitFor(`document.querySelector('.j-entry h1')`, "detail page");
  check("Entry page shows title, date, category and the full notes", await ev(`document.querySelector('.j-entry h1').textContent==='System Design Fundamentals' && document.querySelector('.j-entry').textContent.includes('Point two') && document.querySelector('.j-entry-meta').textContent.includes('System Design')`));
  await waitFor(`document.querySelectorAll('.j-related .j-card').length>0`, "related");
  check("Related entries from the same category are listed", (await texts(".j-related .j-card h3")).includes("Load Balancing"));
  check("Visitors see no Edit / Delete on an entry", await ev(`!document.querySelector('.j-actions')`));

  // visitor cannot write
  await goto("/journal/write");
  await waitFor(`document.querySelector('.j-form h1')`);
  check("Visitors are asked to log in on the write page", (await texts(".j-form h1"))[0] === "Log in to write");
  const denied = await fetch(`${API}/rest/v1/learning_entries`, { method: "POST", headers: { "content-type": "application/json", apikey: "anon-key", authorization: "Bearer anon-key" }, body: JSON.stringify({ entry_date: T, title: "hack" }) });
  check("The database refuses a write that is not from the owner", denied.status === 403, String(denied.status));

  // The homepage shows the same calendar, as links
  await goto("/");
  await waitFor(`document.querySelector('#learning .j-heat-grid a.j-cell')`, "homepage calendar");
  check("Homepage has the learning calendar section", (await texts("#learning h2"))[0] === "What I learned, day by day");
  check("Homepage calendar squares are links to that day in the journal", (await ev(`document.querySelector('#learning a.j-cell[data-date="${d(-1)}"]').getAttribute('href')`)) === `/journal?date=${d(-1)}`);
  check("Homepage calendar shows the same shades and totals", (await ev(`document.querySelector('#learning a.j-cell[data-date="${d(-1)}"]').className.includes('lv3')`)) && (await ev(`document.querySelector('#learning .j-home-stats').textContent.includes('${seeded} entries')`)));
  await click(`#learning a.j-cell[data-date="${d(-1)}"]`);
  await waitFor(`location.search==='?date=${d(-1)}'`, "opened from the homepage");
  await waitFor(`document.querySelector('.j-day-topics')`, "day opened from the homepage");
  check("Clicking a homepage square opens that day's notes in the journal", (await texts(".j-day-topics li")).length === 3);

  // ================= owner =================
  console.log("\n--- as the owner");
  await goto("/journal/login");
  await waitFor(`document.querySelector('input[type=email]')`);
  await setValue("input[type=email]", "owner@test.dev");
  await setValue("input[type=password]", "wrong");
  await click(`button[type=submit]`);
  await waitFor(`document.querySelector('[role=alert]')`, "login error");
  check("A wrong password is rejected with a clear message", (await texts("[role=alert]"))[0].includes("did not work"));
  await setValue("input[type=password]", "pw");
  await click(`button[type=submit]`);
  await waitFor(`location.pathname==='/journal' && document.querySelector('.j-header button')`, "logged in");
  check("Logging in shows Log out and New entry", await ev(`document.querySelector('.j-header button').textContent==='Log out' && [...document.querySelectorAll('.j-header a')].some(a=>a.textContent==='New entry')`));

  const writeEntry = async (e) => {
    await goto("/journal/write");
    await waitFor(`document.querySelector('.j-form input[maxlength]')`, "form");
    await setValue(".j-form input[maxlength]", e.title);
    if (e.category) await setValue(".j-form select", cats.find((c) => c.name === e.category)?.id ?? e.category);
    await setValue(`.j-form input[placeholder*="rag"]`, e.tags);
    await setValue(`.j-form textarea[rows="2"]`, e.summary);
    await setValue(`.j-form textarea[rows="10"]`, e.explanation);
    await setValue(`.j-form textarea[rows="4"]`, e.takeaways);
    await click(`.j-form button[type=submit]`);
    await waitFor(`location.pathname.startsWith('/journal/') && document.querySelector('.j-entry h1')?.textContent===${JSON.stringify(e.title)}`, `saved ${e.title}`);
  };

  // validation
  await goto("/journal/write");
  await waitFor(`document.querySelector('.j-form input[maxlength]')`);
  check("The date defaults to today", (await ev(`document.querySelector('input[type=date]').value`)) === T);
  await click(`.j-form button[type=submit]`);
  await waitFor(`document.querySelector('.j-errors')`, "validation");
  check("Saving without a title shows an error and saves nothing", (await texts(".j-errors li"))[0] === "Add a title.");

  // Scenario 1
  const before = (await (await fetch(`${API}/__count`)).json()).entries;
  await writeEntry({ title: "How AI Applications Work", category: "Artificial Intelligence", tags: "ai, llm", summary: "How the frontend, backend and an LLM fit together.", explanation: "## Flow\nThe browser calls an API.\n\n```java\nSystem.out.println(1);\n```\n\n<script>window.__xss=1</script>", takeaways: "Frontend talks to a backend\nThe LLM never sees the browser" });
  check("Saved entry renders Markdown (heading and code block)", await ev(`document.querySelector('.md h2')?.textContent==='Flow' && document.querySelector('.md pre code')?.textContent.includes('System.out')`));
  check("Raw HTML in notes is not executed", await ev(`!window.__xss && !document.querySelector('.md script')`));
  await writeEntry({ title: "Introduction to LLMs", category: "Generative AI & LLMs", tags: "llm", summary: "What an LLM does.", explanation: "Tokens in, tokens out.", takeaways: "Predicts the next token" });
  await writeEntry({ title: "Understanding Tokens", category: "Generative AI & LLMs", tags: "tokens, rag", summary: "Why tokens matter for cost and RAG chunking.", explanation: "Roughly four characters per token.", takeaways: "Count tokens, not words" });
  const afterThree = (await (await fetch(`${API}/__count`)).json()).entries;
  check("Three entries were stored in the database", afterThree === before + 3, `${before} -> ${afterThree}`);

  await goto("/journal");
  await ready();
  check("Today's learning lists the three topics", (await texts(".j-topics li a")).join("|") === "How AI Applications Work|Introduction to LLMs|Understanding Tokens");
  check("Streak grows to 4 days with today included", (await texts(".j-stats dd"))[1] === "4 days");
  check("Scenario 7: three entries today color today's square at level 3", await ev(`document.querySelector(${JSON.stringify(cell(T))}).classList.contains('lv3')`));
  check("Latest entry is today's learning", await ev(`document.querySelector('.j-latest .j-kicker').textContent.includes("Today's learning")`));
  await openDay(T);
  check("Scenario 1: clicking today shows all three topics", (await texts(".j-day-topics li")).join("|") === "How AI Applications Work|Introduction to LLMs|Understanding Tokens");
  await shot("owner-day");

  // Scenario 7: a fourth on the same day
  await writeEntry({ title: "Embeddings in one page", category: "RAG & AI Agents", tags: "embeddings, rag", summary: "Vectors for meaning.", explanation: "Similar meaning, nearby vectors.", takeaways: "Cosine similarity" });
  await goto("/journal");
  await ready();
  check("Scenario 7: four entries on one day raise the square to the top level", await ev(`document.querySelector(${JSON.stringify(cell(T))}).classList.contains('lv4')`));

  // Scenario 4: refresh
  await send("Page.reload");
  await sleep(500);
  await ready();
  check("Scenario 4: after a refresh the four entries and the login are still there", (await texts(".j-topics li a")).length === 4 && (await ev(`document.querySelector('.j-header button')?.textContent==='Log out'`)));

  // Scenario 5 with new data
  await setValue("#journal-search", "RAG");
  await click(`.j-search button[type="submit"]`);
  await waitFor(`document.querySelector('.j-chip')`, "search chip");
  await waitFor(`!document.querySelector('.j-list[aria-busy="true"]')`, "results settled");
  const ragNow = await texts(".j-list .j-card h3");
  check("Scenario 5: RAG now finds notes by tag and by text", ["Intro to RAG", "Understanding Tokens", "Embeddings in one page"].every((t) => ragNow.includes(t)), ragNow.join("|"));

  // Scenario 6 for the owner
  await goto("/journal");
  await ready();
  await openDay(d(-6));
  check("Scenario 6: the owner sees 'Add a learning entry for this date'", await ev(`document.querySelector('.j-empty a')?.textContent.includes('Add a learning entry for this date')`));
  await click(".j-empty a");
  await waitFor(`document.querySelector('input[type=date]')`);
  check("That link opens the editor with the date already filled in", (await ev(`document.querySelector('input[type=date]').value`)) === d(-6));

  // Edit, category, delete
  await goto("/journal");
  await ready();
  await openDay(d(-3));
  await click(".j-day-entry h4 a");
  await waitFor(`document.querySelector('.j-actions a')`);
  await click(".j-actions a");
  await waitFor(`document.querySelector('.j-form input[maxlength]')?.value==='Kafka basics'`, "edit form loaded");
  await setValue(".j-form input[maxlength]", "Kafka basics (revised)");
  await setValue(`input[aria-label="New category name"]`, "Networking");
  await clickText(".j-inline button", "Add");
  await waitFor(`[...document.querySelectorAll('.j-form select option')].some(o=>o.textContent==='Networking')`, "new category");
  check("A new category can be added and is selectable", true);
  await setValue(".j-form textarea[placeholder*='Title']", "Kafka docs | https://kafka.apache.org/documentation");
  await click(`.j-form button[type=submit]`);
  await waitFor(`document.querySelector('.j-entry h1')?.textContent==='Kafka basics (revised)'`, "edit saved");
  check("Editing saves the change and keeps the same entry", await ev(`document.querySelector('.j-refs a')?.href==='https://kafka.apache.org/documentation'`));
  await ev(`window.confirm=()=>true`);
  const countBeforeDelete = (await (await fetch(`${API}/__count`)).json()).entries;
  await clickText(".j-actions button", "Delete");
  await waitFor(`location.pathname==='/journal'`, "back to journal");
  const countAfterDelete = (await (await fetch(`${API}/__count`)).json()).entries;
  check("Deleting removes the entry from the database", countAfterDelete === countBeforeDelete - 1, `${countBeforeDelete} -> ${countAfterDelete}`);

  // Scenario 2: the next day
  const shift = await send("Page.addScriptToEvaluateOnNewDocument", { source: `(()=>{const RD=Date;const off=86400000;class D extends RD{constructor(...a){if(a.length===0)super(RD.now()+off);else super(...a)}static now(){return RD.now()+off}};window.Date=D})()` });
  await goto("/journal");
  await ready();
  check("Scenario 2 (next day): the date and today's list reset", (await texts(".j-today-date"))[0] === formatLong(d(1)) && (await ev(`document.querySelector('.j-today').textContent.includes('Nothing saved yet today')`)));
  check("Scenario 2: the streak survives into the new day until it is missed", (await texts(".j-stats dd"))[1] === "3 days", (await texts(".j-stats dd"))[1]);
  await openDay(T);
  check("Scenario 2: yesterday's four topics are all still there to revise", (await texts(".j-day-topics li")).length === 4);
  await send("Page.removeScriptToEvaluateOnNewDocument", { identifier: shift.identifier });

  // logout
  await goto("/journal");
  await ready();
  await clickText(".j-header button", "Log out");
  await waitFor(`document.querySelector('.j-login-link')`, "logged out");
  check("Logging out returns to the visitor view", await ev(`!document.querySelector('.j-header button') && ![...document.querySelectorAll('.j-header a')].some(a=>a.textContent==='New entry')`));
  check("No page errors in the browser console during the whole run", errors.length === 0, [...new Set(errors)].slice(0, 2).join(" || "));
} catch (error) {
  check("Test run completed without an unexpected problem", false, String(error.message ?? error));
  await shot("failure").catch(() => {});
} finally {
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  ws.close();
  proc.kill();
  process.exit(failed.length ? 1 : 0);
}
