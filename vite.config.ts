import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'examples/**', 'packages/**', 'apps/**', 'crates/**'],
  },
});
