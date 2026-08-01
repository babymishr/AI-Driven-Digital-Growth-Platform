import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // '/' works for both Netlify and local dev
    base: '/',

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
