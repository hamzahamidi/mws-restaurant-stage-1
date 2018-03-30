const cacheName = 'precache-v1';
const cacheFiles = [
  'index.html',
  'restaurant.html',
  './js/',
  './css/',
  './data/',
  './img/',
  './assets/',
  'manifest.json',
];

self.addEventListener('install', event => {
    console.log('SW Installed');
    event.waitUntil(
      caches.open(cacheName).then(cache => {
      console.log('SW Caching cacheFiles');
      return cache.addAll(cacheFiles);
      })
  ); 
});

self.addEventListener('activate', event => {
  console.log('SW Activated');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(thisCacheName => {
        if (thisCacheName !== cacheName) {
          console.log('SW Removing Cached Files from Cache - ', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('SW Fetch event now', event.request.url);
  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        console.log("SW Found in Cache", event.request.url, response);
        return response || fetch(event.request).then(response => {
          console.log('SW not Found in Cache, need to search in the network', event.request.url);
          cache.put(event.request, response.clone());
          console.log('SW New Data Cached', event.request.url);
          return response;
        });
      });
    })
  );
});