import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@script': fileURLToPath(new URL('./src/script', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/i', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants.js', import.meta.url)),
      '@callbacks': fileURLToPath(new URL('./src/callbacks.js', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api.js', import.meta.url)),
      '@dp': fileURLToPath(new URL('./src/script/dataProcessing', import.meta.url)),
      '@elements': fileURLToPath(new URL('./src/script/elements', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/script/UI', import.meta.url))
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
