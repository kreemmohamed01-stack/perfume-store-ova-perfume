/* This service worker intentionally does nothing but clean up after itself.
   It exists only so a browser that has an OLD, actually-caching service
   worker registered (from before this file looked like this) has something
   to update to. Per the Service Worker spec, a controlled page's browser
   re-fetches this exact file periodically (and the server sends it with
   `Cache-Control: no-cache, no-store, must-revalidate`, see vercel.json/
   _headers) - so even a visitor whose page-level JS never runs (because
   their cached HTML shell predates any of that JS) still gets this file
   re-checked by the browser itself and self-heals without doing anything.

   Do NOT add a `fetch` handler / any caching here - the whole point of this
   file is to guarantee visitors always get fresh content from the network. */

const NUKE_VERSION = "2026-09-02-clear";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // wipe every Cache Storage entry this origin's old service worker
      // might have written
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      // take control of every open tab immediately, then unregister -
      // once unregistered, those tabs go back to plain network requests
      await self.clients.claim();
      await self.registration.unregister();

      // force every currently-open tab controlled by this worker to reload,
      // so the fix is visible on THIS visit instead of only the next one
      const allClients = await self.clients.matchAll({ type: "window" });
      allClients.forEach((client) => {
        try {
          client.navigate(client.url);
        } catch (e) {
          // navigate() can throw in some edge cases; postMessage is the
          // fallback path pwa.js's own reload logic already listens for
          // indirectly via its own detection, so this is a best-effort extra
          try {
            client.postMessage({ type: "ova-sw-cleared" });
          } catch (e2) {}
        }
      });
    })()
  );
});
