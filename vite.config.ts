import { defineConfig } from 'vite'; // Importieren der defineConfig Funktion von Vite
import vue from '@vitejs/plugin-vue'; // Importieren des Vue Plugins für Vite
import { VitePWA } from 'vite-plugin-pwa'; // Importieren des Vite PWA Plugins

export default defineConfig({
  plugins: [vue(), // Verwenden des Vue Plugins
    VitePWA({
      registerType: 'autoUpdate', // Automatisches Aktualisieren des Service Workers
      strategies: 'injectManifest', // Verwenden der injectManifest Strategie für PWA, um einen eigenen Service Worker zu implementieren
      srcDir: 'src', // Quellverzeichnis für den Service Worker
      filename: 'my-service-worker.ts', // Dateiname des Service Workers
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 3000000
      },
      manifest: {
        name: 'Vite + Vue PWA Starter by Robin', // Der Name deiner PWA
        short_name: 'ViteVuePWAStarter', // // Kurzer Name deiner PWA
        theme_color: '#ffffff', // Designfarbe Ihrer PWA
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      devOptions: {
        enabled: true, // Aktivieren des Service Workers während der Entwicklung
        type: 'module', // Modultyp für den Service Worker
      },
    }),
  ],
});
