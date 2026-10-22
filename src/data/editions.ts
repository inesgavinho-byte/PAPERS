import type { CollectionEntry } from 'astro:content';
import { estimateReadingTime } from '../lib/format';

export type Language = 'en' | 'pt';

interface PortugueseEdition {
  title: string;
  distinction: string;
  question: string;
}

/** Only Portuguese editions already approved and published belong here. */
export const portugueseEditions: Record<string, PortugueseEdition> = {
  'the-architectural-project-of-we': {
    title: 'O Projeto Arquitetónico do Nós',
    distinction: 'Arquitetura ≠ Serviço',
    question: 'Para quem desenhamos quando desenhamos um edifício?',
  },
  'on-inhabited-time': {
    title: 'Sobre o Tempo Habitado',
    distinction: 'Arquitetura = Tempo',
    question: 'O que habitamos, afinal?',
  },
  'the-architecture-of-the-interval': {
    title: 'A Arquitetura do Intervalo',
    distinction: 'Intervalo ≠ Transição',
    question: 'Para que serve o espaço entre dois lugares?',
  },
  'a-new-spatial-humanism': {
    title: 'Um Novo Humanismo Espacial',
    distinction: 'Profundidade ≠ Vazio',
    question: 'O vazio é o mesmo que a profundidade?',
  },
};

const portugueseSources = import.meta.glob('../pages/pt/papers/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function portugueseBody(slug: string): string {
  const source = portugueseSources[`../pages/pt/papers/${slug}.astro`];
  const body = source?.match(/<div\b[^>]*class=["'][^"']*\bpaper-pt-body\b[^"']*["'][^>]*>([\s\S]*)<\/div>/)?.[1];
  if (!body) throw new Error(`The published Portuguese edition ${slug} has no readable body.`);
  return body;
}

export function paperEdition(paper: CollectionEntry<'papers'>, lang: Language) {
  const revised = lang === 'pt' ? portugueseEditions[paper.id] : undefined;
  return {
    title: revised?.title ?? paper.data.title,
    distinction: revised?.distinction ?? paper.data.centralDistinction,
    question: revised?.question ?? paper.data.question,
    href: revised ? `/pt/papers/${paper.id}` : `/papers/${paper.id}`,
    language: (revised ? 'pt' : 'en') as Language,
    readingTime: estimateReadingTime(revised ? portugueseBody(paper.id) : (paper.body ?? '')),
    revised: Boolean(revised),
  };
}

/** Paths for the same publication section or the two historical essay editions. */
export function languagePaths(path: string): { pt: string; en: string } | undefined {
  const pathname = path.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (pathname === '/' || pathname === '/en') return { pt: '/', en: '/en' };
  if (pathname === '/papers' || pathname === '/pt/papers') return { pt: '/pt/papers', en: '/papers' };
  if (pathname === '/about' || pathname === '/pt/about') return { pt: '/pt/about', en: '/about' };
  const slug = pathname.match(/^\/(?:pt\/)?papers\/([^/]+)$/)?.[1];
  return slug && portugueseEditions[slug]
    ? { pt: `/pt/papers/${slug}`, en: `/papers/${slug}` }
    : undefined;
}
