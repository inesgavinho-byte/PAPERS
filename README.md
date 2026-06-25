# PAPERS — by Inês Gavinho

> Thinking for what remains.

An editorial project: a collection of essays on architecture, organisations,
hospitality, knowledge and the systems that shape how we live and work.

Built with [Astro](https://astro.build). Content is plain Markdown/MDX. No CMS,
no database, no unnecessary dependencies. Deploys as a static site to Netlify.

---

## Requirements

- [Node.js](https://nodejs.org) 20 or newer (22 recommended)
- npm (bundled with Node)

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

The site is served at `http://localhost:4321`. Pages reload as you edit.

## Build

```bash
npm run build      # outputs the static site to ./dist
npm run preview    # preview the production build locally
```

---

## Project structure

```
src/
  content/
    papers/        # one Markdown/MDX file per Paper
    notes/         # one Markdown/MDX file per Note
  content.config.ts  # content collection schemas
  components/      # Header, Footer, PaperPreview, NotePreview, ConceptList, MetadataLine
  data/site.ts     # site metadata, concept list, projects, nav
  layouts/         # Layout.astro (shared HTML shell + SEO)
  lib/             # content queries + formatting helpers
  pages/           # routes (see below)
  styles/global.css
public/            # static assets (favicon)
```

### Routes

| Path                 | Description                              |
| -------------------- | ---------------------------------------- |
| `/`                  | Homepage                                 |
| `/papers`            | All Papers, newest first                 |
| `/papers/[slug]`     | A single Paper                           |
| `/notes`             | All Notes, newest first                  |
| `/notes/[slug]`      | A single Note                            |
| `/index`             | Concepts (the editorial vocabulary)      |
| `/index/[concept]`   | Everything tagged with a concept         |
| `/archive`           | Numbered, chronological archive          |
| `/projects`          | GAVINHO · DECIMA · NUDO                  |
| `/about`             | About                                    |
| `/rss.xml`           | RSS feed                                 |
| `/sitemap-index.xml` | Sitemap (generated at build)             |

---

## Creating a new Paper

Add a Markdown (or `.mdx`) file in `src/content/papers/`. The **file name is the
URL slug** — e.g. `my-essay.md` becomes `/papers/my-essay`.

```markdown
---
number: 4
title: "The Title of the Paper"
abstract: "One or two sharp sentences that capture the essay."
published: "2026-07-01"
readingTime: "12 min"
version: "1.0"
concepts:
  - Architecture
  - Time
relatedPapers:
  - companies-should-outlive-their-founders   # slugs of other Papers (optional)
relatedNotes:
  - hospitality-is-belonging                  # slugs of Notes (optional)
projects:
  - GAVINHO                                    # optional
---

The body of the essay, in Markdown.
```

Notes on the frontmatter:

- `number` is the Paper number; it drives ordering and the archive. Use the next
  available integer.
- `concepts` must come from the vocabulary in `src/data/site.ts`. Adding a new
  concept there makes it appear on `/index`.
- `relatedPapers` / `relatedNotes` are optional. If omitted, related items are
  inferred automatically from shared concepts.

## Creating a new Note

Add a Markdown file in `src/content/notes/`. Notes are shorter and lighter than
Papers.

```markdown
---
title: "A short, declarative title."
published: "2026-07-01"
excerpt: "An optional one-line excerpt shown in listings."
concepts:
  - Knowledge
  - Memory
---

A few short paragraphs.
```

## Adding or changing concepts

The concept vocabulary lives in `src/data/site.ts` (`concepts`). Edit that list
to add or rename concepts; pages under `/index` are generated automatically.
`featuredConcepts` controls which ones appear on the homepage.

---

## Deploy to Netlify

The repository includes `netlify.toml` with the correct settings, so deployment
is essentially automatic.

1. Push this repository to GitHub.
2. In Netlify, choose **Add new site → Import an existing project** and select
   the repository.
3. Netlify reads `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. Every push to the connected branch triggers a new build.

### Custom domain

Once deployed, point `papers.inesgavinho.com` (or `inesgavinho.com`) at the
Netlify site under **Domain settings**. Then update `site` in
`astro.config.mjs` to the final URL so canonical links, the sitemap and the RSS
feed use the correct domain.

---

Code is intentionally simple. Keep it that way.
