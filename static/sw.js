const CACHE_NAME = 'advhater-cache';

const cacheUrls = [
    'isauth'
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
    );
});

this.addEventListener('fetch', (event) => {
    event.respondWith(
        caches
            .match(event.request)
            .then((cachedResponse) => {
                console.log(cachedResponse, navigator.onLine);
                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);
            })
    );
});