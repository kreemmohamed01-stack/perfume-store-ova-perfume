/* Warms a page only once the user shows real intent to open it.

   Tuned for a metered bandwidth budget: this must never fetch a page the
   visitor was not already heading to. So there is NO speculative
   prefetching - nothing is fetched just because a link scrolled into
   view, and the nav is not warmed up front. A page is fetched only on
   hover / touch-start / keyboard focus, which on desktop still buys the
   ~100-300ms before the click lands, and on mobile buys the gap between
   finger-down and finger-up.

   Guards:
   - same-origin document links only, no downloads or hash jumps
   - at most PREFETCH_BUDGET distinct pages per pageview
   - each URL fetched at most once
   - skipped entirely on save-data or 2G/3G
   - <link rel="prefetch"> is lowest priority, so it yields to real traffic */
(function () {
  if (window.__ovaNavPrefetch) return;
  window.__ovaNavPrefetch = true;

  var conn = navigator.connection;
  if (conn) {
    if (conn.saveData) return;
    // only prefetch on genuinely fast links - on anything slower the
    // spare request costs the visitor data and costs us quota
    if (!/^4g$/.test(conn.effectiveType || "4g")) return;
  }

  var PREFETCH_BUDGET = 4;
  var done = Object.create(null);
  var used = 0;

  function eligible(a) {
    if (!a || !a.href || a.origin !== location.origin) return false;
    if (a.hasAttribute("download") || a.target === "_blank") return false;
    if (a.pathname === location.pathname) return false;
    return /\.html$/.test(a.pathname) || a.pathname === "/";
  }

  function prefetch(url) {
    if (used >= PREFETCH_BUDGET || done[url]) return;
    done[url] = true;
    used++;
    var l = document.createElement("link");
    l.rel = "prefetch";
    l.as = "document";
    l.href = url;
    document.head.appendChild(l);
  }

  function onIntent(e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (a && eligible(a)) prefetch(a.href);
  }

  document.addEventListener("pointerenter", onIntent, { capture: true, passive: true });
  document.addEventListener("touchstart", onIntent, { capture: true, passive: true });
  document.addEventListener("focusin", onIntent, { capture: true, passive: true });
})();
