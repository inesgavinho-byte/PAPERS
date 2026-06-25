# PAPERS — A publication by Inês Gavinho

> Thinking for what remains.

An **editorial institution**. PAPERS publishes theses on architecture, time,
attention and the human condition — work intended to remain relevant long after
the moment that produced it. It is not a blog, a portfolio, or a magazine. It
publishes slowly, by addition, over years.

Each **Paper** is a thesis. Each introduces a single **conceptual distinction**
(e.g. *Architecture ≠ Service*). Papers feed **Principles** (operational
commitments distilled across several Papers) and are gathered by **Ideas**
(conceptual territories that replace tags).

Built with [Astro](https://astro.build). Content is plain Markdown/MDX. No CMS,
no database. Deploys as a static site to Netlify.

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
npm run dev          # http://localhost:4321
```

## Build

```bash
npm run build        # static site → ./dist
npm run preview      # preview the production build
```

---

## Structure

```
src/
  content/
    papers/          # one Markdown/MDX file per Paper (a thesis)
    principles/      # one file per Principle (distilled across Papers)
  content.config.ts  # collection schemas
  data/site.ts       # site metadata, nav, and the Ideas vocabulary
  components/        # Layout, Header, Footer, PaperPreview, Distinction, IdeaList
  layouts/
  lib/               # content queries + formatting
  pages/
  styles/global.css
public/              # favicon
```

### Routes

| Path                  | Description                                  |
| --------------------- | -------------------------------------------- |
| `/`                   | The cover (current investigation + contents) |
| `/papers`             | The collected Papers                         |
| `/papers/[slug]`      | A single Paper                               |
| `/ideas`              | Ideas — conceptual territories               |
| `/ideas/[idea]`       | Every Paper that enters an Idea's terrain    |
| `/principles`         | Principles                                   |
| `/principles/[slug]`  | A single Principle                           |
| `/about`              | About                                        |
| `/rss.xml`            | RSS feed                                     |
| `/sitemap-index.xml`  | Sitemap (generated at build)                 |

The menu is intentionally four items: **Papers · Ideas · Principles · About.**
There is no Archive, Blog, or Projects. Projects are referenced *inside* Papers.

---

## Writing a new Paper

Add a Markdown (or `.mdx`) file in `src/content/papers/`. The **file name is the
URL slug** — `on-inhabited-time.md` becomes `/papers/on-inhabited-time`.

```markdown
---
issue: 5
title: "The Title of the Paper"
centralDistinction: "Term A ≠ Term B"   # or "Term A = Term B"
question: "The animating question?"      # shown on the Paper's title page
abstract: "One or two sharp sentences. Displayed below the distinction."
readingTime: "12 min"
published: "2026-09-01"
ideas:
  - Time
  - Attention
principles:
  - mental-sovereignty                  # slug(s) of Principles this feeds
genealogy:
  - "Author — Work"                      # intellectual antecedents
  - "A concept or tradition"
relatedPapers:
  - on-inhabited-time                    # optional; inferred from shared Ideas if omitted
---

The body of the thesis, in Markdown. Footnotes[^1] render automatically.

[^1]: Footnote text.
```

Notes on the frontmatter:

- `issue` is the issue number; it drives ordering and the "current investigation"
  (the highest issue) shown on the cover. Use the next available integer.
- `centralDistinction` is mandatory and displayed prominently. The ` ≠ ` or ` = `
  operator is set apart typographically.
- `ideas` should come from the vocabulary in `src/data/site.ts`. Adding a new
  Idea there makes it appear on `/ideas` with its own auto-generated page.
- `principles` lists the Principle slugs this Paper contributes to; the relation
  is shown on both the Paper and the Principle.
- `relatedPapers` is optional — related Papers are otherwise inferred from
  shared Ideas.

## Writing a new Principle

Add a file in `src/content/principles/`. A Principle is distilled from several
Papers and states an operational commitment.

```markdown
---
title: "Principle Name"
order: 3
definition: "One line stating the commitment. Shown in the index and as the lede."
ideas:
  - Attention
  - Presence
relatedPapers:
  - on-inhabited-time
  - a-new-spatial-humanism
---

A short articulation of the principle and how the Papers converge on it.
```

## Adding or changing Ideas

The Ideas vocabulary lives in `src/data/site.ts` (`ideas`, each with a one-line
`gloss`). `featuredIdeas` controls which appear on the cover. Idea pages are
generated automatically.

---

## Deploy to Netlify

The repository includes `netlify.toml`, so deployment is essentially automatic.

1. Push this repository to GitHub.
2. In Netlify: **Add new site → Import an existing project**, select the repo.
3. Netlify reads `netlify.toml` — build `npm run build`, publish `dist`.
4. Deploy. Every push to the connected branch triggers a build.

### Custom domain

Point `papers.inesgavinho.com` (or `inesgavinho.com`) at the Netlify site under
**Domain settings**, then set `site` in `astro.config.mjs` to the final URL so
canonical links, the sitemap and RSS use the correct domain.

---

Typography is the interface. Whitespace is information. Every decision answers
one question: *does this help the reader think more clearly?* If not, remove it.
