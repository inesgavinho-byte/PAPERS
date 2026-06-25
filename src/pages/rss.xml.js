import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const papers = await getCollection('papers');

  const items = papers
    .sort((a, b) => a.data.issue - b.data.issue)
    .map((p) => ({
      title: `Issue ${String(p.data.issue).padStart(3, '0')} — ${p.data.title}`,
      description: `${p.data.centralDistinction}. ${p.data.abstract}`,
      pubDate: p.data.published,
      link: `/papers/${p.id}/`,
      categories: p.data.ideas,
    }));

  return rss({
    title: `${site.name} — ${site.byline}`,
    description: site.description,
    site: context.site,
    items,
  });
}
