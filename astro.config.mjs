import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Keep unpublished conceptual territories available without indexing empty pages.
// Revisit this list when an essay first enters one of these territories.
const unpublishedIdeas = new Set([
  'observation',
  'judgement',
  'knowledge',
  'decision',
  'evolution',
  'organisation',
  'pattern',
]);

export default defineConfig({
  site: 'https://papersbyig.netlify.app',
  // Permit the managed local preview; production remains a static build.
  server: { allowedHosts: ['terminal.local'] },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '');
        if (pathname === '/404' || pathname === '/404.html') return false;
        return !unpublishedIdeas.has(pathname.replace(/^\/ideas\//, ''));
      },
    }),
  ],
});
