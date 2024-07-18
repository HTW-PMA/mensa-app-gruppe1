/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ManifestEntry } from 'workbox-build';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';

// TypeScript aktivieren: Korrekten globalen Scope zuweisen.
declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

// Dieser Teil wird für das Precaching benutzt und ist zwingend notwendig, also nicht einfach löschen.
// Mehr zum Thema Precaching in der entsprechenden Vorlesung.
const manifest: Array<ManifestEntry> =
  self.__WB_MANIFEST as Array<ManifestEntry>;
precacheAndRoute(manifest);

// Auf das "install" Event warten
self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service Worker: Installieren', event);
  // Weitere Schritte im Installationslebenszyklus ausführen
});

// Auf das "activate" Event warten
self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service Worker: Aktivieren', event);
  // Weitere Schritte im Aktivierungslebenszyklus ausführen
});

// Auf ein "fetch" Event warten
self.addEventListener('fetch', (event: FetchEvent) => {
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
