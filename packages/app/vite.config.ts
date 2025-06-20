/// <reference types="vitest/config" />
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      enabled: false,
      provider: 'v8',
      include: ['form-builder/**/*.{ts,tsx}', "form-builder/**/*.vue"],
    }
  }
})
