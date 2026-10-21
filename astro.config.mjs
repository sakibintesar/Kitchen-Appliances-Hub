import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://kitchenhub.store',
  output: 'server',
  adapter: cloudflare(),
  image: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@db': resolve(__dirname, 'src/db'),
      },
    },
  },
});