// @ts-check
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './remark-modified-time.mjs';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkModifiedTime]
  },
  site: "https://illinoiscs.wiki",
  outDir: './build',
  integrations: [mdx(), sitemap(), compress()],
  vite: {
    plugins: [tailwindcss()]
  }
});