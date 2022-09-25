import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const entry = {
  client: path.join(__dirname, 'src', 'entry.client.jsx'),
  hydration: path.join(__dirname, 'src', 'entry.hydration.jsx'),
  ssr: path.join(__dirname, 'src', 'entry.ssr.jsx'),
};

const isSSR = process.argv.includes('--ssr');
const isProd = process.env.NODE_ENV === 'production';
const rollupOptions = isProd
  ? {
      input: isSSR ? entry.ssr : entry.hydration,
    }
  : {
      input: entry.client,
    };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svelte()],
  build: {
    manifest: true,
    minify: false,
    rollupOptions,
  },
});
