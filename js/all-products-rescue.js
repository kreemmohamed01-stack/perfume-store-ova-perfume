(function () {
  const bestSellerCatalogProducts = [
    { name: "Diamond Emerald Soul 200ml", price: 1050, img: "images/site-assets/ibraheem-alqurashi-emerald-soul-diamond-unisex-100ml-experience-elevated-scent-ebay.webp", img2: "images/site-assets/emerald-soul-diamond-ibrahim-al-qurashi-for-women-and-men.webp" },
    { name: "Nude Coral Diamond", price: 1200, img: "images/site-assets/nude-coral-diamond.webp", img2: "images/site-assets/nude-coral-diamond-ibrahim-al-qurashi.webp" },
    { name: "Lahab - Hersh", price: 1050, img: "images/site-assets/lahab-by-hersh-alezz-3-4oz-edp-spray-long-lasting.webp", img2: "images/site-assets/hersh-lahab-100ml-edp-by-al-ezz-for-oud.webp" },
    { name: "Khamrah Classic", price: 850, img: "images/site-assets/lattafa-khamrah.webp", img2: "images/site-assets/khamrah-lattafa-perfumes.webp" },
    { name: "Eclaire", price: 850, img: "images/site-assets/eclaire-by-lattafa-perfumes.webp", img2: "images/site-assets/lattafa-eclaire.webp" },
    { name: "Qissa Imperial Valley 200ml", price: 850, img: "images/site-assets/gissah-imperial-valley-perfume-premium-edp-200ml-pewangi-arab.webp", img2: "images/site-assets/imp-valley.webp" },
    { name: "Imagination", price: 850, img: "images/site-assets/products-by-louis-vuitton-imagination.webp", img2: "images/site-assets/imagination-notes.webp" },
    { name: "Tom Ford Tobacco Vanille", price: 850, img: "images/site-assets/tom-ford-private-blend-tobacco-vanille-eau-de-parfum-spray-nordstrom.webp", img2: "images/site-assets/tom-ford-tobacco-vanille-2.webp" },
    { name: "Spicebomb Extreme", price: 850, img: "images/site-assets/spicebomb-extreme-eau-de-parfum-90-ml.webp", img2: "images/site-assets/viktor-rolf-spicebomb-extreme-eau-de-parfum-woody-spicy-cologne-for-men-with-notes-of-amber-vanilla-3-fl-oz.webp" },
    { name: "Baccarat Rouge Master Box Original", price: 850, img: "images/site-assets/amazon-com-fragrance-world-barakkat-rouge-540.webp", img2: "images/site-assets/maison-francis-kurkdjian-baccarat-rouge-540-extrait-de-parfum.webp" },
    { name: "Burberry Her Box", price: 850, img: "images/site-assets/burberry-her-eau-de-parfum-edp-3-3-oz-in-box-sealed.webp", img2: "images/site-assets/ori-burb-erry-her-edp-for-girls-100ml-long-lasting-8-10-hours.webp" },
    { name: "Si Red (Armani Si)", price: 850, img: "images/site-assets/si-passione-eau-de-parfum.webp", img2: "images/site-assets/giorgio-armani-si-passione.webp" },
    { name: "Gucci Bloom", price: 850, img: "images/site-assets/gucci-gucci-bloom-edp-100ml.webp", img2: "images/site-assets/gucci-bloom-eau-de-toilette.webp" },
    { name: "Valentino Uomo Born In Roma Intense", price: 850, img: "images/best-seller/valentino-uomo-born-in-roma-intense.webp", img2: "images/site-assets/valentino-uomo-born-in-roma-extradose-for-men.webp" },
    { name: "Prada Paradoxe Intense", price: 850, img: "images/best-seller/prada-paradoxe-intense-eau-de-parfum-spray-3-oz.webp", img2: "images/site-assets/prada-paradoxe-prada.webp" },
    { name: "Stronger With You Intensely", price: 850, img: "images/men/you-int.jpeg", img2: "images/site-assets/emporio-armani-stronger-with-you-intensely-giorgio.webp" },
    { name: "Jean Paul Gaultier Le Male Le Parfum", price: 850, img: "images/men/le-male-eau-de-parfum-intense-200-ml.webp", img2: "images/site-assets/le-male-le-parfum-notes.webp" },
    { name: "Sauvage", price: 850, img: "images/site-assets/sauvage-eau-de-parfum.webp", img2: "images/site-assets/sauvage-notes.webp" },
    { name: "Bleu de Chanel Eau de Parfum", price: 850, img: "images/best-seller/bleu-de-chanel-eau-de-parfum-spray-3-4-oz.webp", img2: "images/site-assets/chanel-bleu-de-chanel-eau-de-parfum.webp" },
    { name: "Le Male Elixir", price: 850, img: "images/men/la-male-elixir.webp", img2: "images/site-assets/le-male-elixir-notes.webp" },
    { name: "Khamrah Qahwa", price: 850, img: "images/site-assets/lattafa-khamrah-qahwa-eau-de-parfum-100ml.webp", img2: "images/site-assets/lattafa-khamrah-qahwa-notes-breakdown.webp" },
    { name: "Assaf Angel 200ml", price: 1200, img: "images/site-assets/assaf-angel-main.webp", img2: "images/site-assets/assaf-angel-alt.webp" },
    { name: "Assaf Pink Lady 200ml", price: 1200, img: "images/site-assets/assaf-pink-lady-main.jpg", img2: "images/site-assets/assaf-pink-lady-alt.webp" },
    { name: "Diamond Pink Score 200ml", price: 1050, img: "images/site-assets/diamond-pink-score-main.webp", img2: "images/site-assets/diamond-pink-score-alt.webp" }
  ];

  const featuredBrandKeys = ["dior", "armani", "lattafa", "kayali", "jeanpaulgaultier", "tomford", "xerjoff", "rarescents"];

  const standaloneSectionProducts = [
    { name: "Wild Cold 200ml", price: 1050, img: "images/site-assets/wild-cold.webp", img2: "images/site-assets/wild-colt-alt-2.webp" },
    { name: "Assaf Angel 200ml", price: 1200, img: "images/site-assets/assaf-angel-main.webp", img2: "images/site-assets/assaf-angel-alt.webp" },
    { name: "Assaf Pink Lady 200ml", price: 1200, img: "images/site-assets/assaf-pink-lady-main.jpg", img2: "images/site-assets/assaf-pink-lady-alt.webp" },
    { name: "Diamond Pink Score 200ml", price: 1050, img: "images/site-assets/diamond-pink-score-main.webp", img2: "images/site-assets/diamond-pink-score-alt.webp" },
    { name: "One & Only 200ml", price: 850, img: "images/site-assets/one-and-only-main-2.webp", img2: "images/site-assets/one-and-only-notes-2.webp" },
    { name: "La Luna 200ml", price: 850, img: "images/site-assets/la-luna-main-2.webp", img2: "images/site-assets/la-luna-notes-2.webp" },
    { name: "Issey Miyake", price: 850, img: "images/site-assets/issey-miyake-main-2.webp", img2: "images/site-assets/issey-miyake-notes-2.webp" },
    { name: "Spanish Tobacco", price: 850, img: "images/site-assets/spanish-tobacco-main-2.webp", img2: "images/site-assets/spanish-tobacco-main-2.webp" },
    { name: "Arabian Tobacco", price: 850, img: "images/site-assets/arabian-tobacco-alt-2.webp", img2: "images/site-assets/arabian-tobacco-alt-2.webp" },
    { name: "Khamrah 40ml", price: 850, img: "images/site-assets/khamrah-40ml-main-2.webp", img2: "images/site-assets/khamrah-40ml-notes-2.webp" },
    { name: "Acqua di Gi\u00f2 Eau de Toilette", price: 850, img: "images/site-assets/acqua-di-gio-homme-eau-de-toilette-50ml.webp", img2: "images/site-assets/acqua-di-gio-homme-eau-de-toilette-50ml.webp" },
    { name: "Lattafa His Confession", price: 950, img: "images/site-assets/unleash-the-mystery-lattafa-his-confession.jpg", img2: "images/site-assets/his-confession-lattafa.webp" },
    { name: "Hugo Boss Bottled Elixir", price: 850, img: "images/site-assets/hugo-boss-bottled-elixir-white.webp", img2: "images/site-assets/hugo-boss-bottled-elixir-notes.webp" },
    { name: "Versace Eros Eau de Toilette", price: 850, img: "images/site-assets/versace-eros-eau-de-toilette-200ml.webp", img2: "images/site-assets/versace-eros-for-men-3-4-oz-eau-de-toilette-spray.webp" },
    { name: "Versace Eros Flame", price: 850, img: "images/site-assets/versace-versace-eros-flame-for-men-eau-de-parfume.webp", img2: "images/site-assets/versace-eros-flame.webp" },
    { name: "Dolce & Gabbana The One Eau de Parfum", price: 850, img: "images/site-assets/dolce-gabbana-the-one-for-eau-de-parfum-5-oz-no-color.webp", img2: "images/site-assets/s-cak-bir-karizman-n-imzas-dolce-gabbana-the-one-for-men.webp" },
    { name: "Hudson Valley Perfume", price: 850, img: "images/site-assets/hudson-valley-by-gissah-fragrances-200ml-spray-free-express-shipping-original.webp", img2: "images/site-assets/hudson.webp" },
    { name: "Baccarat Rouge 540 40ml", price: 850, img: "images/site-assets/baccarat-rouge-540-extrait-de-parfum-spray-70ml.webp", img2: "images/site-assets/baccarat-rouge-master-box-2.webp" },
    { name: "Amira Al Arab", price: 850, img: "images/site-assets/amirat-al-arab.webp", img2: "images/site-assets/amirat-al-arab.webp" },
    { name: "Laverne Sense", price: 850, img: "images/site-assets/georgina-sense-perfume-by-laverne-75ml-perfume-powder-pack-perfume-bag-ebay.webp", img2: "images/site-assets/sense-laverne.webp" },
    { name: "Carolina Herrera 212 VIP Rose", price: 850, img: "images/site-assets/carolina-herrera-212-vip-rose-eau-de-parfum-80ml.jpg", img2: "images/site-assets/basically-new-carolina-herrera-212-vip-rose-edp.webp" },
    { name: "Hugo Boss The Scent Elixir For Her", price: 850, img: "images/site-assets/hugo-boss-boss-the-scent-for-her-elixir-parfum-intense-50ml.webp", img2: "images/site-assets/boss-the-scent-elixir-for-her-hugo-boss-edp.jpg" },
    { name: "Valentino Donna Born in Roma", price: 850, img: "images/site-assets/valentino-2.webp", img2: "images/site-assets/valentino-donna-born-in-roma.webp" },
    { name: "Elie Saab Girl of Now", price: 850, img: "images/site-assets/girl-of-now-by-elie-saab.webp", img2: "images/site-assets/girl-of-now-notes.webp" },
    { name: "Paco Rabanne Olympea", price: 850, img: "images/site-assets/paco-rabanne-olympea-solar-eau-de-parfum-intense-spray.webp", img2: "images/site-assets/paco-rabanne-olympea-solar-eau-de-parfum-intense-spray.webp" },
    { name: "Victoria's Secret Bombshell", price: 850, img: "images/site-assets/victorias-secret-bombshell-white.webp", img2: "images/site-assets/victorias-secret-bombshell-notes.webp" },
    { name: "Victoria's Secret Very Sexy", price: 850, img: "images/site-assets/very-sexy-perfume.webp", img2: "images/site-assets/very-sexy-victoria-s-secret.webp" },
    { name: "Victoria's Secret Noir Tease", price: 850, img: "images/site-assets/victorias-secret-noir-tease-white.webp", img2: "images/site-assets/victorias-secret-noir-tease-notes.webp" }
  ];

  const menNames = new Set([
    "Imagination",
    "Spicebomb Extreme",
    "Valentino Uomo Born In Roma Intense",
    "Jean Paul Gaultier Le Male Le Parfum",
    "Sauvage",
    "Bleu de Chanel Eau de Parfum",
    "Le Male Elixir",
    "Dior Homme Intense",
    "Stronger With You (Original)",
    "Stronger With You Absolutely",
    "Stronger With You Intensely",
    "Stronger With You Freeze",
    "Stronger With You Tobacco",
    "Asad",
    "Asad Bourbon",
    "Asad Zanzibar",
    "Ultra Male",
    "Scandal Pour Homme",
    "Tom Ford Noir",
    "Issey Miyake",
    "Acqua di Gi\u00f2 Eau de Toilette",
    "Lattafa His Confession",
    "Hugo Boss Bottled Elixir",
    "Versace Eros Eau de Toilette",
    "Versace Eros Flame",
    "Dolce & Gabbana The One Eau de Parfum"
  ]);

  const womenNames = new Set([
    "Eclaire",
    "Burberry Her Box",
    "Si Red (Armani Si)",
    "Gucci Bloom",
    "Prada Paradoxe Intense",
    "Hudson Valley Perfume",
    "Baccarat Rouge 540 40ml",
    "Amira Al Arab",
    "Lattafa His Confession",
    "Lattafa Her Confession",
    "Berry on Top",
    "Choco Overdose",
    "Cookie Crave",
    "Vanilla Freak",
    "Mallow Madness",
    "Laverne Sense",
    "Carolina Herrera 212 VIP Rose",
    "Hugo Boss The Scent Elixir For Her",
    "Valentino Donna Born in Roma",
    "Elie Saab Girl of Now",
    "Paco Rabanne Olympea",
    "Victoria's Secret Bombshell",
    "Victoria's Secret Very Sexy",
    "Victoria's Secret Noir Tease",
    "J'adore",
    "Miss Dior Blooming Bouquet",
    "Hypnotic Poison",
    "Armani My Way Eau de Parfum",
    "Armani S\u00ec Passione Eau de Parfum",
    "Armani S\u00ec Eau de Parfum",
    "Armani S\u00ec (Original)",
    "Iman",
    "Haya",
    "Sakeena",
    "Yara",
    "Yara Candy",
    "Yara Elixir",
    "Yara Moi",
    "La Luna 200ml",
    "Vanilla Candy Rock Sugar | 42",
    "Boujee Marshmallow | 81",
    "Pistachio Gelato | 33",
    "Divine",
    "La Belle Le Parfum",
    "Scandal (Women)",
    "Scandal Absolu",
    "Scandal Le Parfum"
  ]);

  const unisexNames = new Set([
    "Diamond Emerald Soul 200ml",
    "Nude Coral Diamond",
    "Lahab - Hersh",
    "Khamrah Classic",
    "Wild Cold 200ml",
    "Assaf Angel 200ml",
    "Assaf Pink Lady 200ml",
    "Diamond Pink Score 200ml",
    "One & Only 200ml",
    "Qissa Imperial Valley 200ml",
    "Imagination",
    "Tom Ford Tobacco Vanille",
    "Baccarat Rouge Master Box Original",
    "Khamrah Qahwa",
    "Oud Ispahan",
    "Ameer Al Oud",
    "Oud Mood",
    "Khamrah Dukhan",
    "Lattafa Musamam",
    "Lattafa Musamam White",
    "Vanilla | 28",
    "Eden Juicy Apple | 01",
    "Cafe Oud | 19",
    "Oudgasm Smoky Oud | 07",
    "Vanilla Oud | 36",
    "Xerjoff Naxos",
    "Xerjoff Alexandria II",
    "Xerjoff Torino21",
    "Musk Powder",
    "Musk Al Khas",
    "Spanish Tobacco",
    "Arabian Tobacco",
    "Black Carbon",
    "Tom Ford Ombre Leather",
    "Tom Ford Black Orchid",
    "Khamrah 40ml"
  ]);

  const mostRequestedProductNames = new Set([
    "Diamond Emerald Soul 200ml",
    "Nude Coral Diamond",
    "Lahab - Hersh",
    "Stronger With You Intensely",
    "Khamrah Classic"
  ]);

  const allowedNames = new Set([
    ...bestSellerCatalogProducts.map((product) => product.name),
    ...Array.from(menNames),
    ...Array.from(womenNames),
    ...Array.from(unisexNames)
  ]);

  const state = { search: "", type: null, category: null, price: null, sort: "featured" };
  const cart = JSON.parse(localStorage.getItem("ovaCart") || "[]");
  let products = [];
  let currentProduct = null;
  let modalQty = 1;

  function uniqueByName(list) {
    const seen = new Set();
    return list.filter((product) => {
      const key = String(product && product.name || "").trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function inferCategory(name) {
    if (unisexNames.has(name)) return "unisex";
    if (womenNames.has(name) && menNames.has(name)) return "unisex";
    if (womenNames.has(name)) return "women";
    if (menNames.has(name)) return "men";
    return "unisex";
  }

  function inferCatalogType(name, price, detailText) {
    const lower = `${name || ""} ${detailText || ""}`.toLowerCase();
    if (lower.includes("vanilla") || lower.includes("opium") || lower.includes("khamra") || lower.includes("khamrah") || lower.includes("sweet") || lower.includes("caramel") || lower.includes("gourmand") || lower.includes("marshmallow") || lower.includes("chocolate") || lower.includes("candy") || lower.includes("praline") || lower.includes("tonka")) return "sweet";
    if (lower.includes("tobacco") || lower.includes("tobbaco") || lower.includes("oud") || lower.includes("night") || lower.includes("elixir") || lower.includes("roma") || lower.includes("spicy") || lower.includes("warm") || lower.includes("amber") || lower.includes("oriental") || lower.includes("incense") || lower.includes("leather") || lower.includes("smoky") || lower.includes("smoke") || lower.includes("intense") || lower.includes("intensely") || lower.includes("absolu") || lower.includes("absolutely")) return "evening";
    if (lower.includes("fresh") || lower.includes("citrus") || lower.includes("marine") || lower.includes("aqua") || lower.includes("aquatic") || lower.includes("bergamot") || lower.includes("green") || lower.includes("mint") || lower.includes("watery") || lower.includes("bleu de chanel") || lower.includes("acqua") || lower.includes("imagination") || lower.includes("issey") || lower.includes("sauvage") || lower.includes("y eau") || lower.includes("freeze") || lower.includes("sport")) return "fresh";
    if (lower.includes("musk") || lower.includes("musky") || lower.includes("powder") || lower.includes("powdery") || lower.includes("clean")) return "daily";
    if ((Number(price) || 0) <= 1000) return "daily";
    if ((Number(price) || 0) >= 1700 || lower.includes("royal") || lower.includes("velvet") || lower.includes("reserve")) return "luxury";
    return "luxury";
  }

  function mapCatalogTypeToTag(type) {
    if (type === "daily") return "musk";
    if (type === "evening") return "spicy";
    return type || "luxury";
  }

  function deriveTypeTags(product) {
    const text = `${product.name || ""} ${product.detailType || product.type || ""} ${product.detailsHtml || ""}`.toLowerCase();
    const tags = [];
    if (/vanilla|sweet|sugar|caramel|gourmand|marshmallow|chocolate/.test(text)) tags.push("sweet");
    if (/fresh|citrus|marine|aqua|bergamot|green|mint|watery/.test(text)) tags.push("fresh");
    if (/fruity|pear|tropical|apple|berry/.test(text)) tags.push("fruity");
    if (/floral|rose|jasmine|flower|peony|iris|lavender/.test(text)) tags.push("floral");
    if (/spicy|spice|amber|oriental|warm|incense/.test(text)) tags.push("spicy");
    if (/oud/.test(text)) tags.push("oud");
    if (/woody|wood|cedar|sandal|leather|smoky|smoke|tobacco|patchouli/.test(text)) tags.push("woody");
    if (/musk|musky|powder|powdery|clean/.test(text)) tags.push("musk");
    if (!tags.length) tags.push(mapCatalogTypeToTag(inferCatalogType(product.name, product.price, text)));
    return [...new Set(tags)];
  }

  function titleCase(value) {
    return String(value || "").split(/[-_\s]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  }

  function getDisplayType(product) {
    const rawType = String(product.detailType || product.type || "").trim();
    const normalizedRawType = rawType === "daily" ? "musk" : rawType === "evening" ? "spicy" : rawType;
    if (normalizedRawType && /[\/-]/.test(normalizedRawType)) return normalizedRawType;
    const fallbackTag = normalizedRawType || (product.typeTags && product.typeTags[0]) || mapCatalogTypeToTag(inferCatalogType(product.name, product.price, product.detailsHtml || ""));
    return titleCase(fallbackTag || "luxury");
  }

  function getCategoryLabel(category) {
    return category === "men" ? "Men" : category === "women" ? "Women" : "Unisex";
  }

  function getPriceMarkup(product) {
    const currentPrice = Number(product.price) || 0;
    return `<span class="product-old-price">${currentPrice + 250} EGP</span><span class="product-current-price">${currentPrice} EGP</span>`;
  }

  function buildFallbackSource() {
    const brandProducts = featuredBrandKeys.flatMap((brandKey) => {
      const brand = (window.ovaBrandCatalog || {})[brandKey];
      return (brand && brand.products || []).filter((product) => allowedNames.has(product.name));
    });
    return uniqueByName([
      ...bestSellerCatalogProducts,
      ...standaloneSectionProducts,
      ...brandProducts
    ]).filter((product) => allowedNames.has(product.name));
  }

  function buildProducts() {
    const existingProducts = typeof allProducts !== "undefined" && Array.isArray(allProducts) ? allProducts : [];
    const sourceProducts = existingProducts.length ? existingProducts.filter((product) => allowedNames.has(product.name)) : buildFallbackSource();
    const fallbackLookup = new Map(buildFallbackSource().map((product) => [product.name, product]));

    products = uniqueByName(sourceProducts.map((product) => {
      const fallback = fallbackLookup.get(product.name) || {};
      const merged = {
        ...fallback,
        ...product
      };
      const normalizedType = merged.type === "daily" ? "musk" : merged.type === "evening" ? "spicy" : merged.type;
      const typeTags = Array.isArray(merged.filterTypes) && merged.filterTypes.length ? merged.filterTypes : deriveTypeTags(merged);
      return {
        ...merged,
        catalogCategory: inferCategory(merged.name),
        typeTags,
        type: normalizedType || typeTags[0] || mapCatalogTypeToTag(inferCatalogType(merged.name, merged.price, `${merged.detailType || ""} ${merged.detailsHtml || ""}`)),
        rating: merged.rating || "4.8",
        stock: merged.stock || 18
      };
    })).filter((product) => allowedNames.has(product.name));
  }

  function renderFilters() {
    const typeFilters = document.getElementById("typeFilters");
    const categoryFilters = document.getElementById("categoryFilters");
    const priceFilters = document.getElementById("priceFilters");
    const types = [...new Set(products.flatMap((product) => product.typeTags || []))];
    const categories = [...new Set(products.map((product) => product.catalogCategory))];
    const priceRanges = [
      { key: null, label: "All Prices" },
      { key: "under-1000", label: "Under 1000" },
      { key: "1000-1500", label: "1000 - 1500" },
      { key: "1500-plus", label: "Over 1500" }
    ];

    if (typeFilters) {
      typeFilters.innerHTML = "";
      [{ key: null, label: "All Types" }].concat(types.map((type) => ({ key: type, label: titleCase(type) }))).forEach((item) => {
        const button = document.createElement("button");
        button.className = "filter-tab" + (((!state.type && item.key === null) || state.type === item.key) ? " active" : "");
        button.textContent = item.label;
        button.onclick = function () {
          state.type = item.key;
          renderPage();
        };
        typeFilters.appendChild(button);
      });
    }

    if (categoryFilters) {
      categoryFilters.innerHTML = "";
      [{ key: null, label: "All Categories" }].concat(categories.map((category) => ({ key: category, label: getCategoryLabel(category) }))).forEach((item) => {
        const button = document.createElement("button");
        button.className = "filter-tab" + (((!state.category && item.key === null) || state.category === item.key) ? " active" : "");
        button.textContent = item.label;
        button.onclick = function () {
          state.category = item.key;
          renderPage();
        };
        categoryFilters.appendChild(button);
      });
    }

    if (priceFilters) {
      priceFilters.innerHTML = "";
      priceRanges.forEach((item) => {
        const button = document.createElement("button");
        button.className = "filter-tab" + (((!state.price && item.key === null) || state.price === item.key) ? " active" : "");
        button.textContent = item.label;
        button.onclick = function () {
          state.price = item.key;
          renderPage();
        };
        priceFilters.appendChild(button);
      });
    }
  }

  function getFilteredProducts() {
    let list = products.filter((product) => {
      const text = `${product.name || ""} ${product.detailType || ""} ${product.detailsHtml || ""} ${(product.typeTags || []).join(" ")}`.toLowerCase();
      if (state.search && !text.includes(state.search.toLowerCase())) return false;
      if (state.type && !(product.typeTags || []).includes(state.type)) return false;
      if (state.category && product.catalogCategory !== state.category) return false;
      if (state.price === "under-1000" && Number(product.price) >= 1000) return false;
      if (state.price === "1000-1500" && (Number(product.price) < 1000 || Number(product.price) > 1500)) return false;
      if (state.price === "1500-plus" && Number(product.price) <= 1500) return false;
      return true;
    });

    if (state.sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "rating") list.sort((a, b) => Number(b.rating) - Number(a.rating));

    return list;
  }

  function getProductByName(name) {
    return products.find((product) => product.name === name) || null;
  }

  function openProductPage(product) {
    if (!product || !product.name) return;
    try {
      sessionStorage.setItem("ovaSelectedProduct", JSON.stringify(product));
    } catch (error) {}
    const productSlug = String(product.slug || "")
      .trim()
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 120);
    window.location.href = `index.html?product_slug=${encodeURIComponent(productSlug || product.name)}`;
  }

  function renderPage() {
    const grid = document.getElementById("allProductsGrid");
    const emptyState = document.getElementById("emptyState");
    const searchInput = document.getElementById("productSearch");
    const sortSelect = document.getElementById("sortSelect");
    if (!grid) return;

    if (searchInput) state.search = searchInput.value.trim();
    if (sortSelect) state.sort = sortSelect.value;

    renderFilters();
    const filtered = getFilteredProducts();
    grid.innerHTML = "";

    if (!filtered.length) {
      emptyState.style.display = "block";
      emptyState.innerHTML = "<strong>No Products Found</strong><span>Try another search or filter.</span>";
      return;
    }

    emptyState.style.display = "none";

    filtered.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        ${mostRequestedProductNames.has(product.name) ? '<div class="product-highlight-badge">&#1575;&#1604;&#1571;&#1603;&#1579;&#1585; &#1591;&#1604;&#1576;&#1575;</div>' : ""}
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="product-price">${getPriceMarkup(product)}</p>
        <div class="product-type">${getDisplayType(product)}</div>
        <div class="product-stats"><span>${getCategoryLabel(product.catalogCategory)}</span></div>
        <div class="product-card-actions">
          <button class="product-more-btn">View Details</button>
          <button>Add to Cart</button>
        </div>
      `;
      const image = card.querySelector("img");
      const moreButton = card.querySelector(".product-more-btn");
      const addButton = card.querySelector(".product-card-actions button:last-child");
      image.onclick = function () { window.openModal(product.name); };
      moreButton.onclick = function () { window.openModal(product.name); };
      addButton.onclick = function () { window.quickAdd(product.name, image); };
      grid.appendChild(card);
    });

    if (typeof window.refreshOvaScrollReveal === "function") {
      window.refreshOvaScrollReveal();
    }
  }

  function renderCart() {
    const badge = document.getElementById("cartCountBadge");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    if (!badge || !cartItems || !cartTotal) return;

    badge.innerText = cart.reduce((sum, item) => sum + item.qty, 0);
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `<img src="${item.img}" alt="${item.name}"><div class="cart-item-details"><h4>${item.name}</h4><p>${item.price} EGP</p><p>Qty: ${item.qty}</p><p>Subtotal: ${item.price * item.qty} EGP</p><button onclick="changeCartQty(${index}, -1)">-</button><button onclick="changeCartQty(${index}, 1)">+</button></div>`;
      cartItems.appendChild(row);
    });

    cartTotal.innerText = `Total: ${total} EGP`;
    localStorage.setItem("ovaCart", JSON.stringify(cart));
  }

  window.toggleCart = function () {
    const cartElement = document.getElementById("cart");
    if (!cartElement) return;
    cartElement.style.right = cartElement.style.right === "0px" ? "-100%" : "0px";
  };

  window.changeCartQty = function (index, direction) {
    if (!cart[index]) return;
    cart[index].qty += direction;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
  };

  window.quickAdd = function (name) {
    const product = getProductByName(name);
    if (!product) return;
    const existing = cart.find((item) => item.name === product.name);
    if (existing) existing.qty += 1;
    else cart.push({ name: product.name, price: product.price, img: product.img, qty: 1 });
    renderCart();
  };

  window.openModal = function (name) {
    currentProduct = getProductByName(name);
    if (!currentProduct) return;
    openProductPage({
      ...currentProduct,
      section: "all"
    });
  };

  window.closeModal = function () {
    const modal = document.getElementById("productModal");
    if (modal) modal.style.display = "none";
  };

  window.changeQty = function (direction) {
    modalQty = Math.max(1, modalQty + direction);
    const qty = document.getElementById("modalQty");
    if (qty) qty.innerText = modalQty;
  };

  window.modalAddToCart = function () {
    if (!currentProduct) return;
    const existing = cart.find((item) => item.name === currentProduct.name);
    if (existing) existing.qty += modalQty;
    else cart.push({ name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, qty: modalQty });
    renderCart();
    window.closeModal();
  };

  window.checkout = function () {
    localStorage.setItem("ovaCart", JSON.stringify(cart));
    window.location.href = "checkout.html";
  };

  function bindInputs() {
    const searchInput = document.getElementById("productSearch");
    const sortSelect = document.getElementById("sortSelect");
    if (searchInput && !searchInput.dataset.rescueBound) {
      searchInput.dataset.rescueBound = "true";
      searchInput.addEventListener("input", renderPage);
    }
    if (sortSelect && !sortSelect.dataset.rescueBound) {
      sortSelect.dataset.rescueBound = "true";
      sortSelect.addEventListener("change", renderPage);
    }
  }

  function bootRescue() {
    const grid = document.getElementById("allProductsGrid");
    if (!grid) return;
    buildProducts();
    if (!products.length) return;
    bindInputs();
    renderCart();
    renderPage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(bootRescue, 120);
    });
  } else {
    setTimeout(bootRescue, 120);
  }
})();
