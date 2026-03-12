const CACHE_NAME = 'h5p-virtual-workspace';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

/**
 * The crucial interceptor. 
 * Any fetch request made by h5p-standalone referencing the `/virtual-h5p-workspace/` path 
 * will fall into this trap. We serve the file Blobs directly out of the Cache API, which
 * the testapp.html UI injected upon local file upload.
 */
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/virtual-h5p-workspace/')) {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(async (response) => {
                // If h5p.json is requested, inject any inner library dependencies found in content.json
                if (response && url.pathname === '/virtual-h5p-workspace/h5p.json') {
                    try {
                        let h5pData = await response.clone().json();
                        let contentRes = await caches.match('/virtual-h5p-workspace/content/content.json', { ignoreSearch: true });
                        if (contentRes) {
                            let contentText = await contentRes.text();
                            const matches = contentText.match(/"library"\s*:\s*"([^"]+)"/g);
                            if (matches) {
                                h5pData.preloadedDependencies = h5pData.preloadedDependencies || [];
                                const existing = new Set(h5pData.preloadedDependencies.map(d => d.machineName));

                                for (const match of matches) {
                                    const libStr = match.split(':')[1].replace(/"/g, '').trim();
                                    const parts = libStr.split(' ');
                                    if (parts.length === 2 && !existing.has(parts[0])) {
                                        const versionParts = parts[1].split('.');
                                        h5pData.preloadedDependencies.push({
                                            machineName: parts[0],
                                            majorVersion: versionParts[0],
                                            minorVersion: versionParts[1] || '0'
                                        });
                                        existing.add(parts[0]);
                                    }
                                }
                            }
                        }
                        return new Response(JSON.stringify(h5pData), { headers: response.headers });
                    } catch (e) {
                        console.error('[SW] h5p.json injection error', e);
                    }
                }

                if (response) {
                    return response;
                }

                // Fallback to local /h5p-libraries/ for dependencies missing from the zip file
                const fallbackPath = url.pathname.replace('/virtual-h5p-workspace/', '/h5p-libraries/');
                return fetch(fallbackPath).then(res => {
                    if (res.ok) return res;
                    return new Response('Not Found in Virtual Workspace or Local Libs', { status: 404 });
                }).catch(() => new Response('Network error during fallback', { status: 500 }));
            })
        );
    }
});
