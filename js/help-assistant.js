(function () {
  if (window.__ovaAssistantV2Loaded) return;

  const current = document.currentScript;
  const source = current && current.src ? current.src : new URL("js/help-assistant.js", window.location.href).href;
  const nextSrc = new URL("help-assistant-v2.js", source).href;
  const existing = document.querySelector(`script[src="${nextSrc}"]`) || document.querySelector('script[data-ova-help-v2="true"]');

  if (existing) return;

  const script = document.createElement("script");
  script.src = nextSrc;
  script.defer = true;
  script.setAttribute("data-ova-help-v2", "true");
  (document.head || document.documentElement).appendChild(script);
})();
