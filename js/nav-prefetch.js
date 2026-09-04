/* Warms same-origin pages before the user commits to the tap.

   Navigation felt slow because nothing about the next page was fetched
   until the click landed - the HTML, its CSS and its JS all started from
   cold at that moment. Here we prefetch a page's HTML as soon as the user
   shows intent (hover on desktop, touchstart / near-viewport on mobile),
   so the click usually resolves from cache.

   Deliberately conservative:
   - same-origin document links only, no downloads or hash jumps
   - at most PREFETCH_BUDGET pages per pageview
   - skipped entirely on save-data or slow connections
   - <link rel="prefetch"> is low priority, so it yields to real traffic */
(function () {
  if (window.__ovaNavPrefetch) return;
  window.__ovaNavPrefetch = true;

  var conn = navigator.connection;
  if (conn) {
    if (conn.saveData) return;
    if (/(^|-)2g$/.test(conn.effectiveType || "")) return;
  }

  var PREFETCH_BUDGET = 8;
  var done = Object.create(null);
  var used = 0;

  function eligible(a) {
    if (!a || !a.href || a.origin !== location.origin) return false;
    if (a.hasAttribute("download") || a.target === "_blank") return false;
    // ignore in-page anchors
    if (a.pathname === location.pathname && a.hash) return false;
    return /\.html$/.test(a.pathname) || a.pathname === "/" || !/\.[a-z0-9]+$/i.test(a.pathname);
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

  function fromEvent(e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (a && eligible(a)) prefetch(a.href);
  }

  document.addEventListener("pointerenter", fromEvent, { capture: true, passive: true });
  document.addEventListener("touchstart", fromEvent, { capture: true, passive: true });
  document.addEventListener("focusin", fromEvent, { capture: true, passive: true });

  // On mobile there is no hover, so warm the links that scroll into view.
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i];
        if (!en.isIntersecting) continue;
        io.unobserve(en.target);
        if (eligible(en.target)) prefetch(en.target.href);
      }
    }, { rootMargin: "200px" });

    var start = function () {
      // The nav is how people actually move around, so warm those
      // destinations immediately rather than waiting for them to be
      // scrolled into view (a fixed bottom bar never "enters" the
      // viewport, so observing it would never fire).
      var navLinks = document.querySelectorAll(
        "#navbar a[href], #bottomNavbar a[href], nav a[href], .dropdown-link-btn[href]"
      );
      for (var n = 0; n < navLinks.length; n++) {
        if (eligible(navLinks[n])) prefetch(navLinks[n].href);
      }

      var links = document.querySelectorAll("a[href]");
      for (var i = 0; i < links.length && i < 60; i++) {
        if (eligible(links[i])) io.observe(links[i]);
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  }
})();
