# PAPERS — Editorial Guide

A complete briefing on the project: philosophy, content model, tone, visual
system, technical stack and workflow. Written so that a person — or an LLM —
can maintain and extend PAPERS without breaking its identity.

---

## 1. What PAPERS is

**PAPERS** is an **editorial institution** published by Inês Gavinho. It is not
a personal website, a portfolio, a blog, a magazine, or a commercial landing
page. It is a **digital edition** — as if a beautifully printed first edition,
a monograph, an annual volume, had been digitised with enormous care.

- **Name:** PAPERS
- **Byline:** A publication by Inês Gavinho
- **Purpose:** *Thinking for what remains.*
- **Mission:** to build a body of thought over decades. It publishes slowly, by
  accumulation. The ambition is not to publish often, but to publish work that
  deserves to remain relevant fifty years from now.

**Central principle:** the idea is primary, the publication is secondary. The
visitor should arrive *inside a thought*, not in front of a brand. The author
almost disappears; the ideas are the protagonists.

The question to ask before every decision: **"Would this exist in a beautifully
printed first edition?"** If yes, keep it. If it feels like something invented
by modern web design, remove it.

---

## 2. The editorial DNA (the shape of every Paper)

Each **Paper** is a **thesis**, not an article. It always follows the same
intellectual movement:

1. A question.
2. An accepted assumption is challenged.
3. A conceptual distinction is introduced.
4. A new thesis emerges.
5. The thesis becomes an operational principle.

Each Paper introduces **one conceptual distinction** (the *Central Distinction*),
of the form `A ≠ B` or `A = B`. It is more important than the abstract and is
displayed prominently. Examples:

- Architecture ≠ Service
- Architecture = Time
- Interval ≠ Transition
- Depth ≠ Emptiness
- Formal Innovation ≠ Functional Innovation

---

## 3. Technical stack

- **Astro 5** — static site generation.
- **Markdown / MDX** content via **Content Collections**.
- **No CMS, no database, no unnecessary dependencies.**
- Deploy on **Netlify** (`netlify.toml` included: build `npm run build`,
  publish `dist`, Node 22).
- Fonts via Google Fonts: **Cormorant Garamond** (serif — titles and essay
  body) + **Quattrocento Sans** (sans — labels and metadata).
- Extras: RSS feed (`/rss.xml`), sitemap, basic SEO (title, description,
  canonical, OpenGraph).
- `site` in `astro.config.mjs` is `https://papers.inesgavinho.com` — it drives
  canonical links, the sitemap and RSS. Update it if the final domain differs.

### Project structure

```
src/
  content/
    papers/            # one Markdown/MDX file per Paper (a thesis)
    principles/        # one file per Principle (distilled across Papers)
  content.config.ts    # collection schemas
  data/site.ts         # site metadata, nav, and the Ideas vocabulary
  components/          # Layout, Header, Footer, PaperPreview, Distinction, IdeaList
  layouts/Layout.astro # shared HTML shell + SEO
  lib/                 # content queries + formatting helpers
  pages/               # routes
  styles/global.css    # the single stylesheet
public/                # favicon
docs/                  # this guide
AGENTS.md              # short operational instructions for agents
```

---

## 4. Content model

Two content collections, defined in `src/content.config.ts`.

### Papers — `src/content/papers/*.md`

The **file name is the slug / URL** (e.g. `on-inhabited-time.md` →
`/papers/on-inhabited-time`).

```yaml
---
issue: 4                                   # issue number (000, 001, ...); orders everything
title: "The Appearance and the Function"
centralDistinction: "Formal Innovation ≠ Functional Innovation"   # REQUIRED
thesis: "The movements changed appearance. They did not change life."  # dominant line used on the cover
question: "Is a new form a new idea?"      # the question the thesis answers
abstract: "..."                            # one or two sharp sentences
readingTime: "15 min"
published: "2026-06-25"
ideas: [Technology, Responsibility, Material, Architecture, Atmosphere]
principles: [architecture-as-condition]    # slugs of Principles this Paper feeds
genealogy:                                 # intellectual antecedents
  - "Adolf Loos — Ornament and Crime"
relatedPapers: [the-architectural-project-of-we]   # optional; inferred from shared Ideas if omitted
---

The body of the thesis, in Markdown. Footnotes render automatically[^1].

[^1]: Footnote text.
```

Notes:

- `issue` drives ordering and the "current investigation" (the highest issue)
  shown on the cover. Use the next available integer.
- `centralDistinction` is mandatory; the ` ≠ ` / ` = ` operator is set apart
  typographically.
- `thesis` is the short, dominant statement the homepage leads with.
- `ideas` should come from the vocabulary in `src/data/site.ts`.
- `principles` lists the Principle slugs this Paper contributes to; the relation
  shows on both the Paper and the Principle.
- `relatedPapers` is optional — related Papers are otherwise inferred from
  shared Ideas.

### Principles — `src/content/principles/*.md`

A **Principle** is distilled from several Papers — an operational commitment.

