// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel'; // Ensure this is installed via npm install @astrojs/vercel

export default defineConfig({
  // 🛑 Ensure all integrations are in the array
  integrations: [tailwind(), preact()],
  
  // 🛑 This tells Astro to generate a server-side build for Vercel
  output: 'server',
  
  // 🛑 The adapter configuration
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    // Optional: Choose 'edge' or 'serverless'
    // 'serverless' is standard and very reliable for forms
    adapter: vercel({
    // 🛑 Adding this ensures the entry file is generated where Vercel expects it
    webAnalytics: { enabled: true },
    functionPerRoute: false, 
  }),
});