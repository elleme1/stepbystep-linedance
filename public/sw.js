// 구양희 STEP-BY-STEP Service Worker - Graceful 업데이트 + SPA 라우팅 지원
const CACHE_NAME = 'stepbystep-v16';
const OFFLINE_URL = '/';

// Install: 사용자가 '업데이트' 버튼을 누를 때까지 대기
self.addEventListener('install', (event) => {
    // skipWaiting()을 여기서 호출하지 않음 → 토스트에서 사용자 선택 후 교대
});

// Message: 토스트에서 '업데이트' 버튼 클릭 시 교대 명령 수신
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
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
    // 단, 독립 HTML 파일(jive-guide.html 등)은 직접 서빙
    if (event.request.mode === 'navigate') {
        const url = new URL(event.request.url);
        if (url.pathname.endsWith('.html') && url.pathname !== '/' && url.pathname !== '/index.html') {
            // 독립 HTML 파일은 네트워크에서 직접 가져옴
            event.respondWith(fetch(event.request));
            return;
        }
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
