/* Service worker: la app funciona sin conexión (cache-first). Cambia CACHE al actualizar archivos. */
const CACHE = 'tk-ground-ops-v1';
const FILES = [
  './', './index.html', './fonts.css', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png',
  './fonts/outfit-300.woff2','./fonts/outfit-400.woff2','./fonts/outfit-500.woff2','./fonts/outfit-600.woff2','./fonts/outfit-700.woff2','./fonts/outfit-800.woff2','./fonts/outfit-900.woff2',
  './fonts/jetbrains-mono-400.woff2','./fonts/jetbrains-mono-600.woff2','./fonts/jetbrains-mono-700.woff2',
  './fonts/ibm-plex-mono-500.woff2','./fonts/ibm-plex-mono-600.woff2',
  './fonts/inter-400.woff2','./fonts/inter-500.woff2','./fonts/inter-600.woff2','./fonts/inter-700.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});
