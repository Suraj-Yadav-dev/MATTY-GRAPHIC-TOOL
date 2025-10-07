// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // No proxy needed because api.js uses VITE_API_URL
    // You can still add options like port, open, etc. if needed
    port: 5173, // optional: your local dev server port
  },
  build: {
    outDir: 'dist', // Vercel will pick up the build folder
    chunkSizeWarningLimit: 2000, // optional: increase if you have large chunks
  },
});
