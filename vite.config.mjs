// vite.config.js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    watch: {
      usePolling: true, // Helps on some systems like WSL or Docker
    }
  }
});
