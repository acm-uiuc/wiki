// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: "https://illinoiscs.wiki",
  outDir: './build',
  integrations: [mdx(), sitemap(), compress()],
  vite: {
    plugins: [tailwindcss()]
  }
});