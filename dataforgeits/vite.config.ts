// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // use *root* for a custom domain (or any time you deploy to the repo’s root)
  base: '/',
  plugins: [react()],
});
