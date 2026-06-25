import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A Paper is a thesis. It introduces one conceptual distinction.
const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    issue: z.number(),
    title: z.string(),
    // The intellectual core, displayed above the abstract, e.g. "Architecture ≠ Service".
    centralDistinction: z.string(),
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

export const collections = { papers, principles };
