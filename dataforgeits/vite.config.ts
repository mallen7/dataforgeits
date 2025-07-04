// vite.config.ts
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [react()];

  if (command === 'build') {
    // ── simple static-sitemap generator ──
    const sitemapPlugin: PluginOption = {
      name: 'generate-static-sitemap',
      closeBundle() {
        const routes = ['/', '/services', '/contact'];          // add more if needed
        const domain = 'https://dataforgeitsolutions.com';

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((r) => `  <url><loc>${domain}${r === '/' ? '' : r}</loc></url>`)
  .join('\n')}
</urlset>`;

        const outDir = path.resolve(__dirname, 'dist');
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
        console.log('🗺  sitemap.xml generated');
      },
    };

    plugins.push(sitemapPlugin);
  }

  return {
    base: '/',   // GitHub Pages -> repo root / custom domain
    plugins,
  };
});
