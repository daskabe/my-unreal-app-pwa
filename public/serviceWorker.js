// public/service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
  });
  
  self.addEventListener('fetch', (event) => {
    // Basic fetch event handler (you can add caching logic here)
    event.respondWith(fetch(event.request));
  });