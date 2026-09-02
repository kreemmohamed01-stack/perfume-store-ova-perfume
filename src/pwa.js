(function () {
  if (!("serviceWorker" in navigator)) return;

  /* Bump this on every deploy that changed cached assets. A visitor whose
     browser (or old installed PWA) is still holding an outdated service
     worker / cache will get everything wiped and reloaded once, automatically
     - they never have to manually clear anything themselves. */
  var CLEANUP_VERSION = "20260902a";
  var STORAGE_KEY = "ovaPwaCleanupVersion";

  function alreadyCleaned() {
    try {
      return localStorage.getItem(STORAGE_KEY) === CLEANUP_VERSION;
    } catch (e) {
      return false;
    }
  }

  function markCleaned() {
    try {
      localStorage.setItem(STORAGE_KEY, CLEANUP_VERSION);
    } catch (e) {}
  }

  function cleanup(reload) {
    if (alreadyCleaned()) return Promise.resolve();
    return Promise.resolve()
      .then(function () {
        return navigator.serviceWorker.getRegistrations();
      })
      .then(function (registrations) {
        return Promise.all(registrations.map(function (r) { return r.unregister(); }));
      })
      .then(function () {
        if (!("caches" in window)) return;
        return caches.keys().then(function (keys) {
          return Promise.all(keys.map(function (k) { return caches.delete(k); }));
        });
      })
      .then(function () {
        markCleaned();
      })
      .catch(function (e) {
        console.error("PWA cleanup failed:", e);
      });
  }

  /* Run the check as early as possible - a visitor stuck on a stale cached
     shell (blank/unstyled page) needs this to fire before they give up and
     leave, not after `load` + idle time. If a service worker was actually
     controlling this page, unregistering it means the NEXT navigation loads
     fresh; we also force a one-time reload right now so the fix is visible
     immediately instead of only on their next visit. */
  function runEarly() {
    if (alreadyCleaned()) return;
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      var wasControlled = !!navigator.serviceWorker.controller;
      var hadRegistrations = registrations.length > 0;
      cleanup().then(function () {
        if ((wasControlled || hadRegistrations)) {
          var reloadKey = "ovaPwaCleanupReload_" + CLEANUP_VERSION;
          var alreadyReloaded = false;
          try { alreadyReloaded = sessionStorage.getItem(reloadKey) === "1"; } catch (e) {}
          if (!alreadyReloaded) {
            try { sessionStorage.setItem(reloadKey, "1"); } catch (e) {}
            window.location.reload();
          }
        }
      });
    }).catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runEarly, { once: true });
  } else {
    runEarly();
  }

  /* Idle-time safety net for the (rare) case above missed anything - e.g. a
     registration that appears slightly after first paint. */
  function scheduleIdleSweep() {
    var sweep = function () {
      if (document.visibilityState !== "hidden") cleanup();
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(sweep, { timeout: 8000 });
    } else {
      window.setTimeout(sweep, 4500);
    }
  }
  window.addEventListener("load", function () {
    window.setTimeout(scheduleIdleSweep, 1200);
  }, { once: true });
})();
