import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { resolve } from 'path';
import pages from 'vite-plugin-pages';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';
import { configDefaults, defineConfig } from 'vitest/config';

const root = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'examples/*', 'extensions/*', 'scripts/*'],
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    pages({
      dirs: resolve(root, 'apps/web-app/pages'),
    }),
  ],
  publicDir: resolve(root, 'apps/public'),
  resolve: {
    alias: {
      '@': root,
      '@web': resolve(root, 'apps/web-app'),
      '@packages': resolve(root, 'packages'),
    },
  },
  optimizeDeps: {
    exclude: [],
  },
  build: {
    sourcemap: true,
    outDir: 'target/dist',
  },
  worker: {
    plugins: [wasm(), topLevelAwait()],
  },
});
