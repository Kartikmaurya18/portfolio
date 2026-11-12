# kartikm.in

Portfolio of Kartik Maurya. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Every page is statically prerendered.

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
| `src/content/site.ts` | Name, links, SEO title and description, hero, About, skill groups, the contact copy and the footer |
| `src/content/timeline.ts` | How I got here: one entry per step (dates, bullets, key learnings, case study). Entries starting with `TODO:` stay hidden until filled |
| `src/content/stats.ts` | The numbers in the scrolling strip |
| `src/content/freelance.ts` | The client websites. Not listed on the page any more; their count feeds the stats strip |
| `src/content/projects.ts` | The case studies at `/work/[slug]` (problem, approach, decision, stack, result, screenshot alt text) |

Placeholders: anything still needed from you is written as a string starting with `TODO:`. Those are hidden on the live site. To preview them while editing, create `.env.local` with `NEXT_PUBLIC_SHOW_TODOS=1` and restart `npm run dev`.

Search for `TODO(real data)` to find every place that still needs a real number, quote, link or your own words. Fields left `undefined` are not rendered.

## Screenshots

`npm run previews` opens each case study's live site in a local Chrome/Edge, saves desktop (1440px) and mobile (390px) WebP screenshots to `public/projects/`, and records dimensions and blur placeholders in `src/content/previews.generated.json`. Pass slugs to capture only some. The screenshots appear on the case study pages.

## Resume

`public/Kartik-Maurya-Resume.pdf` (linked from the hero and contact). Replace the file, keeping this exact name, to update it.

## Deployment

The canonical URL defaults to `https://kartikm.in`. Set `NEXT_PUBLIC_SITE_URL` to override it, for example on a preview deployment.
