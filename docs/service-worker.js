// Define um nome e uma versão para o cache. Mudar a versão invalida o cache antigo.
const CACHE_NAME = 'violin-tuner-cache-v3'; // Incrementamos a versão para forçar a atualização

// Lista de arquivos locais essenciais.
// CORRIGIDO: Os caminhos agora são relativos à pasta 'docs', onde este ficheiro está.
const APP_SHELL_URLS = [
    './', // Representa a raiz do PWA (o index.html)
    'index.html', // Redundante, mas bom para clareza
    'manifest.json',
    'icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

// --- 1. Evento de Instalação ---
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: A cachear o App Shell');
                return cache.addAll(APP_SHELL_URLS);
            })
    );
});

// --- 2. Evento de Ativação ---
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Se o nome do cache não for o atual, ele é excluído.
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: A limpar cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// --- 3. Evento de Fetch ---
self.addEventListener('fetch', (event) => {
    // Para as requisições de fontes do Google, usamos uma estratégia "Stale-While-Revalidate".
    if (event.request.url.startsWith('https://fonts.googleapis.com') || event.request.url.startsWith('https://fonts.gstatic.com')) {
        event.respondWith(staleWhileRevalidate(event.request));
        return;
    }

    // Para todas as outras requisições, usamos "Cache-First".
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});

/**
 * Estratégia Stale-While-Revalidate
 */
function staleWhileRevalidate(request) {
    return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
            const fetchPromise = fetch(request).then((networkResponse) => {
                cache.put(request, networkResponse.clone());
                return networkResponse;
            });
            return cachedResponse || fetchPromise;
        });
    });
}
```

### ✅ **Checklist Final**

Agora, para garantir que tudo funcione:

* **📝 Atualize o código:** Copie o conteúdo do ficheiro acima e substitua o código no seu `service-worker.js`.
* **🔎 Verifique o `index.html`:** Confirme que a linha que regista o Service Worker está correta (sem barras no início):
    ```html
    <script>
      // ...
      navigator.serviceWorker.register('service-worker.js') 
      // ...
    </script>
    ```