```yaml
---
title: "Mental Sovereignty"
order: 1
definition: "One line stating the commitment."
ideas: [Attention, Presence, Silence]
relatedPapers: [on-inhabited-time, a-new-spatial-humanism]
---

A short articulation of the principle and how the Papers converge on it.
```

### Ideas — data, not a collection

Ideas live in `src/data/site.ts` (the `ideas` list, each with a one-line
`gloss`). They are **conceptual territories, not tags**. Each Idea generates a
page automatically, gathering every Paper that enters its terrain. The current
vocabulary (16): Time, Attention, Presence, Memory, Architecture, Consciousness,
Human Condition, Responsibility, Atmosphere, Depth, Silence, Material, Care,
Belonging, Technology, Hospitality. `featuredIdeas` controls any curated subset.

---

## 5. Volume I (current content)

- **Issue 000** — The Architectural Project of We — *Architecture ≠ Service*
- **Issue 001** — On Inhabited Time — *Architecture = Time*
- **Issue 002** — The Architecture of the Interval — *Interval ≠ Transition*
- **Issue 003** — A New Spatial Humanism — *Depth ≠ Emptiness*
- **Issue 004** — The Appearance and the Function — *Formal Innovation ≠ Functional Innovation* (current investigation)

Two Principles: **Mental Sovereignty** and **Architecture as Condition**.

The projects referenced inside Papers: **GAVINHO** (architecture, interiors,
construction), **DECIMA** (knowledge, evidence, organisational memory),
**NUDO** (hospitality, belonging).

---

## 6. Pages and navigation

Routes: `/` · `/papers` · `/papers/[slug]` · `/ideas` · `/ideas/[idea]` ·
`/principles` · `/principles/[slug]` · `/about` · `/rss.xml` · sitemap.

- **Primary navigation:** only **Papers · Ideas · Principles · About**. There is
  no Archive, Blog, Notes or Projects. Projects are referenced *inside* Papers;
  they are not a navigation item.
- **Homepage** is a digital edition, read in this order:
  1. The current Paper's **thesis** alone, very large, holding the opening
     field, with a single invitation — *Read Paper 004 →*. No metadata.
  2. After deep silence, the publication reveals itself — **PAPERS**, the
     byline, one plain sentence — placed to the **right** as a quiet aside.
  3. After more silence, **Collected Papers** as a printed contents page —
     issue number above title, generous whitespace, no horizontal rules.
  Header on the homepage is reduced to **PAPERS** (left) · **About** (right).
- **Paper page:** a title page (Issue, left-aligned title, the Central
  Distinction centred as the one feature, Question, Abstract, metadata), then a
  three-column reading layout — sticky metadata rail · serif essay · sticky
  Central Distinction. Footer of the Paper: Related Papers / Related Principles
  / Related Ideas.
- **Ideas / Principles / About** are internal pages and keep full navigation.

---

## 7. Visual system (inviolable rules)

Palette (defined in `:root` of `src/styles/global.css`):

| Token      | Value     | Use                                   |
| ---------- | --------- | ------------------------------------- |
| `--paper`  | `#f2f0e7` | warm off-white background             |
| `--ink`    | `#1f1f1c` | text                                  |
| `--muted`  | `#7b776b` | secondary text                        |
| `--faint`  | `#d8d4c7` | thin rules                            |
| `--accent` | `#8b8670` | discreet olive — the ≠/= operator, hovers |

Composition rules:

- Typography is the interface. Whitespace is information. Silence is a design
  element. Hierarchy over decoration.
- No images on the homepage. No SaaS-style cards, no coloured buttons, no
  shadows, no gradients, no excessive animation.
- Few horizontal rules — use whitespace instead.
- Asymmetric composition (different alignments and scales), not a single
  centred, stacked column.
- Reading measure ~700–740px; wide canvas ~1200px.
- Optimise for **editorial authority**, not usability. It is acceptable that the
  page feels slower, emptier, and that the visitor has to think. This
  publication is not competing for attention; it rewards attention.

---

## 8. Tone of voice (for writing Papers)

- Essayistic, precise, sober, literary but unadorned. British English.
- Structure every Paper by the editorial DNA: open with a question → challenge
  an assumption → introduce a distinction → establish the thesis → end on an
  actionable operational principle.
- Use footnotes (`[^1]`) for genealogy and citations, and one central
  blockquote as the hinge of the argument.
- No marketing language. No "featured", "latest", "trending". The author almost
  disappears; the ideas are the protagonists.

---

## 9. Maintenance & workflow

Commands:

```bash
npm install      # install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # preview the production build
```

Adding content:

- **New Paper:** create `src/content/papers/<slug>.md` with the frontmatter in
  §4; `issue` = next integer; `ideas` from the vocabulary in `src/data/site.ts`.
  The homepage automatically leads with the highest issue as the current
  investigation.
- **New Principle:** create `src/content/principles/<slug>.md`.
- **New Idea:** edit the `ideas` list in `src/data/site.ts` — its page is
  generated automatically.

Everything is generated automatically from the Markdown files: pages,
per-Idea aggregation, shared-concept relations, RSS and sitemap.

Repository: `inesgavinho-byte/papers`. Development happens on the feature
branch; pull requests target `main`.
