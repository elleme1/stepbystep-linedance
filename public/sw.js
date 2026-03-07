// 구향희 STEP-BY-STEP Service Worker - 자동 업데이트 + SPA 라우팅 지원
const CACHE_NAME = 'stepbystep-v8';
const OFFLINE_URL = '/';

// Install: 즉시 활성화
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Activate: 이전 캐시 모두 삭제 후 즉시 제어
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: Network First + SPA navigate fallback
self.addEventListener('fetch', (event) => {
    // 외부 요청은 캐시하지 않음
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // SPA 네비게이션 요청: /library, /schedule 등 → /index.html로 처리
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch('/index.html')
                .then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put('/index.html', responseClone);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match('/index.html') || caches.match(OFFLINE_URL);
                })
        );
        return;
    }

    // 기타 리소스(JS, CSS, 이미지 등): Network First 전략
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return new Response('Offline', { status: 503 });
                });
            })
    );
});
