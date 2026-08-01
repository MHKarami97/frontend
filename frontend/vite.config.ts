import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/ordertrack/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'OrderTrack',
        short_name: 'OrderTrack',
        description: 'Persian order tracking PWA',
        theme_color: '#D946EF',
        background_color: '#FAFAFA',
        display: 'standalone',
        lang: 'fa-IR',
        dir: 'rtl',
        start_url: '/ordertrack/#/',
        icons: [
          { src: '/ordertrack/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/ordertrack/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
});
