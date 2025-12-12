// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server', // Server build for serverless functions
  adapter: vercel(),
});
