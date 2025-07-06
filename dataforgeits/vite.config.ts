// vite.config.ts
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { beasties } from 'vite-plugin-beasties';
import injectPreload from 'unplugin-inject-preload/vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [
    react(),

    // ── inline critical CSS & @font-face ──
    beasties({
      options: { pruneSource: false, inlineFonts: true, preload: 'swap' }
    }),

    // ── auto-inject <link rel="modulepreload" href="/assets/index-HASH.js" as="script"> ──
    injectPreload({
      files: [
        {
          // accept any word/dash chars between “index-” and “.js”
          outputMatch: /index-[\w-]+\.js$/
          // attributes omitted → plugin sets rel="modulepreload" and as="script"
        }
      ],
      injectTo: 'head-prepend'
    })
  ];

  if (command === 'build') {
    // ── simple static-sitemap generator (unchanged) ──
    const sitemapPlugin: PluginOption = {
      name: 'generate-static-sitemap',
      closeBundle() {
        const routes = ['/', '/services', '/contact'];
        const domain = 'https://dataforgeitsolutions.com';

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(r => `  <url><loc>${domain}${r === '/' ? '' : r}</loc></url>`)
  .join('\n')}
</urlset>`;

        fs.writeFileSync(path.resolve(__dirname, 'dist', 'sitemap.xml'), xml);
        console.log('🗺  sitemap.xml generated');
      }
    };
    plugins.push(sitemapPlugin);
  }

  return {
    base: '/',            // GitHub Pages → repo root / custom-domain
    plugins
  };
});
