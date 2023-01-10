import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commonConfig = {
  plugins: [react()],
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode, ssrBuild }) => {
  const IS_SSR = ssrBuild;
  const IS_PROD = mode === 'production';
  if (IS_SSR) {
    return {
      ...commonConfig,
      build: {
        minify: true,
        rollupOptions: {
          input: path.join(__dirname, 'src', 'entry.ssr.tsx'),
        },
      },
    };
  }
  return {
    ...commonConfig,
    build: {
      minify: IS_PROD,
    },
    server: {
      port: 4202,
    },
  };
});
