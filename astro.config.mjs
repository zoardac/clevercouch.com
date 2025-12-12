import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server',       // necessary for serverless functions
  adapter: vercel(),      // ONLY the serverless adapter
});
