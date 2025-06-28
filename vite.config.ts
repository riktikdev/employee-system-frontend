import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';

import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      generatedRouteTree: './generated/router/index.ts',
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/generated': path.resolve(__dirname, './generated'),
    },
  },
  server: {
    allowedHosts: true,
  },
});
