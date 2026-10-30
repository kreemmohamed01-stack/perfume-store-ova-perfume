/* Shared shop UX, loaded on every storefront page.

   1. Fly-to-cart: when an "Add to cart" click actually adds something (the
      cart count goes up), the product image flies in a 3D arc into the cart
      icon, the icon bumps, and the badge counts up to the new total once the
      image lands. Works with every page's own add-to-cart code because it
      only watches the click and the badge - no page function is changed.
   2. Shop navbar: pages whose <script> tag has data-nav="1" get the same top
      navbar as the homepage (menu, logo, search, cart). */
(function () {
  if (window.__ovaShopUx) return;
  window.__ovaShopUx = true;

  var script = document.currentScript;
  var wantsNav = !!(script && script.getAttribute("data-nav") === "1");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isAr = function () { return document.documentElement.lang === "ar" || document.body.dir === "rtl"; };

  var css = [
    /* the pages' old fly animations are replaced by this one */
    ".fly-img{display:none!important}",
    ".ova-fly{position:fixed;left:0;top:0;z-index:2147482000;pointer-events:none;will-change:transform,opacity;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 18px 40px rgba(60,40,15,.28)}",
    ".ova-fly img{width:100%;height:100%;object-fit:contain;display:block}",
    ".ova-cart-ring{position:fixed;z-index:2147482001;pointer-events:none;border-radius:50%;border:2px solid #b8893e}",
    /* shop navbar */
    ".ova-shop-nav{position:fixed;top:0;left:0;right:0;z-index:3000;height:64px;padding:0 14px;padding-top:env(safe-area-inset-top,0px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;background:rgba(255,255,255,.9);-webkit-backdrop-filter:saturate(1.4) blur(14px);backdrop-filter:saturate(1.4) blur(14px);border-bottom:1px solid rgba(160,124,62,.16);box-shadow:0 6px 24px rgba(40,30,15,.06)}",
    "body.has-ova-shop-nav{padding-top:calc(64px + env(safe-area-inset-top,0px))!important}",
    "body.has-ova-shop-nav #cartTrigger{display:none!important}",
    ".ova-shop-nav .osn-left,.ova-shop-nav .osn-right{display:flex;align-items:center;gap:6px}",
    ".ova-shop-nav .osn-right{justify-content:flex-end}",
    ".ova-shop-nav button{position:relative;width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:50%;background:transparent;color:#1d1611;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .2s ease}",
    ".ova-shop-nav button:hover{background:rgba(160,124,62,.1)}",
    ".ova-shop-nav svg{width:22px;height:22px}",
    ".ova-shop-nav .osn-logo img{height:46px;width:auto;display:block}",
    ".ova-shop-nav .osn-badge{position:absolute;top:2px;right:0;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#1d1611;color:#fff;font:700 10.5px/18px Manrope,Arial,sans-serif;text-align:center;box-sizing:border-box}",
    ".ova-shop-nav .osn-panel{position:absolute;top:100%;left:10px;min-width:220px;margin-top:8px;padding:8px;border-radius:18px;background:#fff;border:1px solid rgba(160,124,62,.18);box-shadow:0 22px 50px rgba(40,30,15,.16);display:none}",
    ".ova-shop-nav .osn-panel.is-open{display:block}",
    ".ova-shop-nav .osn-panel a{display:block;padding:11px 14px;border-radius:12px;color:#1d1611;text-decoration:none;font:600 14px/1.2 Manrope,Arial,sans-serif}",
    ".ova-shop-nav .osn-panel a:hover{background:#faf4ea}",
    ".ova-shop-nav .osn-panel hr{border:0;border-top:1px solid rgba(160,124,62,.16);margin:6px 8px}"
  ].join("");
  var style = document.createElement("style");
  style.id = "ovaShopUxStyle";
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  /* ---------- cart badge helpers ---------- */
  var BADGE_SELECTOR = "#cartCountBadge, #bottomCartCountBadge, #osnBadge";
  var holding = false;

  function readCount() {
    var max = 0;
    document.querySelectorAll(BADGE_SELECTOR).forEach(function (el) {
      var n = parseInt(String(el.textContent).replace(/[^\d]/g, ""), 10);
      if (n > max) max = n;
    });
    return max;
  }

  function writeCount(n) {
    document.querySelectorAll(BADGE_SELECTOR).forEach(function (el) { el.textContent = String(n); });
  }

  function pop(el) {
    if (!el || !el.animate || reduceMotion) return;
    el.animate([
      { transform: "scale(1)" },
      { transform: "scale(1.55)", offset: 0.35 },
      { transform: "scale(.9)", offset: 0.7 },
      { transform: "scale(1)" }
    ], { duration: 420, easing: "ease-out" });
  }

  function countUp(from, to) {
    if (to <= from) { writeCount(to); return; }
    var steps = to - from, i = 0;
    var gap = Math.max(60, Math.min(140, 420 / steps));
    (function tick() {
      i++;
      var value = from + i;
      writeCount(value);
      document.querySelectorAll(BADGE_SELECTOR).forEach(pop);
      if (value < to) setTimeout(tick, gap);
    })();
  }

  /* ---------- fly to cart ---------- */
  function visible(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight &&
      getComputedStyle(el).visibility !== "hidden";
  }

  function cartTarget() {
    var list = [
      document.querySelector("#bottomNavbar.is-visible .cart-btn"),
      document.querySelector("#ovaShopNav .osn-cart"),
      document.querySelector("#navbar .cart-btn"),
      document.getElementById("cartTrigger")
    ];
    for (var i = 0; i < list.length; i++) if (visible(list[i])) return list[i];
    return null;
  }

  function isAddButton(btn) {
    if (!btn || btn.disabled) return false;
    if (/buy/i.test(btn.className) || /buyNow|checkout/i.test(btn.getAttribute("onclick") || "")) return false;
    if (/product-add-btn|br-card-add|product-add-wide|modal-add-btn/.test(btn.className)) return true;
    if (btn.id === "modalAddBtn") return true;
    if (/addToCart|quickAdd|modalAddToCart/.test(btn.getAttribute("onclick") || "")) return true;
    var text = (btn.textContent || "").trim();
    return /add\s*to\s*cart|أضف|اضف|اضافة|إضافة/i.test(text);
  }

  function sourceImage(btn) {
    var card = btn.closest(".product-card, .br-card, .search-result, .best-seller-hero-card, .hero-top-seller-card");
    var img = card && card.querySelector("img");
    if (!img) {
      var modal = btn.closest("#productModal, .modal, .modal-content, [id*=Modal]");
      img = (modal && modal.querySelector("img")) || document.getElementById("modalImg");
    }
    return img && img.getAttribute("src") ? img : null;
  }

  function bumpCart(target) {
    if (!target.animate || reduceMotion) return;
    target.animate([
      { transform: "scale(1) rotate(0)" },
      { transform: "scale(1.28) rotate(-10deg)", offset: 0.3 },
      { transform: "scale(.92) rotate(6deg)", offset: 0.62 },
      { transform: "scale(1) rotate(0)" }
    ], { duration: 520, easing: "ease-out" });
    var r = target.getBoundingClientRect();
    var ring = document.createElement("div");
    ring.className = "ova-cart-ring";
    var size = Math.max(r.width, r.height);
    ring.style.width = ring.style.height = size + "px";
    ring.style.left = (r.left + r.width / 2 - size / 2) + "px";
    ring.style.top = (r.top + r.height / 2 - size / 2) + "px";
    document.body.appendChild(ring);
    ring.animate([
      { transform: "scale(.6)", opacity: 0.9 },
      { transform: "scale(1.9)", opacity: 0 }
    ], { duration: 600, easing: "ease-out" }).onfinish = function () { ring.remove(); };
  }

  function fly(img, from, target, done) {
    var t = target.getBoundingClientRect();
    var size = Math.max(56, Math.min(130, Math.min(from.width, from.height)));
    var sx = from.left + from.width / 2 - size / 2;
    var sy = from.top + from.height / 2 - size / 2;
    var ex = t.left + t.width / 2 - size / 2;
    var ey = t.top + t.height / 2 - size / 2;
    // control point above both ends, so the image rises before dropping in
    var cx = (sx + ex) / 2 + (ex > sx ? -40 : 40);
    var cy = Math.min(sy, ey) - Math.max(90, Math.abs(ex - sx) * 0.35);

    var wrap = document.createElement("div");
    wrap.className = "ova-fly";
    wrap.style.width = wrap.style.height = size + "px";
    var clone = document.createElement("img");
    clone.src = img.currentSrc || img.src;
    clone.alt = "";
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    var frames = [], N = 18;
    for (var i = 0; i <= N; i++) {
      var p = i / N;
      var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; // ease-in-out
      var x = (1 - e) * (1 - e) * sx + 2 * (1 - e) * e * cx + e * e * ex;
      var y = (1 - e) * (1 - e) * sy + 2 * (1 - e) * e * cy + e * e * ey;
      var scale = 1 - 0.82 * e;
      var spin = 540 * e;
      frames.push({
        transform: "perspective(700px) translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotateY(" +
          spin.toFixed(1) + "deg) rotateX(" + (14 * Math.sin(Math.PI * e)).toFixed(1) + "deg) scale(" + scale.toFixed(3) + ")",
        opacity: p > 0.85 ? 1 - (p - 0.85) / 0.15 * 0.7 : 1,
        borderRadius: (16 + 34 * e).toFixed(1) + "%"
      });
    }
    var anim = wrap.animate(frames, { duration: 820, easing: "linear", fill: "forwards" });
    anim.onfinish = function () { wrap.remove(); done(); };
  }

  document.addEventListener("click", function (event) {
    var btn = event.target && event.target.closest && event.target.closest("button, a");
    if (!isAddButton(btn) || holding) return;
    var img = sourceImage(btn);
    var from = img ? img.getBoundingClientRect() : null;
    var before = readCount();
    // let the page's own handler add the item first
    setTimeout(function () {
      var after = readCount();
      if (after <= before) return;
      var target = cartTarget();
      if (!target || reduceMotion || !img || !from || !from.width || !Element.prototype.animate) {
        if (target) bumpCart(target);
        countUp(before, after);
        return;
      }
      holding = true;
      writeCount(before);
      fly(img, from, target, function () {
        holding = false;
        bumpCart(target);
        countUp(before, Math.max(after, readCountFromPage(after)));
      });
    }, 0);
  }, true);

  // the page may have re-rendered the badge during the flight; trust the
  // larger of what we saw and what is there now
  function readCountFromPage(fallback) {
    var el = document.getElementById("cartCountBadge");
    var n = el ? parseInt(String(el.textContent).replace(/[^\d]/g, ""), 10) : NaN;
    return isNaN(n) ? fallback : n;
  }

  /* ---------- shop navbar ---------- */
  function icon(path) {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + path + "</svg>";
  }

  function buildNav() {
    if (document.getElementById("ovaShopNav") || document.getElementById("navbar")) return;
    var nav = document.createElement("header");
    nav.id = "ovaShopNav";
    nav.className = "ova-shop-nav";
    var ar = isAr();
    var links = [
      ["index.html", ar ? "الرئيسية" : "Home"],
      ["all-perfume.html", ar ? "كل البرفانات" : "Shop All"],
      ["men.html", ar ? "رجالي" : "Men"],
      ["women.html", ar ? "حريمي" : "Women"],
      ["unisex.html", ar ? "يونيسكس" : "Unisex"],
      ["index.html#brandsSection", ar ? "البراندات" : "Brands"]
    ];
    nav.innerHTML =
      '<div class="osn-left">' +
        '<button type="button" class="osn-menu" aria-label="Menu" aria-expanded="false">' +
          icon('<path d="M4 7H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>') +
        "</button>" +
        '<nav class="osn-panel" aria-label="Site">' +
          links.map(function (l) { return '<a href="' + l[0] + '">' + l[1] + "</a>"; }).join("") +
          '<hr><a href="https://wa.me/201099136720" target="_blank" rel="noopener noreferrer">WhatsApp</a>' +
          '<a href="https://www.instagram.com/ova_store.11/" target="_blank" rel="noopener noreferrer">Instagram</a>' +
        "</nav>" +
      "</div>" +
      '<a class="osn-logo" href="index.html" aria-label="Ova Store home"><img src="images/site-assets/logo-ova-nav.webp" alt="Ova Store" width="46" height="46"></a>' +
      '<div class="osn-right">' +
        '<button type="button" class="osn-search" aria-label="Search">' +
          icon('<circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="2"/><path d="M16 16L21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>') +
        "</button>" +
        '<button type="button" class="osn-cart" aria-label="Cart">' +
          icon('<path d="M3 5H5L7.2 14.2C7.31 14.67 7.73 15 8.21 15H17.4C17.87 15 18.29 14.69 18.41 14.24L20 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="19" r="1.7" fill="currentColor"/><circle cx="17" cy="19" r="1.7" fill="currentColor"/>') +
          '<span class="osn-badge" id="osnBadge">' + readCount() + "</span>" +
        "</button>" +
      "</div>";
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.add("has-ova-shop-nav");

    var menuBtn = nav.querySelector(".osn-menu");
    var panel = nav.querySelector(".osn-panel");
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !panel.classList.contains("is-open");
      panel.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) { panel.classList.remove("is-open"); menuBtn.setAttribute("aria-expanded", "false"); }
    });

    nav.querySelector(".osn-search").addEventListener("click", function () {
      var input = document.getElementById("productSearch") || document.querySelector('input[type="search"], input[id*="earch"]');
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(function () { input.focus(); }, 350);
      } else {
        location.href = "all-perfume.html";
      }
    });

    nav.querySelector(".osn-cart").addEventListener("click", function () {
      if (typeof window.toggleCart === "function") window.toggleCart(true);
      else location.href = "checkout.html";
    });

    // keep the navbar badge in step with the page's own cart badge
    var pageBadge = document.getElementById("cartCountBadge");
    var navBadge = nav.querySelector("#osnBadge");
    if (pageBadge && window.MutationObserver) {
      new MutationObserver(function () {
        if (!holding) navBadge.textContent = pageBadge.textContent;
      }).observe(pageBadge, { childList: true, characterData: true, subtree: true });
      navBadge.textContent = pageBadge.textContent || "0";
    } else if (!pageBadge) {
      try {
        var cart = JSON.parse(localStorage.getItem("ovaCart") || "[]");
        navBadge.textContent = String(cart.reduce(function (s, i) { return s + (Number(i.qty) || 0); }, 0));
      } catch (e) {}
    }
  }

  if (wantsNav) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildNav);
    else buildNav();
  }
})();
