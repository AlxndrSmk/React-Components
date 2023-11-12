/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: ['src/main.tsx', 'src/types/types.ts', 'src/constants.ts', 'src/vite-env.d.ts'],
      all: true,
    },
  },
});
