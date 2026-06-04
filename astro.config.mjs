import "dotenv/config";
// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site:
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.CF_PAGES_URL ||
    "https://oria-house-barcelona-demo.pages.dev",
  integrations: [react()],

   vite: {
    plugins: [tailwindcss()],
  },
});
