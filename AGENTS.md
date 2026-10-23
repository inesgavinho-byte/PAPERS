# AGENTS.md — instructions for any LLM/agent working in this repository

PAPERS is an **independent personal publication by Inês Gavinho**. It brings
together essays on architecture, technology, organisations, art and the human
condition. The ideas lead, and the author's name and voice remain visible.
Purpose: *Thinking for what remains.*

PAPERS preserves its editorial independence from PINK_MOUSTACHE, DECIMA and
GAVINHO. Do not turn it into a commercial landing page or restrict its subject
matter to technology. New essays are written first in European Portuguese.

Full context: **`docs/EDITORIAL_GUIDE.md`**. Read it before non-trivial work.

The design reference is a carefully composed publication: clear typography,
white space, readable essays and deliberate hierarchy. Inspect the existing
implementation before changing it. Explicit decisions by Inês take precedence
over superseded descriptions in repository documents.

## Never change without explicit instruction

- The **palette** (`--paper #ffffff`, `--ink #151515`, `--muted #686868`,
  `--faint #d4d4d4`, `--accent #3a3a3a`) or the fonts (Cormorant Garamond +
  Quattrocento Sans). The approved direction is white, black and neutral greys;
  do not restore the former beige/olive palette.
- The **navigation set**: `Papers · Ideas · Projects · Principles · About`
  (Projects added by explicit editorial decision, 23 October 2026). Do NOT add
  Archive, Blog, Notes, or any new nav item. Projects may also be referenced
  *inside* Papers, as evidence for an argument.
- The **stack**: Astro + Markdown/MDX + Content Collections, static, Netlify.
  Do NOT add a CMS, a database, client-side frameworks, or unnecessary deps.
- The **homepage's editorial direction**: a typographic introduction, a clear
  reading invitation and an essay index. Preserve the current approved design;
  the earlier thesis-only cover is historical, not a requirement to restore.
- The **Central Distinction** in the existing Paper collection model and
  English edition layout. Preserve the approved body of each Portuguese
  revision; do not add a new thesis or rewrite it to fit the English edition.
- The **approved essay text, dates or edition labels**. A merge or a successful
  build does not by itself establish editorial approval.

## Content structure

- Papers: `src/content/papers/<slug>.md` — filename is the URL slug. Frontmatter:
  `issue` (int), `volume` (defaults to 1), `title`,
  `centralDistinction` ("A ≠ B" / "A = B", required),
  `thesis`, `question`, `abstract`, `readingTime`, `published`, `ideas[]`,
  `principles[]` (slugs), `genealogy[]`, `relatedPapers[]` (optional).
- Existing Portuguese revised editions: `src/pages/pt/papers/<slug>.astro`.
  These are separate editions, not entries in the Markdown collection. Preserve
  their links to the earlier English edition and their revision provenance.
- Principles: `src/content/principles/<slug>.md` — `title`, `order`,
  `definition`, `ideas[]`, `relatedPapers[]`.
- Ideas: NOT a collection — edit the `ideas` list in `src/data/site.ts`. They
  are conceptual territories, not tags; pages generate automatically.
- Collection pages, per-Idea aggregation, relations and RSS are generated from
  the Markdown files. The Portuguese routes are maintained separately; do not
  assume a new static route is automatically included in collection indexes.

## Editorial tone (for writing/editing Papers)

New essays: **European Portuguese first**, with Inês's personal, precise and
reflective voice. Prepare English translations only from the approved
Portuguese text, use British English, and display the note exactly:
**"Translated from the original publication in Portuguese"**.

The earlier English Papers and their Portuguese revised editions are not
equivalent translations. Do not retroactively label the earlier English texts
as translations from Portuguese, change their dates, or overwrite their text
without editorial approval.

The established essay framework is question → challenge an assumption →
introduce a distinction → establish the thesis → operational principle. Use
footnotes (`[^1]`) when needed to support factual claims and attribution. Do
not invent sources, results, authorship or approval. Keep marketing language
out of the essays.

## Visual rules

Typography and whitespace establish hierarchy. Keep the current typographic
cover and restrained newspaper-like direction. No generic SaaS cards, coloured
buttons, shadows, gradients or excessive animation. Images require a deliberate
editorial decision, not a decorative placeholder. Reading measure ~700–740px;
wide canvas ~1200px. Editorial character must preserve legibility and access to
the full text.

## Commands

```bash
npm install      # install
npm run dev      # local dev (localhost:4321)
npm run build    # static build to ./dist
npm run preview  # preview production build
```

Verify with `npm run build && npm run check:publication` before committing. Repo: `pink-moustache/PAPERS`;
work on the feature branch; PRs target `main`. The current public origin is
`https://papersbyig.netlify.app`; do not assume an unverified custom domain is
live. Keep canonical URLs, sitemap, RSS and sharing metadata aligned with the
verified public origin.

Report separately what was proposed, edited, tested, merged and deployed.
Publication is not engineering certification: never claim tests, compliance or
certification without the corresponding recorded evidence. Preserve editorial
approval requirements for unpublished or revised essays.
