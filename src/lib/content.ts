import { getCollection, type CollectionEntry } from 'astro:content';

export type Paper = CollectionEntry<'papers'>;
export type Principle = CollectionEntry<'principles'>;

/** Papers in reading order — by issue number, ascending (000 first). */
export async function getPapers(): Promise<Paper[]> {
  const papers = await getCollection('papers');
  return papers.sort((a, b) => a.data.issue - b.data.issue);
}

/** The current investigation: the most recent issue. */
export async function getCurrentPaper(): Promise<Paper | undefined> {
  const papers = await getPapers();
  return papers[papers.length - 1];
}

/** Volumes present in the collection, highest first. */
export function volumesDescending(papers: Paper[]): number[] {
  return [...new Set(papers.map((p) => p.data.volume))].sort((a, b) => b - a);
}

/** The highest Volume number present (defaults to 1 if none). */
export function maxVolume(papers: Paper[]): number {
  return volumesDescending(papers)[0] ?? 1;
}

/** Papers of a given Volume, sorted by issue ascending. */
export function papersInVolume(papers: Paper[], volume: number): Paper[] {
  return papers
    .filter((p) => p.data.volume === volume)
    .sort((a, b) => a.data.issue - b.data.issue);
}

export async function getPrinciples(): Promise<Principle[]> {
  const principles = await getCollection('principles');
  return principles.sort((a, b) => a.data.order - b.data.order);
}

const norm = (s: string) => s.trim().toLowerCase();

export function papersForIdea(papers: Paper[], idea: string): Paper[] {
  return papers.filter((p) => p.data.ideas.some((i) => norm(i) === norm(idea)));
}

export function ideaCount(papers: Paper[], idea: string): number {
  return papersForIdea(papers, idea).length;
}

/** Papers a Principle is drawn from (by explicit slug, then by back-reference). */
export function papersForPrinciple(papers: Paper[], principle: Principle): Paper[] {
  const bySlug = principle.data.relatedPapers
    .map((slug) => papers.find((p) => p.id === slug))
    .filter((p): p is Paper => Boolean(p));

  const seen = new Set(bySlug.map((p) => p.id));
  const byBackref = papers.filter(
    (p) => !seen.has(p.id) && p.data.principles.includes(principle.id),
  );

  return [...bySlug, ...byBackref].sort((a, b) => a.data.issue - b.data.issue);
}

/** Principles a Paper contributes to. */
export function principlesForPaper(paper: Paper, all: Principle[]): Principle[] {
  return all.filter(
    (pr) =>
      paper.data.principles.includes(pr.id) ||
      pr.data.relatedPapers.includes(paper.id),
  );
}

/**
 * Related Papers: explicit relatedPapers first, then Papers sharing an Idea.
 * Self is always excluded.
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

  const ideas = new Set(paper.data.ideas.map(norm));
  for (const p of all) {
    if (seen.has(p.id)) continue;
    if (p.data.ideas.some((i) => ideas.has(norm(i)))) {
      out.push(p);
      seen.add(p.id);
    }
  }

  return out;
}
