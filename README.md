# kartikm.in

Portfolio of Kartik Maurya. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Every page is statically prerendered; the only client JavaScript is a small scroll-reveal observer.

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
| `src/content/site.ts` | Name, links, hero sentence, About (max three sentences), freelance intro, contact line |
| `src/content/experience.ts` | Roles, dates, three bullets each, stack |
| `src/content/projects.ts` | The three case studies (problem, approach, decision, stack, result, screenshot alt text) |
| `src/content/freelance.ts` | Every freelance site: name, URL, optional case study slug |
| `src/content/stack.ts` | Named technologies by group |

Search for `TODO(real data)` to find every place that still needs a real number, quote or link. Fields left `undefined` are not rendered.

## Screenshots

`npm run previews` opens each case study's live site in a local Chrome/Edge, saves desktop (1440px) and mobile (390px) WebP screenshots to `public/projects/`, and records dimensions and blur placeholders in `src/content/previews.generated.json`. Pass slugs to capture only some.

## Resume

`public/Kartik-Maurya-Resume.pdf`. Replace the file to update it.

## Deployment

The canonical URL defaults to `https://kartikm.in`. Set `NEXT_PUBLIC_SITE_URL` to override it, for example on a preview deployment.
