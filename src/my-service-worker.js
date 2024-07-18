/// <reference lib="webworker" />
import { clientsClaim } from 'workbox-core';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
cleanupOutdatedCaches();
// Dieser Teil wird für das Precaching benutzt und ist zwingend notwendig, also nicht einfach löschen.
// Mehr zum Thema Precaching in der entsprechenden Vorlesung.
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);
// Auf das "install" Event warten
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installieren', event);
    // Weitere Schritte im Installationslebenszyklus ausführen
});
// Auf das "activate" Event warten
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktivieren', event);
    // Weitere Schritte im Aktivierungslebenszyklus ausführen
});
// Auf ein "fetch" Event warten
self.addEventListener('fetch', (event) => {
    console.log(`Service Worker: Fetch resource ${event.request.url}`, event);
    // Weitere Schritte im Aktivierungslebenszyklus ausführen
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
            console.log('Service Worker registered:', registration);
        })
            .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
// Dies ist notwendig, da der neue Service Worker im skipWaiting-Zustand bleiben wird
self.skipWaiting();
clientsClaim();
//# sourceMappingURL=my-service-worker.js.map