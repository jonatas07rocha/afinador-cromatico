#const CACHE_NAME = 'violin-tuner-cache-v1';
// Lista de arquivos e recursos essenciais para o funcionamento offline.
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png',
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
    'https://unpkg.com/@phosphor-icons/web'
];

// Evento 'install': é disparado quando o Service Worker é instalado.
// O cache é criado e os arquivos essenciais são armazenados.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache aberto');
                return cache.addAll(URLS_TO_CACHE);
            })
    );
});

// Evento 'fetch': é disparado para cada requisição feita pela página.
// O Service Worker intercepta a requisição e responde com o cache primeiro.
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Se a requisição estiver no cache, retorna a resposta do cache.
                if (response) {
                    return response;
                }
                // Caso contrário, busca na rede.
                return fetch(event.request);
            })
    );
});

// Evento 'activate': limpa caches antigos para manter o app atualizado.
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
