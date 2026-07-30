(function () {
  if (window.__ovaScrollRevealLoaded) return;
  window.__ovaScrollRevealLoaded = true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const selectors = [
    ".hero > *",
    ".section-title",
    ".section-subtitle",
    ".brands-grid > *",
    ".search-row",
    ".promo .video-box",
    ".brand-card",
    ".product-card",
    ".story-card",
    ".feature-card",
    ".benefit-card",
    ".offer-card",
    ".glass-card",
    ".quiz-card",
    ".testimonial-card",
    ".service-card",
    ".category-card",
    ".shop-all-btn",
    ".ova-reveal"
  ];

  function injectStyles() {
    if (document.getElementById("ovaScrollRevealStyle")) return;
    const style = document.createElement("style");
    style.id = "ovaScrollRevealStyle";
    style.textContent = `
      .ova-reveal {
        opacity: 0;
        transform: translate3d(0, 28px, 0) scale(0.985);
        transition:
          opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--ova-reveal-delay, 0ms),
          transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--ova-reveal-delay, 0ms);
        will-change: opacity, transform;
      }

      .ova-reveal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0) scale(1);
      }

      @media (prefers-reduced-motion: reduce) {
        .ova-reveal,
        .ova-reveal.is-visible {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          will-change: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  let observer = null;
  let refreshFrame = 0;
  let initialized = false;

  function eligibleElements() {
    return selectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)))
      .filter((element, index, list) => list.indexOf(element) === index)
      .filter((element) => {
        if (!element || element.closest("#productModal, #cart, #cartSidebar, .modal, .auth-modal, #introScreen")) return false;
        if (element.dataset.ovaRevealSkip === "true") return false;
        return true;
      });
  }

  function refreshReveal() {
    if (reducedMotion.matches) return;
    injectStyles();

    if (!observer) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, {
        threshold: 0.08,
        rootMargin: "0px 0px -10% 0px"
      });
    }

    eligibleElements().forEach((element, index) => {
      if (!element.dataset.ovaRevealReady) {
        element.dataset.ovaRevealReady = "true";
        element.classList.add("ova-reveal");
        element.style.setProperty("--ova-reveal-delay", `${Math.min(index % 6, 5) * 45}ms`);
      }

      if (!element.classList.contains("is-visible")) {
        observer.observe(element);
      }
    });
  }

  function queueRefresh() {
    if (reducedMotion.matches) return;
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(refreshReveal);
  }

  function init() {
    if (initialized || reducedMotion.matches) return;
    initialized = true;
    queueRefresh();

    window.refreshOvaScrollReveal = queueRefresh;
    window.addEventListener("resize", queueRefresh, { passive: true });
    window.addEventListener("orientationchange", queueRefresh, { passive: true });
    window.addEventListener("load", queueRefresh, { once: true, passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
