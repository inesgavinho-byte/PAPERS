import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A Paper is a thesis. It introduces one conceptual distinction.
const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    issue: z.number(),
    // Which Volume this Paper belongs to. Existing Papers default to 1.
    volume: z.number().default(1),
    title: z.string(),
    // The intellectual core, displayed above the abstract, e.g. "Architecture ≠ Service".
    centralDistinction: z.string(),
    // A short, dominant statement of the thesis — used on the cover. One or two sentences.
    thesis: z.string().optional(),
    // The animating question the thesis answers (first movement of the editorial DNA).
    question: z.string().optional(),
    abstract: z.string(),
    readingTime: z.string(),
    published: z.coerce.date(),
    ideas: z.array(z.string()).default([]),
    // Slugs of Principles this Paper contributes to.
    principles: z.array(z.string()).default([]),
    // Intellectual antecedents, e.g. "Hannah Arendt — The Human Condition".
    genealogy: z.array(z.string()).default([]),
    relatedPapers: z.array(z.string()).default([]),
  }),
});

// A Principle is distilled from several Papers. It is an operational commitment.
const principles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/principles' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    // One-line essence, shown in the Principles index.
    definition: z.string(),
    ideas: z.array(z.string()).default([]),
    // Slugs of Papers this Principle is drawn from.
    relatedPapers: z.array(z.string()).default([]),
  }),
});

// A Project is a documented piece of built work — an editorial case study, not a portfolio card.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    category: z.string(),
    categoryPt: z.string(),
    attribution: z.string(),
    attributionPt: z.string(),
    summary: z.string(),
    summaryPt: z.string(),
    image: z.string().default(''),
    imageAlt: z.string().default(''),
    imageAltPt: z.string().default(''),
    published: z.coerce.date(),
    // Unpublished projects stay in the data model but out of the site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { papers, principles, projects };
