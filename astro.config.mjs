// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // This is the module we just installed

import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [tailwind(), preact()], // This is how the integration is used
});