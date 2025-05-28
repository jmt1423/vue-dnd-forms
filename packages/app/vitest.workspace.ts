import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: 'vite.config.ts',
    test: {
      name: 'unit',
      include: ['./tests/unit/**/*.{spec,test}.{js,ts}'],
    }
  },
  {
    extends: 'vite.config.ts',
    test: {
      include: ['./tests/browser/**/*.{spec,test}.{js,ts}'],
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
          { browser: 'chromium' },
        ],
        viewport: { width: 1280, height: 720 },
      },
    },
  },
])
