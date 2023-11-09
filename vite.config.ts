/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [react(), checker({ typescript: true })],
});
