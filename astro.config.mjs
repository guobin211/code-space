import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import wasm from 'vite-plugin-wasm';

// https://astro.build/config
export default defineConfig({
  outDir: 'target/dist',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  server: {
    port: 4200,
  },
  vite: {
    plugins: [wasm()],
    ssr: {
      noExternal: [],
    },
  },
});
