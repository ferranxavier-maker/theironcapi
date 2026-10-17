// The Iron Capi - Service Worker
// Estrategia: cache-first para assets estaticos. Network-first para HTML.

const CACHE_NAME = "ironcapi-v31";

const ASSETS = [
  "./",
  "./index.html",
  "./bdd.html",
  "./onlyfans.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "https://cdn.jsdelivr.net/npm/xlsx-js-style@1.2.0/dist/xlsx.bundle.js"
];

// Instalacion: precachear todo
self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){
      return cache.addAll(ASSETS).catch(function(err){
        console.log("SW: fallo precache parcial", err);
      });
    }).then(function(){ return self.skipWaiting(); })
  );
});

// Activacion: limpiar caches antiguos
self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){
        if(k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(function(){ return self.clients.claim(); })
  );
});

// Fetch: cache-first con fallback a network. Si network falla, devolver cache.
self.addEventListener("fetch", function(event){
  if(event.request.method !== "GET") return;
  // Solo cacheamos lo propio y las librerias de jsdelivr; el resto (globo de visitas, YouTube...) va siempre a la red
  var u = new URL(event.request.url);
  if(u.origin !== self.location.origin && u.hostname !== "cdn.jsdelivr.net") return;

  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(cached){
      if(cached) return cached;
      return fetch(event.request).then(function(response){
        // Cachear respuestas validas para uso futuro
        if(response && response.status === 200 && (response.type === "basic" || response.type === "cors")){
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache){
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function(){
        // Sin red y sin cache: devolver index.html como fallback
        return caches.match("./index.html");
      });
    })
  );
});
