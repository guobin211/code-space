import * as path from 'path';
import { resolve } from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
import wasm from 'vite-plugin-wasm';

const root = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'examples/*', 'extensions/*', 'server/*'],
  },
  resolve: {
    alias: {
      '@': root,
      '@packages': resolve(root, 'packages'),
    },
  },
  plugins: [wasm()],
});
