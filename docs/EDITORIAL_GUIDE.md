# PAPERS — Editorial Guide

A complete briefing on the project: philosophy, content model, tone, visual
system, technical stack and workflow. Written so that a person — or an LLM —
can maintain and extend PAPERS without breaking its identity.

---

## 1. What PAPERS is

**PAPERS** is an **independent personal publication by Inês Gavinho**, bringing
together essays on architecture, technology, organisations, art and the human
condition. It has its own editorial identity, distinct from PINK_MOUSTACHE,
DECIMA and GAVINHO. References to work or projects do not make it a commercial
landing page or limit its subject matter to technology.

- **Name:** PAPERS
- **Byline:** A publication by Inês Gavinho
- **Purpose:** *Thinking for what remains.*
- **Mission:** to build a body of thought through essays that develop ideas
  with care. Editorial quality takes priority over publishing frequency.

**Central principle:** the ideas lead, and the author's name and personal voice
remain visible. The publication is a place for Inês's own writing and inquiry.

The design reference is a carefully composed publication: typography, white
space, hierarchy and readable essays. The current direction is white, black and
neutral greys. Earlier beige/olive, anonymous-author and English-first
directions have been superseded by Inês's explicit decisions.

---

## 2. The editorial DNA (the shape of every Paper)

The existing Papers use an essay framework that develops an argument through
the following intellectual movement:

1. A question.
2. An accepted assumption is challenged.
3. A conceptual distinction is introduced.
4. A new thesis emerges.
5. The thesis becomes an operational principle.

The Markdown Paper collection requires **one conceptual distinction** (the
*Central Distinction*), of the form `A ≠ B` or `A = B`, displayed prominently in
the English edition layout. Examples:

- Architecture ≠ Service
- Architecture = Time
- Interval ≠ Transition
- Depth ≠ Emptiness
- Formal Innovation ≠ Functional Innovation

The approved Portuguese revisions are separate editions with their own
personal voice and structure. Do not rewrite an approved text or add a new
thesis merely to reproduce the structure of an earlier English edition.

---

## 3. Technical stack

- **Astro 5** — static site generation.
- **Markdown / MDX** content via **Content Collections**.
- **No CMS, no database, no unnecessary dependencies.**
- Deploy on **Netlify** (`netlify.toml` included: build `npm run build && npm run check:publication`,
  publish `dist`, Node 22).
- Fonts via Google Fonts: **Cormorant Garamond** (serif — titles and essay
  body) + **Quattrocento Sans** (sans — labels and metadata).
- Extras: RSS feed (`/rss.xml`), sitemap, basic SEO (title, description,
  canonical, OpenGraph).
- The verified public origin is `https://papersbyig.netlify.app`. Keep `site`
  in `astro.config.mjs`, `site.url` in `src/data/site.ts`, canonical links,
  sitemap, RSS and sharing metadata aligned. The earlier
  `https://papers.inesgavinho.com` setting must not be treated as proof that a
  custom domain is configured or live.

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
  pages/               # routes, including separate Portuguese revised editions
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
issue: 4                                   # issue number within the volume (000, 001, ...)
volume: 1                                  # defaults to 1 for existing Papers
title: "The Appearance and the Function"
centralDistinction: "Formal Innovation ≠ Functional Innovation"   # REQUIRED
thesis: "The movements changed appearance. They did not change life."  # optional statement of the argument
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

- `volume` and `issue` drive collection ordering. The current selection follows
  the collection helpers; check them before changing which edition the cover
  links to. Use the next available issue within the appropriate volume.
- `centralDistinction` is mandatory; the ` ≠ ` / ` = ` operator is set apart
  typographically.
- `thesis` is an optional short statement of the argument; whether it is shown
  on the homepage depends on the current approved presentation.
- `ideas` should come from the vocabulary in `src/data/site.ts`.
- `principles` lists the Principle slugs this Paper contributes to; the relation
  shows on both the Paper and the Principle.
- `relatedPapers` is optional — related Papers are otherwise inferred from
  shared Ideas.

### Portuguese revised editions — `src/pages/pt/papers/*.astro`

The existing Portuguese revisions are static routes outside the Markdown
collection. They preserve their issue number, title, author, revision date and
link to the earlier English edition. They are substantive revisions, not
necessarily equivalent translations.

- Do not assume these routes automatically enter the collection's indexes,
  Idea aggregations, relations or RSS.
- Keep the edition and language clear in links; do not silently send a reader
  requesting Portuguese to an English text.
- Preserve existing publication and revision dates until their provenance is
  verified. A Git commit date alone does not establish the date of an earlier
  publication elsewhere.
- A draft label may be removed only when editorial approval for that version
  is established. A merge or build result does not supply that approval.
- New original essays are written first in European Portuguese. English
  translations follow the approved Portuguese text and carry the note
  **"Translated from the original publication in Portuguese"**. Do not apply
  this note retroactively to the earlier English originals.

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
page automatically, gathering every Paper that enters its terrain. The
vocabulary and glosses in `src/data/site.ts` are the source of truth; they
include architectural and organisational lines of inquiry. `featuredIdeas`
defines a curated subset for consumers that use it.

---

## 5. Existing editions

- **Issue 000** — The Architectural Project of We — *Architecture ≠ Service*
- **Issue 001** — On Inhabited Time — *Architecture = Time*
- **Issue 002** — The Architecture of the Interval — *Interval ≠ Transition*
- **Issue 003** — A New Spatial Humanism — *Depth ≠ Emptiness*
- **Issue 004** — The Appearance and the Function — *Formal Innovation ≠ Functional Innovation*

