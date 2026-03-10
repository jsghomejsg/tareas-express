const CACHE_NAME = 'tareas-express-v2'; // He subido la versión a v2
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './1-apuntes-a-mano/index.html',
  './2-humanizador-texto/index.html',
  './3-limpiador-huellas/index.html',
  './4-flash-check/index.html'
];

// Instalación
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación y Limpieza
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estrategia de carga
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
