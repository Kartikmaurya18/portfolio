# Kartik Maurya — Portfolio

Personal portfolio of Kartik Maurya, Software Engineer & AI Builder.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4 and Motion. Every page is statically prerendered.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (includes type checking)
npm run lint
```

## Editing content

All content is data-driven. You should rarely need to touch a component.

| What | Where |
| --- | --- |
| Name, links, hero, stats, about, experience, Agentic AI copy, skills, principles, contact, footer | `src/content/site.ts` |
| Projects (featured, freelance spotlight, archive, case studies) | `src/content/projects.ts` |
| Field documentation | `src/content/types.ts` |

### Contact links

Email, GitHub and LinkedIn live in `links` in `src/content/site.ts`. Setting any of them to an empty string renders the related buttons in a disabled "coming soon" state instead of linking to something broken.

Empty experience fields (`period`, `location`, `highlights`, `stack`) are hidden rather than shown blank.

### Adding a project

1. Add an entry to `src/content/projects.ts`:
   ```ts
   {
     slug: "my-project",
     name: "My Project",
     url: "https://example.com",
     categories: ["web", "freelance"], // web | full-stack | dashboard | freelance | ai
     featured: true,     // large card in "Things I've built"
     spotlight: false,   // large card at the top of "Freelance & Client Work"
     description: "…",   // optional
     stack: ["…"],       // optional — only technologies actually used
     github: "https://github.com/…", // optional
     caseStudy: { overview, problem, solution, development, result }, // optional
   }
   ```
2. Capture screenshots: `npm run previews -- my-project`

A project page is generated at `/projects/<slug>`. Without `caseStudy` content it shows "Case study coming soon."

### Screenshots

`npm run previews` opens every project's live site in your local Chrome/Edge (headless), saves desktop + mobile WebP screenshots to `public/projects/`, and writes blur placeholders to `src/content/previews.generated.json`. Pass slugs to capture only some projects. Set `CHROME_PATH` if the browser isn't found.

To use your own screenshots instead, set `images: { desktop: "/projects/custom.webp" }` on the project.

### GitHub activity

The GitHub section appears automatically once `links.github` is set **and** GitHub returns data (contribution graph + repositories, refreshed daily). It is never rendered with placeholder data. Pick specific repositories with `githubActivity.featuredRepos`. Optionally set `GITHUB_TOKEN` to avoid API rate limits.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://kartikmaurya.com`) so canonical URLs, the sitemap and Open Graph images use the real domain. On Vercel the production URL is detected automatically.

## Structure

```
src/
  app/                 routes, metadata, OG images, sitemap, robots
  components/
    layout/            nav, footer, command palette (⌘K / Ctrl K), scroll progress
    sections/          one file per home-page section
    projects/          project cards and the filterable archive
    visuals/           hero system graph, Agentic AI flow
    ui/                buttons, frames, shared primitives
  content/             ← edit these
  lib/                 helpers
scripts/capture-previews.mjs
```
