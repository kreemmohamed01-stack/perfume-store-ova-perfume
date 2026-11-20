/* OVA luxe cart drawer + checkout.
   - Adds a "Buy 3, get 50% off" meter (three slots + progress) to the cart
     drawer (#cart) and the checkout summary, read from localStorage ovaCart.
   - Checkout: step indicator and staggered entrance.
   Purely additive: never changes cart data or page functions. */
(function () {
  if (window.__ovaLuxeCommerce) return;
  window.__ovaLuxeCommerce = true;
  var EXCLUDED = { "Ibraq Tobacco Collection": 1 };
  var isAr = function () {
    return (localStorage.getItem("ovaLang") || document.documentElement.lang) === "ar" || document.documentElement.dir === "rtl";
  };
  var L = function (en, a) { return isAr() ? a : en; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  function units() {
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem("ovaCart") || "[]"); } catch (e) {}
    var out = [];
    cart.forEach(function (i) { if (!EXCLUDED[i.name]) for (var k = 0; k < i.qty; k++) out.push(i); });
    return out;
  }

  function meterHtml() {
    var u = units(), n = Math.min(u.length, 3), done = u.length >= 3, slots = "";
    for (var i = 0; i < 3; i++) {
      slots += u[i]
        ? '<span class="lxm-slot is-on" style="--i:' + i + '"><img src="' + esc(u[i].img) + '" alt=""></span>'
        : '<span class="lxm-slot" style="--i:' + i + '">+</span>';
    }
    return '<div class="lxm-head"><b>' + (done ? L("50% off unlocked", "تم تفعيل خصم 50%") : L("Buy 3 · Get 50% off", "اشترِ 3 · خصم 50%")) +
      "</b><span>" + n + " / 3</span></div>" +
      '<div class="lxm-slots">' + slots + "</div>" +
      '<div class="lxm-track"><i style="width:' + (n / 3) * 100 + '%"></i></div>' +
      "<small>" + (done ? L("The discount is applied to every eligible perfume.", "الخصم مطبق على كل العطور المؤهلة.")
        : L("Add " + (3 - n) + " more perfume" + (3 - n > 1 ? "s" : "") + " to unlock the offer.", "أضف " + (3 - n) + " " + (3 - n === 1 ? "عطر" : "عطور") + " كمان لتفعيل العرض.")) + "</small>";
  }

  function mountMeter(host, before) {
    if (!host) return null;
    var m = host.querySelector(".lxm");
    if (!m) {
      m = document.createElement("div");
      m.className = "lxm";
      host.insertBefore(m, before || host.firstChild);
    }
    var html = meterHtml();
    if (m.__html !== html) {
      var was = m.querySelectorAll(".lxm-slot.is-on").length;
      m.innerHTML = html;
      m.__html = html;
      var now = m.querySelectorAll(".lxm-slot.is-on");
      if (now.length > was && now[now.length - 1]) now[now.length - 1].classList.add("is-new");
      m.classList.toggle("is-done", units().length >= 3);
    }
    return m;
  }

  /* ---------- cart drawer (index.html) ---------- */
  var cart = document.getElementById("cart");
  if (cart) {
    document.documentElement.classList.add("lx-has-cart");
    var footer = cart.querySelector(".cart-footer");
    var items = document.getElementById("cartItems");
    var head = document.createElement("div");
    head.className = "lx-cart-head";
    cart.insertBefore(head, items);
    var sync = function () {
      head.innerHTML = "<h2>" + L("Your Bag", "سلة التسوق") + "</h2><span>" + units().length + " " + L("items", "قطعة") + "</span>";
      mountMeter(footer || cart, footer ? footer.firstChild : null);
      var empty = items && !items.children.length;
      cart.classList.toggle("lx-empty", !!empty);
      if (empty && !items.querySelector(".lx-cart-empty")) {
        items.innerHTML = '<div class="lx-cart-empty"><div class="lx-cart-empty-ico">✦</div><p>' + L("Your bag is empty", "سلتك فاضية") + "</p><small>" + L("Discover a scent that tells your story.", "اكتشف عطر يحكي حكايتك.") + "</small></div>";
      }
    };
    if (items && "MutationObserver" in window) new MutationObserver(function (m) {
      if (m.some(function (r) { return [].some.call(r.addedNodes, function (n) { return n.classList && n.classList.contains("lx-cart-empty"); }); })) return;
      sync();
    }).observe(items, { childList: true });
    new MutationObserver(function () { if (cart.classList.contains("is-open")) sync(); }).observe(cart, { attributes: true, attributeFilter: ["class"] });
    sync();
  }

  /* ---------- checkout.html ---------- */
  var shell = document.querySelector(".checkout-shell");
  if (shell) {
    document.documentElement.classList.add("lx-checkout");
    var header = shell.querySelector(".checkout-header");
    var steps = document.createElement("ol");
    steps.className = "lx-steps";
    var labels = [L("Bag", "السلة"), L("Details", "البيانات"), L("Delivery", "التوصيل"), L("Payment", "الدفع")];
    steps.innerHTML = labels.map(function (s, i) {
      return '<li class="' + (i < 1 ? "is-done" : i === 1 ? "is-active" : "") + '" style="--i:' + i + '"><span>' + (i < 1 ? "✓" : i + 1) + "</span>" + s + "</li>";
    }).join("");
    if (header) header.insertAdjacentElement("afterend", steps);

    var summary = document.querySelector(".summary-panel");
    var summaryItems = document.getElementById("summaryItems");
    var renderMeter = function () { if (summary) mountMeter(summary, summaryItems ? summaryItems.nextSibling : null); };
    renderMeter();
    if (summaryItems && "MutationObserver" in window) new MutationObserver(renderMeter).observe(summaryItems, { childList: true });

    var form = document.getElementById("checkoutForm");
    if (form) {
      form.addEventListener("focusin", function () {
        var s = steps.children[1];
        if (s) s.classList.add("is-active");
      });
    }
    requestAnimationFrame(function () { document.documentElement.classList.add("lx-in"); });
  }
})();
