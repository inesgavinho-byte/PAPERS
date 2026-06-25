import { getCollection, type CollectionEntry } from 'astro:content';

export type Paper = CollectionEntry<'papers'>;
export type Note = CollectionEntry<'notes'>;

/** Papers, newest first (by Paper number, which tracks publication order). */
export async function getPapers(): Promise<Paper[]> {
  const papers = await getCollection('papers');
  return papers.sort((a, b) => b.data.number - a.data.number);
}

/** Papers oldest first — used for the numbered Archive. */
export async function getPapersAscending(): Promise<Paper[]> {
  const papers = await getCollection('papers');
  return papers.sort((a, b) => a.data.number - b.data.number);
}

/** Notes, newest first. */
export async function getNotes(): Promise<Note[]> {
  const notes = await getCollection('notes');
  return notes.sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
}

const norm = (c: string) => c.trim().toLowerCase();

export function papersForConcept(papers: Paper[], concept: string): Paper[] {
  return papers.filter((p) => p.data.concepts.some((c) => norm(c) === norm(concept)));
}

export function notesForConcept(notes: Note[], concept: string): Note[] {
  return notes.filter((n) => n.data.concepts.some((c) => norm(c) === norm(concept)));
}

/** Count of papers + notes that reference a concept. */
export function conceptCount(papers: Paper[], notes: Note[], concept: string): number {
  return papersForConcept(papers, concept).length + notesForConcept(notes, concept).length;
}

/**
 * Related papers for a given paper. Explicit `relatedPapers` slugs first,
 * then papers sharing at least one concept, deduped, excluding self.
 */
export function relatedPapers(paper: Paper, all: Paper[]): Paper[] {
  const seen = new Set<string>([paper.id]);
  const out: Paper[] = [];

  for (const slug of paper.data.relatedPapers) {
    const match = all.find((p) => p.id === slug);
    if (match && !seen.has(match.id)) {
      out.push(match);
      seen.add(match.id);
    }
  }

  const concepts = new Set(paper.data.concepts.map(norm));
  for (const p of all) {
    if (seen.has(p.id)) continue;
    if (p.data.concepts.some((c) => concepts.has(norm(c)))) {
      out.push(p);
      seen.add(p.id);
    }
  }

  return out;
}

/** Related notes: explicit slugs first, then shared-concept notes. */
export function relatedNotes(paper: Paper, allNotes: Note[]): Note[] {
  const seen = new Set<string>();
  const out: Note[] = [];

  for (const slug of paper.data.relatedNotes) {
    const match = allNotes.find((n) => n.id === slug);
    if (match && !seen.has(match.id)) {
      out.push(match);
      seen.add(match.id);
    }
  }

  const concepts = new Set(paper.data.concepts.map(norm));
  for (const n of allNotes) {
    if (seen.has(n.id)) continue;
    if (n.data.concepts.some((c) => concepts.has(norm(c)))) {
      out.push(n);
      seen.add(n.id);
    }
  }

  return out;
}
