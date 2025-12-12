import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});