import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@script': fileURLToPath(new URL('./public/script', import.meta.url)),
      '@styles': fileURLToPath(new URL('./public/styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/i', import.meta.url)),
      '@': fileURLToPath(new URL('./public', import.meta.url)),
      '@constants': fileURLToPath(new URL('./public/constants.ts', import.meta.url)),
      '@callbacks': fileURLToPath(new URL('./public/callbacks.ts', import.meta.url)),
      '@api': fileURLToPath(new URL('./public/api.ts', import.meta.url)),
      '@dp': fileURLToPath(new URL('./public/script/dataProcessing', import.meta.url)),
      '@elements': fileURLToPath(new URL('./public/script/elements', import.meta.url)),
      '@ui': fileURLToPath(new URL('./public/script/UI', import.meta.url)),
      '@components': fileURLToPath(new URL('./public/components', import.meta.url))
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
  },

  plugins: [vue()]
});
