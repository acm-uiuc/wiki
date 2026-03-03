// @ts-check
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './remark-modified-time.mjs';
import AutoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
  site: 'https://illinoiscs.wiki',
  outDir: './build',
  integrations: [
    AutoImport({
      imports: ['./src/components/CourseLink.astro'],
    }),
    mdx(),
    sitemap(),
    compress(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
