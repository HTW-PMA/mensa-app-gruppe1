import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'service-worker.ts',
            injectManifest: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                maximumFileSizeToCacheInBytes: 3000000,
            },
            manifest: {
                name: 'Mensa App',
                short_name: 'MensaApp',
                theme_color: '#ffffff',
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
                        purpose: 'maskable',
                    },
                ],
            },
            devOptions: {
                enabled: true,
                type: 'module',
            },
        }),
    ],
    define: {
        'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
    },
    server: {
        port: 3000,
    },
    build: {
        outDir: 'dist',
    },
});
