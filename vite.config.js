import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@script': fileURLToPath(new URL('./script', import.meta.url)),
      '@styles': fileURLToPath(new URL('./styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/i', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
