// This file is used to develop the library with Vite.
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    open: './examples/index.html',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./examples/src', import.meta.url))
    },
  },
})
