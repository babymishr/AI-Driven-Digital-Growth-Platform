import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages repo name as base path
  base: '/AI-Driven-Digital-Growth-Platform/',
});
