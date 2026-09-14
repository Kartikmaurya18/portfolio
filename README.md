# kartikm.in

Portfolio of Kartik Maurya. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. One narrow column of plain text; every page is statically prerendered.

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
| `src/content/site.ts` | Name, links and the homepage copy: intro, How I got here, Now, Elsewhere, the contact line and the footer |
| `src/content/experience.ts` | What I've worked on: one paragraph per role |
| `src/content/built.ts` | Things I built on the side: name, one sentence, link, optional case study |
| `src/content/freelance.ts` | Every client website. Sites not in `built.ts` are listed in one sentence under that section |
| `src/content/projects.ts` | The case studies at `/work/[slug]` (problem, approach, decision, stack, result, screenshot alt text) |

Search for `TODO(real data)` to find every place that still needs a real number, quote, link or your own words. Fields left `undefined` are not rendered.

## Screenshots

`npm run previews` opens each case study's live site in a local Chrome/Edge, saves desktop (1440px) and mobile (390px) WebP screenshots to `public/projects/`, and records dimensions and blur placeholders in `src/content/previews.generated.json`. Pass slugs to capture only some. The screenshots appear on the case study pages.

## Resume

`public/Kartik-Maurya-Resume.pdf`. Replace the file to update it.

## Deployment

The canonical URL defaults to `https://kartikm.in`. Set `NEXT_PUBLIC_SITE_URL` to override it, for example on a preview deployment.
