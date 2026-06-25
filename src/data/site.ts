export const site = {
  name: 'PAPERS',
  author: 'Inês Gavinho',
  byline: 'A publication by Inês Gavinho',
  purpose: 'Thinking for what remains.',
  description:
    'An editorial institution. Theses on architecture, time, attention and the human condition — work intended to remain relevant long after the moment that produced it.',
  url: 'https://papers.inesgavinho.com',
};

export const nav = [
  { label: 'Papers', href: '/papers' },
  { label: 'Ideas', href: '/ideas' },
  { label: 'Principles', href: '/principles' },
  { label: 'About', href: '/about' },
];

/**
 * Ideas are conceptual territories, not tags. Each gathers every Paper that
 * enters its terrain. The gloss states the territory in a single line.
 */
export interface Idea {
  name: string;
  gloss: string;
}

export const ideas: Idea[] = [
  { name: 'Time', gloss: 'Duration as the true material of architecture.' },
  { name: 'Attention', gloss: 'The scarcest faculty, and what space does to it.' },
  { name: 'Presence', gloss: 'Being wholly in a place, and in a moment.' },
  { name: 'Memory', gloss: 'What a building holds, and what it lets us keep.' },
  { name: 'Architecture', gloss: 'Not the object, but the condition for a life.' },
  { name: 'Consciousness', gloss: 'The interior the exterior is built to serve.' },
  { name: 'Human Condition', gloss: 'The shared ground of living and appearing together.' },
  { name: 'Responsibility', gloss: 'What is owed to those who will inhabit the result.' },
  { name: 'Atmosphere', gloss: 'The felt quality of a space before it is read.' },
  { name: 'Depth', gloss: 'Fullness of meaning, distinct from mere emptiness.' },
  { name: 'Silence', gloss: 'The active absence that lets thought occur.' },
  { name: 'Material', gloss: 'Substance as argument, weathering as time made visible.' },
  { name: 'Care', gloss: 'Maintenance as the long form of design.' },
  { name: 'Belonging', gloss: 'The sense of being expected, and of being held.' },
  { name: 'Technology', gloss: 'Means in search of ends worth serving.' },
  { name: 'Hospitality', gloss: 'The making of places that receive a stranger.' },
];

// Curated subset shown on the cover, in the brief's order.
export const featuredIdeas = [
  'Time',
  'Attention',
  'Presence',
  'Memory',
  'Responsibility',
  'Depth',
  'Silence',
  'Architecture',
  'Human Condition',
  'Atmosphere',
  'Technology',
  'Belonging',
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
