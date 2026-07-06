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
      '@script': fileURLToPath(new URL('./src/script', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@images': fileURLToPath(new URL('./public/i', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@constants': fileURLToPath(new URL('./src/constants.ts', import.meta.url)),
      '@callbacks': fileURLToPath(new URL('./src/callbacks.ts', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api.ts', import.meta.url)),
      '@dp': fileURLToPath(new URL('./src/script/dataProcessing', import.meta.url)),
      '@elements': fileURLToPath(new URL('./src/script/elements', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/script/UI', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/script/composables', import.meta.url))
    }
  },

  publicDir: 'public',

  server: {
  host: '0.0.0.0',
  port: 5173,
  open: false,
  watch: {
    usePolling: true
  },
  proxy: {
    '/api': {
      target: 'http://server:3000',
      changeOrigin: true
    },
    '/uploads': {
      target: 'http://server:3000',
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