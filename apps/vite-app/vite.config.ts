import { defineConfig, BuildOptions } from 'vite';
import react from '@vitejs/plugin-react';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, ssrBuild }) => {
  const IS_SSR = ssrBuild;
  const IS_PROD = mode === 'production';
  const rollupOptions: BuildOptions['rollupOptions'] = {};
  if (IS_SSR) {
    rollupOptions.input = path.join(__dirname, 'src', 'entry.ssr.jsx');
  }
  return {
    plugins: [react(), svelte()],
    build: {
      minify: IS_PROD,
      rollupOptions,
    },
    server: {
      port: 3001,
    },
  };
});
