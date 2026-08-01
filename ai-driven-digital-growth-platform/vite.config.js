import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isGHPages = process.env.GITHUB_ACTIONS === 'true';

  return {
    plugins: [react()],

    // GitHub Pages pe repo name ke saath base set karo
    base: isGHPages ? '/AI-Driven-Digital-Growth-Platform/' : '/',

    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost/jhatech/backend',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
