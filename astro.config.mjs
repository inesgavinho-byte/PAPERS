import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update this to the final production domain before deploy.
  site: 'https://papers.inesgavinho.com',
  integrations: [mdx(), sitemap()],
});
