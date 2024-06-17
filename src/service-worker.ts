import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

// @ts-ignore self.__WB_MANIFEST is an array of URLs to precache
const manifest = self.__WB_MANIFEST;
precacheAndRoute(manifest);

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installieren', event);
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Aktivieren', event);
});

self.addEventListener('fetch', (event) => {
    console.log(`Service Worker: Fetch resource ${event.request.url}`, event);
});

clientsClaim();
cleanupOutdatedCaches();
