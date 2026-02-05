// @ts-check
import { defineConfig } from 'astro/config';
import { remarkModifiedTime } from './remark-modified-time.mjs';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkModifiedTime]
  },
  outDir: './build',
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  }
});