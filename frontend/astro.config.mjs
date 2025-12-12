import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourname.com',
  integrations: [mdx(), sitemap()],
  output: 'static',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      },
      allowedHosts: ['be18157c-da9a-486d-a64d-336826ccc7b5.preview.emergentagent.com', 'localhost']
    }
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});