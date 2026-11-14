import { defineConfig } from 'astro/config';
// Static site. Stylesheets inline so each page is one self-contained file.
export default defineConfig({
  build: { inlineStylesheets: 'always', format: 'file' },
});
