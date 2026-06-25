import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    abstract: z.string(),
    published: z.coerce.date(),
    readingTime: z.string(),
    version: z.string().default('1.0'),
    concepts: z.array(z.string()).default([]),
    relatedPapers: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([]),
    projects: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    excerpt: z.string().optional(),
    concepts: z.array(z.string()).default([]),
  }),
});

export const collections = { papers, notes };
