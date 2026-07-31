import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    server: {
      proxy: {
        // During local dev, /api/* → PHP backend on XAMPP
        // e.g. /api/ai-analysis → http://localhost/jhatech/backend/ai-analysis.php
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost/jhatech/backend',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
