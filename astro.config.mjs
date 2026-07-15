// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// This repo hosts two sites on one domain (notavibe.dev): the full "landing"
// site (this Astro project, at the repo root) and a static "splash" placeholder
// in ./splash. The deploy workflow picks which one to publish. Served at the
// apex, so base = '/'. Static output; motion is progressive enhancement.
export default defineConfig({
  site: 'https://notavibe.dev',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
