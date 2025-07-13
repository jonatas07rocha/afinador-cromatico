// Define um nome e uma versão para o cache. Mudar a versão invalida o cache antigo.
const CACHE_NAME = 'violin-tuner-cache-v2';

// Lista de arquivos locais essenciais que compõem o "App Shell".
// Removemos os links de CDN daqui para tornar a instalação mais confiável.
const APP_SHELL_URLS = [
    '/',
    'index.html',
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

// --- 1. Evento de Instalação ---
// Ocorre quando o Service Worker é instalado pela primeira vez.
// Cacheamos o App Shell para que o aplicativo carregue instantaneamente.
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cacheando o App Shell');
                // cache.addAll é atômico: se um arquivo falhar, todos falham.
                // Por isso, só colocamos os arquivos essenciais e locais aqui.
                return cache.addAll(APP_SHELL_URLS);
            })
    );
});


// --- 2. Evento de Ativação ---
// Ocorre quando o novo Service Worker é ativado.
// É o momento ideal para limpar caches antigos e garantir que o app use os arquivos mais recentes.
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Se o nome do cache não for o atual, ele é excluído.
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Limpando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// --- 3. Evento de Fetch ---
// Intercepta TODAS as requisições de rede feitas pela aplicação.
// Aqui definimos a estratégia de como responder: do cache, da rede, etc.
self.addEventListener('fetch', (event) => {
    // Para as requisições de fontes do Google, usamos uma estratégia "Stale-While-Revalidate".
    // Isso serve a fonte do cache para ser rápido, mas busca uma atualização em segundo plano.
    if (event.request.url.startsWith('https://fonts.googleapis.com') || event.request.url.startsWith('https://fonts.gstatic.com')) {
        event.respondWith(
            staleWhileRevalidate(event.request)
        );
        return; // Encerra a execução para esta requisição
    }

    // Para todas as outras requisições (HTML, CSS, JS, Imagens), usamos "Cache-First".
    // Isso é ideal para um app que deve funcionar offline.
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Se a resposta estiver no cache, retorna ela.
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Se não estiver no cache, busca na rede.
                // Também clonamos a resposta e a colocamos no cache para uso futuro.
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        // Coloca no cache a resposta da rede para que fique disponível offline da próxima vez.
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});

/**
 * Estratégia Stale-While-Revalidate:
 * 1. Responde imediatamente com o recurso do cache, se disponível (rápido).
 * 2. Em paralelo, faz uma requisição à rede para obter a versão mais recente.
 * 3. Se a requisição de rede for bem-sucedida, atualiza o cache para a próxima visita.
 * @param {Request} request - A requisição a ser tratada.
 * @returns {Promise<Response>}
 */
function staleWhileRevalidate(request) {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
            });
            // Retorna o cache imediatamente, se houver, ou espera a rede.
            return cachedResponse || fetchPromise;
        });
    });
}