Edition status checked on 23 October 2026: these are the existing English
editions in Volume I — Architecture. Portuguese
revised editions of 000–003 have been published. Editorial approval to publish
003 is established; a residual "Proposta de" label is a copy correction and
does not authorise changes to its approved body or date. The Portuguese 004
proposal remains separate in draft PR #20 and must not be treated as approved
or published. Confirm later status changes against explicit approval and the
actual deployment.

Two Principles: **Mental Sovereignty** and **Architecture as Condition**.

Projects may be discussed where relevant to an essay. Keep their identities,
ownership and claims distinct from the publication, and verify any factual
description against the text and its sources.

---

## 6. Pages and navigation

Routes: `/` (Portuguese cover) · `/en` (English cover) · `/papers` ·
`/pt/papers` · `/papers/[slug]` · `/pt/papers/[slug]` (available revised
editions) · `/ideas` · `/ideas/[idea]` · `/principles` ·
`/principles/[slug]` · `/about` · `/pt/about` · `/rss.xml` · sitemap.

- **Primary navigation:** only **Papers · Ideas · Principles · About**. There is
  no Archive, Blog, Notes or Projects. Projects are referenced *inside* Papers;
  they are not a navigation item.
- **Homepage:** a typographic introduction to the independent publication,
  Inês's authorship, a clear invitation to read and an essay index. The
  implemented design uses a lead and a supporting editorial panel. Preserve
  the approved direction and inspect the current page before changing its
  layout. The historical thesis-only cover is not a restoration requirement.
- **English Paper page:** a title page (Issue, left-aligned title, the Central
  Distinction centred as the one feature, Question, Abstract, metadata), then a
  three-column reading layout — sticky metadata rail · serif essay · sticky
  Central Distinction. Footer of the Paper: Related Papers / Related Principles
  / Related Ideas. Portuguese revised editions retain their approved reading
  structure and provenance; do not describe them as identical translations.
- **Ideas / Principles / About** are internal pages and keep full navigation.

---

## 7. Visual system (inviolable rules)

Palette (defined in `:root` of `src/styles/global.css`):

| Token      | Value     | Use                                   |
| ---------- | --------- | ------------------------------------- |
| `--paper`  | `#ffffff` | white background                      |
| `--ink`    | `#151515` | near-black text                       |
| `--muted`  | `#686868` | neutral secondary text                |
| `--faint`  | `#d4d4d4` | light-grey rules                      |
| `--accent` | `#3a3a3a` | dark-grey operators and hovers         |

Composition rules:

- Typography is the interface. Whitespace is information. Silence is a design
  element. Hierarchy over decoration.
- Keep the current typographic cover. Images require a deliberate editorial
  decision, not a decorative placeholder. No SaaS-style cards, coloured
  buttons, shadows, gradients or excessive animation.
- Few horizontal rules — use whitespace instead.
- Asymmetric composition (different alignments and scales), not a single
  centred, stacked column.
- Reading measure ~700–740px; wide canvas ~1200px.
- Preserve editorial character together with legibility and access to the
  full text. A restrained composition should make the writing easier to read.

---

## 8. Tone of voice (for writing Papers)

- Essayistic, precise, sober, literary but unadorned. New originals use
  European Portuguese and preserve Inês's personal voice. Translations use
  British English and are clearly identified.
- Structure new Paper drafts by the editorial DNA: open with a question → challenge
  an assumption → introduce a distinction → establish the thesis → end on an
  actionable operational principle. Preserve the approved structure of the
  existing Portuguese revisions.
- Use footnotes (`[^1]`) for genealogy and citations, and one central
  blockquote as the hinge of the argument.
- No marketing language in the essays. The ideas lead; Inês's authorship and
  voice remain visible. Do not introduce commercial claims or make PAPERS a
  channel belonging to another brand.
- Preserve distinctions between an interpretation, an attributed fact and a
  direct quotation. Verify sources before presenting a citation as checked.

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

- **New Paper:** write and obtain editorial approval for the European
  Portuguese original first. When adding a collection entry, use
  `src/content/papers/<slug>.md` with the frontmatter in §4; `issue` = next
  available integer in the volume; `ideas` from `src/data/site.ts`. Check the
  current edition helpers and homepage selection rather than assuming that
  the newest collection entry should be the Portuguese reading invitation.
- **New Principle:** create `src/content/principles/<slug>.md`.
- **New Idea:** edit the `ideas` list in `src/data/site.ts` — its page is
  generated automatically.

Collection pages, per-Idea aggregation, shared-concept relations and RSS derive
from the Markdown files. Portuguese static routes are maintained separately;
the sitemap follows the generated routes. Verify language links, metadata and
indexes when an edition is added or revised.

Repository: `pink-moustache/PAPERS`. Development happens on a feature branch;
pull requests target `main`. The current public site is
`https://papersbyig.netlify.app`.

Before committing, run `npm run build && npm run check:publication`. The
publication check validates generated internal links, edition routes, metadata,
social images, robots, RSS and sitemap. For changes affecting presentation or
reading, verify the relevant pages and complete text at the affected screen
sizes. Record actual results and any limitations.

Editorial approval, implementation, testing, merge and production publication
are separate states. Do not publish a proposed essay on the strength of a build
or merge alone. Do not claim a change is live until deployment is verified.
Publication is not engineering certification: any compliance or certification
claim requires explicit criteria and recorded evidence for the relevant
version. This guide does not grant approval to unpublished content or certify
the site.
