(function () {
  if (!("serviceWorker" in navigator)) return;
  const legacyCleanupVersion = "20260423a";

  async function clearLegacyPwaState() {
    try {
      if (localStorage.getItem("ovaPwaCleanupVersion") === legacyCleanupVersion) return;

      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));

      if ("caches" in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((key) => caches.delete(key)));
      }

      localStorage.setItem("ovaPwaCleanupVersion", legacyCleanupVersion);
    } catch (error) {
      console.error("PWA cleanup failed:", error);
    }
  }

  function scheduleCleanup() {
    const run = () => {
      if (document.visibilityState === "hidden") return;
      clearLegacyPwaState();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 8000 });
      return;
    }

    window.setTimeout(run, 4500);
  }

  window.addEventListener("load", () => {
    window.setTimeout(scheduleCleanup, 1200);
  }, { once: true });
})();
