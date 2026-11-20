/* OVA luxe site layer (patterns from the reference stores):
   - thin announcement bar with a looping marquee
   - Lenis smooth scrolling (lazy CDN load, skipped for reduced motion / touch)
   - header hides on scroll down, returns on scroll up
   - product cards swap to their second image on hover
   - product cards and section titles reveal on scroll
   - product page: icon chips, spec list and shipping line under Add to Cart */
(function () {
  if (window.__ovaLuxeSite) return;
  window.__ovaLuxeSite = true;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  var g = function (n) { try { return (0, eval)(n); } catch (e) { return undefined; } };
  var ar = function () { return (localStorage.getItem("ovaLang") || "") === "ar" || document.documentElement.lang === "ar"; };
  var L = function (en, a) { return ar() ? a : en; };

  document.documentElement.classList.add("lx-site");

  /* smooth scroll */
  /* Motion stack used by ccopadel.com: GSAP + ScrollTrigger + Lenis */
  function load(src) {
    return new Promise(function (ok, no) { var s = document.createElement("script"); s.src = src; s.async = true; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  }
  if (!reduce) {
    load("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js")
      .then(function () { return load("https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"); })
      .then(function () { return fine ? load("https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js") : null; })
      .then(startMotion)
      .catch(function () {});
  }

  function startMotion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);
    if (window.Lenis && fine) {
      var lenis = new window.Lenis({ duration: 1.15, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); }, smoothWheel: true });
      window.ovaLenis = lenis;
      lenis.on("scroll", ST.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
      new MutationObserver(function () {
        var locked = document.documentElement.classList.contains("lx-lock") || document.querySelector(".side-panel.is-open, .lx-sheet.is-open");
        locked ? lenis.stop() : lenis.start();
      }).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
    }

    // image parallax: yPercent 20, scrubbed (ccopadel)
    function parallax(root) {
      root.querySelectorAll(".lx-band-bg img, .lx-notes-media img, .lx-bundle-bg img, .best-seller-banner img, .collection-banner img").forEach(function (img) {
        if (img.__px) return; img.__px = true;
        gsap.fromTo(img, { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: img.parentNode, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }

    // words light up as you scroll (ccopadel scrubbed word reveal)
    function words(root) {
      root.querySelectorAll(".lx-about-desc, .lx-about-feel, .lx-band-copy h3, [data-lx-words]").forEach(function (el) {
        if (el.__w) return; el.__w = true;
        if (el.querySelector("br")) return;
        el.innerHTML = el.textContent.split(/(\s+)/).map(function (w) { return /\s+/.test(w) ? w : '<span class="lx-word">' + w.replace(/</g, "&lt;") + "</span>"; }).join("");
        gsap.from(el.querySelectorAll(".lx-word"), { autoAlpha: 0.15, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 55%", scrub: true } });
      });
    }

    // children slide in from the side with stagger (ccopadel data-animate x)
    function slides(root) {
      root.querySelectorAll(".lx-stats, .lx-tier-notes, .lx-specs, .lx-rev-list").forEach(function (box) {
        if (box.__s) return; box.__s = true;
        var x = document.documentElement.dir === "rtl" || ar() ? -40 : 40;
        gsap.from(box.children, { x: x, autoAlpha: 0, duration: 1, stagger: 0.12, ease: "power4.out", clearProps: "all", scrollTrigger: { trigger: box, start: "top 85%", once: true } });
      });
    }

    function all() { parallax(document); words(document); slides(document); ST.refresh(); }
    all();
    var t;
    new MutationObserver(function () { clearTimeout(t); t = setTimeout(all, 250); }).observe(document.body, { childList: true, subtree: true });
  }

  /* Page transitions (ccopadel: .page-transition fades .6s sine.inOut on leave and enter) */
  var veil = document.createElement("div");
  veil.className = "lx-veil";
  veil.innerHTML = '<span>OVA</span>';
  document.body.appendChild(veil);
  if (!reduce) {
    try { if (sessionStorage.getItem("lxVeil")) { veil.classList.add("is-on", "is-enter"); sessionStorage.removeItem("lxVeil"); requestAnimationFrame(function () { requestAnimationFrame(function () { veil.classList.remove("is-on"); }); }); } } catch (e) {}
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute("download")) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^(mailto|tel|javascript|https?:)/i.test(href)) return;
      if (a.onclick) return; // page handles it (e.g. SPA product navigation)
      e.preventDefault();
      try { sessionStorage.setItem("lxVeil", "1"); } catch (er) {}
      veil.classList.remove("is-enter");
      veil.classList.add("is-on");
      setTimeout(function () { location.href = a.href; }, 600);
    });
    addEventListener("pageshow", function (e) { if (e.persisted) veil.classList.remove("is-on"); });
  }

  /* hide-on-scroll header */
  var nav = document.getElementById("navbar") || document.getElementById("ovaShopNav");
  var lastY = scrollY;
  addEventListener("scroll", function () {
    var y = scrollY;
    document.documentElement.classList.toggle("lx-scrolled", y > 40);
    if (nav && !document.querySelector(".side-panel.is-open")) nav.classList.toggle("lx-nav-hide", y > 160 && y > lastY + 4);
    if (y < lastY - 4 && nav) nav.classList.remove("lx-nav-hide");
    lastY = y;
  }, { passive: true });

  /* cards: hover image swap + reveal */
  var io = "IntersectionObserver" in window && !reduce ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("lx-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" }) : null;

  function enhanceCard(card) {
    if (card.__lx) return;
    card.__lx = true;
    if (io) {
      card.classList.add("lx-card-rv");
      card.style.setProperty("--d", ((card.parentNode ? [].indexOf.call(card.parentNode.children, card) : 0) % 4) * 0.08 + "s");
      io.observe(card);
    }
    if (!fine) return;
    var img = card.querySelector("img");
    var label = card.getAttribute("aria-label") || "";
    var name = label.replace(/\s*details$/, "") || (card.querySelector("h3,h4") || {}).textContent;
    var getP = g("getProductByName");
    var p = name && typeof getP === "function" ? getP(name) : null;
    if (!img || !p || !p.img2 || p.img2 === p.img) return;
    var wrap = img.parentNode;
    var alt = document.createElement("img");
    alt.className = "lx-card-alt";
    alt.alt = "";
    alt.loading = "lazy";
    alt.decoding = "async";
    alt.dataset.src = p.img2;
    if (getComputedStyle(wrap).position === "static") wrap.style.position = "relative";
    wrap.appendChild(alt);
    card.addEventListener("pointerenter", function () { if (!alt.src) alt.src = alt.dataset.src; }, { once: true });
    card.classList.add("lx-has-alt");
  }
  function scan(root) {
    (root.querySelectorAll ? root : document).querySelectorAll(".product-card, .br-card").forEach(enhanceCard);
    if (io) (root.querySelectorAll ? root : document).querySelectorAll("h2.section-title, .section-title h2, .product-detail-heading").forEach(function (h) {
      if (h.__lx) return; h.__lx = true; h.classList.add("lx-title-rv"); io.observe(h);
    });
  }
  scan(document);
  new MutationObserver(function (ms) {
    ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { if (n.matches && n.matches(".product-card,.br-card")) enhanceCard(n); else scan(n); } }); });
  }).observe(document.body, { childList: true, subtree: true });

  /* product page: chips, specs, shipping line */
  function productExtras() {
    var cp = g("currentProduct");
    var add = document.getElementById("modalAddBtn");
    if (!cp || !add) return;
    var actions = add.closest(".product-page-actions");
    var ship = document.getElementById("lxShip");
    if (!ship && actions) {
      ship = document.createElement("p");
      ship.id = "lxShip";
      ship.className = "lx-ship";
      actions.insertAdjacentElement("afterend", ship);
    }
    if (ship) ship.innerHTML = L("Free delivery on your first order", "توصيل مجاني على أول طلب") + " <i>•</i> " + L("Delivery in 2–4 business days", "التوصيل خلال 2–4 أيام عمل") + " <i>•</i> " + L("Cash on delivery", "الدفع عند الاستلام");
    var specs = document.getElementById("lxSpecs");
    if (!specs && ship) {
      specs = document.createElement("dl");
      specs.id = "lxSpecs";
      specs.className = "lx-specs";
      ship.insertAdjacentElement("afterend", specs);
    }
    if (specs) {
      var rows = [
        [L("Concentration", "التركيز"), /200ml|100ml|edp|parfum|بارفان/i.test(cp.name + " " + (cp.detailsHtml || "")) ? "Eau de Parfum" : "Eau de Parfum"],
        [L("Longevity", "الثبات"), cp.longevity],
        [L("Sillage", "الفوحان"), cp.sillage],
        [L("Character", "الطابع"), cp.type]
      ].filter(function (r) { return r[1]; });
      specs.innerHTML = rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + String(r[1]).replace(/</g, "&lt;") + "</dd></div>"; }).join("");
    }
  }
  var price = document.getElementById("modalPrice");
  if (price) new MutationObserver(function () { setTimeout(productExtras, 30); }).observe(price, { childList: true });
  productExtras();
})();
