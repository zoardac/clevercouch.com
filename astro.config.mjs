// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), preact()],
  // output: 'hybrid' is gone in Astro 5. 
  // Standard 'static' now supports individual server routes.
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});