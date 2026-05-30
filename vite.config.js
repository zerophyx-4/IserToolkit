import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Pakai ./ agar tidak masalah dengan path
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
