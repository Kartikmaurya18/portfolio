# kartikm.in

Portfolio of Kartik Maurya. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. The homepage and case studies are statically prerendered; the learning journal reads from a database in the browser.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Editing content

Content lives in typed data files. Components never hold copy.

| File | What it holds |
| --- | --- |
| `src/content/site.ts` | Name, links, SEO title and description, hero, the countdown dates (road), the contact copy and the footer |
| `src/content/timeline.ts` | How I got here: one entry per step (dates, bullets, key learnings, case study). Entries starting with `TODO:` stay hidden until filled |
| `src/content/freelance.ts` | The client websites. Not shown on the page any more; kept as data |
| `src/content/projects.ts` | The case studies at `/work/[slug]` (problem, approach, decision, stack, result, screenshot alt text) |

Placeholders: anything still needed from you is written as a string starting with `TODO:`. Those are hidden on the live site. To preview them while editing, create `.env.local` with `NEXT_PUBLIC_SHOW_TODOS=1` and restart `npm run dev`.

Search for `TODO(real data)` to find every place that still needs a real number, quote, link or your own words. Fields left `undefined` are not rendered.

## Screenshots

`npm run previews` opens each case study's live site in a local Chrome/Edge, saves desktop (1440px) and mobile (390px) WebP screenshots to `public/projects/`, and records dimensions and blur placeholders in `src/content/previews.generated.json`. Pass slugs to capture only some. The screenshots appear on the case study pages.

## Resume

`public/Kartik-Maurya-Resume.pdf` (linked from the hero and contact). Replace the file, keeping this exact name, to update it.

## Learning journal (`/journal`)

A daily record of what I learn, kept in a database so it is permanent. Anyone can read it; only I can write. It is a GitHub-style calendar where every square opens that day's real notes, plus search over the whole history.

### How it works

```
Browser (Next.js pages, client components)
   |  @supabase/supabase-js  (public "anon" key)
   v
Supabase: Postgres (categories, learning_entries) + Storage (journal-images) + Auth (one user: me)
   Row Level Security: everyone can SELECT, only OWNER_EMAIL can INSERT / UPDATE / DELETE
```

There are no API routes of my own: Supabase serves the CRUD API, and the database rules (RLS) decide who may write, so the check cannot be skipped from the browser. The public anon key is safe to ship because of those rules. If the two environment variables below are missing, `/journal` shows a setup notice and the rest of the site is unaffected.

| Route | What it does |
| --- | --- |
| `/journal` | Dashboard: today's date and topics, entry count, streak, days documented, latest entry, the calendar and day panel, "Previously learned" with search |
| `/journal?date=YYYY-MM-DD` | The same page with a day open (shareable) |
| `/journal/[id]` | One entry as a readable page, with related entries |
| `/journal/write` (`?date=`) | New entry. Owner only |
| `/journal/[id]/edit` | Edit or delete. Owner only |
| `/journal/login` | Log in (owner) |

### One-time setup

1. Create a free project at supabase.com.
2. **SQL Editor** -> paste `supabase/schema.sql`, change `OWNER_EMAIL` near the bottom to the email you will log in with, and run it. It creates the tables, the 11 categories, the security rules and the image bucket. It is safe to run again.
3. **Authentication -> Users -> Add user**: that email and a strong password (tick "Auto confirm user"). Then **Authentication -> Sign In / Providers**: turn **off** "Allow new users to sign up", so nobody else can ever get an account.
4. **Project Settings -> API**: copy the Project URL and the anon public key into `.env.local` (see `.env.example`) and into Vercel under Project -> Settings -> Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Redeploy so the values are included in the build.
5. Open `/journal/login`, log in, and click **New entry**.

### Data model

`categories(id, name unique, sort_order, created_at)`

`learning_entries(id, entry_date, title, category_id -> categories, tags text[], summary, explanation (Markdown), takeaways text[], examples (Markdown, code blocks), links jsonb [{title,url}], created_at, updated_at)`

Many entries can share one `entry_date`. `updated_at` is set by a database trigger. Images are uploaded to the public `journal-images` bucket (PNG, JPEG, WebP or GIF, 5 MB max) and inserted as Markdown images.

### What the numbers mean

- **Calendar shade**: 0 entries = empty, 1, 2, 3 entries = three shades, 4 or more = the darkest. Today has a white outline and the open day has an accent ring.
- **Streak**: days in a row with at least one entry, counted back from today (or from yesterday if nothing is saved yet today, so the streak survives until the day ends).
- **Days are in Mumbai time.** An entry's date is the day you chose, not when it was saved.
- **Search** is rule-based, not AI. It understands `today`, `yesterday`, `last Monday`, `last week` / `previous week`, `this week`, `last month`, `last 7 days`, a category name (for example "System Design"), and plain words matched against title, summary, explanation, examples and tags.

### Checks

```bash
npm run journal:check      # pure logic: dates, streak, shades, the search phrases, form parsing (no setup)
```

`npm run journal:e2e` drives a real browser through every scenario (visitor and owner) against a local stand-in for Supabase (`scripts/journal-e2e/fake-supabase.mjs`); the steps are at the top of `scripts/journal-e2e/run.mjs`. After the real Supabase project is set up, repeat these by hand once:

1. Add three topics for today; click today's square and see all three.
2. Open the site the next day: yesterday's entries are still there.
3. Click another day: you see that day's records, not today's.
4. Refresh: everything is still there and you are still logged in.
5. Search "RAG": every note that mentions it appears.
6. Click a day with nothing: a clean empty state offers "Add a learning entry for this date".
7. Add several entries on one day: its square gets darker.

## Deployment

The canonical URL defaults to `https://kartikm.in`. Set `NEXT_PUBLIC_SITE_URL` to override it, for example on a preview deployment.
