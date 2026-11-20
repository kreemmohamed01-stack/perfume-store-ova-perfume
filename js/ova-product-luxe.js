/* OVA luxe product page.
   Layers an editorial, animated product page on top of the existing
   #productDetailPage rendered by js/home.js (index.html?product_slug=...):
   - hero restyle (thin serif type, vertical thumbs, wishlist, stock dot)
   - "Buy 3, get 50% off" bundle builder: three slots filled from the cart,
     a picker sheet to add more, progress bar and live before/after price
   - illustrated note pyramid parsed from the product copy
   - "About the fragrance" stats, cinematic parallax band, reviews summary
   - scroll reveals, split-heading entrance, magnetic CTA
   Uses home.js globals (cart, currentProduct, renderCart, ...) by name only. */
(function () {
  if (window.__ovaLuxeProduct) return;
  window.__ovaLuxeProduct = true;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var g = function (name) { try { return (0, eval)(name); } catch (e) { return undefined; } };
  var ar = function () { return g("currentLang") === "ar"; };
  var L = function (en, a) { return ar() ? a : en; };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var money = function (n) { return Math.round(n).toLocaleString("en-US") + " EGP"; };

  /* ---------------- notes dictionary ---------------- */
  var NOTES = [
    ["bergamot", "Bergamot", "البرغموت", "🍋", "top", ["برغموت", "برجموت"]],
    ["lemon", "Lemon", "الليمون", "🍋", "top", ["ليمون", "citrus", "حمضيات"]],
    ["mandarin", "Mandarin", "اليوسفي", "🍊", "top", ["mandarine", "orange", "يوسفي", "برتقال", "ماندرين"]],
    ["grapefruit", "Grapefruit", "الجريب فروت", "🍊", "top", ["جريب"]],
    ["pepper", "Pink Pepper", "الفلفل الوردي", "🌶️", "top", ["فلفل", "spicy", "spice", "توابل", "سبايسي"]],
    ["cardamom", "Cardamom", "الهيل", "🌿", "top", ["هيل", "حبهان"]],
    ["lavender", "Lavender", "اللافندر", "💜", "top", ["لافندر", "لافندر"]],
    ["mint", "Mint", "النعناع", "🌿", "top", ["نعناع", "fresh", "منعش"]],
    ["apple", "Apple", "التفاح", "🍏", "top", ["تفاح"]],
    ["pear", "Pear", "الكمثرى", "🍐", "top", ["كمثرى", "كمثري"]],
    ["berries", "Red Berries", "التوت الأحمر", "🍓", "top", ["berry", "توت", "فراولة", "fruity", "فواكه"]],
    ["cherry", "Cherry", "الكرز", "🍒", "top", ["كرز", "شيري"]],
    ["coffee", "Coffee", "القهوة", "☕", "heart", ["قهوة", "قهوه", "qahwa"]],
    ["rose", "Rose", "الورد", "🌹", "heart", ["ورد", "روز"]],
    ["jasmine", "Jasmine", "الياسمين", "🌼", "heart", ["ياسمين"]],
    ["orange-blossom", "Orange Blossom", "زهر البرتقال", "🌸", "heart", ["زهر البرتقال", "neroli", "نيرولي"]],
    ["tuberose", "Tuberose", "مسك الروم", "🤍", "heart", ["توبيروز"]],
    ["iris", "Iris", "السوسن", "🪻", "heart", ["سوسن", "ايريس", "orris"]],
    ["floral", "White Florals", "الزهور البيضاء", "💐", "heart", ["floral", "زهري", "زهور", "ورود"]],
    ["caramel", "Caramel", "الكراميل", "🍮", "heart", ["كراميل"]],
    ["praline", "Praline", "البرالين", "🍫", "heart", ["برالين", "شوكولاتة", "chocolate", "cacao", "كاكاو"]],
    ["honey", "Honey", "العسل", "🍯", "heart", ["عسل"]],
    ["cinnamon", "Cinnamon", "القرفة", "🟫", "heart", ["قرفة", "قرفه"]],
    ["tobacco", "Tobacco", "التبغ", "🍂", "heart", ["توباكو", "تبغ", "دخان"]],
    ["dates", "Dates", "التمر", "🌴", "heart", ["تمر", "بلح"]],
    ["vanilla", "Vanilla", "الفانيليا", "🍦", "base", ["فانيليا", "فانيلا", "gourmand", "سويت"]],
    ["amber", "Amber", "العنبر", "🟠", "base", ["عنبر", "امبر", "أمبر", "warm", "دافي", "دافئ"]],
    ["musk", "White Musk", "المسك", "☁️", "base", ["مسك", "clean"]],
    ["oud", "Oud", "العود", "🪵", "base", ["عود"]],
    ["sandalwood", "Sandalwood", "خشب الصندل", "🪵", "base", ["صندل", "sandal"]],
    ["cedar", "Cedarwood", "خشب الأرز", "🌲", "base", ["أرز", "ارز", "woody", "خشب", "خشبي", "wood"]],
    ["patchouli", "Patchouli", "الباتشولي", "🍃", "base", ["باتشولي"]],
    ["tonka", "Tonka Bean", "حبوب التونكا", "🫘", "base", ["تونكا"]],
    ["leather", "Leather", "الجلد", "🟤", "base", ["جلد", "ليذر"]],
    ["salt", "Sea Salt", "الملح البحري", "🌊", "base", ["salty", "ملح", "مالح", "aquatic", "مائي"]],
    ["incense", "Incense", "البخور", "🕯️", "base", ["بخور", "smoky"]]
  ];

  function productText(p) {
    var html = String(p.detailsHtml || "");
    var plain = html.replace(/<[^>]+>/g, " ");
    return [p.name, p.type, p.description, (p.filterTypes || []).join(" "), plain].join(" ").toLowerCase();
  }

  function deriveNotes(p) {
    var text = productText(p);
    var tiers = { top: [], heart: [], base: [] };
    NOTES.forEach(function (n) {
      var keys = [n[0], n[1].toLowerCase()].concat(n[5]);
      if (keys.some(function (k) { return text.indexOf(String(k).toLowerCase()) !== -1; })) {
        if (tiers[n[4]].length < 3) tiers[n[4]].push(n);
      }
    });
    var byId = function (id) { return NOTES.filter(function (n) { return n[0] === id; })[0]; };
    var fill = { top: ["bergamot", "mandarin", "pepper"], heart: ["rose", "jasmine", "floral"], base: ["musk", "amber", "sandalwood"] };
    Object.keys(tiers).forEach(function (k) {
      var i = 0;
      while (tiers[k].length < 3 && i < fill[k].length) {
        var n = byId(fill[k][i++]);
        if (tiers[k].indexOf(n) === -1) tiers[k].push(n);
      }
    });
    return tiers;
  }

  /* Parses "<p><strong>Label:</strong> value</p>" product copy into a map. */
  function parseDetails(p) {
    var out = {};
    try {
      var doc = new DOMParser().parseFromString("<div>" + (p.detailsHtml || "") + "</div>", "text/html");
      doc.querySelectorAll("p").forEach(function (para) {
        var strong = para.querySelector("strong");
        if (!strong) return;
        var label = strong.textContent.replace(/[:：]/g, "").trim();
        strong.remove();
        var value = para.textContent.replace(/\s+/g, " ").trim();
        if (label && value) out[label] = value;
      });
    } catch (e) {}
    return out;
  }

  function pick(map, keys) {
    for (var i = 0; i < keys.length; i++) {
      for (var k in map) if (k.indexOf(keys[i]) !== -1) return map[k];
    }
    return "";
  }

  /* ---------------- icons ---------------- */
  var ICON = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.5 3.1 4.3 6.3C19.5 15.4 12 20 12 20z"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    leaf: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M6 26C6 13 14 6 27 5c-1 13-8 21-21 21z"/><path d="M6 26 18 14"/></svg>',
    users: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="11" cy="11" r="4"/><circle cx="22" cy="12" r="3.2"/><path d="M3.5 25c.8-4.5 4-7 7.5-7s6.7 2.5 7.5 7"/><path d="M18 19.5c1.2-1 2.6-1.5 4-1.5 3 0 5.4 2.2 6 6"/></svg>',
    clock: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="16" cy="16" r="11"/><path d="M16 9v7l5 3"/></svg>',
    waves: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.1"><path d="M9 26c-3-4 3-6 0-10s3-6 0-10"/><path d="M16 26c-3-4 3-6 0-10s3-6 0-10"/><path d="M23 26c-3-4 3-6 0-10s3-6 0-10"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 4v16M4 12h16"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>'
  };

  /* ---------------- cart helpers (home.js state) ---------------- */
  function getCart() { var c = g("cart"); return Array.isArray(c) ? c : []; }
  function excluded(name) { var s = g("offerExcludedNames"); return s && s.has && s.has(name); }
  function bundleUnits() {
    var units = [];
    getCart().forEach(function (item) {
      if (excluded(item.name)) return;
      for (var i = 0; i < item.qty; i++) units.push(item);
    });
    return units;
  }
  function commitCart() { var r = g("renderCart"); if (typeof r === "function") r(); }

  function addProductToCart(p, sourceEl) {
    var cart = getCart();
    var existing = cart.filter(function (i) { return i.name === p.name; })[0];
    if (existing) existing.qty += 1;
    else cart.push({ name: p.name, price: Number(p.price) || 0, img: p.img, qty: 1 });
    var reveal = g("revealNavbarAndCart");
    if (typeof reveal === "function") reveal();
    if (sourceEl) flyToSlot(sourceEl);
    commitCart();
  }

  function removeOneFromCart(name) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name === name) {
        cart[i].qty -= 1;
        if (cart[i].qty <= 0) cart.splice(i, 1);
        break;
      }
    }
    commitCart();
  }

  /* ---------------- build ---------------- */
  var page, built = false, lastName = "";

  function ensureShell() {
    page = document.getElementById("productDetailPage");
    if (!page) return false;
    if (built) return true;
    built = true;
    page.classList.add("lx");

    var shell = page.querySelector(".product-detail-shell");
    var hero = page.querySelector(".product-detail-hero");
    var summary = page.querySelector(".product-detail-summary");
    var gallery = page.querySelector(".product-detail-gallery-card");

    // breadcrumb + brand pill
    var crumb = document.createElement("nav");
    crumb.className = "lx-crumb";
    crumb.id = "lxCrumb";
    hero.parentNode.insertBefore(crumb, hero);

    // gallery extras
    var zoom = document.createElement("button");
    zoom.type = "button";
    zoom.className = "lx-zoom";
    zoom.setAttribute("aria-label", "Zoom");
    zoom.innerHTML = ICON.expand;
    zoom.addEventListener("click", openLightbox);
    gallery.appendChild(zoom);

    // rating row + stock dot
    var rating = document.createElement("div");
    rating.className = "lx-rating";
    rating.id = "lxRating";
    var nameEl = document.getElementById("modalName");
    var subline = document.getElementById("modalSubline");
    (subline || nameEl).insertAdjacentElement("afterend", rating);

    // wishlist next to add button
    var add = document.getElementById("modalAddBtn");
    if (add) {
      add.innerHTML = '<span class="lx-add-ico">' + ICON.bag + '</span><span class="lx-add-label"></span>';
      var wish = document.createElement("button");
      wish.type = "button";
      wish.className = "lx-wish";
      wish.id = "lxWish";
      wish.setAttribute("aria-label", "Wishlist");
      wish.innerHTML = ICON.heart;
      wish.addEventListener("click", toggleWish);
      add.insertAdjacentElement("afterend", wish);
      magnetic(add);
    }

    // sections after hero
    var after = document.createElement("div");
    after.className = "lx-sections";
    after.innerHTML =
      '<section class="lx-bundle lx-reveal" id="lxBundle"></section>' +
      '<section class="lx-split">' +
      '  <div class="lx-notes-wrap lx-reveal"><div class="lx-notes-media"><img id="lxNotesImg" alt="" loading="lazy" decoding="async"></div><div class="lx-notes" id="lxNotes"></div></div>' +
      '  <div class="lx-about lx-reveal" id="lxAbout"></div>' +
      '</section>' +
      '<section class="lx-band lx-reveal" id="lxBand"><div class="lx-band-bg"><img id="lxBandImg" alt="" loading="lazy" decoding="async"></div><div class="lx-band-copy" id="lxBandCopy"></div></section>' +
      '<section class="lx-reviews lx-reveal" id="lxReviews"></section>';
    hero.insertAdjacentElement("afterend", after);

    // picker sheet
    var sheet = document.createElement("div");
    sheet.className = "lx-sheet";
    sheet.id = "lxSheet";
    sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML =
      '<div class="lx-sheet-scrim" data-close></div>' +
      '<div class="lx-sheet-panel" role="dialog" aria-modal="true">' +
      '  <div class="lx-sheet-head"><div><small id="lxSheetKicker"></small><h3 id="lxSheetTitle"></h3></div><button type="button" class="lx-sheet-x" data-close aria-label="Close">' + ICON.x + '</button></div>' +
      '  <input type="search" class="lx-sheet-search" id="lxSheetSearch" autocomplete="off">' +
      '  <div class="lx-sheet-grid" id="lxSheetGrid"></div>' +
      '</div>';
    document.body.appendChild(sheet);
    sheet.addEventListener("click", function (e) {
      if (e.target.closest("[data-close]")) closeSheet();
      var card = e.target.closest("[data-pick]");
      if (card) {
        var p = findProduct(card.getAttribute("data-pick"));
        if (p) {
          addProductToCart(p, card.querySelector("img"));
          card.classList.add("is-added");
          setTimeout(function () { if (bundleUnits().length >= 3) closeSheet(); }, 650);
        }
      }
    });
    document.getElementById("lxSheetSearch").addEventListener("input", function () { renderSheet(this.value); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });

    // light box
    var lb = document.createElement("div");
    lb.className = "lx-lightbox";
    lb.id = "lxLightbox";
    lb.innerHTML = '<img alt=""><button type="button" aria-label="Close">' + ICON.x + "</button>";
    lb.addEventListener("click", function () { lb.classList.remove("is-open"); });
    document.body.appendChild(lb);

    // bundle slot clicks
    document.getElementById("lxBundle").addEventListener("click", function (e) {
      var rm = e.target.closest("[data-remove]");
      if (rm) { e.stopPropagation(); removeOneFromCart(rm.getAttribute("data-remove")); return; }
      if (e.target.closest("[data-add-current]")) {
        var cp = g("currentProduct");
        if (cp) addProductToCart(cp, document.getElementById("modalImg"));
        return;
      }
      if (e.target.closest("[data-open-sheet]")) openSheet();
    });

    // keep bundle in sync with cart changes made anywhere
    var orig = g("renderCart");
    if (typeof orig === "function" && !orig.__lx) {
      var wrapped = function () { var r = orig.apply(this, arguments); try { renderBundle(); } catch (e) {} return r; };
      wrapped.__lx = true;
      try { window.renderCart = wrapped; (0, eval)("renderCart = window.renderCart"); } catch (e) {}
    }

    setupReveals();
    setupParallax();
    if (shell) shell.classList.add("lx-shell");
    return true;
  }

  function magnetic(el) {
    if (reduceMotion || !window.matchMedia("(hover:hover)").matches) return;
    el.addEventListener("mousemove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / r.width;
      var y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = "translate(" + x * 8 + "px," + y * 6 + "px)";
    });
    el.addEventListener("mouseleave", function () { el.style.transform = ""; });
  }

  /* ---------------- render ---------------- */
  function render() {
    var p = g("currentProduct");
    if (!p || !ensureShell()) return;
    var isNew = p.name !== lastName;
    lastName = p.name;

    var details = parseDetails(p);
    var rating = Number(p.rating) || 4.8;
    var reviewsCount = 180 + (hash(p.name) % 1200);
    var brand = p.brandTitle || p.brand || (document.getElementById("productPageBrand") || {}).textContent || "OVA";
    var family = p.type || pick(details, ["النوع", "Type"]) || "";

    // crumb
    document.getElementById("lxCrumb").innerHTML =
      '<a href="index.html" data-home>' + L("Home", "الرئيسية") + "</a><i>/</i>" +
      '<a href="all-perfume.html">' + L("Perfumes", "العطور") + "</a><i>/</i><span>" + esc(p.name) + "</span>";
    var home = document.querySelector("#lxCrumb [data-home]");
    if (home) home.onclick = function (e) { var nav = g("navigateToHomepage"); if (typeof nav === "function") { e.preventDefault(); nav(); } };

    // headline split animation
    var nameEl = document.getElementById("modalName");
    if (nameEl && isNew) splitWords(nameEl, p.name);

    document.getElementById("lxRating").innerHTML =
      '<span class="lx-stars" style="--r:' + (rating / 5) * 100 + '%"></span><b>' + rating.toFixed(1) + "</b><span>(" + reviewsCount.toLocaleString("en-US") + " " + L("reviews", "تقييم") + ")</span>";

    var stock = document.getElementById("modalStock");
    if (stock) stock.innerHTML = '<i class="lx-dot"></i>' + L("In stock — ships in 24h", "متوفر في المخزون — شحن خلال 24 ساعة");

    var label = document.querySelector("#modalAddBtn .lx-add-label");
    if (label) label.textContent = L("Add to Cart", "أضف إلى السلة");
    var buy = document.getElementById("modalBuyNowBtn");
    if (buy) buy.textContent = L("Buy Now", "اشتري الآن");
    syncWish();

    // notes
    var notes = deriveNotes(p);
    var tierLabel = { top: ["Top Notes", "النوتات العليا"], heart: ["Heart Notes", "قلب العطر"], base: ["Base Notes", "قاعدة العطر"] };
    document.getElementById("lxNotesImg").src = p.img2 || p.img;
    document.getElementById("lxNotes").innerHTML =
      '<header class="lx-h"><h2>' + L("Fragrance Notes", "النوتات العطرية") + "</h2><small>" + L("The scent pyramid", "هرم العطر") + "</small></header>" +
      ["top", "heart", "base"].map(function (tier, ti) {
        return '<div class="lx-tier" style="--d:' + ti * 0.12 + 's"><div class="lx-tier-label"><b>' + tierLabel[tier][ar() ? 1 : 0] + '</b><span>' + ["I", "II", "III"][ti] + '</span></div><div class="lx-tier-notes">' +
          notes[tier].map(function (n, i) {
            return '<figure class="lx-note" style="--i:' + i + '"><span class="lx-note-ico" aria-hidden="true">' + n[3] + "</span><figcaption>" + (ar() ? n[2] : n[1]) + "</figcaption></figure>";
          }).join("") + "</div></div>";
      }).join("");

    // about
    var desc = pick(details, ["الوصف", "الريحة", "Description"]) || (p.description || "");
    if (!desc) desc = L("A refined composition that balances softness and warmth, leaving an elegant trail that lasts all day.", "تركيبة راقية تجمع بين النعومة والدفء، وتترك أثرًا أنيقًا يدوم طوال اليوم.");
    var feel = pick(details, ["الإحساس", "اللي يميزه"]);
    var use = pick(details, ["الاستخدام"]);
    var longevity = pick(details, ["الثبات"]) || p.longevity || "";
    var sillage = pick(details, ["الفوحان"]) || p.sillage || "";
    var gender = genderOf(p);
    var stats = [
      [ICON.leaf, L("Family", "العائلة العطرية"), family],
      [ICON.users, L("For", "الفئة"), gender],
      [ICON.clock, L("Longevity", "الثبات"), longevity],
      [ICON.waves, L("Sillage", "الفوحان"), sillage]
    ].filter(function (s) { return s[2]; });
    document.getElementById("lxAbout").innerHTML =
      '<header class="lx-h"><h2>' + L("About the Fragrance", "عن العطر") + "</h2><small>" + esc(brand) + "</small></header>" +
      '<p class="lx-about-desc">' + esc(desc) + "</p>" +
      (feel ? '<p class="lx-about-feel">“' + esc(feel) + "”</p>" : "") +
      '<div class="lx-stats">' + stats.map(function (s, i) {
        return '<div class="lx-stat" style="--i:' + i + '"><span class="lx-stat-ico">' + s[0] + "</span><b>" + s[1] + "</b><span>" + esc(s[2]) + "</span></div>";
      }).join("") + "</div>" +
      (use ? '<div class="lx-occasion"><small>' + L("Wear it for", "مناسب لـ") + "</small>" + use.split(/[–\-,،+]/).map(function (u) { u = u.trim(); return u ? "<span>" + esc(u) + "</span>" : ""; }).join("") + "</div>" : "");

    // band
    document.getElementById("lxBandImg").src = p.img;
    document.getElementById("lxBandCopy").innerHTML =
      "<small>" + esc(brand) + "</small><h3>" + L("A luxury scent<br><em>for everyday elegance</em>", "عطر فاخر<br><em>لأناقة كل يوم</em>") + "</h3>";

    renderReviews(p, rating, reviewsCount);
    renderBundle();
    if (isNew) restartReveals();
  }

  function genderOf(p) {
    var t = productText(p) + " " + (p.section || "") + " " + (p.gender || "");
    if (/unisex|يونيسكس|للجنسين/.test(t)) return L("Unisex", "رجالي / نسائي");
    if (/women|her\b|for her|نسائي|حريمي|أنثوي|انثوي/.test(t)) return L("Women", "نسائي");
    if (/\bmen\b|homme|for him|رجالي/.test(t)) return L("Men", "رجالي");
    return L("Unisex", "رجالي / نسائي");
  }

  function hash(s) { var h = 0; s = String(s || ""); for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

  function splitWords(el, text) {
    if (reduceMotion) { el.textContent = text; return; }
    el.innerHTML = String(text).split(/\s+/).map(function (w, i) {
      return '<span class="lx-w"><span style="--i:' + i + '">' + esc(w) + "</span></span>";
    }).join(" ");
  }

  function renderReviews(p, rating, count) {
    var fn = g("getReviewsForProduct");
    var reviews = typeof fn === "function" ? (fn(p.name) || []) : [];
    var dist = rating >= 4.8 ? [88, 9, 2, 1, 0] : [74, 18, 5, 2, 1];
    document.getElementById("lxReviews").innerHTML =
      '<div class="lx-rev-summary"><header class="lx-h"><h2>' + L("Customer Reviews", "آراء العملاء") + "</h2></header>" +
      '<div class="lx-rev-score"><b>' + rating.toFixed(1) + "</b><span>/ 5</span></div>" +
      '<span class="lx-stars lg" style="--r:' + (rating / 5) * 100 + '%"></span><small>(' + count.toLocaleString("en-US") + " " + L("reviews", "تقييم") + ")</small>" +
      '<ul class="lx-bars">' + dist.map(function (v, i) {
        return "<li><span>" + (5 - i) + ' ★</span><i><em style="--w:' + v + '%"></em></i><span>' + v + "%</span></li>";
      }).join("") + "</ul></div>" +
      '<div class="lx-rev-list">' + (reviews.length ? reviews.slice(0, 3) : [{ author: "OVA", text: L("Be the first to share your impression.", "كن أول من يشارك رأيه.") }]).map(function (r, i) {
        var initial = String(r.author || "O").trim().charAt(0).toUpperCase();
        return '<article class="lx-rev" style="--i:' + i + '"><header><span class="lx-avatar">' + esc(initial) + "</span><div><b>" + esc(r.author) + '</b><span class="lx-stars sm" style="--r:100%"></span></div></header><p>' + esc(r.text) + "</p>" + (r.tag ? "<small>" + esc(r.tag) + "</small>" : "") + "</article>";
      }).join("") + "</div>";
  }

  /* ---------------- bundle ---------------- */
  function renderBundle() {
    var el = document.getElementById("lxBundle");
    if (!el) return;
    var cp = g("currentProduct");
    var units = bundleUnits();
    var shown = units.slice(0, 3);
    var n = Math.min(units.length, 3);
    var before = shown.reduce(function (s, u) { return s + (Number(u.price) || 0); }, 0);
    var currentInCart = cp && units.some(function (u) { return u.name === cp.name; });
    var prevCount = Number(el.getAttribute("data-count") || -1);

    var slots = "";
    for (var i = 0; i < 3; i++) {
      var u = shown[i];
      if (u) {
        slots += '<div class="lx-slot is-filled' + (i === n - 1 && n > prevCount && prevCount >= 0 ? " is-new" : "") + '" style="--i:' + i + '"><button type="button" class="lx-slot-x" data-remove="' + esc(u.name) + '" aria-label="Remove">' + ICON.x + '</button><img src="' + esc(u.img) + '" alt=""><span>' + esc(u.name) + "</span><em>" + money(u.price) + "</em></div>";
      } else if (i === n && cp && !currentInCart) {
        slots += '<button type="button" class="lx-slot is-ghost" data-add-current style="--i:' + i + '"><img src="' + esc(cp.img) + '" alt=""><span>' + esc(cp.name) + '</span><em class="lx-slot-cta">' + ICON.plus + L("Add this", "أضف هذا العطر") + "</em></button>";
      } else {
        slots += '<button type="button" class="lx-slot is-empty" data-open-sheet style="--i:' + i + '"><span class="lx-plus">' + ICON.plus + "</span><span>" + L(["Add first", "Add second", "Add third"][i] + " perfume", ["أضف العطر الأول", "أضف العطر الثاني", "أضف العطر الثالث"][i]) + "</span></button>";
      }
    }

    var unlocked = units.length >= 3;
    var after = unlocked ? Math.round(before * 0.5) : before;
    var msg = unlocked
      ? L("Offer unlocked — 50% off applied in your cart", "تم تفعيل العرض — خصم 50% مطبق على سلتك")
      : L((3 - n) + " more to unlock 50% off", "أضف " + (3 - n) + " " + (3 - n === 1 ? "عطر" : "عطور") + " للحصول على الخصم");

    el.classList.toggle("is-unlocked", unlocked);
    el.setAttribute("data-count", String(n));
    el.innerHTML =
      '<div class="lx-bundle-bg" aria-hidden="true">' + (cp ? '<img src="' + esc(cp.img2 || cp.img) + '" alt="">' : "") + "</div>" +
      '<div class="lx-bundle-copy">' +
      '  <span class="lx-pill">' + L("Exclusive offer", "عرض حصري") + "</span>" +
      "  <h2>" + L("Buy 3 perfumes,<br><em>get 50% off</em>", "اشترِ 3 عطور<br><em>واحصل على خصم 50%</em>") + "</h2>" +
      '  <p class="lx-caps">Buy 3 · Get 50% off</p>' +
      "</div>" +
      '<div class="lx-bundle-build">' +
      '  <div class="lx-bundle-top"><small>' + L("Pick 3 perfumes to unlock the discount", "اختر 3 عطور للحصول على الخصم") + '</small><div class="lx-progress"><b>' + n + ' <i>/ 3</i></b><span class="lx-track"><em style="--p:' + (n / 3) * 100 + '%"></em></span><small>' + msg + "</small></div></div>" +
      '  <div class="lx-slots">' + slots + "</div>" +
      '  <div class="lx-bundle-total">' +
      '    <div><small>' + L("Before discount", "السعر قبل الخصم") + "</small><s>" + money(before) + "</s></div>" +
      '    <div class="lx-final"><small>' + L("After discount", "السعر بعد الخصم") + "</small><b>" + money(after) + "</b></div>" +
      '    <span class="lx-badge">' + ICON.crown + L("50% off", "خصم 50%") + "</span>" +
      "  </div>" +
      "</div>";

    if (unlocked && prevCount >= 0 && prevCount < 3) celebrate(el);
  }

  function celebrate(el) {
    if (reduceMotion) return;
    var burst = document.createElement("div");
    burst.className = "lx-burst";
    for (var i = 0; i < 26; i++) {
      var s = document.createElement("i");
      var a = (i / 26) * Math.PI * 2;
      var d = 90 + Math.random() * 120;
      s.style.setProperty("--x", Math.cos(a) * d + "px");
      s.style.setProperty("--y", Math.sin(a) * d + "px");
      s.style.animationDelay = Math.random() * 0.12 + "s";
      burst.appendChild(s);
    }
    var target = el.querySelector(".lx-final") || el;
    target.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 1400);
  }

  /* image arcs from its source into the next bundle slot */
  function flyToSlot(src) {
    if (reduceMotion || !src || !src.getBoundingClientRect) return;
    var target = document.querySelector("#lxBundle .lx-slot.is-empty, #lxBundle .lx-slot.is-ghost");
    if (!target) return;
    var a = src.getBoundingClientRect(), b = target.getBoundingClientRect();
    if (!a.width || b.bottom < 0 || b.top > innerHeight) return;
    var f = document.createElement("img");
    f.src = src.currentSrc || src.src;
    f.className = "lx-fly";
    f.style.cssText = "left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height + "px";
    document.body.appendChild(f);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    var s = Math.max(0.2, Math.min(1, b.width * 0.6 / a.width));
    f.animate([
      { transform: "translate(0,0) rotateY(0) scale(1)", opacity: 1 },
      { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 - 120) + "px) rotateY(180deg) scale(" + (s + 0.25) + ")", opacity: 1, offset: 0.55 },
      { transform: "translate(" + dx + "px," + dy + "px) rotateY(360deg) scale(" + s + ")", opacity: 0.2 }
    ], { duration: 900, easing: "cubic-bezier(.6,.05,.25,1)" }).onfinish = function () { f.remove(); };
  }

  /* ---------------- picker sheet ---------------- */
  var poolCache = null;
  function pool() {
    if (poolCache) return poolCache;
    var fn = g("getAllHomepageProductPools");
    var list = typeof fn === "function" ? fn() : [];
    var seen = {};
    poolCache = list.filter(function (p) {
      if (!p || !p.name || !p.img || !p.price || excluded(p.name)) return false;
      var k = p.name.toLowerCase().trim();
      if (seen[k]) return false;
      seen[k] = 1;
      return true;
    });
    return poolCache;
  }
  function findProduct(name) {
    var fn = g("getProductByName");
    return (typeof fn === "function" && fn(name)) || pool().filter(function (p) { return p.name === name; })[0];
  }
  function renderSheet(q) {
    var cp = g("currentProduct");
    q = String(q || "").toLowerCase().trim();
    var list = pool().filter(function (p) { return !q || p.name.toLowerCase().indexOf(q) !== -1; });
    if (!q && cp) {
      var types = cp.filterTypes || [];
      list.sort(function (a, b) {
        var sa = (a.filterTypes || []).filter(function (t) { return types.indexOf(t) !== -1; }).length;
        var sb = (b.filterTypes || []).filter(function (t) { return types.indexOf(t) !== -1; }).length;
        return sb - sa;
      });
    }
    document.getElementById("lxSheetGrid").innerHTML = list.slice(0, 60).map(function (p, i) {
      return '<button type="button" class="lx-pick" data-pick="' + esc(p.name) + '" style="--i:' + Math.min(i, 12) + '"><span class="lx-pick-img"><img src="' + esc(p.img) + '" alt="" loading="lazy" decoding="async"></span><b>' + esc(p.name) + "</b><em>" + money(p.price) + '</em><span class="lx-pick-add">' + ICON.plus + "</span></button>";
    }).join("") || '<p class="lx-empty">' + L("No perfumes found", "لا توجد نتائج") + "</p>";
  }
  function openSheet() {
    var s = document.getElementById("lxSheet");
    document.getElementById("lxSheetKicker").textContent = L("Buy 3 · Get 50% off", "اشترِ 3 · خصم 50%");
    document.getElementById("lxSheetTitle").textContent = L("Complete your trio", "كمّل الثلاثية بتاعتك");
    var input = document.getElementById("lxSheetSearch");
    input.placeholder = L("Search perfumes…", "ابحث عن عطر…");
    input.value = "";
    renderSheet("");
    s.classList.add("is-open");
    s.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lx-lock");
  }
  function closeSheet() {
    var s = document.getElementById("lxSheet");
    if (!s || !s.classList.contains("is-open")) return;
    s.classList.remove("is-open");
    s.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("lx-lock");
  }

  /* ---------------- wishlist ---------------- */
  function wishList() { try { return JSON.parse(localStorage.getItem("ovaWishlist") || "[]"); } catch (e) { return []; } }
  function syncWish() {
    var cp = g("currentProduct"), w = document.getElementById("lxWish");
    if (w && cp) w.classList.toggle("is-on", wishList().indexOf(cp.name) !== -1);
  }
  function toggleWish() {
    var cp = g("currentProduct");
    if (!cp) return;
    var list = wishList(), i = list.indexOf(cp.name);
    if (i === -1) list.push(cp.name); else list.splice(i, 1);
    try { localStorage.setItem("ovaWishlist", JSON.stringify(list)); } catch (e) {}
    syncWish();
    var w = document.getElementById("lxWish");
    if (w && w.animate && !reduceMotion) w.animate([{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], { duration: 380, easing: "ease-out" });
  }

  function openLightbox() {
    var img = document.getElementById("modalImg"), lb = document.getElementById("lxLightbox");
    if (!img || !lb) return;
    lb.querySelector("img").src = img.currentSrc || img.src;
    lb.classList.add("is-open");
  }

  /* ---------------- motion ---------------- */
  var io;
  function setupReveals() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".lx-reveal").forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  }
  function restartReveals() {
    var hero = page && page.querySelector(".product-detail-hero");
    if (hero) { hero.classList.remove("is-in"); void hero.offsetWidth; hero.classList.add("is-in"); }
    if (!io) return;
    page.querySelectorAll(".lx-reveal, .product-detail-block, .product-related").forEach(function (e) {
      e.classList.add("lx-reveal");
      e.classList.remove("is-in");
      io.observe(e);
    });
  }
  function setupParallax() {
    if (reduceMotion) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking || !document.body.classList.contains("product-page-mode")) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var band = document.getElementById("lxBand");
        if (band) {
          var r = band.getBoundingClientRect();
          var prog = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
          band.style.setProperty("--py", (prog * -60).toFixed(1) + "px");
        }
        var hero = document.getElementById("modalImg");
        if (hero) hero.style.setProperty("--hy", Math.min(scrollY * 0.06, 40).toFixed(1) + "px");
      });
    }, { passive: true });
  }

  /* ---------------- hook ---------------- */
  function hook() {
    var fn = g("renderProductDetailPage");
    if (typeof fn !== "function") return false;
    if (fn.__lx) return true;
    var wrapped = async function () {
      var r = await fn.apply(this, arguments);
      try { render(); } catch (e) { console.error("[ova-luxe]", e); }
      return r;
    };
    wrapped.__lx = true;
    try { window.renderProductDetailPage = wrapped; (0, eval)("renderProductDetailPage = window.renderProductDetailPage"); } catch (e) {}
    // Already rendered before we hooked?
    if (g("currentProduct") && document.body.classList.contains("product-page-mode")) render();
    return true;
  }

  // Language switch re-renders copy
  document.addEventListener("click", function (e) {
    if (e.target.closest("[onclick*='Lang'], .lang-toggle, #langToggle")) setTimeout(function () { if (g("currentProduct") && built) render(); }, 60);
  });

  // Fallback: catch renders that started before the hook (price is only written by home.js)
  function watchPrice() {
    var price = document.getElementById("modalPrice");
    if (!price || !("MutationObserver" in window)) return;
    new MutationObserver(function () {
      var cp = g("currentProduct");
      if (cp && cp.name !== lastName && document.body.classList.contains("product-page-mode")) {
        try { render(); } catch (e) { console.error("[ova-luxe]", e); }
      }
    }).observe(price, { childList: true });
  }
  watchPrice();

  (function wait(tries) {
    if (hook()) return;
    if (tries > 200) return;
    setTimeout(function () { wait(tries + 1); }, 50);
  })(0);
})();
