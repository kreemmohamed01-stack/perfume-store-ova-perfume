(function () {
  if (window.__ovaAssistantV2Loaded) return;
  window.__ovaAssistantV2Loaded = true;

  const ALIASES = [
    ["بلو دي شانيل", "bleu de chanel"], ["بلو شانيل", "bleu de chanel"], ["بلودي شانيل", "bleu de chanel"],
    ["سوفاج", "sauvage"], ["ديور سوفاج", "dior sauvage"], ["ديور هوم", "dior homme"], ["جادور", "jadore"],
    ["توم فورد", "tom ford"], ["شانيل", "chanel"], ["تشانيل", "chanel"], ["فيرساتشي", "versace"], ["فرساتشي", "versace"],
    ["ايروس", "eros"], ["ايروس فليم", "eros flame"], ["فالنتينو", "valentino"], ["ارماني", "armani"], ["غوتشي", "gucci"],
    ["برادا", "prada"], ["لاتافا", "lattafa"], ["لطافه", "lattafa"], ["كايالي", "kayali"], ["كيالي", "kayali"],
    ["جان بول جوتييه", "jean paul gaultier"], ["جي بي جي", "jean paul gaultier"], ["لي ميل", "le male"], ["لومال", "le male"],
    ["الترا ميل", "ultra male"], ["سكاندل", "scandal"], ["اسد", "asad"], ["أسد", "asad"], ["اسد بوربون", "asad bourbon"],
    ["عود مود", "oud mood"], ["امير العود", "ameer al oud"], ["أمير العود", "ameer al oud"], ["خمرة", "khamrah"], ["خمره", "khamrah"],
    ["خمرة قهوة", "khamrah qahwa"], ["خمره قهوه", "khamrah qahwa"], ["قهوة", "qahwa"], ["قهوه", "qahwa"],
    ["إكلير", "eclaire"], ["اكلير", "eclaire"], ["اكلاير", "eclaire"], ["اماجينيشن", "imagination"], ["ايمجينيشن", "imagination"],
    ["توباكو فانيلا", "tobacco vanille"], ["توباكو فانيليه", "tobacco vanille"], ["سبايس بومب", "spicebomb"], ["سبايسبومب", "spicebomb"],
    ["باكارات", "baccarat"], ["بكارات", "baccarat"], ["بربري هير", "burberry her"], ["ارماني سي", "armani si"], ["سي ريد", "si red"],
    ["برادا بارادوكس", "prada paradoxe"], ["سترونجر ويذ يو", "stronger with you"], ["سترونجر وذ يو", "stronger with you"],
    ["في اي بي روز", "vip rose"], ["بومبشيل", "bombshell"], ["بومب شيل", "bombshell"], ["ذي ون", "the one"],
    ["لا لونا", "la luna"], ["ون اند اونلي", "one only"], ["وان اند اونلي", "one only"], ["ايسي مياكي", "issey miyake"],
    ["اكوا دي جيو", "acqua di gio"], ["هوجو بوس", "hugo boss"], ["فيكتوريا سيكريت", "victoria secret"],
    ["لويس فيتون", "louis vuitton"], ["جيفنشي", "givenchy"], ["زيرجوف", "xerjoff"], ["غيساه", "gissah"], ["ابراهيم القرشي", "ibraheem al qurashi"]
  ];

  const TAG_RULES = [
    { key: "sweet", words: ["sweet", "سويت", "حلو", "سكري", "sugar"] },
    { key: "vanilla", words: ["vanilla", "فانيليا"] },
    { key: "caramel", words: ["caramel", "كراميل"] },
    { key: "gourmand", words: ["gourmand", "جورماند", "حلويات"] },
    { key: "fresh", words: ["fresh", "فريش", "منعش"] },
    { key: "citrus", words: ["citrus", "حمضيات", "ليمون", "bergamot", "برجموت"] },
    { key: "woody", words: ["woody", "خشبي", "خشب"] },
    { key: "oud", words: ["oud", "عود"] },
    { key: "spicy", words: ["spicy", "سبايسي", "توابل", "قرفة", "pepper"] },
    { key: "floral", words: ["floral", "زهري", "زهور", "ورد"] },
    { key: "fruity", words: ["fruity", "فاكهي", "فواكه", "pear", "berry"] },
    { key: "musk", words: ["musk", "مسك", "clean", "نظيف", "نضيف", "powder", "powdery"] },
    { key: "amber", words: ["amber", "عنبر"] },
    { key: "tobacco", words: ["tobacco", "تبغ", "smoky", "دخان", "سموكي"] },
    { key: "coffee", words: ["coffee", "قهوة", "قهوه"] },
    { key: "men", words: ["men", "male", "رجالي"] },
    { key: "women", words: ["women", "female", "حريمي", "نسائي"] },
    { key: "unisex", words: ["unisex", "يونيسكس", "للجنسين"] },
    { key: "summer", words: ["summer", "صيف", "صيفي", "حر"] },
    { key: "winter", words: ["winter", "شتا", "شتوي", "برد"] },
    { key: "office", words: ["office", "work", "شغل", "جامعة", "daily", "يومي"] },
    { key: "night", words: ["night", "evening", "سهرة", "سهر", "ليل"] },
    { key: "date", words: ["date", "ديت", "romantic", "موعد"] },
    { key: "gift", words: ["gift", "هدية", "هديه"] },
    { key: "luxury", words: ["luxury", "فاخر", "فخم", "niche", "هاي كلاس"] },
    { key: "strong", words: ["strong", "قوي", "تقيل", "ثقيل", "وحش", "beast"] }
  ];

  const NAME_ALIASES = {
    "bleu de chanel eau de parfum": ["blue de chanel", "بلو دي شانيل"],
    "sauvage": ["dior sauvage", "سوفاج", "ديور سوفاج"],
    "jean paul gaultier le male le parfum": ["le male parfum", "لي ميل بارفيوم"],
    "le male elixir": ["لي ميل اليكسير", "لومال اليكسير"],
    "stronger with you intensely": ["سترونجر ويذ يو", "stronger with you"],
    "tom ford tobacco vanille": ["توباكو فانيلا", "tobacco vanille"],
    "spicebomb extreme": ["سبايس بومب اكستريم", "spicebomb"],
    "khamrah classic": ["خمرة", "khamrah"],
    "khamrah qahwa": ["خمرة قهوة", "khamrah coffee"],
    "prada paradoxe intense": ["برادا بارادوكس", "prada paradoxe"],
    "valentino uomo born in roma intense": ["بورن ان روما", "born in roma"],
    "gucci bloom": ["غوتشي بلوم"],
    "eclaire": ["إكلير", "اكلير"],
    "imagination": ["اماجينيشن", "ايمجينيشن"],
    "versace eros eau de toilette": ["فيرساتشي ايروس", "versace eros"],
    "versace eros flame": ["ايروس فليم", "eros flame"],
    "la belle le parfum": ["لا بيل", "la belle"],
    "ultra male": ["الترا ميل", "ultra male"],
    "scandal absolu": ["سكاندل ابسولو"],
    "victoria's secret bombshell": ["بومبشيل", "bombshell"],
    "the one eau de parfum": ["ذي ون", "the one"]
  };

  const STOP = new Set(["eau", "de", "parfum", "perfume", "spray", "for", "the", "pour", "homme", "femme", "box", "edition", "special", "classic", "original", "ml"]);
  const QUERY_STOP = new Set([
    "عايز", "عاوزه", "عاوز", "محتاج", "ابغى", "ابي", "عايزه", "ممكن", "لو", "في", "على", "عن", "من", "مع", "او", "ولا", "ايه", "اي", "ايه", "ايش",
    "قولي", "قولي", "احكيلي", "احكيلی", "عرفني", "وريني", "هاتلي", "رشحلي", "رشح", "ساعدني", "اختارلي", "ينفع", "مناسب", "برفان", "عطر", "حاجه",
    "حاجة", "واحد", "واحده", "شي", "شيء", "كذا", "ده", "دي", "دا", "دول", "ال", "اللي", "لل", "الي", "انو", "انه", "that", "this", "with", "for",
    "tell", "me", "about", "need", "want", "show", "find", "please", "perfume", "fragrance"
  ]);

  function lang() { return typeof window.currentLang === "string" ? window.currentLang : (localStorage.getItem("ovaLang") === "ar" ? "ar" : "en"); }
  function arUi() { return lang() === "ar"; }
  function hasAr(t) { return /[\u0600-\u06FF]/.test(String(t || "")); }
  function egy(t) { return /(عايز|عاوزه|عاوز|محتاج|فين|بكام|كام|ايه|إيه|ده|دي|عندك|قولي|رشحلي|وريني|برفان)/.test(n(t)); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }

  function n(t) {
    return String(t || "")
      .toLowerCase()
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/\u0640/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/[(){}[\]%#_.,/\\|:+*&!?;=\-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function ex(t) {
    let v = n(t);
    ALIASES.forEach(([from, to]) => {
      const a = n(from), b = n(to);
      if (a && v.includes(a)) v = v.split(a).join(b);
    });
    TAG_RULES.forEach((rule) => {
      if (rule.words.some((w) => v.includes(n(w))) && !v.includes(rule.key)) v += " " + rule.key;
    });
    return n(v);
  }

  function plain(html) {
    return String(html || "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<li>/gi, "• ")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function info(html) {
    const data = { text: plain(html) };
    const re = /<p>\s*<strong>(.*?)<\/strong>\s*:?\s*(?:<br>)?\s*([\s\S]*?)<\/p>/gi;
    let m = re.exec(String(html || ""));
    while (m) {
      const k = n(plain(m[1])), v = plain(m[2]);
      if (/الوصف|الريحه|description/.test(k)) data.description = v;
      if (/النوع|الطابع|type/.test(k)) data.typeNote = v;
      if (/النوتس|notes|المكونات/.test(k)) data.notes = v;
      if (/الثبات|longevity/.test(k)) data.longevityNote = v;
      if (/الفوحان|sillage|projection/.test(k)) data.sillageNote = v;
      if (/الاستخدام|occasion|use/.test(k)) data.usage = v;
      if (/يميزه|special/.test(k)) data.special = v;
      m = re.exec(String(html || ""));
    }
    return data;
  }

  function add(pool, list, source, group) {
    (Array.isArray(list) ? list : []).forEach((item) => {
      if (!item || !item.name) return;
      pool.push({
        name: item.name,
        price: Number(item.price || 0),
        img: item.img || "",
        img2: item.img2 || "",
        source: source || item.source || "",
        group: group || item.group || item.section || "",
        brandTitle: item.brandTitle || source || "",
        brandKey: item.brandKey || "",
        type: item.type || "",
        longevity: item.longevity || "",
        sillage: item.sillage || "",
        rating: item.rating || "",
        detailsHtml: item.detailsHtml || "",
        stock: item.stock || 18
      });
    });
  }

  function addDomProducts(pool) {
    const pathname = (location.pathname || "").toLowerCase();
    const pageGroup = pathname.includes("unisex") ? "unisex" : pathname.includes("brand") ? "brand" : pathname.includes("all-perfume") ? "all" : "";
    const pageSource = (window.currentBrand && window.currentBrand.title) || (document.title || "").replace(/\s*\|.*$/, "").trim();

    document.querySelectorAll(".product-card").forEach((card) => {
      const nameEl = card.querySelector("h3, h4, .product-title, .product-name");
      if (!nameEl) return;

      const name = plain(nameEl.textContent || "");
      if (!name) return;

      const imgEl = card.querySelector("img");
      const currentPriceText = [
        card.querySelector(".product-current-price") ? card.querySelector(".product-current-price").textContent : "",
        card.querySelector("[data-current-price]") ? card.querySelector("[data-current-price]").textContent : ""
      ].join(" ");
      const priceText = [
        card.querySelector(".product-price") ? card.querySelector(".product-price").textContent : "",
        card.querySelector("p") ? card.querySelector("p").textContent : "",
        card.textContent || ""
      ].join(" ");
      const currentPriceMatch = String(currentPriceText).match(/(\d{3,5})/);
      const allPriceMatches = String(priceText).match(/(\d{3,5})/g) || [];
      const resolvedPrice = currentPriceMatch
        ? Number(currentPriceMatch[1])
        : allPriceMatches.length
          ? Number(allPriceMatches[allPriceMatches.length - 1])
          : 0;

      pool.push({
        name: name,
        price: resolvedPrice,
        img: imgEl ? (imgEl.getAttribute("src") || "") : "",
        img2: "",
        source: pageSource,
        group: pageGroup,
        brandTitle: pageSource,
        brandKey: (window.currentBrand && window.currentBrand.key) || "",
        type: "",
        longevity: "",
        sillage: "",
        rating: "",
        detailsHtml: card.getAttribute("data-details-html") || "",
        stock: 18
      });
    });
  }

  function mergeProduct(existing, incoming) {
    if (!existing) return incoming;

    Object.keys(incoming || {}).forEach((key) => {
      const value = incoming[key];

      if (Array.isArray(value)) {
        if (!value.length) return;
        existing[key] = [...new Set([...(Array.isArray(existing[key]) ? existing[key] : []), ...value])];
        return;
      }

      if (typeof value === "string") {
        if (!value.trim()) return;
        existing[key] = value;
        return;
      }

      if (typeof value === "number") {
        if (!value && existing[key]) return;
        existing[key] = value;
        return;
      }

      if (value !== undefined && value !== null) existing[key] = value;
    });

    return existing;
  }

  function collect() {
    const pool = [];
    try { add(pool, bestSellerProducts, "Best Seller", "best"); } catch (e) {}
    try { add(pool, extraBestSellerProducts, "Best Seller", "best"); } catch (e) {}
    try { add(pool, menPerfumes, "Men Perfume", "men"); } catch (e) {}
    try { add(pool, extraMenPerfumes, "Men Perfume", "men"); } catch (e) {}
    try { add(pool, moreMenPerfumes, "Men Perfume", "men"); } catch (e) {}
    try { add(pool, womenPerfumes, "Women Perfume", "women"); } catch (e) {}
    try { add(pool, moreWomenPerfumes, "Women Perfume", "women"); } catch (e) {}
    try { add(pool, latestWomenPerfumes, "Women Perfume", "women"); } catch (e) {}
    try { add(pool, allProducts, "All Products", "all"); } catch (e) {}
    try { add(pool, unisexProducts, "Unisex", "unisex"); } catch (e) {}
    try { add(pool, ovaUnisexProducts, "Unisex", "unisex"); } catch (e) {}

    const detailMaps = [];
    try { if (typeof productDetailMap !== "undefined") detailMaps.push(productDetailMap); } catch (e) {}
    try { if (typeof sharedProductDetailMap !== "undefined") detailMaps.push(sharedProductDetailMap); } catch (e) {}

    const catalog = window.ovaBrandCatalog || {};
    Object.keys(catalog).forEach((key) => add(pool, (catalog[key] || {}).products, (catalog[key] || {}).title || "", "brand"));
    addDomProducts(pool);

    const merged = new Map();
    pool.forEach((item) => {
      const copy = Object.assign({}, item);
      detailMaps.forEach((map) => { if (map && map[copy.name]) Object.assign(copy, map[copy.name]); });
      Object.assign(copy, info(copy.detailsHtml || ""));
      copy.brandTitle = copy.brandTitle || copy.source || "";
      copy.gender = copy.group === "men" ? "men" : copy.group === "women" ? "women" : (copy.group === "unisex" ? "unisex" : "");
      copy.tags = TAG_RULES.filter((rule) => ex([copy.name, copy.brandTitle, copy.type, copy.typeNote, copy.text, copy.usage].join(" ")).includes(rule.key)).map((rule) => rule.key);
      if (copy.gender && !copy.tags.includes(copy.gender)) copy.tags.push(copy.gender);
      if (copy.group === "best") copy.tags.push("best");
      const base = n(copy.name);
      const core = ex(copy.name).split(" ").filter((t) => t && !STOP.has(t)).join(" ");
      const extraAliases = NAME_ALIASES[base] || [];
      copy.aliases = [...new Set([base, core, ...extraAliases.map(ex)])].filter(Boolean);
      copy.search = ex([copy.name, copy.brandTitle, copy.type, copy.typeNote, copy.text, copy.usage, copy.special, copy.aliases.join(" ")].join(" "));
      copy.scoreBase = (Number(copy.rating || 4) * 10) + (copy.group === "best" ? 10 : 0);
      merged.set(base, mergeProduct(merged.get(base), copy));
    });
    return [...merged.values()];
  }

  function intent(q) {
    const x = ex(q), nums = (x.match(/\d{3,5}/g) || []).map(Number);
    return {
      raw: q, text: x,
      price: /(بكام|كام|سعر|price|cost)/.test(x),
      available: /(موجود|متوفر|available|stock|عندك)/.test(x),
      details: /(تفاصيل|كل التفاصيل|احكيلي|قولي عنه|عرفني|اتكلم عنه|نبذه|نبذة|describe|details|info|information|review|ايه رايك|عامل ايه)/.test(x),
      notes: /(نوتس|ريحته|ريحه|ريحة|شمته|عامل ازاي|عامله ازاي|profile|notes|smell|scent)/.test(x),
      longevity: /(ثبات|ثباته|longevity|long lasting|يدوم|يقعد|بيثبت|بيعيش)/.test(x),
      sillage: /(فوحان|فوحانه|projection|sillage|انتشار|يفوح|ساحب)/.test(x),
      recommend: /(رشح|recommend|suggest|عايز|عاوزه|عاوز|show me|help me choose|اختارلي|اقترح|ينفع|مناسب)/.test(x),
      compare: /(مقارنه|مقارنة|compare|vs|ولا|احسن|better|فرق|بين)/.test(x),
      similar: /(شبه|زي|similar|like)/.test(x),
      greet: /(hello|hi|hey|مرحبا|اهلا|أهلا|هلا|السلام|ازيك)/.test(x),
      thanks: /(thanks|thank you|شكرا|شكراً|ميرسي|متشكر)/.test(x),
      shipping: /(شحن|توصيل|delivery|shipping|كم يوم|كام يوم|يوصل)/.test(x),
      payment: /(دفع|payment|paypal|كاش|wallet|محفظه|محفظة)/.test(x),
      contact: /(واتساب|whatsapp|تواصل|contact|رقمكم|رقمكو|اكلم)/.test(x),
      quiz: /(كويز|quiz|خصم|discount)/.test(x),
      budgetMax: /(اقل|أقل|under|below|max|لحد)/.test(x) && nums.length ? Math.min(...nums) : (nums.length === 1 ? nums[0] : null),
      budgetMin: /(اكتر|أكتر|more than|above|min|ابتدا)/.test(x) && nums.length ? Math.max(...nums) : null,
      tags: TAG_RULES.filter((rule) => x.includes(rule.key)).map((rule) => rule.key)
    };
  }

  function queryWords(q) {
    return [...new Set(ex(q).split(" ").filter((word) => {
      if (!word || word.length < 3) return false;
      if (STOP.has(word) || QUERY_STOP.has(word)) return false;
      if (TAG_RULES.some((rule) => rule.key === word)) return false;
      return true;
    }))];
  }

  function tagLabel(tag, ar) {
    const map = {
      sweet: ar ? "سويت" : "sweet",
      vanilla: ar ? "فانيليا" : "vanilla",
      caramel: ar ? "كاراميل" : "caramel",
      gourmand: ar ? "جورماند" : "gourmand",
      fresh: ar ? "فريش" : "fresh",
      citrus: ar ? "حمضيات" : "citrus",
      woody: ar ? "خشبي" : "woody",
      oud: ar ? "عودي" : "oud",
      spicy: ar ? "سبايسي" : "spicy",
      floral: ar ? "زهري" : "floral",
      fruity: ar ? "فاكهي" : "fruity",
      musk: ar ? "مسكي" : "musky",
      amber: ar ? "عنبر" : "amber",
      tobacco: ar ? "تبغ" : "tobacco",
      coffee: ar ? "قهوة" : "coffee",
      men: ar ? "رجالي" : "men",
      women: ar ? "حريمي" : "women",
      unisex: ar ? "يونيسكس" : "unisex",
      summer: ar ? "صيفي" : "summer",
      winter: ar ? "شتوي" : "winter",
      office: ar ? "للشغل" : "office",
      night: ar ? "ليلي" : "night",
      date: ar ? "ديت" : "date-night",
      gift: ar ? "هدية" : "gift",
      luxury: ar ? "فاخر" : "luxury",
      strong: ar ? "قوي" : "strong"
    };
    return map[tag] || tag;
  }

  function hasValue(value) {
    return !!String(value || "").trim();
  }

  function detail(text, inferred) {
    const value = String(text || "").trim();
    return { text: value, inferred: !!inferred && !!value };
  }

  function tagSet(product) {
    return new Set(Array.isArray(product && product.tags) ? product.tags : []);
  }

  function getProfileDetail(product, ar) {
    const explicit = product.typeNote || product.type || "";
    if (hasValue(explicit)) return detail(explicit, false);

    const tags = tagSet(product);
    const parts = [];

    if (tags.has("fresh") || tags.has("citrus")) parts.push(ar ? "فريش ومنعش" : "fresh and uplifting");
    if (tags.has("musk") && !tags.has("fresh")) parts.push(ar ? "مسكي نضيف" : "clean musky");
    if (tags.has("fruity")) parts.push(ar ? "فاكهي" : "fruity");
    if (tags.has("floral")) parts.push(ar ? "زهري" : "floral");
    if (tags.has("sweet") || tags.has("gourmand") || tags.has("vanilla") || tags.has("caramel")) parts.push(ar ? "سويت جورماند" : "sweet gourmand");
    if (tags.has("amber")) parts.push(ar ? "عنبر دافئ" : "warm amber");
    if (tags.has("woody") || tags.has("oud")) parts.push(ar ? "خشبي" : "woody");
    if (tags.has("spicy")) parts.push(ar ? "سبايسي" : "spicy");
    if (tags.has("tobacco")) parts.push(ar ? "تبغي مدخن" : "smoky tobacco");
    if (tags.has("coffee")) parts.push(ar ? "بلمسة قهوة" : "coffee-toned");

    if (!parts.length) {
      parts.push(
        product.gender === "men"
          ? (ar ? "رجالي واضح" : "masculine signature")
          : product.gender === "women"
            ? (ar ? "أنثوي أنيق" : "feminine elegant")
            : (ar ? "متوازن للجنسين" : "balanced unisex")
      );
    }

    if (tags.has("luxury")) parts.push(ar ? "بلمسة فاخرة" : "with a luxe feel");
    return detail(ar ? `طابع ${parts.slice(0, 3).join(" / ")}` : parts.slice(0, 3).join(" / "), true);
  }

  function getNotesDetail(product, ar) {
    if (hasValue(product.notes)) return detail(product.notes, false);

    const tags = tagSet(product);
    const noteKeys = ["citrus", "fruity", "floral", "vanilla", "caramel", "coffee", "spicy", "amber", "woody", "oud", "tobacco", "musk"];
    const notes = noteKeys.filter((key) => tags.has(key));

    if (!notes.length && tags.has("sweet")) notes.push("sweet");
    if (!notes.length && tags.has("fresh")) notes.push("fresh");
    return detail(notes.slice(0, 5).map((tag) => tagLabel(tag, ar)).join(" - "), true);
  }

  function getUsageDetail(product, ar) {
    if (hasValue(product.usage)) return detail(product.usage, false);

    const tags = tagSet(product);
    const uses = [];

    if (tags.has("office") || tags.has("fresh") || tags.has("citrus")) uses.push(ar ? "مناسب للنهار والشغل" : "great for daytime and office");
    if (tags.has("night") || tags.has("date") || tags.has("strong") || tags.has("tobacco") || tags.has("amber") || tags.has("oud")) uses.push(ar ? "مناسب للمساء والخروجات" : "better for evenings and going out");
    if (tags.has("summer")) uses.push(ar ? "يناسب الجو الحر" : "works well in warm weather");
    if (tags.has("winter") || tags.has("gourmand")) uses.push(ar ? "يلمع أكثر في الجو البارد" : "shines more in cool weather");
    if (!uses.length) uses.push(ar ? "ينفع استخدام يومي ومناسبات خفيفة" : "works for daily wear and easy occasions");

    return detail(uses.slice(0, 2).join(" | "), true);
  }

  function getLongevityDetail(product, ar) {
    const explicit = product.longevityNote || product.longevity || "";
    if (hasValue(explicit)) return detail(explicit, false);

    const tags = tagSet(product);
    if (tags.has("strong") || tags.has("oud") || tags.has("amber") || tags.has("tobacco") || tags.has("gourmand")) {
      return detail(ar ? "متوقع من جيد جدًا لقوي" : "expected to be good to strong", true);
    }
    if (tags.has("fresh") || tags.has("citrus") || tags.has("floral")) {
      return detail(ar ? "متوقع متوسط إلى جيد" : "expected to be moderate to good", true);
    }
    return detail(ar ? "متوقع جيد" : "expected to be good", true);
  }

  function getSillageDetail(product, ar) {
    const explicit = product.sillageNote || product.sillage || "";
    if (hasValue(explicit)) return detail(explicit, false);

    const tags = tagSet(product);
    if (tags.has("strong") || tags.has("oud") || tags.has("tobacco") || tags.has("amber")) {
      return detail(ar ? "فوحان واضح وملحوظ" : "noticeable projection", true);
    }
    if (tags.has("fresh") || tags.has("citrus")) {
      return detail(ar ? "فوحان متوسط ونظيف" : "moderate, clean projection", true);
    }
    return detail(ar ? "فوحان جيد" : "good projection", true);
  }

  function getDescriptionDetail(product, ar) {
    if (hasValue(product.description)) return detail(product.description, false);

    const profile = getProfileDetail(product, ar).text.replace(/^طابع\s+/i, "");
    const usage = getUsageDetail(product, ar).text.split("|")[0].trim();
    if (!profile && !usage) return detail("", false);

    if (ar) return detail(`بيقدم إحساس ${profile || "متوازن"} وغالبًا ${usage || "ينفع في أكتر من استخدام"}.`, true);
    return detail(`It gives a ${profile || "balanced"} feel and usually works best ${usage || "across multiple situations"}.`, true);
  }

  function getSpecialDetail(product, ar) {
    if (hasValue(product.special)) return detail(product.special, false);

    const tags = tagSet(product);
    if (tags.has("strong")) return detail(ar ? "حضوره واضح ومناسب لو بتحب البرفانات اللافتة." : "It stands out if you enjoy noticeable perfumes.", true);
    if (tags.has("luxury") || tags.has("gift")) return detail(ar ? "مناسب جدًا كاختيار فاخر أو هدية." : "It works especially well as a luxe pick or gift.", true);
    return detail("", false);
  }

  function scoreProduct(q, p) {
    let s = 0;
    p.aliases.forEach((a) => {
      if (q === a) s = Math.max(s, 240);
      else if (q.includes(a) && a.length > 2) s = Math.max(s, 200);
      else if (a.includes(q) && q.length > 2) s = Math.max(s, 160);
    });
    q.split(" ").forEach((w) => {
      if (w.length < 2) return;
      if (p.search.includes(w)) s += 12;
    });
    return s;
  }

  function matches(q, products) {
    return products
      .map((p) => ({ p, s: scoreProduct(q, p) }))
      .filter((x) => x.s > 18)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.p);
  }

  function recs(i, products) {
    return products
      .map((p) => {
        let s = p.scoreBase;
        i.tags.forEach((t) => { if (p.tags.includes(t) || p.search.includes(t)) s += 18; });
        if (i.budgetMax !== null) s += p.price <= i.budgetMax ? 12 : -30;
        if (i.budgetMin !== null) s += p.price >= i.budgetMin ? 12 : -20;
        return { p, s };
      })
      .sort((a, b) => b.s - a.s)
      .slice(0, 4)
      .map((x) => x.p);
  }

  function relatedByWords(i, products) {
    const words = queryWords(i.text);
    if (!words.length) return [];
    return products
      .map((p) => {
        let s = 0;
        words.forEach((word) => { if (p.search.includes(word)) s += 18; });
        i.tags.forEach((tag) => { if (p.tags.includes(tag)) s += 10; });
        return { p, s };
      })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 4)
      .map((x) => x.p);
  }

  function similarTo(p, products) {
    const tags = new Set(p.tags || []);
    return products
      .filter((x) => n(x.name) !== n(p.name))
      .map((x) => ({ p: x, s: (x.tags || []).reduce((a, t) => a + (tags.has(t) ? 10 : 0), 0) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 2)
      .map((x) => x.p);
  }

  function currentPrice(p) {
    return Number((p && p.price) || 0);
  }

  function productText(p, q, i) {
    const ar = hasAr(q) || arUi();
    const eg = egy(q);
    const lines = [];
    const kind = p.gender === "men" ? (ar ? "رجالي" : "men") : p.gender === "women" ? (ar ? "حريمي" : "women") : (ar ? "يونيسكس" : "unisex");
    const profile = getProfileDetail(p, ar).text || p.typeNote || p.type || "";
    const notes = getNotesDetail(p, ar).text || p.notes || "";
    const longevity = getLongevityDetail(p, ar).text || p.longevityNote || p.longevity || "";
    const sillage = getSillageDetail(p, ar).text || p.sillageNote || p.sillage || "";
    const usage = getUsageDetail(p, ar).text || p.usage || "";
    const description = getDescriptionDetail(p, ar).text || p.description || "";
    const special = getSpecialDetail(p, ar).text || p.special || "";
    const available = Number(p.stock || 0) > 0;
    const onlyOneThing = i.price || i.available || i.notes || i.longevity || i.sillage;

    if (ar) {
      if (i.price && !i.details) {
        return pick([
          `${p.name} سعره بعد الخصم ${currentPrice(p)} جنيه.`,
          `السعر الحالي لـ ${p.name} عندك ${currentPrice(p)} جنيه.`,
          `بالنسبة للسعر بعد الخصم، ${p.name} عامل ${currentPrice(p)} جنيه.`
        ]);
      }
      if (i.available && !i.details) {
        return pick([
          `${p.name} ${available ? "متاح حاليًا" : "محتاج متابعة مع المتجر"} وسعره بعد الخصم ${currentPrice(p)} جنيه.`,
          `${available ? "أيوه" : "مش ظاهر أكيد حاليًا"}، ${p.name} ${available ? "موجود" : "الأفضل تتأكد منه"} وسعره الحالي ${currentPrice(p)} جنيه.`,
          `${p.name} ${available ? "موجود" : "حالته مش مؤكدة"}، وسعره بعد الخصم ${currentPrice(p)} جنيه.`
        ]);
      }
      if (i.notes && !i.details) {
        lines.push(pick([
          `لو سؤالك عن ريحة ${p.name} نفسها:`,
          `من ناحية النوتس والطابع، ${p.name} ماشي كده:`,
          `ريحة ${p.name} تميل للآتي:`
        ]));
        if (profile) lines.push(`الطابع: ${profile}`);
        if (notes) lines.push(`النوتس: ${notes}`);
        if (description) lines.push(`الإحساس العام: ${description}`);
        return lines.join("\n");
      }
      if ((i.longevity || i.sillage) && !i.details) {
        lines.push(pick([
          `من ناحية الأداء، ${p.name}:`,
          `أداء ${p.name} عندك بالشكل ده:`,
          `لو بتسأل عن الثبات والفوحان في ${p.name}:`
        ]));
        if (longevity) lines.push(`الثبات: ${longevity}`);
        if (sillage) lines.push(`الفوحان: ${sillage}`);
        if (usage) lines.push(`أنسب استخدام: ${usage}`);
        return lines.join("\n");
      }

      lines.push(pick([
        `بص، ${p.name} من الاختيارات القوية جدًا عندك.`,
        `${p.name} اختيار حلو جدًا لو ده الطابع اللي في بالك.`,
        `تمام، أقولك كل المهم عن ${p.name}.`
      ]));
      lines.push(`السعر بعد الخصم: ${currentPrice(p)} جنيه`);
      lines.push(`النوع: ${kind}${p.brandTitle ? ` | البراند: ${p.brandTitle}` : ""}`);
      if (profile) lines.push(`الطابع: ${profile}`);
      if (notes) lines.push(`النوتس: ${notes}`);
      if (longevity) lines.push(`الثبات: ${longevity}`);
      if (sillage) lines.push(`الفوحان: ${sillage}`);
      if (usage) lines.push(`أنسب استخدام: ${usage}`);
      if (description) lines.push(`الوصف: ${description}`);
      if (special) lines.push(`اللي يميزه: ${special}`);
      if (p.rating) lines.push(`التقييم التقريبي: ${p.rating}/5`);
      lines.push(`التوفر: ${available ? "متاح حاليًا" : "محتاج متابعة مع المتجر"}`);
      if (!onlyOneThing && eg) lines.push("ولو عايز بدائل شبهه أو مقارنة مع برفان تاني أنا أرتبهالك.");
      return lines.join("\n");
    }

    if (i.price && !i.details) return `${p.name} currently costs ${currentPrice(p)} EGP after discount.`;
    if (i.available && !i.details) return `${p.name} is ${available ? "available now" : "not fully confirmed right now"}, and its current price is ${currentPrice(p)} EGP.`;
    if (i.notes && !i.details) {
      if (notes || profile) return `For the scent profile of ${p.name}:\n${profile ? `Profile: ${profile}\n` : ""}${notes ? `Notes: ${notes}` : ""}`.trim();
    }
    if ((i.longevity || i.sillage) && !i.details) {
      return `Performance of ${p.name}:\n${longevity ? `Longevity: ${longevity}\n` : ""}${sillage ? `Sillage: ${sillage}\n` : ""}${usage ? `Best use: ${usage}` : ""}`.trim();
    }

    lines.push(pick([
      `${p.name} is a strong pick on your site.`,
      `${p.name} fits this vibe really well.`,
      `Sure, here is the useful breakdown for ${p.name}.`
    ]));
    lines.push(`Current price: ${currentPrice(p)} EGP`);
    lines.push(`Style: ${kind}${p.brandTitle ? ` | Brand: ${p.brandTitle}` : ""}`);
    if (profile) lines.push(`Profile: ${profile}`);
    if (notes) lines.push(`Notes: ${notes}`);
    if (longevity) lines.push(`Longevity: ${longevity}`);
    if (sillage) lines.push(`Sillage: ${sillage}`);
    if (usage) lines.push(`Best use: ${usage}`);
    if (description) lines.push(`Description: ${description}`);
    if (special) lines.push(`What makes it stand out: ${special}`);
    if (p.rating) lines.push(`Approx. rating: ${p.rating}/5`);
    return lines.join("\n");
  }

  function recommendationText(list, q) {
    const ar = hasAr(q) || arUi();
    const tags = intent(q).tags;
    const vibe = tags.length ? tags.map((tag) => tagLabel(tag, ar)).join(" / ") : "";
    const intro = ar ? pick([
      vibe ? `دي أقرب ترشيحات على مود ${vibe}:` : "دي أقرب ترشيحات مناسبة للي بتدور عليه:",
      vibe ? `رشحتلك دول لأنهم الأقرب لطابع ${vibe}.` : "رشحتلك دول لأنهم الأقرب للطابع اللي طلبته:",
      vibe ? `أقرب اختيارات عندك للجو ده (${vibe}) هي:` : "أقرب اختيارات عندك للمود ده هي:"
    ]) : pick([
      "These are the closest recommendations for what you asked for:",
      "These picks fit your requested vibe best:",
      "The closest matching options are:"
    ]);
    return intro + "\n" + list.map((p, i) => {
      const reason = [
        getProfileDetail(p, ar).text || p.type || p.typeNote,
        getUsageDetail(p, ar).text || p.usage,
        getLongevityDetail(p, ar).text || p.longevity
      ].filter(Boolean).slice(0, 2).join(" | ");
      return ar ? `${i + 1}. ${p.name} - ${currentPrice(p)} جنيه${reason ? `\n${reason}` : ""}` : `${i + 1}. ${p.name} - ${currentPrice(p)} EGP${reason ? `\n${reason}` : ""}`;
    }).join("\n");
  }

  function compareText(a, b, q) {
    const ar = hasAr(q) || arUi();
    if (ar) {
      const aProfile = getProfileDetail(a, true).text || a.type || a.typeNote || "طابع مميز";
      const bProfile = getProfileDetail(b, true).text || b.type || b.typeNote || "طابع مميز";
      const aLongevity = getLongevityDetail(a, true).text || a.longevity || "جيد";
      const bLongevity = getLongevityDetail(b, true).text || b.longevity || "جيد";
      const aSillage = getSillageDetail(a, true).text || a.sillage || "جيد";
      const bSillage = getSillageDetail(b, true).text || b.sillage || "جيد";
      return [
        `مقارنة سريعة بين ${a.name} و ${b.name}:`,
        `${a.name}: ${aProfile} | ثبات ${aLongevity} | فوحان ${aSillage} | سعر بعد الخصم ${currentPrice(a)} جنيه`,
        `${b.name}: ${bProfile} | ثبات ${bLongevity} | فوحان ${bSillage} | سعر بعد الخصم ${currentPrice(b)} جنيه`,
        `لو عايز حاجة أنضف وأسهل يوميًا أميل للأقرب في الفريش/الكلين.`,
        `ولو عايز حضور أقوى وسهرة أكتر أميل للأقرب في السويت/السبايسي/الأمبر.`
      ].join("\n");
    }
    const aProfile = getProfileDetail(a, false).text || a.type || a.typeNote || "Distinct profile";
    const bProfile = getProfileDetail(b, false).text || b.type || b.typeNote || "Distinct profile";
    const aLongevity = getLongevityDetail(a, false).text || a.longevity || "Good";
    const bLongevity = getLongevityDetail(b, false).text || b.longevity || "Good";
    const aSillage = getSillageDetail(a, false).text || a.sillage || "Good";
    const bSillage = getSillageDetail(b, false).text || b.sillage || "Good";
    return [
      `Quick comparison between ${a.name} and ${b.name}:`,
      `${a.name}: ${aProfile} | Longevity ${aLongevity} | Sillage ${aSillage} | Current price ${currentPrice(a)} EGP`,
      `${b.name}: ${bProfile} | Longevity ${bLongevity} | Sillage ${bSillage} | Current price ${currentPrice(b)} EGP`
    ].join("\n");
  }

  function serviceText(i, q) {
    const ar = hasAr(q) || arUi();
    if (i.shipping) return ar ? "التوصيل عندك مجاني خلال أول أسبوع، وغالبًا بيوصل خلال 3 إلى 4 أيام بعد تأكيد الطلب." : "Delivery is free during the first week, and it usually takes 3 to 4 days after confirmation.";
    if (i.payment) return ar ? "وسايل الدفع المتاحة: الدفع عند الاستلام، المحفظة الإلكترونية على 01099136720، وكمان PayPal." : "Available payment methods are cash on delivery, wallet transfer to 01099136720, and PayPal.";
    if (i.contact) return ar ? "تقدر تكلم المتجر مباشرة على واتساب: +20 109 913 6720." : "You can contact the store directly on WhatsApp: +20 109 913 6720.";
    if (i.quiz) return ar ? "فيه كويز على الموقع، ولو الإجابة صح بيتفعل خصم إضافي 8% على السلة." : "There is a quiz on the site, and if you answer correctly you unlock an extra 8% discount.";
    return "";
  }

  function intent(q) {
    const x = ex(q), nums = (x.match(/\d{3,5}/g) || []).map(Number);
    return {
      raw: q, text: x,
      price: /(بكام|كام|سعر|price|cost)/.test(x),
      available: /(موجود|متوفر|available|stock|عندك)/.test(x),
      details: /(تفاصيل|كل التفاصيل|احكيلي|قولي عنه|عرفني|اتكلم عنه|نبذه|نبذة|describe|details|info|information|review|ايه رايك|عامل ايه)/.test(x),
      notes: /(نوتس|ريحته|ريحه|ريحة|شمته|عامل ازاي|عامله ازاي|profile|notes|smell|scent)/.test(x),
      longevity: /(ثبات|ثباته|longevity|long lasting|يدوم|يقعد|بيثبت|بيعيش)/.test(x),
      sillage: /(فوحان|فوحانه|projection|sillage|انتشار|يفوح|ساحب)/.test(x),
      recommend: /(رشح|recommend|suggest|عايز|عاوزه|عاوز|show me|help me choose|اختارلي|اقترح|ينفع|مناسب)/.test(x),
      compare: /(مقارنه|مقارنة|compare|vs|ولا|احسن|better|فرق|بين)/.test(x),
      similar: /(شبه|زي|similar|like)/.test(x),
      greet: /(hello|hi|hey|مرحبا|اهلا|أهلا|هلا|السلام|ازيك)/.test(x),
      thanks: /(thanks|thank you|شكرا|شكراً|ميرسي|متشكر)/.test(x),
      shipping: /(شحن|توصيل|delivery|shipping|كم يوم|كام يوم|يوصل)/.test(x),
      payment: /(دفع|payment|paypal|كاش|wallet|محفظه|محفظة)/.test(x),
      contact: /(واتساب|whatsapp|تواصل|contact|رقمكم|رقمكو|اكلم)/.test(x),
      exchange: /(استبدال|استرجاع|ارجاع|return|refund|replace|exchange|defect|damaged|broken|عيب)/.test(x),
      orderConfirm: /(تاكيد|تأكيد|confirmed|confirmation|order received|order confirmed|saved|submitted|الطلب اتسجل|الاوردر اتسجل|اتسجل|تم الطلب)/.test(x),
      governorates: /(المحافظات|محافظات|كل مصر|all egypt|nationwide|governorates|cities|shipping areas)/.test(x),
      offer: /(عرض|العرض|هدية|هديه|buy 2|get 1|3rd free|free piece|free perfume|offer)/.test(x),
      quiz: /(كويز|quiz|خصم|discount)/.test(x),
      budgetMax: /(اقل|أقل|under|below|max|لحد)/.test(x) && nums.length ? Math.min(...nums) : (nums.length === 1 ? nums[0] : null),
      budgetMin: /(اكتر|أكتر|more than|above|min|ابتدا)/.test(x) && nums.length ? Math.max(...nums) : null,
      tags: TAG_RULES.filter((rule) => x.includes(rule.key)).map((rule) => rule.key)
    };
  }

  function serviceText(i, q) {
    const ar = hasAr(q) || arUi();
    const lines = [];

    if (i.shipping) lines.push(ar ? "التوصيل غالبًا بيوصل خلال 3 إلى 4 أيام بعد تأكيد الطلب." : "Delivery usually takes 3 to 4 days after order confirmation.");
    if (i.payment) lines.push(ar ? "وسايل الدفع المتاحة: الدفع عند الاستلام، المحفظة الإلكترونية على 01099136720، وكمان PayPal." : "Available payment methods are cash on delivery, wallet transfer to 01099136720, and PayPal.");
    if (i.contact) lines.push(ar ? "تقدر تكلم المتجر مباشرة على واتساب: +20 109 913 6720." : "You can contact the store directly on WhatsApp: +20 109 913 6720.");
    if (i.exchange) lines.push(ar ? "أيوه فيه استبدال لو المنتج فيه عيب واضح لينا بعد المراجعة، لكن غير كده مفيش استبدال أو استرجاع." : "Yes, exchange is available only if the product has a clear defect that can be verified by the store. Otherwise, there is no exchange or return.");
    if (i.orderConfirm) lines.push(ar ? "أول ما تكمل الطلب وتوصل لرسالة التأكيد يبقى الأوردر اتسجل عندنا، وبنراجع الطلب بعدها للتجهيز." : "Once you complete the order and see the confirmation message, your order is recorded and then reviewed for processing.");
    if (i.governorates) lines.push(ar ? "الشحن متاح للمحافظات، ولو حابب تتأكد من منطقتك بالضبط كلمنا على واتساب." : "Shipping is available to governorates, and if you want to confirm your exact area you can message the store on WhatsApp.");
    if (i.offer) lines.push(ar ? "العرض الحالي على الموقع هو اشتري 2 وخد 1 هدية، وبيتحسب تلقائي على السلة." : "The current offer on the site is buy 2 get 1 free, and it is applied automatically in the cart.");
    if (i.quiz) lines.push(ar ? "فيه كويز على الموقع، ولو الإجابة صح بيتفعل خصم إضافي 8% على السلة." : "There is a quiz on the site, and if you answer correctly you unlock an extra 8% discount.");

    return lines.join("\n");
  }

  function reply(q, products) {
    const i = intent(q), ar = hasAr(q) || arUi();
    if (!i.text || i.greet) {
      return { text: ar ? "أنا مساعد البرفانات هنا. ابعتلي اسم أي برفان بالعربي أو الإنجليزي، أو قولّي عايز حاجة سويت، فريش، شتوي، صيفي، ديت، شغل، وأنا أطلعلك أفضل ترشيحات مع كل التفاصيل." : "I am the perfume assistant here. Send any perfume name in Arabic or English, or ask for sweet, fresh, winter, summer, date-night, or office recommendations.", actions: [] };
    }
    if (i.thanks) return { text: ar ? "تحت أمرك. ولو عايز مقارنة أو بدائل شبه أي برفان أنا جاهز." : "Any time. If you want a comparison or close alternatives, I am ready.", actions: [] };
    const service = serviceText(i, q);
    if (service) return { text: service, actions: [] };

    const found = matches(i.text, products);
    if (i.compare && found.length >= 2) {
      return { text: compareText(found[0], found[1], q), actions: found.slice(0, 2).map((p) => ({ label: ar ? `افتح ${p.name}` : `Open ${p.name}`, product: p })) };
    }
    if (found.length) {
      const sim = i.similar ? similarTo(found[0], products) : [];
      const txt = productText(found[0], q, i) + (sim.length ? (ar ? `\n\nولو عايز حاجة قريبة منه أرشح لك: ${sim.map((p) => p.name).join(" - ")}` : `\n\nClose alternatives: ${sim.map((p) => p.name).join(" - ")}`) : "");
      return { text: txt, actions: [{ label: ar ? "افتح المنتج" : "Open product", product: found[0] }, ...(sim[0] ? [{ label: ar ? `بديل قريب: ${sim[0].name}` : `Close match: ${sim[0].name}`, product: sim[0] }] : [])] };
    }

    const related = relatedByWords(i, products);
    if (related.length) {
      const lead = ar ? pick([
        "فهمت من كلامك الاتجاه ده، وأقرب حاجات ليه عندك هي:",
        "الاسم مش مطابق حرفيًا، لكن دي أقرب اختيارات ماشية مع اللي قصدك عليه:",
        "على حسب الكلمات اللي ذكرتها، دول الأقرب لطلبك:"
      ]) : pick([
        "I picked up the direction from your message, and these are the closest matches:",
        "The name is not an exact match, but these are the closest options to what you mean:",
        "Based on the keywords you used, these are the nearest fits:"
      ]);
      const body = related.map((p, index) => ar
        ? `${index + 1}. ${p.name} - ${p.price} جنيه${p.type || p.typeNote ? `\n${p.type || p.typeNote}` : ""}`
        : `${index + 1}. ${p.name} - ${p.price} EGP${p.type || p.typeNote ? `\n${p.type || p.typeNote}` : ""}`
      ).join("\n");
      return {
        text: `${lead}\n${body}`,
        actions: related.slice(0, 2).map((p) => ({ label: ar ? `افتح ${p.name}` : `Open ${p.name}`, product: p }))
      };
    }

    const suggested = recs(i, products);
    if (suggested.length) {
      return { text: recommendationText(suggested, q), actions: suggested.slice(0, 2).map((p) => ({ label: ar ? `افتح ${p.name}` : `Open ${p.name}`, product: p })) };
    }

    return { text: ar ? pick([
      "وصلني اتجاه سؤالك، لكني محتاج كلمة زيادة بس أضيق بيها الترشيح. تقدر تقولّي مثلًا: سويت، فريش، عودي، شتوي، صيفي، رجالي، حريمي، أو اسم البرفان نفسه وأنا أمشي معاك فيه.",
      "أنا ماسك الاتجاه العام من كلامك، وأقدر أكمل معاك فورًا لو حددتلي الطابع أو الاسم: فانيليا، فريش، رسمي، ديت، شتوي، أو أي اسم برفان في بالك.",
      "أقدر أظبطهالك، بس اديني إشارة واحدة زيادة: نوع الريحة، الميزانية، أو اسم البرفان نفسه، وأنا أطلعلك أنسب اختيارات وتفاصيلها."
    ]) : "I got the general direction. Give me one more clue like the vibe, budget, or perfume name, and I will narrow it down for you.", actions: [] };
  }

  function go(product) {
    if (!product) return;
    if ((location.pathname.toLowerCase().includes("index.html") || location.pathname.endsWith("/")) && typeof window.openModal === "function") { window.openModal(product.name); return; }
    if (location.pathname.toLowerCase().includes("all-perfume.html") && typeof window.openModal === "function") { window.openModal(product.name); return; }
    if (location.pathname.toLowerCase().includes("unisex.html") && typeof window.openModal === "function") { window.openModal(product.name); return; }
    if (location.pathname.toLowerCase().includes("brand.html") && typeof window.openModal === "function" && window.currentBrand && (window.currentBrand.products || []).some((x) => x.name === product.name)) { window.openModal(product.name); return; }
    if (product.brandKey) { location.href = "brand.html?brand=" + encodeURIComponent(product.brandKey) + "&product=" + encodeURIComponent(product.name); return; }
    if (product.group === "unisex") { location.href = "unisex.html?product=" + encodeURIComponent(product.name); return; }
    location.href = "all-perfume.html?product=" + encodeURIComponent(product.name);
  }

  function init() {
    const products = collect();
    const offset = document.getElementById("whatsappFloat") ? 98 : 24;
    const style = document.createElement("style");
    style.textContent = `
      .ova-help-float{position:fixed;right:18px;bottom:${offset}px;z-index:5200;border:none;border-radius:50%;width:58px;height:58px;padding:0;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.98) 0%,rgba(244,236,226,.98) 100%);color:#fff;font-size:0;box-shadow:0 12px 28px rgba(58,39,27,.16);cursor:pointer;display:flex;align-items:center;justify-content:center;clip-path:circle(50%);-webkit-clip-path:circle(50%)}
      .ova-help-float:hover{transform:translateY(-2px)} .ova-help-float::before{content:"";width:100%;height:100%;display:block;background:center/cover no-repeat url("images/site-assets/ai-logo-2.png");border-radius:50%;transform:none;overflow:hidden;clip-path:circle(50%);-webkit-clip-path:circle(50%);filter:drop-shadow(0 8px 18px rgba(10,102,255,.12))}
      .ova-help-panel{position:fixed;right:18px;bottom:${offset + 70}px;z-index:5201;width:min(380px,calc(100vw - 24px));height:min(560px,calc(var(--ova-help-vh,100vh) - 130px));display:none;flex-direction:column;overflow:hidden;border-radius:28px;background:linear-gradient(180deg,rgba(10,18,34,.98) 0%,rgba(11,25,52,.98) 100%);border:1px solid rgba(105,173,255,.22);box-shadow:0 24px 70px rgba(0,0,0,.32),0 0 40px rgba(18,112,255,.22)}
      .ova-help-panel.open{display:flex} .ova-help-head{display:flex;align-items:center;justify-content:space-between;padding:16px;color:#fff;background:linear-gradient(135deg,rgba(22,146,255,.24) 0%,rgba(10,102,255,.14) 100%);border-bottom:1px solid rgba(255,255,255,.08)}
      .ova-help-title{font:800 16px/1.2 "Manrope",sans-serif} .ova-help-sub{font:500 12px/1.4 "Manrope",sans-serif;color:rgba(255,255,255,.76);margin-top:4px}
      .ova-help-close{width:38px;height:38px;border:none;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;cursor:pointer;font-size:18px}
      .ova-help-body{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:radial-gradient(circle at top,rgba(73,136,255,.12),transparent 28%)}
      .ova-help-message{max-width:90%;padding:12px 14px;border-radius:18px;font:600 13px/1.75 "Manrope",sans-serif;white-space:pre-wrap}
      .ova-help-message.bot{align-self:flex-start;background:rgba(255,255,255,.1);color:#f6f8ff;border:1px solid rgba(255,255,255,.08)}
      .ova-help-message.user{align-self:flex-end;background:linear-gradient(135deg,#1692ff 0%,#0a66ff 100%);color:#fff}
      .ova-help-bot-wrap{display:flex;flex-direction:column;gap:8px;align-items:flex-start} .ova-help-actions{display:flex;gap:8px;flex-wrap:wrap}
      .ova-help-action-btn{border:none;border-radius:999px;padding:8px 12px;background:rgba(22,146,255,.18);color:#cfe5ff;cursor:pointer;font:700 11px/1.2 "Manrope",sans-serif;border:1px solid rgba(105,173,255,.24)}
      .ova-help-form{display:flex;gap:10px;padding:14px;border-top:1px solid rgba(255,255,255,.08);background:rgba(6,14,28,.92)} .ova-help-input{flex:1;border:none;outline:none;border-radius:16px;padding:14px;background:rgba(255,255,255,.08);color:#fff;font:600 13px/1.2 "Manrope",sans-serif}
      .ova-help-send{border:none;border-radius:16px;padding:0 16px;background:linear-gradient(135deg,#1692ff 0%,#0a66ff 100%);color:#fff;font:800 13px/1 "Manrope",sans-serif;cursor:pointer}
      @media (max-width:640px){.ova-help-float{right:14px;bottom:max(152px,calc(env(safe-area-inset-bottom) + 152px));width:46px;height:46px;box-shadow:0 10px 24px rgba(58,39,27,.14)}.ova-help-float::before{width:100%;height:100%;background:center/cover no-repeat url("images/site-assets/ai-logo-2.png");transform:none;border-radius:50%;clip-path:circle(50%);-webkit-clip-path:circle(50%)}.ova-help-panel{right:8px;left:8px;width:auto;bottom:max(118px,calc(env(safe-area-inset-bottom) + 96px));height:calc(var(--ova-help-vh,100dvh) - 138px);border-radius:22px}.ova-help-message{max-width:94%;font-size:12px;padding:11px 12px}.ova-help-input{font-size:16px}}
    `;
    document.head.appendChild(style);

    const root = document.createElement("div");
    root.innerHTML = `
      <button class="ova-help-float" type="button" id="ovaHelpFloat"></button>
      <section class="ova-help-panel" id="ovaHelpPanel">
        <div class="ova-help-head">
          <div><div class="ova-help-title"></div><div class="ova-help-sub"></div></div>
          <button class="ova-help-close" type="button" id="ovaHelpClose">×</button>
        </div>
        <div class="ova-help-body" id="ovaHelpBody"></div>
        <form class="ova-help-form" id="ovaHelpForm"><input class="ova-help-input" id="ovaHelpInput" type="text" autocomplete="off"><button class="ova-help-send" type="submit"></button></form>
      </section>`;
    document.body.appendChild(root);

    const btn = document.getElementById("ovaHelpFloat"), panel = document.getElementById("ovaHelpPanel"), body = document.getElementById("ovaHelpBody"), input = document.getElementById("ovaHelpInput"), form = document.getElementById("ovaHelpForm");
    const setVh = () => document.documentElement.style.setProperty("--ova-help-vh", ((window.visualViewport ? window.visualViewport.height : window.innerHeight)) + "px");
    const scrollDown = () => { body.scrollTop = body.scrollHeight; };
    const msg = (t, s) => { const d = document.createElement("div"); d.className = "ova-help-message " + s; d.textContent = t; return d; };
    const bot = (r) => {
      const wrap = document.createElement("div"), text = document.createElement("div");
      wrap.className = "ova-help-bot-wrap"; text.className = "ova-help-message bot"; text.textContent = r.text; wrap.appendChild(text);
      if (r.actions && r.actions.length) {
        const a = document.createElement("div"); a.className = "ova-help-actions";
        r.actions.forEach((x) => { const b = document.createElement("button"); b.type = "button"; b.className = "ova-help-action-btn"; b.textContent = x.label; b.onclick = () => go(x.product); a.appendChild(b); });
        wrap.appendChild(a);
      }
      return wrap;
    };
    const ui = () => {
      const ar = arUi();
      btn.innerHTML = `${ar ? "مساعدة" : "Help"}<span>${ar ? "اسأل عن البرفانات" : "Ask about perfumes"}</span>`;
      panel.querySelector(".ova-help-title").textContent = ar ? "مساعد البرفانات" : "Perfume Help";
      panel.querySelector(".ova-help-sub").textContent = ar ? "فاهم عربي وإنجليزي ويرشح حسب الطابع" : "Understands Arabic and English, and recommends by vibe";
      input.placeholder = ar ? "اكتب اسم البرفان أو سؤالك..." : "Type a perfume name or your question...";
      form.querySelector(".ova-help-send").textContent = ar ? "إرسال" : "Send";
    };
    const ask = (v) => {
      const q = String(v || input.value || "").trim(); if (!q) return;
      body.appendChild(msg(q, "user")); input.value = ""; const r = reply(q, products);
      setTimeout(() => { body.appendChild(bot(r)); scrollDown(); }, 120); scrollDown();
    };

    btn.addEventListener("click", () => {
      ui(); panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        if (!body.children.length) body.appendChild(bot(reply(arUi() ? "مرحبا" : "hello", products)));
        setVh(); input.focus(); setTimeout(scrollDown, 80);
      }
    });
    document.getElementById("ovaHelpClose").addEventListener("click", () => panel.classList.remove("open"));
    form.addEventListener("submit", (e) => { e.preventDefault(); ask(); });
    window.addEventListener("resize", setVh);
    if (window.visualViewport) window.visualViewport.addEventListener("resize", setVh);
    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("open")) return;
      if (e.target.closest("#ovaHelpPanel") || e.target.closest("#ovaHelpFloat")) return;
      panel.classList.remove("open");
    });
    ui(); setVh();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
