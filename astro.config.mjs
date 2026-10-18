// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages: when DEPLOY_TARGET=pages, Astro uses this base for asset paths
const base = process.env.DEPLOY_TARGET === 'pages' ? '/Kitchen-Appliances-Hub/' : undefined;

// Disable remote image optimization in CI to avoid network issues
const isCI = process.env.CI === 'true';
const imageConfig = isCI ? { remotePatterns: [] } : {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: 'https://kitchenhub.store',
  base,
  image: imageConfig,
  vite: {
    plugins: [tailwindcss()],
  },
});