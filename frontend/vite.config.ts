import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ["icons/*.png"],
      manifest: {
        name: 'زلف دوتا',
        short_name: 'زلف دوتا',
        description: 'ردیاب خریدهای فروشگاه',
        theme_color: '#D946EF',
        background_color: '#FAFAFA',
        display: 'fullscreen',
        lang: 'fa-IR',
        dir: 'rtl',
        start_url: '/',
        icons: [
          { src: "icons/icon-48.png", sizes: "48x48", type: "image/png" },
          { src: "icons/icon-72.png", sizes: "72x72", type: "image/png" },
          { src: "icons/icon-96.png", sizes: "96x96", type: "image/png" },
          { src: "icons/icon-144.png", sizes: "144x144", type: "image/png" },
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
       workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        cleanupOutdatedCaches: true,
      },
    })
  ]
});
