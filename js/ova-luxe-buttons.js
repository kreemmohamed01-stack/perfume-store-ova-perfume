/* Button motion copied from the reference stores, applied to every text button.
   - ccopadel.com ".button__label": on hover the label rolls up and a copy
     (data-label) rolls in from below — .3s cubic-bezier(.165,.84,.44,1).
   - sn2studios.co ".armament-button": filled buttons wipe their fill away
     (scaleX) and swap colours; outline buttons fill from both sides — 300ms ease-out.
   Icon-only and one-character buttons (qty +/-) are left alone. */
(function () {
  if (window.__ovaLuxeButtons) return;
  window.__ovaLuxeButtons = true;
  var SEL = "button, .shop-all-btn, a.btn, a[class*='-btn'], a[class*='button'], .checkout-btn, input[type=submit]";
  var SKIP = ".lx-slot, .lx-pick, .lx-slot-x, .lx-sheet-x, .lx-wish, .lx-zoom, .closeModal, .close-modal, .qty-controls button, .lxb-skip, [aria-label='Close'], .osn-left button, .osn-right button, .cky-btn";

  function textOnly(el) {
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 1 && !/^(SPAN|B|STRONG|EM|I|SMALL)$/.test(n.tagName)) return false;
      if (n.nodeType === 1 && n.querySelector("svg,img")) return false;
    }
    return true;
  }

  function enhance(el) {
    if (el.tagName === "INPUT" || el.closest(SKIP) || el.matches(SKIP)) return;
    if (el.querySelector(".lxb-l") && el.__lxText === el.textContent) return;
    var hasIcon = el.querySelector("svg, img");
    var labelHost = el;
    if (hasIcon) {
      // keep the icon, roll only the text span (e.g. Add to Cart with bag icon)
      labelHost = el.querySelector(".lx-add-label");
      if (!labelHost) return;
    } else if (!textOnly(el)) return;
    var text = labelHost.textContent.replace(/\s+/g, " ").trim();
    if (text.length < 2 || text.length > 28 || el.__lxBad === text) return;
    var before = labelHost.innerHTML;
    labelHost.innerHTML = '<span class="lxb-l" data-label="' + text.replace(/"/g, "&quot;") + '"><span>' + text.replace(/</g, "&lt;") + "</span></span>";
    // Undo if the one-line label no longer fits the button (would overlap)
    var lab = labelHost.querySelector(".lxb-l");
    if (el.offsetWidth && lab.offsetWidth > el.clientWidth - 6) {
      labelHost.innerHTML = before;
      el.__lxBad = text;
      return;
    }
    if (getComputedStyle(el).position === "static") el.classList.add("lxb--pos");
    if (!el.querySelector(":scope > .lxb-f")) {
      var f = document.createElement("i");
      f.className = "lxb-f";
      f.setAttribute("aria-hidden", "true");
      f.innerHTML = "<b></b><b></b>";
      el.insertBefore(f, el.firstChild);
    }
    if (!el.classList.contains("lxb")) {
      var bg = getComputedStyle(el).backgroundColor;
      var filled = bg && !/rgba?\(\s*\d+,\s*\d+,\s*\d+,\s*0\s*\)|transparent/.test(bg);
      var img = getComputedStyle(el).backgroundImage;
      el.classList.add("lxb", filled || (img && img !== "none") ? "lxb--filled" : "lxb--outline");
    }
    el.__lxText = el.textContent;
  }

  function scan(root) {
    if (!root.querySelectorAll) return;
    if (root.matches && root.matches(SEL)) enhance(root);
    root.querySelectorAll(SEL).forEach(enhance);
  }

  var pending = new Set(), timer;
  function flush() { pending.forEach(function (n) { if (n.isConnected) scan(n); }); pending.clear(); }
  new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      var t = m.target.nodeType === 1 ? m.target : m.target.parentNode;
      var btn = t && t.closest && t.closest(SEL);
      if (btn) pending.add(btn);
      m.addedNodes.forEach(function (n) { if (n.nodeType === 1) pending.add(n); });
    });
    clearTimeout(timer);
    timer = setTimeout(flush, 60);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { scan(document.body); });
  else scan(document.body);
  setTimeout(function () { scan(document.body); }, 1200);
})();
