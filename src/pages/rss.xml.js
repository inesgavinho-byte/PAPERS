import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const papers = await getCollection('papers');
  const notes = await getCollection('notes');

  const items = [
    ...papers.map((p) => ({
      title: `Paper ${String(p.data.number).padStart(3, '0')} — ${p.data.title}`,
      description: p.data.abstract,
      pubDate: p.data.published,
      link: `/papers/${p.id}/`,
      categories: p.data.concepts,
    })),
    ...notes.map((n) => ({
      title: n.data.title,
      description: n.data.excerpt ?? n.data.title,
      pubDate: n.data.published,
      link: `/notes/${n.id}/`,
      categories: n.data.concepts,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${site.name} — ${site.byline}`,
    description: site.description,
    site: context.site,
    items,
  });
}
