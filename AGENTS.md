# AGENTS.md — instructions for any LLM/agent working in this repository

PAPERS is an **editorial institution** by Inês Gavinho — a *digital edition*
(a printed first edition, digitised with care), not a website, blog, portfolio,
or SaaS product. The **idea is primary, the publication secondary**; the author
almost disappears. Purpose: *Thinking for what remains.*

Full context: **`docs/EDITORIAL_GUIDE.md`**. Read it before non-trivial work.

The test for every change: **"Would this exist in a beautifully printed first
edition?"** If not, don't add it.

## Never change without explicit instruction

- The **palette** (`--paper #f2f0e7`, `--ink #1f1f1c`, `--muted #7b776b`,
  `--faint #d8d4c7`, `--accent #8b8670`) or the fonts (Cormorant Garamond +
  Quattrocento Sans).
- The **navigation set**: `Papers · Ideas · Principles · About`. Do NOT add
  Archive, Blog, Notes, Projects, or any new nav item. Projects are referenced
  *inside* Papers only.
- The **stack**: Astro + Markdown/MDX + Content Collections, static, Netlify.
  Do NOT add a CMS, a database, client-side frameworks, or unnecessary deps.
- The **homepage rhythm**: (1) current thesis alone, very large, + a single
  "Read Paper NNN →"; (2) silence, then PAPERS revealed to the right; (3)
  silence, then Collected Papers as a printed contents page.
- The **Central Distinction** as a mandatory, prominent element on every Paper.

## Content structure

- Papers: `src/content/papers/<slug>.md` — filename is the URL slug. Frontmatter:
  `issue` (int), `title`, `centralDistinction` ("A ≠ B" / "A = B", required),
  `thesis`, `question`, `abstract`, `readingTime`, `published`, `ideas[]`,
  `principles[]` (slugs), `genealogy[]`, `relatedPapers[]` (optional).
- Principles: `src/content/principles/<slug>.md` — `title`, `order`,
  `definition`, `ideas[]`, `relatedPapers[]`.
- Ideas: NOT a collection — edit the `ideas` list in `src/data/site.ts`. They
  are conceptual territories, not tags; pages generate automatically.
- Everything (pages, per-Idea aggregation, relations, RSS, sitemap) is generated
  from the Markdown files.

## Editorial tone (for writing/editing Papers)

British English; essayistic, precise, sober, literary but unadorned. Each Paper
follows the DNA: question → challenge an assumption → introduce a distinction →
establish the thesis → end on an operational principle. Use footnotes (`[^1]`)
and one central blockquote. No marketing language; no "featured/latest/trending".

## Visual rules

Typography is the interface; whitespace is information. No images on the
homepage, no cards, no coloured buttons, no shadows, no gradients, no excessive
animation. Few horizontal rules — prefer whitespace. Asymmetric composition, not
a centred stacked column. Reading measure ~700–740px; wide canvas ~1200px.
Optimise for editorial authority over usability.

## Commands

```bash
npm install      # install
npm run dev      # local dev (localhost:4321)
npm run build    # static build to ./dist
npm run preview  # preview production build
```

Verify with `npm run build` before committing. Repo: `inesgavinho-byte/papers`;
work on the feature branch; PRs target `main`.
