"use strict";
// Deklaration von Service Worker-spezifischen Typen
/// <reference lib="webworker" />
// Explizitieren des Typs von `self` als `ServiceWorkerGlobalScope`
//declare let self: ServiceWorkerGlobalScope;
//self.addEventListener('push', (event: PushEvent) => {
//  const data = event.data ? event.data.json() : {};
//const title = data.title || 'Benachrichtigung';
//const options: NotificationOptions = {
//  body: data.body || 'Sie haben eine neue Benachrichtigung.',
//icon: 'path/to/icon.png', // Pfad zu einem Benachrichtigungssymbol
//};
//event.waitUntil(
//  self.registration.showNotification(title, options)
//);
//});
//# sourceMappingURL=sw.js.map