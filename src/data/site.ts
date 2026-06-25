export const site = {
  name: 'PAPERS',
  author: 'Inês Gavinho',
  byline: 'by Inês Gavinho',
  purpose: 'Thinking for what remains.',
  description:
    'A collection of essays on architecture, organisations, hospitality, knowledge and the systems that shape how we live and work.',
  url: 'https://papers.inesgavinho.com',
};

// The fixed editorial vocabulary. Order is intentional (alphabetical).
export const concepts = [
  'Architecture',
  'Belonging',
  'Construction',
  'Hospitality',
  'Knowledge',
  'Leadership',
  'Memory',
  'Organisations',
  'Responsibility',
  'Systems',
  'Technology',
  'Time',
];

// Concepts featured on the homepage "Explore by Concept" block.
export const featuredConcepts = [
  'Architecture',
  'Knowledge',
  'Organisations',
  'Systems',
  'Leadership',
  'Memory',
  'Technology',
  'Hospitality',
];

export const projects = [
  {
    name: 'GAVINHO',
    summary: 'architecture, interiors and construction',
    description:
      'Where ideas about building, permanence and care become physical. Architecture, interiors and construction as the slow testing of intentions against time.',
  },
  {
    name: 'DECIMA',
    summary: 'knowledge, evidence and organisational memory',
    description:
      'Where the question of what organisations remember becomes a practice. Knowledge, evidence and organisational memory made explicit and durable.',
  },
  {
    name: 'NUDO',
    summary: 'hospitality and belonging',
    description:
      'Where hospitality is treated as a form of belonging rather than service. The making of places that hold people.',
  },
];

export const nav = [
  { label: 'Notes', href: '/notes' },
  { label: 'Index', href: '/index' },
  { label: 'Archive', href: '/archive' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
];

export function conceptSlug(concept: string): string {
  return concept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
