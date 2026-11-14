import { defineConfig } from 'astro/config';
// Static site. Stylesheets inline so each page is one self-contained file.
export default defineConfig({
  site: 'https://cls-1000.github.io',
  build: { inlineStylesheets: 'always', format: 'file' },
});
