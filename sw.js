importScripts("./assets/js/app-meta.js");

const VERSION = APP_META.version;
const CACHE_NAME = `${APP_META.cachePrefix}-${VERSION}`;
const INSTALL_CACHE_NAME = `${CACHE_NAME}-install`;
const CHANNEL_NAME = "nepali-imposter-updates";

const broadcastChannel = "BroadcastChannel" in self ? new BroadcastChannel(CHANNEL_NAME) : null;

function resolveAssetUrl(assetPath) {
    return new URL(assetPath, self.registration.scope).toString();
}

function broadcast(message) {
    if (broadcastChannel) {
        broadcastChannel.postMessage(message);
    }

    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
        clients.forEach((client) => client.postMessage(message));
    });
}

async function clearOldCaches() {
    const cacheNames = await caches.keys();
    const staleCacheNames = cacheNames.filter((cacheName) => {
        return cacheName.startsWith(APP_META.cachePrefix) && cacheName !== CACHE_NAME;
    });

    await Promise.all(staleCacheNames.map((cacheName) => caches.delete(cacheName)));
}

async function cacheAppShell() {
    const installCache = await caches.open(INSTALL_CACHE_NAME);
    const assets = APP_META.offlineAssets.map(resolveAssetUrl);
    let completed = 0;

    broadcast({
        type: "SW_INSTALLING",
        version: VERSION,
        total: assets.length,
        completed
    });

    for (const assetUrl of assets) {
        const request = new Request(assetUrl, { cache: "reload" });
        const response = await fetch(request);
        if (!response.ok) {
            throw new Error(`Failed to cache ${assetUrl}`);
        }

        await installCache.put(assetUrl, response.clone());
        completed += 1;
        broadcast({
            type: "DOWNLOAD_PROGRESS",
            version: VERSION,
            completed,
            total: assets.length,
            percentage: Math.round((completed / assets.length) * 100)
        });
    }

    await caches.delete(CACHE_NAME);
    const finalCache = await caches.open(CACHE_NAME);
    const requests = await installCache.keys();
    for (const request of requests) {
        const response = await installCache.match(request);
        if (response) {
            await finalCache.put(request, response);
        }
    }
    await caches.delete(INSTALL_CACHE_NAME);
}

async function matchFromCurrentCache(request) {
    const cache = await caches.open(CACHE_NAME);
    return cache.match(request, { ignoreSearch: true });
}

self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
        try {
            await cacheAppShell();
            broadcast({ type: "UPDATE_READY", version: VERSION });
        } catch (error) {
            await caches.delete(INSTALL_CACHE_NAME);
            broadcast({
                type: "UPDATE_FAILED",
                version: VERSION,
                message: error.message
            });
            throw error;
        }
    })());
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        await clearOldCaches();
        await self.clients.claim();
        broadcast({
            type: "CACHE_CLEANUP_COMPLETE",
            version: VERSION
        });
    })());
});

self.addEventListener("message", (event) => {
    if (!event.data || !event.data.type) {
        return;
    }

    if (event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);
    const isSameOrigin = requestUrl.origin === self.location.origin;
    if (!isSameOrigin) {
        return;
    }

    event.respondWith((async () => {
        const navigationRequest = event.request.mode === "navigate";
        const cachedResponse = await matchFromCurrentCache(event.request.url);
        if (cachedResponse) {
            return cachedResponse;
        }

        try {
            const networkResponse = await fetch(event.request);
            return networkResponse;
        } catch (error) {
            if (navigationRequest) {
                const appShellResponse = await matchFromCurrentCache(resolveAssetUrl("./index.html"));
                if (appShellResponse) {
                    return appShellResponse;
                }
            }
            throw error;
        }
    })());
});
