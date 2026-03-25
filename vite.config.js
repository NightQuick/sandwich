import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@script': fileURLToPath(new URL('./public/script', import.meta.url)),
      '@styles': fileURLToPath(new URL('./public/styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/i', import.meta.url)),
      '@': fileURLToPath(new URL('./public', import.meta.url)),
      '@constants': fileURLToPath(new URL('./public/constants.js', import.meta.url)),
      '@callbacks': fileURLToPath(new URL('./public/callbacks.js', import.meta.url)),
      '@api': fileURLToPath(new URL('./public/api.js', import.meta.url)),
      '@dp': fileURLToPath(new URL('./public/script/dataProcessing', import.meta.url)),
      '@elements': fileURLToPath(new URL('./public/script/elements', import.meta.url)),
      '@ui': fileURLToPath(new URL('./public/script/UI', import.meta.url))
    }
  },
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
