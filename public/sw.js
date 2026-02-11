const CACHE_NAME = "icfes-prep-v1";

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
  "/favicon.png",
  "/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  // No cachear recursos con esquemas no soportados (chrome-extension, etc)
  const unsupportedSchemes = ["chrome-extension", "chrome", "moz-extension"];
  if (unsupportedSchemes.some(scheme => url.protocol.startsWith(scheme))) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === "basic") {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              try {
                cache.put(event.request, clone);
              } catch (error) {
                console.warn("Failed to cache response:", error);
              }
            });
          }
          return response;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
