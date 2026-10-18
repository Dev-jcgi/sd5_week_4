import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio vive en https://<usuario>.github.io/<repositorio>/
// El workflow define VITE_BASE=/<repositorio>/ automáticamente.
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1500 },
});
