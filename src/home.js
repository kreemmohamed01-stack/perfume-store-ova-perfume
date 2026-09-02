
      const bestSellerProducts = [
        { name: "Khamrah Waha", price: 850, img: "images/site-assets/خمره_واحه-removebg-preview.webp", img2: "images/site-assets/خمره واحه نوت.webp" },
        { name: "Ibraq Tobacco Collection", price: 1700, img: "images/site-assets/ibraqtobbacocollection-removebg-preview.webp", img2: "images/site-assets/توباكو_كوليكشن-removebg-preview.webp" },
        { name: "Diamond Emerald Soul 200ml", price:1050, img: "images/site-assets/ibraheem-alqurashi-emerald-soul-diamond-unisex-100ml-experience-elevated-scent-ebay.webp", img2: "images/site-assets/emerald-soul-diamond-ibrahim-al-qurashi-for-women-and-men.webp" },
        { name: "Nude Coral Diamond", price:1200, img: "images/site-assets/nude-coral-diamond.webp", img2: "images/site-assets/nude-coral-diamond-ibrahim-al-qurashi.webp" },
        { name: "Lahab - Hersh", price:1050, img: "images/site-assets/lahab-by-hersh-alezz-3-4oz-edp-spray-long-lasting.webp", img2: "images/site-assets/hersh-lahab-100ml-edp-by-al-ezz-for-oud.webp" },
        { name: "Khamrah Classic", price:850, img: "images/site-assets/lattafa-khamrah.webp", img2: "images/site-assets/khamrah-lattafa-perfumes.webp" },
        { name: "Eclaire", price:850, img: "images/site-assets/eclaire-by-lattafa-perfumes.webp", img2: "images/site-assets/lattafa-eclaire.webp" },
        { name: "Qissa Imperial Valley 200ml", price:850, img: "images/site-assets/gissah-imperial-valley-perfume-premium-edp-200ml-pewangi-arab.webp", img2: "images/site-assets/imp-valley.webp" },
        { name: "Imagination", price:850, img: "images/site-assets/products-by-louis-vuitton-imagination.webp", img2: "images/site-assets/imagination-notes.webp" },
        { name: "Tom Ford Tobacco Vanille", price:850, img: "images/site-assets/tom-ford-private-blend-tobacco-vanille-eau-de-parfum-spray-nordstrom.webp", img2: "images/site-assets/tom-ford-tobacco-vanille-2.webp" },
        { name: "Spicebomb Extreme", price:850, img: "images/site-assets/spicebomb-extreme-eau-de-parfum-90-ml.webp", img2: "images/site-assets/viktor-rolf-spicebomb-extreme-eau-de-parfum-woody-spicy-cologne-for-men-with-notes-of-amber-vanilla-3-fl-oz.webp" },
        { name: "Baccarat Rouge Master Box Original", price:850, img: "images/site-assets/amazon-com-fragrance-world-barakkat-rouge-540.webp", img2: "images/site-assets/maison-francis-kurkdjian-baccarat-rouge-540-extrait-de-parfum.webp" },
        { name: "Burberry Her Box", price:850, img: "images/site-assets/burberry-her-eau-de-parfum-edp-3-3-oz-in-box-sealed.webp", img2: "images/site-assets/ori-burb-erry-her-edp-for-girls-100ml-long-lasting-8-10-hours.webp" },
        { name: "Si Red (Armani Si)", price:850, img: "images/site-assets/si-passione-eau-de-parfum.webp", img2: "images/site-assets/giorgio-armani-si-passione.webp" },
        { name: "Gucci Bloom", price:850, img: "images/site-assets/gucci-gucci-bloom-edp-100ml.webp", img2: "images/site-assets/gucci-bloom-eau-de-toilette.webp" },
      ];

      const extraBestSellerProducts = [
        { name: "Valentino Uomo Born In Roma Intense", price:850, img: "images/best-seller/valentino-uomo-born-in-roma-intense.webp", img2: "images/site-assets/valentino-uomo-born-in-roma-extradose-for-men.webp" },
        { name: "Prada Paradoxe Intense", price:850, img: "images/best-seller/prada-paradoxe-intense-eau-de-parfum-spray-3-oz.webp", img2: "images/site-assets/prada-paradoxe-prada.webp" },
        { name: "Stronger With You Intensely", price:850, img: "images/men/you-int.jpeg", img2: "images/site-assets/emporio-armani-stronger-with-you-intensely-giorgio.webp" },
        { name: "Jean Paul Gaultier Le Male Le Parfum", price:850, img: "images/men/le-male-eau-de-parfum-intense-200-ml.webp", img2: "images/site-assets/le-male-le-parfum-notes.webp" },
        { name: "Sauvage", price:850, img: "images/site-assets/sauvage-eau-de-parfum.webp", img2: "images/site-assets/sauvage-notes.webp" },
        { name: "Bleu de Chanel Eau de Parfum", price:850, img: "images/best-seller/bleu-de-chanel-eau-de-parfum-spray-3-4-oz.webp", img2: "images/site-assets/chanel-bleu-de-chanel-eau-de-parfum.webp" },
        { name: "Le Male Elixir", price:850, img: "images/men/la-male-elixir.webp", img2: "images/site-assets/le-male-elixir-notes.webp" },
        { name: "Khamrah Qahwa", price:850, img: "images/site-assets/lattafa-khamrah-qahwa-eau-de-parfum-100ml.webp", img2: "images/site-assets/lattafa-khamrah-qahwa-notes-breakdown.webp" },
        { name: "Assaf Angel 200ml", price:1200, img: "images/site-assets/assaf-angel-main.webp", img2: "images/site-assets/assaf-angel-alt.webp" },
        { name: "Assaf Pink Lady 200ml", price:1200, img: "images/site-assets/assaf-pink-lady-main.jpg", img2: "images/site-assets/assaf-pink-lady-alt.webp" },
        { name: "Diamond Pink Score 200ml", price:1050, img: "images/site-assets/diamond-pink-score-main.webp", img2: "images/site-assets/diamond-pink-score-alt.webp" },
      ];

      const bestSellerHeroProducts = [
        { ...bestSellerProducts[0] },
        { ...bestSellerProducts[1] },
        { ...bestSellerProducts[2], img: "emerald diamond.webp" },
        { ...bestSellerProducts[3], img: "nude coral dimond.webp" }
      ];

      const newArrivalProducts = [
        { name: "Valentino Donna", price: 850, img: "images/site-assets/new-arrivals/valentino-donna-new.webp", img2: "images/site-assets/new-arrivals/valentino-donna-new.webp" },
        { name: "Valentino Uomo Rendez-Vous Ivory", price: 850, img: "images/site-assets/new-arrivals/Born_In_Roma_Uomo_Rendez-Vous_Ivory_Eau_de_-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Born_In_Roma_Uomo_Rendez-Vous_Ivory_Eau_de_-removebg-preview.webp" },
        { ...bestSellerProducts[0] },
        { ...bestSellerProducts[1] },
        { name: "Valentino Rendez-Vous Gold Donna", price: 850, img: "images/site-assets/new-arrivals/Valentino_Born_in_Roma_Rendez-Vous_The_Gold_Donna_Eau_de_Parfum-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Valentino_Born_in_Roma_Rendez-Vous_The_Gold_Donna_Eau_de_Parfum-removebg-preview.webp" },
        { name: "Valentino Donna Born In Roma Intense 30ml", price: 850, img: "images/site-assets/new-arrivals/Valentino_Donna_Born_In_Roma_Intense_1_0_Oz___30_Ml_Eau_De_Parfum_Spray_For_Women-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Valentino_Donna_Born_In_Roma_Intense_1_0_Oz___30_Ml_Eau_De_Parfum_Spray_For_Women-removebg-preview.webp" },
        { name: "Assaf Private Purple 200ml", price: 1200, img: "images/site-assets/new-arrivals/20599_ASSAF___Private_Purple___200ml_EDP_-_Fakhra_Perfumes-removebg-preview.webp", img2: "images/site-assets/new-arrivals/20599_ASSAF___Private_Purple___200ml_EDP_-_Fakhra_Perfumes-removebg-preview.webp" },
        { name: "Afnan 9pm Night Out", price: 850, img: "images/site-assets/new-arrivals/9pm_Night_Out_Perfume_100ml_Extrait_de_Parfum_Afnan____eBay_UK-removebg-preview.webp", img2: "images/site-assets/new-arrivals/9pm_Night_Out_Perfume_100ml_Extrait_de_Parfum_Afnan____eBay_UK-removebg-preview.webp" },
        { name: "Assaf Arrogate Pink", price: 1200, img: "images/site-assets/new-arrivals/Assaf_Pink_Arrogate_perfume-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Assaf_Pink_Arrogate_perfume-removebg-preview.webp" },
        { name: "Ibraq Balas Rose 150ml", price: 850, img: "images/site-assets/new-arrivals/Balas_Rose_Eau_de_Parfum___Ibraheem_Al_Qurashi___150ml_-_عطر_بالاس_روز___من_إبراهيم_القرشي__ابراق____150_مل-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Balas_Rose_Eau_de_Parfum___Ibraheem_Al_Qurashi___150ml_-_عطر_بالاس_روز___من_إبراهيم_القرشي__ابراق____150_مل-removebg-preview.webp" },
        { name: "Pink Diamond Sakura 200ml", price: 850, img: "images/site-assets/new-arrivals/pink-diamond-sakura-200ml.webp", img2: "images/site-assets/new-arrivals/pink-diamond-sakura-200ml.webp" },
        { name: "Laverne Sense Tassel Edition", price: 850, img: "images/site-assets/new-arrivals/Sense_perfume_and_powder_only_-_سينس_عطر_سينس_و_الباودر_-_3_Ml_perfume_only-removebg-preview.webp", img2: "images/site-assets/new-arrivals/Sense_perfume_and_powder_only_-_سينس_عطر_سينس_و_الباودر_-_3_Ml_perfume_only-removebg-preview.webp" },
        { name: "Assaf Arrogate Lipstick Perfume", price: 1200, img: "images/site-assets/new-arrivals/lip_stick_arrogate_-removebg-preview.webp", img2: "images/site-assets/new-arrivals/lip_stick_arrogate_-removebg-preview.webp" },
        { name: "Pink Queen Eau de Parfum", price: 850, img: "images/site-assets/new-arrivals/pink queen-removebg-preview.webp", img2: "images/site-assets/new-arrivals/pink queen-removebg-preview.webp" },
        { name: "Sherlock by Assaf", price: 1200, img: "images/site-assets/new-arrivals/sherlock_assaf-removebg-preview.webp", img2: "images/site-assets/new-arrivals/sherlock_assaf-removebg-preview.webp" }
      ];

      /* New Arrivals section was removed; its products now live inside Best Seller.
         Merge by name so the two shared entries (indexes 2 and 3) are not duplicated. */
      (function mergeNewArrivalsIntoBestSellers() {
        var seen = Object.create(null);
        bestSellerProducts.forEach(function (p) { seen[p.name] = true; });
        extraBestSellerProducts.forEach(function (p) { seen[p.name] = true; });
        newArrivalProducts.forEach(function (p) {
          if (seen[p.name]) return;
          seen[p.name] = true;
          extraBestSellerProducts.push({ name: p.name, price: p.price, img: p.img, img2: p.img2, isNew: true });
        });
      })();

    const sectionBrandCatalog = window.ovaBrandCatalog || {};
    const sectionBrandKeys = ["dior", "armani", "lattafa", "kayali", "jeanpaulgaultier", "tomford", "xerjoff", "rarescents", "assaf", "valentino", "afnan", "laverne"];
    const menOnlyNames = new Set([
      "Afnan 9pm Night Out",
      "Valentino Uomo Rendez-Vous Ivory",
      "Sherlock by Assaf",
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
      "Acqua di Giò Eau de Toilette",
      "Lattafa His Confession",
      "Hugo Boss Bottled Elixir",
      "Versace Eros Eau de Toilette",
      "Versace Eros Flame",
      "Dolce & Gabbana The One Eau de Parfum"
    ]);
    const womenOnlyNames = new Set([
      "Assaf Private Purple 200ml",
      "Assaf Arrogate Pink",
      "Ibraq Balas Rose 150ml",
      "Pink Diamond Sakura 200ml",
      "Laverne Sense Tassel Edition",
      "Valentino Rendez-Vous Gold Donna",
      "Valentino Donna Born In Roma Intense 30ml",
      "Assaf Arrogate Lipstick Perfume",
      "Pink Queen Eau de Parfum",
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
      "Armani Sì Passione Eau de Parfum",
      "Armani Sì Eau de Parfum",
      "Armani Sì (Original)",
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
      "Khamrah Waha",
      "Ibraq Tobacco Collection",
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

    function uniqueSectionProductsByName(list) {
      const seen = new Set();
      return list.filter((product) => {
        const key = product.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    const sectionBrandProducts = sectionBrandKeys.flatMap((brandKey) => {
      const brand = sectionBrandCatalog[brandKey];
      return (brand?.products || []).map((product) => ({
        ...product,
        brandKey,
        brandTitle: brand.title || brandKey
      }));
    });

    /* ===== Brand rails =====
       Replaces the old brand logo grid: one titled row per brand, with that brand's
       products laid out side by side in a horizontal scroller. Cards are built once
       and re-rendered only on language change. */
    function renderBrandRails() {
      const host = document.getElementById("brandRailsHost");
      if (!host) return;

      const isAr = typeof currentLang !== "undefined" && currentLang === "ar";
      const frag = document.createDocumentFragment();

      sectionBrandKeys.forEach((brandKey, rowIndex) => {
        const brand = sectionBrandCatalog[brandKey];
        const items = (brand && brand.products) || [];
        if (!items.length) return;

        const row = document.createElement("div");
        row.className = "br-row";
        // first two rows are likely near the fold, so let them lay out immediately
        if (rowIndex < 2) row.style.contentVisibility = "visible";

        const head = document.createElement("div");
        head.className = "br-row-head";

        const title = document.createElement("h3");
        title.className = "br-row-title";
        title.textContent = (brand && brand.title) || brandKey;

        const link = document.createElement("a");
        link.className = "br-row-link";
        link.href = "brand.html?brand=" + encodeURIComponent(brandKey);
        link.textContent = isAr ? "شاهد الكل" : "View All";

        head.append(title, link);

        const wrap = document.createElement("div");
        wrap.className = "br-rail-wrap";

        const rail = document.createElement("div");
        rail.className = "br-rail";
        rail.setAttribute("role", "list");
        rail.setAttribute("aria-label", ((brand && brand.title) || brandKey) + " products");

        items.forEach((product, i) => {
          const card = document.createElement("button");
          card.type = "button";
          card.className = "br-card";
          card.setAttribute("role", "listitem");
          card.setAttribute("aria-label", product.name);

          const media = document.createElement("div");
          media.className = "br-card-media";

          const img = document.createElement("img");
          img.src = product.img;
          img.alt = product.name;
          // decode off the main thread; only the first couple per rail load eagerly
          img.decoding = "async";
          img.loading = rowIndex < 1 && i < 3 ? "eager" : "lazy";
          media.appendChild(img);

          if (product.isNew) {
            const tag = document.createElement("span");
            tag.className = "br-card-tag";
            tag.textContent = isAr ? "جديد" : "New";
            media.appendChild(tag);
          }

          const body = document.createElement("div");
          body.className = "br-card-body";

          const name = document.createElement("p");
          name.className = "br-card-name";
          name.textContent = product.name;

          const foot = document.createElement("div");
          foot.className = "br-card-foot";

          const price = document.createElement("span");
          price.className = "br-card-price";
          price.textContent = product.price + (isAr ? " ج.م" : " EGP");

          const add = document.createElement("button");
          add.type = "button";
          add.className = "br-card-add";
          add.textContent = "+";
          add.setAttribute("aria-label", (isAr ? "أضف " : "Add ") + product.name);
          add.addEventListener("click", (event) => {
            event.stopPropagation();
            if (typeof addToCart === "function") addToCart(product.name, img);
          });

          foot.append(price, add);
          body.append(name, foot);
          card.append(media, body);

          card.addEventListener("click", () => {
            if (typeof openModal === "function") openModal(product.name);
          });

          rail.appendChild(card);
        });

        const prev = document.createElement("button");
        prev.type = "button";
        prev.className = "br-arrow br-arrow-left";
        prev.setAttribute("aria-label", "Previous");
        prev.textContent = "‹";

        const next = document.createElement("button");
        next.type = "button";
        next.className = "br-arrow br-arrow-right";
        next.setAttribute("aria-label", "Next");
        next.textContent = "›";

        function page(dir) {
          const card = rail.querySelector(".br-card");
          const step = card ? (card.offsetWidth + 16) * 2 : rail.clientWidth * 0.8;
          rail.scrollBy({ left: dir * step, behavior: "smooth" });
        }

        prev.addEventListener("click", () => page(-1));
        next.addEventListener("click", () => page(1));

        // arrow/fade state, recomputed on scroll but throttled to one rAF per frame
        let ticking = false;
        function syncEdges() {
          const max = rail.scrollWidth - rail.clientWidth;
          const x = Math.abs(rail.scrollLeft);
          prev.hidden = x <= 4;
          next.hidden = x >= max - 4;
          wrap.classList.toggle("has-more", x < max - 4);
          ticking = false;
        }
        rail.addEventListener("scroll", () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(syncEdges);
        }, { passive: true });

        wrap.append(prev, rail, next);
        row.append(head, wrap);
        frag.appendChild(row);

        // initial state once layout has settled
        requestAnimationFrame(syncEdges);

        if (typeof window.enableDragScroll === "function") window.enableDragScroll(rail);
      });

      host.replaceChildren(frag);
    }

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
      { name: "Khamrah 40ml", price: 300, img: "images/site-assets/khamrah-40ml-main-2.webp", img2: "images/site-assets/khamrah-40ml-notes-2.webp" },
      { name: "Acqua di Giò Eau de Toilette", price: 850, img: "images/site-assets/acqua-di-gio-homme-eau-de-toilette-50ml.webp", img2: "images/site-assets/acqua-di-gio-homme-eau-de-toilette-50ml.webp" },
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

    const sectionSourceProducts = uniqueSectionProductsByName([
      ...bestSellerProducts.map((product) => ({ ...product })),
      ...extraBestSellerProducts.map((product) => ({ ...product })),
      ...standaloneSectionProducts.map((product) => ({ ...product })),
      ...sectionBrandProducts.map((product) => ({ ...product })),
      ...newArrivalProducts.map((product) => ({ ...product }))
    ]);

    const tailProductNames = new Set([
      "Assaf Angel 200ml",
      "Assaf Pink Lady 200ml",
      "Diamond Pink Score 200ml"
    ]);

    const bestSellerPriorityMap = new Map(
      [...bestSellerProducts, ...extraBestSellerProducts]
        .filter((product) => !tailProductNames.has(product.name))
        .map((product, index) => [product.name, index])
    );

    function buildSectionProducts(sectionKey) {
      return sectionSourceProducts.filter((product) => {
        if (sectionKey === "men") return menOnlyNames.has(product.name) || unisexNames.has(product.name);
        if (sectionKey === "women") return womenOnlyNames.has(product.name) || unisexNames.has(product.name);
        return false;
      });
    }

    function prioritizeSectionProducts(list, pinnedNames = []) {
      const pinnedPriorityMap = new Map(
        pinnedNames.map((name, index) => [name, index])
      );
      const manualPriorityMap = new Map([
        ["Wild Cold 200ml", 0],
        ["One & Only 200ml", 1],
        ["La Luna 200ml", 2],
        ["Issey Miyake", 3],
        ["Spanish Tobacco", 4],
        ["Arabian Tobacco", 5],
        ["Khamrah 40ml", 6],
        ["Acqua di Giò Eau de Toilette", 7],
        ["Lattafa His Confession", 8],
        ["Hugo Boss Bottled Elixir", 9],
        ["Versace Eros Eau de Toilette", 10],
        ["Versace Eros Flame", 11],
        ["Dolce & Gabbana The One Eau de Parfum", 12]
      ]);

      return [...list].sort((a, b) => {
        const aPinned = pinnedPriorityMap.has(a.name);
        const bPinned = pinnedPriorityMap.has(b.name);

        if (aPinned !== bPinned) {
          return aPinned ? -1 : 1;
        }

        if (aPinned && bPinned) {
          return pinnedPriorityMap.get(a.name) - pinnedPriorityMap.get(b.name);
        }

        const aIsBestSeller = bestSellerPriorityMap.has(a.name);
        const bIsBestSeller = bestSellerPriorityMap.has(b.name);

        if (aIsBestSeller !== bIsBestSeller) {
          return aIsBestSeller ? -1 : 1;
        }

        if (aIsBestSeller && bIsBestSeller) {
          return bestSellerPriorityMap.get(a.name) - bestSellerPriorityMap.get(b.name);
        }

        const aPriority = manualPriorityMap.has(a.name) ? manualPriorityMap.get(a.name) : Number.MAX_SAFE_INTEGER;
        const bPriority = manualPriorityMap.has(b.name) ? manualPriorityMap.get(b.name) : Number.MAX_SAFE_INTEGER;
        return aPriority - bPriority;
      });
    }

    const menSectionProducts = prioritizeSectionProducts(buildSectionProducts("men"), [
      "Khamrah Waha",
      "Ibraq Tobacco Collection",
      "Bleu de Chanel Eau de Parfum",
      "Spicebomb Extreme",
      "Valentino Uomo Born In Roma Intense"
    ]);
    const womenSectionProducts = prioritizeSectionProducts(buildSectionProducts("women"), [
      "Khamrah Waha",
      "Ibraq Tobacco Collection"
    ]);

    const menPerfumes = menSectionProducts.slice(0, 8);
    const extraMenPerfumes = menSectionProducts.slice(8, 16);
    const moreMenPerfumes = menSectionProducts.slice(16);

    const womenPerfumes = womenSectionProducts.slice(0, 8);
    const moreWomenPerfumes = womenSectionProducts.slice(8, 16);
    const latestWomenPerfumes = womenSectionProducts.slice(16);

    function inferType(name, price, detailText = "") {
      const lower = `${name || ""} ${detailText || ""}`.toLowerCase();
      if (lower.includes("vanilla") || lower.includes("opium") || lower.includes("khamra") || lower.includes("khamrah") || lower.includes("sweet") || lower.includes("caramel") || lower.includes("gourmand") || lower.includes("marshmallow") || lower.includes("chocolate") || lower.includes("candy") || lower.includes("praline") || lower.includes("tonka")) return "sweet";
      if (lower.includes("tobacco") || lower.includes("tobbaco") || lower.includes("oud") || lower.includes("night") || lower.includes("elixir") || lower.includes("roma") || lower.includes("spicy") || lower.includes("warm") || lower.includes("amber") || lower.includes("oriental") || lower.includes("incense") || lower.includes("leather") || lower.includes("smoky") || lower.includes("smoke") || lower.includes("intense") || lower.includes("intensely") || lower.includes("absolu") || lower.includes("absolutely")) return "evening";
      if (lower.includes("fresh") || lower.includes("citrus") || lower.includes("marine") || lower.includes("aqua") || lower.includes("aquatic") || lower.includes("bergamot") || lower.includes("green") || lower.includes("mint") || lower.includes("watery") || lower.includes("bleu de chanel") || lower.includes("acqua") || lower.includes("imagination") || lower.includes("issey") || lower.includes("sauvage") || lower.includes("y eau") || lower.includes("freeze") || lower.includes("sport")) return "fresh";
      if (lower.includes("musk") || lower.includes("musky") || lower.includes("powder") || lower.includes("powdery") || lower.includes("clean")) return "daily";
      if (price <= 1000) return "daily";
      if (price >= 1700 || lower.includes("royal") || lower.includes("velvet") || lower.includes("reserve")) return "luxury";
      return "luxury";
    }

    function inferLongevity(type, price) {
      if (type === "evening" || price >= 1800) return "10-12h";
      if (type === "sweet" || type === "luxury") return "8-10h";
      if (type === "fresh") return "6-8h";
      return "5-7h";
    }

    function inferSillage(type, price) {
      if (type === "evening" || type === "luxury" || price >= 1600) return "Strong";
      if (type === "sweet") return "Moderate";
      if (type === "fresh") return "Fresh trail";
      return "Soft";
    }

    function inferRating(type, price, index) {
      const base = price >= 1500 ? 4.8 : price >= 1000 ? 4.6 : 4.4;
      const typeBoost = type === "luxury" ? 0.1 : type === "evening" ? 0.05 : 0;
      return Math.min(5, base + typeBoost + ((index % 3) * 0.05)).toFixed(1);
    }

    function decorateProducts(list, section) {
      list.forEach((product, index) => {
        const sourceType = String(product.detailType || product.type || product.typeNote || "").trim();
        const type = inferType(product.name, product.price, sourceType);
        product.section = section;
        product.type = type;
        product.longevity = inferLongevity(type, product.price);
        product.sillage = inferSillage(type, product.price);
        product.rating = inferRating(type, product.price, index);
        product.stock = 18;
      });
    }

    decorateProducts(bestSellerProducts, "best");
    decorateProducts(extraBestSellerProducts, "best");
    decorateProducts(newArrivalProducts, "new");
    decorateProducts(menPerfumes, "men");
    decorateProducts(extraMenPerfumes, "men");
    decorateProducts(moreMenPerfumes, "men");
    decorateProducts(womenPerfumes, "women");
    decorateProducts(moreWomenPerfumes, "women");
    decorateProducts(latestWomenPerfumes, "women");

      const productDetailMap = {
        "Eclaire": {
          type: "Vanilla / Caramel / Gourmand",
          longevity: "Medium to high",
          sillage: "Moderate",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر حلو مستوحى من الحلويات يجمع بين الفانيليا والكراميل في رائحة دافئة وجذابة تعطي إحساس بالراحة والدلع.</p>
            <p><strong>النوع:</strong> فانيليا – كراميل – Gourmand</p>
            <p><strong>الثبات:</strong> متوسط إلى عالي</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> خروجات – شتاء</p>
            <p><strong>اللي يميزه:</strong><br>ريحة جذابة جدًا "تتاكل"</p>
          `
        },
        "Qissa Imperial Valley 200ml": {
          type: "Floral / Woody / Sweet",
          longevity: "High",
          sillage: "Moderate to strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر فاخر يونيسكس يجمع بين النعومة والفخامة في مزيج متوازن من الروائح الزهرية والخشبية مع لمسة حلوة خفيفة، مناسب لكل الأذواق.</p>
            <p><strong>النوع:</strong> Floral – Woody – Sweet</p>
            <p><strong>الثبات:</strong> عالي</p>
            <p><strong>الفوحان:</strong> متوسط إلى قوي</p>
            <p><strong>الاستخدام:</strong> يومي – مناسبات</p>
            <p><strong>اللي يميزه:</strong><br>حجم كبير + قيمة مقابل السعر</p>
          `
        },
        "Imagination": {
          type: "Fresh / Citrus / Clean",
          longevity: "Medium",
          sillage: "Moderate",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر منعش فاخر يجمع بين الحمضيات والروائح النظيفة مع لمسة شاي وأخشاب خفيفة، يعطي إحساس بالنظافة والرقي طوال اليوم.</p>
            <p><strong>النوع:</strong> Fresh – Citrus – Clean</p>
            <p><strong>الثبات:</strong> متوسط</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> يومي – صيف – شغل</p>
            <p><strong>اللي يميزه:</strong><br>نظافة وفخامة في نفس الوقت</p>
          `
        },
        "Tom Ford Tobacco Vanille": {
          type: "Tobacco / Vanilla / Spicy",
          longevity: "Very high",
          sillage: "Strong",
          rating: "5.0",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر فاخر جدًا يمزج بين التبغ والفانيليا في تركيبة غنية ودافئة تعكس الفخامة والتميز.</p>
            <p><strong>النوع:</strong> Tobacco – Vanilla – Spicy</p>
            <p><strong>الثبات:</strong> عالي جدًا</p>
            <p><strong>الفوحان:</strong> قوي</p>
            <p><strong>الاستخدام:</strong> شتاء – مناسبات</p>
            <p><strong>اللي يميزه:</strong><br>عطر High Class تقيل وجذاب</p>
          `
        },
        "Spicebomb Extreme": {
          type: "Spicy / Warm / Sweet",
          longevity: "Very high",
          sillage: "Strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر رجالي قوي يجمع بين التوابل الدافئة والفانيليا في مزيج جذاب يعكس القوة والرجولة.</p>
            <p><strong>النوع:</strong> Spicy – Warm – Sweet</p>
            <p><strong>الثبات:</strong> عالي جدًا</p>
            <p><strong>الفوحان:</strong> قوي</p>
            <p><strong>الاستخدام:</strong> شتاء – سهرات</p>
            <p><strong>اللي يميزه:</strong><br>واحد من أقوى العطور الرجالي</p>
          `
        },
        "Baccarat Rouge Master Box Original": {
          type: "Amber / Woody / Sweet",
          longevity: "Very high",
          sillage: "Very strong",
          rating: "5.0",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>بوكس فاخر من عطر باكارات روج الشهير، يجمع بين الفخامة والجاذبية في رائحة مميزة من العنبر والأخشاب بلمسة حلوة راقية.</p>
            <p><strong>النوع:</strong> Amber – Woody – Sweet</p>
            <p><strong>الثبات:</strong> عالي جدًا</p>
            <p><strong>الفوحان:</strong> قوي جدًا</p>
            <p><strong>الاستخدام:</strong> مناسبات – هدايا</p>
            <p><strong>اللي يميزه:</strong><br>أفخم اختيار ممكن تقدمه كهدية</p>
          `
        },
        "Burberry Her Box": {
          type: "Fruity / Sweet",
          longevity: "Medium",
          sillage: "Moderate",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>بوكس أنثوي أنيق من بربري يجمع بين الفراولة والتوت في رائحة ناعمة وجذابة، مثالي كهدية مميزة.</p>
            <p><strong>النوع:</strong> Fruity – Sweet</p>
            <p><strong>الثبات:</strong> متوسط</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> يومي – هدايا</p>
            <p><strong>اللي يميزه:</strong><br>بناتي جدًا وشيك</p>
          `
        },
        "Si Red (Armani Si)": {
          type: "Fruity / Floral / Sweet",
          longevity: "Medium to high",
          sillage: "Moderate",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر أنثوي راقي يجمع بين الفواكه والورد مع لمسة فانيليا ناعمة تعطي إحساس بالأنوثة والجاذبية.</p>
            <p><strong>النوع:</strong> Fruity – Floral – Sweet</p>
            <p><strong>الثبات:</strong> متوسط إلى عالي</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> يومي – خروجات</p>
            <p><strong>اللي يميزه:</strong><br>ناعم وجذاب جدًا</p>
          `
        },
        "Gucci Bloom": {
          type: "Floral / White Flowers",
          longevity: "Medium",
          sillage: "Moderate",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر زهري أنثوي يعكس الطبيعة والجمال، يحتوي على مزيج غني من الزهور البيضاء يمنح إحساس بالنعومة والرقي.</p>
            <p><strong>النوع:</strong> Floral – White Flowers</p>
            <p><strong>الثبات:</strong> متوسط</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> يومي – صيف</p>
            <p><strong>اللي يميزه:</strong><br>أنثوي ناعم وشيك جدًا</p>
          `
        },
        "Jean Paul Gaultier Le Male Le Parfum": {
          type: "Vanilla / Spicy / Warm",
          longevity: "Very high",
          sillage: "Strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر رجالي فخم وقوي يجمع بين الفانيليا والتوابل مع لمسة خشبية دافئة، يعطي إحساس بالثقة والجاذبية العالية. مناسب للرجل اللي عايز يلفت الانتباه بدون مجهود.</p>
            <p><strong>النوع:</strong> Vanilla – Spicy – Warm</p>
            <p><strong>الثبات:</strong> عالي جدًا</p>
            <p><strong>الفوحان:</strong> قوي</p>
            <p><strong>الاستخدام:</strong> سهرات – شتاء – ديت</p>
            <p><strong>اللي يميزه:</strong><br>جذاب جدًا والبنات بتحبه</p>
          `
        },
        "Sauvage": {
          type: "Bergamot / Pepper / Ambroxan",
          longevity: "8-12h",
          sillage: "High",
          rating: "4.0",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر رجالي منعش وقوي يجمع بين الفخامة والبساطة، ومن أشهر عطور العالم.</p>
            <p><strong>النوع:</strong> رجالي</p>
            <p><strong>النوتس:</strong><br>برجموت - فلفل - أمبروكسان</p>
            <p><strong>الثبات:</strong> من 8 إلى 12 ساعة.</p>
            <p><strong>الفوحان:</strong> عالي.</p>
            <p><strong>الاستخدام:</strong> لكل الأوقات - يومي - مناسبات.</p>
          `
        },
        "Bleu de Chanel Eau de Parfum": {
          type: "Fresh / Woody / Incense",
          longevity: "High",
          sillage: "Moderate to strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر راقي يجمع بين الانتعاش والأناقة في مزيج من الحمضيات والأخشاب مع لمسة بخور خفيفة تعطيه طابع فخم.</p>
            <p><strong>النوع:</strong> Fresh – Woody – Incense</p>
            <p><strong>الثبات:</strong> عالي</p>
            <p><strong>الفوحان:</strong> متوسط إلى قوي</p>
            <p><strong>الاستخدام:</strong> يومي – رسمي – مقابلات</p>
            <p><strong>اللي يميزه:</strong><br>كلاسيك شيك لأي وقت</p>
          `
        },
        "Valentino Uomo Born In Roma Intense": {
          type: "Sweet / Amber / Warm",
          longevity: "High",
          sillage: "Moderate to strong",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر رجالي دافئ وجذاب يجمع بين الفانيليا والعنبر مع لمسة خشبية تعطيه طابع عصري وجريء.</p>
            <p><strong>النوع:</strong> Sweet – Amber – Warm</p>
            <p><strong>الثبات:</strong> عالي</p>
            <p><strong>الفوحان:</strong> متوسط إلى قوي</p>
            <p><strong>الاستخدام:</strong> سهرات – ديت – شتاء</p>
            <p><strong>اللي يميزه:</strong><br>شبابي وجذاب جدًا</p>
          `
        },
        "Prada Paradoxe Intense": {
          type: "Floral / Vanilla / Sweet",
          longevity: "High",
          sillage: "Moderate",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر أنثوي فاخر يجمع بين الزهور البيضاء والفانيليا في مزيج ناعم وقوي في نفس الوقت يعكس الأنوثة والجاذبية.</p>
            <p><strong>النوع:</strong> Floral – Vanilla – Sweet</p>
            <p><strong>الثبات:</strong> عالي</p>
            <p><strong>الفوحان:</strong> متوسط</p>
            <p><strong>الاستخدام:</strong> يومي – خروجات – مناسبات</p>
            <p><strong>اللي يميزه:</strong><br>أنثوي شيك وناعم</p>
          `
        },
        "Stronger With You Intensely": {
          type: "Sweet / Warm / Spicy",
          longevity: "Very high",
          sillage: "Strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الوصف:</strong><br>عطر رجالي دافئ جدًا يجمع بين الفانيليا والتوفي مع لمسة توابل تعطيه طابع جذاب ومثير، مثالي للديت والسهرات.</p>
            <p><strong>النوع:</strong> Sweet – Warm – Spicy</p>
            <p><strong>الثبات:</strong> عالي جدًا</p>
            <p><strong>الفوحان:</strong> قوي</p>
            <p><strong>الاستخدام:</strong> ديت – شتاء – سهرات</p>
            <p><strong>اللي يميزه:</strong><br>من أقوى عطور الجاذبية الرجالي</p>
          `
        },
        "Le Male Elixir": {
          type: "Vanilla / Amber / Lavender",
          longevity: "8-12h",
          sillage: "Very strong",
          rating: "5.0",
          detailsHtml: `
            <p><strong>الريحة:</strong><br>فانيليا + أمبر + لمسة لافندر<br>سويت تقيل مع سبايسي خفيف.</p>
            <p><strong>الإحساس:</strong><br>جذاب جدًا، راجل واثق ومغناطيسي، ومن البرفانات اللي بتشد الانتباه جامد.</p>
            <p><strong>الاستخدام:</strong><br>سهر – ديت – شتوي.</p>
            <p><strong>الثبات:</strong> عالي جدًا وممكن يوصل من 8 لـ 12 ساعة.</p>
            <p><strong>الفوحان:</strong> قوي جدًا وبيتلاحظ بسهولة.</p>
            <p><strong>اللي يميزه:</strong><br>تقيل وفخم ويديك حضور واضح من أول رشة.</p>
          `
        },
        "Khamrah Waha": {
          type: "Vanilla / Amber / Dates / Musk",
          longevity: "Very high",
          sillage: "Strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الريحة:</strong><br>فانيليا + عنبر + تمر + مسك<br>نسخة أكثر رقة ونعومة من عائلة خُمرة، بحلاوة شرقية دافئة.</p>
            <p><strong>الإحساس:</strong><br>فخم وناعم في نفس الوقت، إحساس واحة دافئة وسط أجواء شرقية غنية.</p>
            <p><strong>الاستخدام:</strong><br>سهر – مناسبات – خريفي وشتوي.</p>
            <p><strong>الثبات:</strong> عالي جدًا.</p>
            <p><strong>الفوحان:</strong> قوي وبيسيب أثر واضح لساعات طويلة.</p>
            <p><strong>اللي يميزه:</strong><br>توازن مثالي بين الحلاوة والدفء، اختيار مثالي لمحبي عائلة خُمرة اللي عايزين نفحة مختلفة وأرقى.</p>
          `
        },
        "Ibraq Tobacco Collection": {
          type: "Tobacco / Spices / Amber / Oud",
          longevity: "Very high",
          sillage: "Strong",
          rating: "4.8",
          detailsHtml: `
            <p><strong>الريحة:</strong><br>تبغ + توابل دافئة + عنبر + لمسة عود<br>ريحة شرقية غنية بطابع رجالي فخم.</p>
            <p><strong>الإحساس:</strong><br>قوي وجذاب، إحساس بالثقة والفخامة من أول بخة.</p>
            <p><strong>الاستخدام:</strong><br>سهر – مناسبات رسمية – شتوي.</p>
            <p><strong>الثبات:</strong> عالي جدًا.</p>
            <p><strong>الفوحان:</strong> قوي جدًا وبيسيب بصمة مميزة.</p>
            <p><strong>اللي يميزه:</strong><br>علبة كوليكشن فاخرة وريحة تبغ دافئة تناسب الشخصية القوية والواثقة.</p>
          `
        },
        "Khamrah Classic": {
          type: "Vanilla / Cinnamon / Musk / Dates",
          longevity: "Very high",
          sillage: "Strong",
          rating: "5.0",
          detailsHtml: `
            <p><strong>الريحة:</strong><br>فانيليا + قرفة + مسك + تمر<br>ريحة شرقي تقيل وسويت دافئ.</p>
            <p><strong>الإحساس:</strong><br>فخم جدًا، دافي ومغري، وشبه برفانات غالية جدًا من فئة niche.</p>
            <p><strong>الاستخدام:</strong><br>سهر – مناسبات – شتوي.</p>
            <p><strong>الثبات:</strong> عالي جدًا.</p>
            <p><strong>الفوحان:</strong> قوي وبيسيب أثر واضح.</p>
            <p><strong>اللي يميزه:</strong><br>كلاسيك شرقي تقيل، مناسب للي عايز ريحة فخمة ومميزة.</p>
          `
        },
        "Khamrah Qahwa": {
          type: "Coffee / Vanilla / Spices",
          longevity: "High",
          sillage: "Moderate to strong",
          rating: "4.9",
          detailsHtml: `
            <p><strong>الريحة:</strong><br>قهوة + فانيليا + توابل<br>سويت لكن فيه مرارة قهوة خفيفة ومميزة.</p>
            <p><strong>الإحساس:</strong><br>مختلف جدًا، دافي وغامض، ويدي vibe تقيل ومثير.</p>
            <p><strong>الاستخدام:</strong><br>شتوي – سهر – ديت.</p>
            <p><strong>الثبات:</strong> عالي.</p>
            <p><strong>الفوحان:</strong> من متوسط إلى عالي.</p>
            <p><strong>اللي يميزه:</strong><br>أفضل اختيار لو عايز خُمرة بطابع قهوة أوضح ومود أدفى.</p>
          `
        },
        "Diamond Emerald Soul 200ml": {
          type: "Fresh / Aromatic / Woody",
          longevity: "Clean all day",
        sillage: "Soft elegant trail",
        rating: "4.9",
        detailsHtml: `
          <p><strong>النوع:</strong> Fresh / Aromatic / Woody خفيف</p>
          <p><strong>الفيب:</strong> نظيف – شيك – رايق</p>
          <p><strong>التفاصيل:</strong><br>غالبًا فيه نوتات خضرا (Green Notes) + أخشاب خفيفة<br>ريحته قريبة من البرفانات الـ Fresh الراقية</p>
          <p><strong>مناسب جدًا:</strong><br>الصبح<br>الشغل / الجامعة<br>الصيف</p>
          <p><strong>اللي يميزه:</strong><br>هادي ومش مزعج<br>"Clean smell" تحس إنك نضيف طول اليوم<br>سيف اختيار لو عايز حاجة كلاسيك شيك</p>
        `
      },
      "Nude Coral Diamond": {
        type: "Sweet / Vanilla / Gourmand",
        longevity: "Warm long lasting",
        sillage: "Very noticeable",
        rating: "4.9",
        detailsHtml: `
          <p><strong>النوع:</strong> Sweet / Vanilla / Gourmand</p>
          <p><strong>الفيب:</strong> دافي – سكسي – ملفت</p>
          <p><strong>التفاصيل:</strong><br>فيه فانيليا + كراميل + ممكن مسك<br>داخل في جو البرفانات الحلوة اللي بتشد</p>
          <p><strong>مناسب لـ:</strong><br>خروجات بليل<br>ديت<br>شتاء / أماكن مكيفة</p>
          <p><strong>اللي يميزه:</strong><br>ريحة "تتاكل" 🔥<br>ملفت جدًا وبيسيب أثر<br>حلو للبنات أكتر بس ينفع يونيسكس لو تقيل شوية</p>
        `
      },
      "Lahab - Hersh": {
        type: "Oriental / Spicy / Oud",
        longevity: "Heavy signature",
        sillage: "Strong royal trail",
        rating: "5.0",
        detailsHtml: `
          <p><strong>النوع:</strong> Oriental / Spicy / Oud</p>
          <p><strong>الفيب:</strong> فخم – تقيل – ملكي 👑</p>
          <p><strong>التفاصيل:</strong><br>غالبًا فيه:<br>عود<br>عنبر<br>توابل<br>لمسة حلوة خفيفة</p>
          <p><strong>مناسب لـ:</strong><br>السهرات<br>المناسبات<br>الشتاء</p>
          <p><strong>اللي يميزه:</strong><br>فخم جدًا وريحتك تبان من بعيد<br>شخصية قوية<br>"Signature scent" تقيل</p>
        `
      },
      "Wild Cold 200ml": {
        type: "Leather / Oud / Smoky",
        longevity: "9-12h",
        sillage: "Very strong",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر جريء وقوي جدًا، فيه لمسة جلد وعود تخليه ملفت ومناسب للشخصية القوية.</p>
          <p><strong>النوع:</strong> للجنسين ويميل رجالي.</p>
          <p><strong>الطابع:</strong> جلد - عود - سموكي</p>
          <p><strong>النوتس:</strong><br>توابل - جلد - عود - عنبر - دخان</p>
          <p><strong>الثبات:</strong> من 9 إلى 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي جدًا.</p>
          <p><strong>مناسب:</strong><br>سهرات - خروجات ليل - شخصية جريئة.</p>
        `
      },
      "Assaf Angel 200ml": {
        type: "Sweet / Caramel / Vanilla",
        longevity: "7-9h",
        sillage: "Strong",
        rating: "4.8",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر دافئ ومغري بطابع حلو وفخم، مناسب للرجال والنساء خصوصًا في الأجواء الليلية.</p>
          <p><strong>النوع:</strong> يونيسكس.</p>
          <p><strong>المقدمة:</strong><br>فواكه - كراميل</p>
          <p><strong>القلب:</strong><br>عسل - نوتات زهرية</p>
          <p><strong>القاعدة:</strong><br>فانيليا - باتشولي</p>
          <p><strong>الثبات:</strong> من 7 إلى 9 ساعات.</p>
          <p><strong>الفوحان:</strong> قوي.</p>
          <p><strong>مناسب:</strong><br>سهرات - مناسبات.</p>
        `
      },
      "Assaf Pink Lady 200ml": {
        type: "Fruity / Floral / Soft Musk",
        longevity: "5-6h",
        sillage: "Light to moderate",
        rating: "4.6",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر ناعم وخفيف مناسب للاستخدام اليومي، بإحساس لطيف ومرتب بدون ما يكون مزعج.</p>
          <p><strong>النوع:</strong> يونيسكس.</p>
          <p><strong>المقدمة:</strong><br>تفاح - توت</p>
          <p><strong>القلب:</strong><br>ورد - بيوني</p>
          <p><strong>القاعدة:</strong><br>مسك - فانيليا خفيفة</p>
          <p><strong>الثبات:</strong> من 5 إلى 6 ساعات.</p>
          <p><strong>الفوحان:</strong> من خفيف إلى متوسط.</p>
          <p><strong>مناسب:</strong><br>جامعة - شغل.</p>
        `
      },
      "Diamond Pink Score 200ml": {
        type: "Citrus / Floral / Amber",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.7",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر شيك وفخم بلمسة كلاسيك راقية، مناسب للي يحب الستايل النضيف والرسمي.</p>
          <p><strong>النوع:</strong> يونيسكس.</p>
          <p><strong>المقدمة:</strong><br>حمضيات - فلفل وردي</p>
          <p><strong>القلب:</strong><br>ورد - ياسمين</p>
          <p><strong>القاعدة:</strong><br>مسك - عنبر</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>مناسب:</strong><br>مناسبات - خروجات رسمية.</p>
        `
      },
      "One & Only 200ml": {
        type: "Sweet / Musk / Soft",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر ناعم وجذاب، بسيط لكنه أنيق جدًا ويخلي اللي حواليك يحسوا بيك بدون مبالغة.</p>
          <p><strong>النوع:</strong> للجنسين.</p>
          <p><strong>الطابع:</strong> سويت - مسك - ناعم</p>
          <p><strong>النوتس:</strong><br>فواكه خفيفة - زهور - مسك - فانيليا</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>مناسب:</strong><br>يومي - جامعة - شغل.</p>
        `
      },
      "La Luna 200ml": {
        type: "Floral / Sweet / Romantic",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي ساحر، مزيج بين الحلاوة والزهور بإحساس رومانسي هادي.</p>
          <p><strong>النوع:</strong> حريمي.</p>
          <p><strong>الطابع:</strong> فلورال - سويت - رومانسي</p>
          <p><strong>النوتس:</strong><br>فواكه - زهور - فانيليا - مسك</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>مناسب:</strong><br>خروجات - ديت - مناسبات.</p>
        `
      },
      "Issey Miyake": {
        type: "Fresh / Watery / Clean",
        longevity: "5-7h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر فريش ونظيف جدًا، إحساسه زي نسمة هوا منعشة، مناسب للصيف والحر.</p>
          <p><strong>النوع:</strong> رجالي.</p>
          <p><strong>الطابع:</strong> فريش - مائي - نظيف</p>
          <p><strong>النوتس:</strong><br>حمضيات - مائي - زهور - خشب خفيف</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>مناسب:</strong><br>صيف - يومي - جامعة.</p>
        `
      },
      "Spanish Tobacco": {
        type: "Tobacco / Sweet / Warm",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر تبغ حلو ودافئ، مزيج بين الفانيليا والتبغ بشكل جذاب وفخم.</p>
          <p><strong>النوع:</strong> للجنسين.</p>
          <p><strong>الطابع:</strong> تبغ - سويت - دافئ</p>
          <p><strong>النوتس:</strong><br>توابل - تبغ - فانيليا - عنبر</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>مناسب:</strong><br>شتاء - سهرات.</p>
        `
      },
      "Arabian Tobacco": {
        type: "Tobacco / Oud / Oriental",
        longevity: "9-12h",
        sillage: "Very strong",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>تبغ شرقي تقيل مع لمسة عود، عطر قوي جدًا وفخم لعشاق الروائح الشرقية.</p>
          <p><strong>النوع:</strong> رجالي ويميل يونيسكس.</p>
          <p><strong>الطابع:</strong> تبغ - عود - شرقي</p>
          <p><strong>النوتس:</strong><br>توابل - تبغ - عود - عنبر - مسك</p>
          <p><strong>الثبات:</strong> من 9 إلى 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي جدًا.</p>
          <p><strong>مناسب:</strong><br>مناسبات - شتاء - شخصية قوية.</p>
        `
      },
      "Khamrah 40ml": {
        type: "Sweet / Spicy / Oriental",
        longevity: "10-12h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر شرقي دافئ جدًا، مزيج بين القرفة والتمر والفانيليا يدي إحساس فاخر ومميز.</p>
          <p><strong>النوع:</strong> للجنسين.</p>
          <p><strong>الطابع:</strong> سويت - سبايسي - شرقي</p>
          <p><strong>النوتس:</strong><br>قرفة - تمر - سويت - فانيليا - عنبر</p>
          <p><strong>الثبات:</strong> من 10 إلى 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>مناسب:</strong><br>شتاء - سهرات - مناسبات.</p>
        `
      },
      "Acqua di Giò Eau de Toilette": {
        type: "Fresh / Citrus / Watery",
        longevity: "5-7h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر رجالي منعش جدًا مستوحى من البحر والطبيعة، مناسب للاستخدام اليومي وخصوصًا في الصيف.</p>
          <p><strong>النوتس:</strong><br>ليمون - برجموت - ياسمين - نوتس مائية - مسك - خشب</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>نضيف - فريش - مريح جدًا.</p>
        `
      },
      "Lattafa His Confession": {
        type: "Spicy / Amber / Vanilla",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر غامض وجذاب جدًا، مناسب للليل والمناسبات.</p>
          <p><strong>النوتس:</strong><br>بهارات - عنبر - فانيليا</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>تقيل - سكسي - ملفت.</p>
        `
      },
      "Lattafa Her Confession": {
        type: "Sweet / Amber / Musk",
        longevity: "8-10h",
        sillage: "Moderate to high",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي غامض وجذاب جدًا، معمول للبنت اللي بتحب تكون ملفتة ومميزة. ريحته دافئة وسكسي، مناسبة للمساء والديتات.</p>
          <p><strong>النوتس:</strong><br>فواكه حلوة - لمسة منعشة - زهور - عنبر - فانيليا - مسك - خشب</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> من متوسط إلى عالي.</p>
          <p><strong>اللي يميزه:</strong><br>جذاب جدًا - فيه حلاوة ناعمة - مناسب للسهرات والليل.</p>
        `
      },
      "Berry on Top": {
        type: "Fruity / Sweet / Musk",
        longevity: "5-7h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر فاكهي سكري منعش، مليان طاقة وأنوثة، مناسب للبنات اللي بتحب الروائح المرحة.</p>
          <p><strong>النوتس:</strong><br>توت - فراولة - زهور خفيفة - سكر - مسك</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>منعش - كيوت - شبابي جدًا.</p>
        `
      },
      "Choco Overdose": {
        type: "Chocolate / Vanilla / Caramel",
        longevity: "7-9h",
        sillage: "Moderate to high",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر شوكولاتة تقيل ودافي، مناسب للي بتحب الروائح الغنية والمميزة.</p>
          <p><strong>النوتس:</strong><br>كاكاو - شوكولاتة - فانيليا - كراميل</p>
          <p><strong>الثبات:</strong> من 7 إلى 9 ساعات.</p>
          <p><strong>الفوحان:</strong> من متوسط إلى عالي.</p>
          <p><strong>اللي يميزه:</strong><br>دافي - تقيل - مغري جدًا.</p>
        `
      },
      "Cookie Crave": {
        type: "Cookie / Vanilla / Creamy",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر حلو كريمي زي البسكويت، بيدي إحساس دافي ومريح جدًا.</p>
          <p><strong>النوتس:</strong><br>بسكويت - فانيليا - سكر - زبدة</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>Comfort - Cozy vibes.</p>
        `
      },
      "Vanilla Freak": {
        type: "Vanilla / Creamy / Musk",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر فانيليا كريمي ناعم، بسيط لكنه جذاب جدًا، مناسب لكل يوم.</p>
          <p><strong>النوتس:</strong><br>فانيليا - كريمة - سكر - مسك</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>ناعم - أنثوي - محبوب جدًا.</p>
        `
      },
      "Mallow Madness": {
        type: "Sugar / Marshmallow / Vanilla",
        longevity: "5-7h",
        sillage: "Light to moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر سكري لطيف زي المارشميلو، مناسب للبنات اللي بتحب الروائح الكيوت الخفيفة.</p>
          <p><strong>النوتس:</strong><br>سكر - مارشميلو - فانيليا - مسك</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> من خفيف إلى متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>كيوت جدًا - Girly vibes.</p>
        `
      },
      "Lattafa Musamam": {
        type: "Oud / Amber / Vanilla",
        longevity: "10-12h",
        sillage: "Very high",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر شرقي فاخر وتقيل جدًا، مناسب للناس اللي بتحب الريحة القوية والفخمة اللي تفضل ثابتة طول اليوم.</p>
          <p><strong>النوتس:</strong><br>بهارات - عود - عنبر - فانيليا - خشب</p>
          <p><strong>الثبات:</strong> من 10 إلى 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي جدًا.</p>
          <p><strong>اللي يميزه:</strong><br>تقيل - شرقي - فخم جدًا.</p>
        `
      },
      "Lattafa Musamam White": {
        type: "Fresh / Floral / Musk",
        longevity: "7-9h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>نسخة أخف وأنعم من Musamam، بتجمع بين الفخامة والنعومة، مناسبة للاستخدام اليومي والمناسبات.</p>
          <p><strong>النوتس:</strong><br>نوتات منعشة - زهور - فانيليا - مسك</p>
          <p><strong>الثبات:</strong> من 7 إلى 9 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>ناعم - شيك - أسهل في اللبس من النسخة الأصلية.</p>
        `
      },
      "Hudson Valley Perfume": {
        type: "Fruity / Floral / Woody",
        longevity: "8-10h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر فاخر وهادئ بلمسة نظيفة وراقية، مناسب للي عايز يبقى مختلف ومميز.</p>
          <p><strong>النوتس:</strong><br>فواكه - زهور - خشب</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>Elegant - مختلف.</p>
        `
      },
      "Baccarat Rouge 540 40ml": {
        type: "Saffron / Amber / Sweet",
        longevity: "12h+",
        sillage: "Very high",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>واحد من أفخم العطور في العالم، ريحته مميزة جدًا ومش شبه أي حاجة.</p>
          <p><strong>النوتس:</strong><br>زعفران - ياسمين - عنبر - سكر</p>
          <p><strong>الثبات:</strong> أكثر من 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي جدًا.</p>
          <p><strong>اللي يميزه:</strong><br>Luxury - ملفت جدًا.</p>
        `
      },
      "Amira Al Arab": {
        type: "Oriental / Fruity / Vanilla",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر شرقي أنثوي جذاب، مناسب للناس اللي بتحب الريحة التقيلة الفخمة.</p>
          <p><strong>النوتس:</strong><br>فواكه - ورد - فانيليا</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>شرقي - ملفت.</p>
        `
      },
      "Laverne Sense": {
        type: "Floral / Vanilla / Soft",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر ناعم وأنثوي، مناسب للاستخدام اليومي.</p>
          <p><strong>النوتس:</strong><br>زهور - فانيليا</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>ناعم - يومي.</p>
        `
      },
      "Carolina Herrera 212 VIP Rose": {
        type: "Champagne / Rose / Musk",
        longevity: "7-9h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي فخم مناسب للسهرات والمناسبات.</p>
          <p><strong>النوتس:</strong><br>شمبانيا - ورد - مسك</p>
          <p><strong>الثبات:</strong> من 7 إلى 9 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>شيك - حفلات.</p>
        `
      },
      "Hugo Boss The Scent Elixir For Her": {
        type: "Vanilla / Amber / Floral",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي قوي وجذاب، مناسب للمساء والجو الراقي.</p>
          <p><strong>النوتس:</strong><br>فانيليا - عنبر - زهور</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>جذاب - فخم.</p>
        `
      },
      "Valentino Donna Born in Roma": {
        type: "Vanilla / Jasmine / Woody",
        longevity: "8-10h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي راقي جدًا، يجمع بين الفخامة والنعومة.</p>
          <p><strong>النوتس:</strong><br>فانيليا - ياسمين - خشب</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>Elegant - attractive.</p>
        `
      },
      "Elie Saab Girl of Now": {
        type: "Pistachio / Almond / Vanilla",
        longevity: "10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر حلو دافئ وفخم، مناسب للشتا.</p>
          <p><strong>النوتس:</strong><br>فستق - لوز - فانيليا</p>
          <p><strong>الثبات:</strong> حوالي 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>Gourmand - ملفت.</p>
        `
      },
      "Paco Rabanne Olympea": {
        type: "Vanilla / Salty / Floral",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر قوي وأنثوي جدًا، ملفت ومميز.</p>
          <p><strong>النوتس:</strong><br>فانيليا - ملح - زهور</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>مختلف - جذاب.</p>
        `
      },
      "Victoria's Secret Bombshell": {
        type: "Fresh / Fruity / Musk",
        longevity: "4-6h",
        sillage: "Light",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي منعش وشبابي جدًا، مناسب للبنات اللي بتحب الروائح الخفيفة والنضيفة للاستخدام اليومي.</p>
          <p><strong>النوتس:</strong><br>فواكه حمضية - زهور - مسك خفيف</p>
          <p><strong>الثبات:</strong> من 4 إلى 6 ساعات.</p>
          <p><strong>الفوحان:</strong> خفيف.</p>
          <p><strong>اللي يميزه:</strong><br>نضيف - فريش - مناسب للجامعة والخروجات.</p>
        `
      },
      "Victoria's Secret Very Sexy": {
        type: "Fruity / Floral / Vanilla",
        longevity: "5-7h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي جريء وجذاب، مناسب للسهرات والديتات، بيدي إحساس بالثقة والأنوثة.</p>
          <p><strong>النوتس:</strong><br>فواكه - زهور - فانيليا</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>جذاب - ملفت - سكسي.</p>
        `
      },
      "Victoria's Secret Noir Tease": {
        type: "Warm / Vanilla / Musk",
        longevity: "5-7h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر أنثوي دافئ ومغري، مناسب للمساء والمناسبات الخاصة.</p>
          <p><strong>النوتس:</strong><br>فواكه - زهور - فانيليا - مسك</p>
          <p><strong>الثبات:</strong> من 5 إلى 7 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>ناعم - سكسي - مناسب لليل.</p>
        `
      },
      "Hugo Boss Bottled Elixir": {
        type: "Incense / Patchouli / Woody",
        longevity: "10-12h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر فاخر وقوي من Boss، بيعكس الرجولة والثقة، مناسب للشتا والمناسبات الرسمية.</p>
          <p><strong>النوتس:</strong><br>بخور - كارداموم - باتشولي - فانيليا - خشب</p>
          <p><strong>الثبات:</strong> من 10 إلى 12 ساعة.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>فخم - تقيل - برفان VIP.</p>
        `
      },
      "Versace Eros Eau de Toilette": {
        type: "Mint / Vanilla / Woody",
        longevity: "7-9h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر رجالي جذاب وشبابي جدًا، مثالي للديتات والخروجات والسهر.</p>
          <p><strong>النوتس:</strong><br>نعناع - ليمون - تفاح - تونكا - فانيليا - خشب</p>
          <p><strong>الثبات:</strong> من 7 إلى 9 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>ملفت جدًا - مغري - محبوب من البنات.</p>
        `
      },
      "Versace Eros Flame": {
        type: "Warm / Spicy / Vanilla",
        longevity: "8-10h",
        sillage: "High",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>نسخة أدفى وأقوى من Eros، فيها طابع حار وجذاب جدًا.</p>
          <p><strong>النوتس:</strong><br>ليمون - فلفل - ورد - بهارات - فانيليا - خشب</p>
          <p><strong>الثبات:</strong> من 8 إلى 10 ساعات.</p>
          <p><strong>الفوحان:</strong> عالي.</p>
          <p><strong>اللي يميزه:</strong><br>حار - جذاب - مناسب للشتا.</p>
        `
      },
      "Dolce & Gabbana The One Eau de Parfum": {
        type: "Tobacco / Amber / Spicy",
        longevity: "6-8h",
        sillage: "Moderate",
        rating: "4.0",
        detailsHtml: `
          <p><strong>الوصف:</strong><br>عطر رجالي كلاسيكي فاخر، مناسب للرجال اللي بتحب الأناقة والرقي.</p>
          <p><strong>النوتس:</strong><br>جريب فروت - كزبرة - زنجبيل - هيل - تبغ - عنبر</p>
          <p><strong>الثبات:</strong> من 6 إلى 8 ساعات.</p>
          <p><strong>الفوحان:</strong> متوسط.</p>
          <p><strong>اللي يميزه:</strong><br>شيك جدًا - هادي - مناسب للبدل والمناسبات.</p>
        `
      }
    };

    const brandCatalog = window.ovaBrandCatalog || {};
    const searchableBrandProducts = sectionBrandKeys.flatMap((brandKey) => {
      const brand = brandCatalog[brandKey];
      return (brand?.products || []).map((product) => ({
        ...product,
        brandKey,
        brandTitle: brand.title || brandKey
      }));
    });
    const brandProducts = uniqueProductsByName(searchableBrandProducts);
    decorateProducts(brandProducts, "brand");

    [...bestSellerProducts, ...extraBestSellerProducts, ...menPerfumes, ...extraMenPerfumes, ...moreMenPerfumes, ...womenPerfumes, ...moreWomenPerfumes, ...latestWomenPerfumes, ...brandProducts].forEach((product) => {
      if (productDetailMap[product.name]) {
        const detailType = productDetailMap[product.name].type;
        Object.assign(product, productDetailMap[product.name]);
        if (detailType) product.detailType = detailType;
      }
      product.filterTypes = deriveFilterTypes(product);
    });

    function mergeProductData(target, source) {
      if (!target) return source ? { ...source } : target;
      if (!source) return target;

      Object.keys(source).forEach((key) => {
        const value = source[key];

        if (Array.isArray(value)) {
          if (!value.length) return;
          target[key] = [...new Set([...(Array.isArray(target[key]) ? target[key] : []), ...value])];
          return;
        }

        if (typeof value === "string") {
          if (!value.trim()) return;
          if (!String(target[key] || "").trim() || (key === "detailsHtml" && value.length > String(target[key] || "").length)) {
            target[key] = value;
          }
          return;
        }

        if (typeof value === "number") {
          if (!value && target[key]) return;
          target[key] = value;
          return;
        }

        if (value !== undefined && value !== null) target[key] = value;
      });

      return target;
    }

    function uniqueProductsByName(list) {
      const merged = new Map();
      list.forEach((product) => {
        const key = String(product?.name || "").trim().toLowerCase();
        if (!key) return;
        const existing = merged.get(key);
        merged.set(key, existing ? mergeProductData(existing, product) : { ...product });
      });
      return [...merged.values()];
    }

    function normalizeSearchTerm(value) {
      return String(value || "")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u064B-\u065F\u0670]/g, "")
        .replace(/[أإآٱ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, " ")
        .trim();
    }

    function searchTermTokens(value) {
      const normalized = normalizeSearchTerm(value);
      return normalized ? normalized.split(/\s+/) : [];
    }

    function matchesSearchAlias(searchTerm, aliases) {
      const normalizedTerm = normalizeSearchTerm(searchTerm);
      const tokens = searchTermTokens(searchTerm);

      return aliases.some((alias) => {
        const normalizedAlias = normalizeSearchTerm(alias);
        if (!normalizedAlias) return false;

        if (normalizedAlias.length <= 2) {
          return tokens.includes(normalizedAlias);
        }

        if (normalizedTerm === normalizedAlias || normalizedTerm.includes(normalizedAlias)) {
          return true;
        }

        return false;
      });
    }

    function escapeRegExp(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function stripHtmlForSearch(value) {
      return String(value || "").replace(/<[^>]*>/g, " ");
    }

    function debounce(fn, wait = 120) {
      let timer = null;
      return function (...args) {
        const context = this;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => fn.apply(context, args), wait);
      };
    }

    function scheduleIdleWork(task, timeout = 1200) {
      if (typeof task !== "function") return;
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => task(), { timeout });
        return;
      }
      window.setTimeout(task, Math.min(timeout, 250));
    }

    // Brand mapping for comprehensive search - updated with actual perfume names
    const brandMap = {
      "yves saint laurent": ["Yves Saint Laurent Y Eau de Parfum"],
      "ysl": ["Yves Saint Laurent Y Eau de Parfum"],
      "y": ["Yves Saint Laurent Y Eau de Parfum"],
      "stronger": ["STRONGER WITH YOU INSENSELY", "Yves Saint Laurent Y Eau de Parfum"],
      "armani": ["STRONGER WITH YOU INSENSELY", "LIBRA INTENSE"],
      "giorgio armani": ["STRONGER WITH YOU INSENSELY", "LIBRA INTENSE"],
      "versace": ["VERSACE EROS", "1 MILLION"],
      "dior": ["DIOR HOMME INTENSE", "DIOR SAUVAGE", "Dior J'adore Eau de Parfum", "BLACK OPIUM"],
      "chanel": ["BLUE DE CHANEL", "BLACK OPIUM"],
      "tom ford": ["TOM FORD TOBBACO VANILLE"],
      "prada": ["PRADA PARADOXE"],
      "burbeerry": ["BURBEERY HER ELIXIR"],
      "kayali": ["KAYALY VANILLA 28"],
      "libra": ["LIBRA INTENSE"],
      "spicebomb": ["SPICEBOMB EXTREME"],
      "jadore": ["Dior J'adore Eau de Parfum"],
      "opium": ["BLACK OPIUM"],
      "le male": ["LE MALE ELIXIR"],
      "1 million": ["1 MILLION"],
      "sauvage": ["DIOR SAUVAGE"],
      "blue de chanel": ["BLUE DE CHANEL"],
      "tobacco": ["TOM FORD TOBBACO VANILLE"],
      "la belle": ["LA BELLE LE PARFUME"]
    };

    const brandSearchAliases = {
      armani: ["ارماني", "أرماني", "جورجيو ارماني", "جورجيو أرماني"],
      "giorgio armani": ["ارماني", "أرماني", "جورجيو ارماني", "جورجيو أرماني"],
      dior: ["ديور"],
      lattafa: ["لطافة", "لطافه"],
      kayali: ["كايالي", "كاي علي", "كيالي"],
      jeanpaulgaultier: ["جان بول جوتييه", "جان بول جولتير", "جي بي جي"],
      "jean paul gaultier": ["جان بول جوتييه", "جان بول جولتير", "جي بي جي"],
      xerjoff: ["زيرجوف", "زرجوف"],
      rarescents: ["ابراهيم القرشي", "إبراهيم القرشي", "القرشي"],
      "ibrahim al qurashi": ["ابراهيم القرشي", "إبراهيم القرشي", "القرشي"],
      versace: ["فيرساتشي", "فيرزاتشي", "فرساتشي"],
      tomford: ["توم فورد"],
      "tom ford": ["توم فورد"]
    };

    const productSearchAliases = {
      "Acqua di Giò Eau de Toilette": ["اكوا دي جيو", "أكوا دي جيو", "اكوا دي جيو تواليت"],
      "Ameer Al Oud": ["امير العود", "أمير العود"],
      "Armani My Way Eau de Parfum": ["ارماني ماي واي", "أرماني ماي واي", "ماي واي"],
      "Armani Sì (Original)": ["ارماني سي", "أرماني سي", "سي ارماني"],
      "Armani Sì Eau de Parfum": ["ارماني سي", "أرماني سي", "سي ارماني"],
      "Armani Sì Passione Eau de Parfum": ["ارماني سي باشن", "أرماني سي باشن", "سي باشن"],
      Asad: ["اسد", "أسد"],
      "Asad Bourbon": ["اسد بوربون", "أسد بوربون"],
      "Asad Zanzibar": ["اسد زنجبار", "أسد زنجبار"],
      "Baccarat Rouge 540 40ml": ["باكارات روج 540", "باكارات 540", "باكارات روج"],
      "Baccarat Rouge Master Box Original": ["باكارات روج ماستر بوكس", "باكارات ماستر بوكس"],
      "Berry on Top": ["بيري اون توب", "بيري"],
      "Bleu de Chanel Eau de Parfum": ["بلو دي شانيل", "بلو شانيل"],
      "Boujee Marshmallow | 81": ["بوجي مارشميلو", "مارشميلو"],
      "Cafe Oud | 19": ["كافيه عود", "قهوة عود", "كافيه اود"],
      "Choco Overdose": ["شوكو اوفردوز", "تشوكو اوفردوز"],
      "Cookie Crave": ["كوكي كريف", "كوكي"],
      "Divine": ["ديفاين"],
      "Diamond Emerald Soul 200ml": ["دايموند اميرالد سول", "اميرالد سول"],
      "Burberry Her Box": ["بربري هير", "بربري هير بوكس"],
      "Gucci Bloom": ["جوتشي بلوم", "قوتشي بلوم"],
      "Arabian Tobacco": ["توباكو عربي", "تبغ عربي"],
      "Dolce & Gabbana The One Eau de Parfum": ["دولتشي اند غابانا ذا وان", "دولتشي غابانا ذا وان"],
      "Amira Al Arab": ["اميرة العرب", "اميره العرب"],
      "Carolina Herrera 212 VIP Rose": ["كارولينا هيريرا 212 في اي بي روز", "212 في اي بي روز"],
      Eclaire: ["ايكلير", "إكلير"],
      "Eden Juicy Apple | 01": ["ايدن جوسي ابل", "إيدن جوسي ابل", "جوسي ابل"],
      "Elie Saab Girl of Now": ["ايلي صعب جيرل اوف ناو", "إيلي صعب جيرل اوف ناو", "جيرل اوف ناو"],
      "Haya": ["هيا"],
      "His Confession": ["هيس كونفشن"],
      "Hudson Valley Perfume": ["هدسون فالي"],
      "Hugo Boss Bottled Elixir": ["هوجو بوس بوتلد اليكسير", "بوتلد اليكسير"],
      "Hugo Boss The Scent Elixir For Her": ["هوجو بوس ذا سنت اليكسير", "ذا سنت اليكسير"],
      Imagination: ["ايميجينيشن", "إيميجينيشن", "ايماجينيشن"],
      Iman: ["ايمان", "إيمان"],
      "Issey Miyake": ["ايسي مياكي", "إيسي مياكي"],
      "J'adore": ["جادور"],
      "Jean Paul Gaultier Le Male Le Parfum": ["جان بول جوتييه لو مال لو بارفام", "لو مال لو بارفام"],
      "Khamrah 40ml": ["خمره 40", "خمرة 40", "خمره 40 ملي", "خمرة 40 ملي"],
      "Khamrah Classic": ["خمره كلاسيك", "خمرة كلاسيك", "خمره لطافة", "خمرة لطافة"],
      "Khamrah Dukhan": ["خمره دخان", "خمرة دخان", "خمره دوخان"],
      "Khamrah Qahwa": ["خمره قهوه", "خمره قهوة", "خمرة قهوة"],
      "Khamrah Waha": ["خمره واحه", "خمرة واحة", "خمره واحة"],
      "Ibraq Tobacco Collection": ["ابراق توباكو كوليكشن", "إبراق توباكو كوليكشن", "توباكو كوليكشن"],
      "La Belle Le Parfum": ["لا بيل لو بارفام", "لابيل لو بارفام"],
      "La Luna 200ml": ["لا لونا"],
      "Lahab - Hersh": ["لهب", "لهب هيرش"],
      "Lattafa Her Confession": ["لطافة هير كونفشن", "هير كونفشن"],
      "Lattafa His Confession": ["لطافة هيس كونفشن", "هيس كونفشن"],
      "Lattafa Musamam": ["لطافة مصمم", "مصمم"],
      "Lattafa Musamam White": ["لطافة مصمم وايت", "مصمم وايت"],
      "Laverne Sense": ["لافيرن سينس", "سينس لافيرن"],
      "Le Male Elixir": ["لو مال اليكسير", "لي مال اليكسير"],
      "Miss Dior Blooming Bouquet": ["ميس ديور بلومنج بوكيه", "بلومنج بوكيه"],
      "Musk Al Khas": ["مسك الخاص"],
      "Musk Powder": ["مسك بودر", "مشك بودر"],
      "Nude Coral Diamond": ["نود كورال دايموند"],
      "One & Only 200ml": ["وان اند اونلي", "ون اند اونلي"],
      "Oud Ispahan": ["عود اصفهان", "اود اصفهان"],
      "Oud Mood": ["عود مود", "اود مود"],
      "Oudgasm Smoky Oud | 07": ["عود غازم سموكي عود", "سموكي عود"],
      "Paco Rabanne Olympea": ["باكو رابان اوليمبيا", "أوليمبيا"],
      "Pistachio Gelato | 33": ["بستاشيو جيلاتو", "فستق جيلاتو"],
      "Prada Paradoxe Intense": ["برادا بارادوكس انتنس", "برادا بارادوكس"],
      "Qissa Imperial Valley 200ml": ["قصه امبريال فالي", "قصة امبريال فالي", "امبريال فالي"],
      Sakeena: ["سكينة"],
      Sauvage: ["سوفاج", "ديور سوفاج"],
      "Scandal Absolu": ["سكاندل ابسولو", "سكاندل أبسولو"],
      "Scandal Le Parfum": ["سكاندل لو بارفام", "سكاندل لو برفان"],
      "Scandal Pour Homme": ["سكاندل بور هوم", "سكاندل بورهوم"],
      "Si Red (Armani Si)": ["سي ريد", "ارماني سي", "أرماني سي"],
      "Spanish Tobacco": ["سبانيش توباكو", "تبغ اسباني", "تبغ إسباني"],
      "Spicebomb Extreme": ["سبايس بومب اكستريم", "سبايس بومب"],
      "Stronger With You (Original)": ["سترونجر ويذ يو", "سترونجر يو"],
      "Stronger With You Absolutely": ["سترونجر ويذ يو ابسولوتلي", "سترونجر ابسولوتلي"],
      "Stronger With You Freeze": ["سترونجر ويذ يو فريز", "سترونجر فريز"],
      "Stronger With You Intensely": ["سترونجر ويذ يو انتنسلي", "سترونجر انتنسلي"],
      "Stronger With You Tobacco": ["سترونجر ويذ يو توباكو", "سترونجر توباكو"],
      "Tom Ford Black Orchid": ["توم فورد بلاك اوركيد", "بلاك اوركيد"],
      "Tom Ford Noir": ["توم فورد نوار", "توم فورد نوير"],
      "Tom Ford Ombre Leather": ["توم فورد اومبري ليذر", "امبري ليذر", "أومبري ليذر"],
      "Tom Ford Tobacco Vanille": ["توم فورد توباكو فانيلا", "توباكو فانيلا", "توباكو فانيل"],
      "Ultra Male": ["الترا مال", "ألترا مال"],
      "Vanilla | 28": ["فانيلا 28", "كايالي فانيلا 28", "كاي علي فانيلا 28"],
      "Vanilla Candy Rock Sugar | 42": ["فانيلا كاندي روك شوغر", "فانيلا كاندي"],
      "Vanilla Freak": ["فانيلا فريك"],
      "Vanilla Oud | 36": ["فانيلا عود", "فانيلا اود"],
      "Valentino Donna Born in Roma": ["فالنتينو دونا بورن ان روما", "بورن ان روما"],
      "Valentino Uomo Born In Roma Intense": ["فالنتينو اومو بورن ان روما انتنس", "بورن ان روما انتنس"],
      "Valentino Donna": ["فلانتينو دونا", "فالنتينو دونا"],
      "Valentino Uomo Rendez-Vous Ivory": ["فالنتينو اومو رينديز فو ايفوري", "فالنتينو رينديز فو ايفوري", "رينديز فو ايفوري"],
      "Valentino Rendez-Vous Gold Donna": ["فالنتينو رينديز فو جولد دونا", "فالنتينو جولد دونا", "رينديز فو جولد"],
      "Valentino Donna Born In Roma Intense 30ml": ["فالنتينو دونا بورن ان روما انتنس 30", "دونا بورن ان روما انتنس"],
      "Assaf Private Purple 200ml": ["اساف برايفت بربل", "اساف بيربل", "assaf private purple"],
      "Afnan 9pm Night Out": ["افنان 9 بي ام نايت اوت", "افنان ناين بي ام", "افنان نايت اوت"],
      "Assaf Arrogate Pink": ["اساف اروجيت بينك", "اساف بينك"],
      "Ibraq Balas Rose 150ml": ["ابراق بالاس روز", "بالاس روز"],
      "Pink Diamond Sakura 200ml": ["بينك دايموند ساكورا", "دايموند ساكورا"],
      "Laverne Sense Tassel Edition": ["لافيرن سينس تاسيل اديشن", "لافيرن سينس تاسل"],
      "Assaf Arrogate Lipstick Perfume": ["اساف اروجيت ليبستيك", "اساف ليبستيك"],
      "Pink Queen Eau de Parfum": ["بينك كوين", "pink queen"],
      "Sherlock by Assaf": ["شيرلوك اساف", "شيرلوك"],
      "Versace Eros Eau de Toilette": ["فيرساتشي ايروس", "ايروس"],
      "Versace Eros Flame": ["فيرساتشي ايروس فليم", "ايروس فليم"],
      "Victoria's Secret Bombshell": ["فيكتوريا سيكرت بومبشيل", "بومبشيل"],
      "Victoria's Secret Noir Tease": ["فيكتوريا سيكرت نوار تيز", "نوار تيز"],
      "Victoria's Secret Very Sexy": ["فيكتوريا سيكرت فيري سكسي", "فيري سكسي"],
      "Wild Cold 200ml": ["وايلد كولد", "وايلد كولت"],
      "Assaf Angel 200ml": ["اساف انجل", "انجل اساف", "assaf angel"],
      "Assaf Pink Lady 200ml": ["اساف بينك ليدي", "بينك ليدي", "assaf pink lady"],
      "Diamond Pink Score 200ml": ["دايموند بينك سكور", "بينك سكور", "diamond pink score"],
      Yara: ["يارا"],
      "Yara Candy": ["يارا كاندي"],
      "Yara Elixir": ["يارا اليكسير", "يارا إلكسير"],
      "Yara Moi": ["يارا موي"],
      "Xerjoff Alexandria II": ["زيرجوف الاسكندريه", "زيرجوف الإسكندرية"],
      "Xerjoff Naxos": ["زيرجوف ناكسوس", "ناكسوس"],
      "Xerjoff Torino21": ["زيرجوف تورينو", "تورينو 21"]
    };

    function getBrandSearchAliases(product) {
      const aliases = [];
      [product.brandKey, normalizeSearchTerm(product.brandTitle)].forEach((key) => {
        if (!key || !brandSearchAliases[key]) return;
        aliases.push(...brandSearchAliases[key]);
      });
      return aliases;
    }

    function getProductSearchAliases(product) {
      if (product._cachedSearchAliases) return product._cachedSearchAliases;
      product._cachedSearchAliases = [...new Set([
        ...(productSearchAliases[product.name] || []),
        ...getBrandSearchAliases(product)
      ])];
      return product._cachedSearchAliases;
    }

    function getSearchCandidates(product) {
      if (product._cachedSearchCandidates) return product._cachedSearchCandidates;
      product._cachedSearchCandidates = [
        product.name,
        product.brandTitle,
        product.brandKey,
        product.section,
        product.type,
        product.detailType,
        stripHtmlForSearch(product.detailsHtml),
        product.img,
        product.img2,
        ...getProductSearchAliases(product)
      ]
        .filter(Boolean)
        .map(normalizeSearchTerm)
        .filter(Boolean);
      return product._cachedSearchCandidates;
    }

    function getSearchText(product) {
      if (product._cachedSearchText) return product._cachedSearchText;
      product._cachedSearchText = getSearchCandidates(product).join(" ");
      return product._cachedSearchText;
    }

    function getSearchRank(product, searchTerm) {
      if (!searchTerm) return 3;
      const candidates = getSearchCandidates(product);

      if (candidates.some((candidate) => candidate === searchTerm)) return 0;
      if (candidates.some((candidate) => candidate.startsWith(searchTerm))) return 1;
      if (candidates.some((candidate) => candidate.includes(searchTerm))) return 2;
      return 3;
    }

    function getMatchedSearchAlias(product, searchTerm) {
      if (!searchTerm) return "";
      return getProductSearchAliases(product).find((alias) => {
        const normalizedAlias = normalizeSearchTerm(alias);
        return normalizedAlias && (
          normalizedAlias === searchTerm ||
          normalizedAlias.startsWith(searchTerm) ||
          normalizedAlias.includes(searchTerm)
        );
      }) || "";
    }

      const allProducts = uniqueProductsByName([
        ...bestSellerProducts,
        ...extraBestSellerProducts,
        ...newArrivalProducts,
        ...menPerfumes,
      ...extraMenPerfumes,
      ...moreMenPerfumes,
      ...womenPerfumes,
      ...moreWomenPerfumes,
      ...latestWomenPerfumes,
        ...brandProducts
      ]);

      const homepageProductSources = [
        bestSellerProducts,
        extraBestSellerProducts,
        newArrivalProducts,
        menPerfumes,
        extraMenPerfumes,
        moreMenPerfumes,
        womenPerfumes,
        moreWomenPerfumes,
        latestWomenPerfumes,
        brandProducts,
        allProducts
      ];

      const allProductsByName = new Map();
      allProducts.forEach((product) => {
        const key = normalizeSearchTerm(product?.name);
        if (key && !allProductsByName.has(key)) {
          allProductsByName.set(key, product);
        }
      });

      function rebuildAllProductsByNameMap() {
        allProductsByName.clear();
        allProducts.forEach((product) => {
          const key = normalizeSearchTerm(product?.name);
          if (key && !allProductsByName.has(key)) {
            allProductsByName.set(key, product);
          }
        });
      }

      function applyDetailsMapToHomepage(detailMap) {
        if (!detailMap || typeof detailMap !== "object") return;
        homepageProductSources.forEach((list) => {
          list.forEach((product) => {
            const details = detailMap[product.name];
            if (!details) return;
            const detailType = details.type;
            mergeProductData(product, details);
            if (detailType) product.detailType = detailType;
            if (!product.detailsHtml) product.detailsHtml = buildHomepageFallbackDetailsHtml(product);
          });
        });
      }

      function extractObjectLiteral(source, variableName) {
        const match = source.match(new RegExp(`const\\s+${variableName}\\s*=\\s*(\\{[\\s\\S]*?\\});`));
        if (!match) return {};
        try {
          return Function(`"use strict"; return (${match[1]});`)();
        } catch (error) {
          console.error(`Failed to parse ${variableName}`, error);
          return {};
        }
      }

      function buildIframeMarkupLoader(pagePath) {
        return new Promise((resolve, reject) => {
          const iframe = document.createElement("iframe");
          iframe.src = pagePath;
          iframe.style.display = "none";

          const cleanup = () => iframe.remove();

          iframe.onload = () => {
            try {
              const doc = iframe.contentDocument || iframe.contentWindow?.document;
              resolve(doc?.documentElement?.outerHTML || "");
            } catch (error) {
              reject(error);
            } finally {
              cleanup();
            }
          };

          iframe.onerror = () => {
            cleanup();
            reject(new Error(`Failed to load ${pagePath}`));
          };

          document.body.appendChild(iframe);
        });
      }

      async function loadPageMarkup(pagePath) {
        try {
          const response = await fetch(pagePath);
          if (!response.ok) throw new Error(`Failed to fetch ${pagePath}: ${response.status}`);
          return await response.text();
        } catch (error) {
          return buildIframeMarkupLoader(pagePath);
        }
      }

      let homepageSharedDetailsPromise = null;

      function hydrateHomepageSharedBrandDetails() {
        if (homepageSharedDetailsPromise) return homepageSharedDetailsPromise;

        homepageSharedDetailsPromise = (async () => {
          try {
            /* These details now live in js/product-details.js, which both this page
               and brand.html load. Previously the homepage downloaded the whole
               128KB brand.html and scraped the object literal out of its markup. */
            if (window.sharedProductDetailMap) {
              applyDetailsMapToHomepage(window.sharedProductDetailMap);
              return;
            }
            const brandHtml = await loadPageMarkup("brand.html");
            const sharedProductDetails = extractObjectLiteral(brandHtml, "sharedProductDetailMap");
            applyDetailsMapToHomepage(sharedProductDetails);
          } catch (error) {
            console.error("Failed to hydrate homepage shared product details", error);
          }
        })();

        return homepageSharedDetailsPromise;
      }

      const mostRequestedProducts = new Set([
        "Diamond Emerald Soul 200ml",
        "Nude Coral Diamond",
        "Lahab - Hersh",
        "Stronger With You Intensely",
        "Khamrah Classic"
      ]);

    // Function to get brand-related perfumes (moved after allProducts is defined)
    function getBrandPerfumes(searchTerm) {
      const term = searchTerm.toLowerCase();
      const brandPerfumes = [];

      function addBrandProduct(productName) {
        const product = allProductsByName.get(normalizeSearchTerm(productName));
        if (product) brandPerfumes.push(product);
      }
      
      // Y / Yves Saint Laurent / Stronger searches
      if (matchesSearchAlias(term, ["y", "ysl", "yves", "saint laurent", "yves saint laurent", "stronger", "absolutely"])) {
        addBrandProduct("Yves Saint Laurent Y Eau de Parfum");
        addBrandProduct("STRONGER WITH YOU INSENSELY");
      }
      
      // Armani searches
      if (term.includes("armani")) {
        addBrandProduct("STRONGER WITH YOU INSENSELY");
        addBrandProduct("LIBRA INTENSE");
      }
      
      // Dior searches
      if (term.includes("dior")) {
        addBrandProduct("DIOR HOMME INTENSE");
        addBrandProduct("DIOR SAUVAGE");
        addBrandProduct("Dior J'adore Eau de Parfum");
        addBrandProduct("BLACK OPIUM");
      }
      
      // Versace searches
      if (term.includes("versace")) {
        addBrandProduct("VERSACE EROS");
        addBrandProduct("1 MILLION");
      }
      
      // Chanel searches
      if (term.includes("chanel")) {
        addBrandProduct("BLUE DE CHANEL");
      }
      
      // Tom Ford searches
      if (term.includes("tom") || term.includes("ford") || term.includes("tobacco")) {
        addBrandProduct("TOM FORD TOBBACO VANILLE");
        addBrandProduct("King tobbaco");
      }
      
      // Prada searches
      if (term.includes("prada")) {
        addBrandProduct("PRADA PARADOXE");
      }
      
      // Burberry searches
      if (term.includes("burbeerry") || term.includes("burberry")) {
        addBrandProduct("BURBEERY HER ELIXIR");
      }
      
      // Other specific searches
      if (term.includes("libra")) {
        addBrandProduct("LIBRA INTENSE");
      }
      
      if (term.includes("spice")) {
        addBrandProduct("SPICEBOMB EXTREME");
      }
      
      if (term.includes("kayali")) {
        addBrandProduct("KAYALY VANILLA 28");
      }
      
      if (term.includes("jadore")) {
        addBrandProduct("Dior J'adore Eau de Parfum");
      }
      
      if (term.includes("opium")) {
        addBrandProduct("BLACK OPIUM");
      }
      
      if (term.includes("le male")) {
        addBrandProduct("LE MALE ELIXIR");
      }
      
      if (term.includes("1 million") || term.includes("million")) {
        addBrandProduct("1 MILLION");
      }
      
      if (term.includes("sauvage")) {
        addBrandProduct("DIOR SAUVAGE");
      }
      
      if (term.includes("blue")) {
        addBrandProduct("BLUE DE CHANEL");
        addBrandProduct("raaes blue");
        addBrandProduct("Best Seller Royal Blue");
      }
      
      // Best seller specific searches
      if (term.includes("9pm") || term.includes("night")) {
        addBrandProduct("9pm night out");
      }
      
      if (term.includes("champion")) {
        addBrandProduct("Champion turquoise 150 ML");
      }
      
      if (matchesSearchAlias(term, ["vintage", "eau de vintage"])) {
        addBrandProduct("EAU de vintage");
      }
      
      if (term.includes("king")) {
        addBrandProduct("King tobbaco");
      }
      
      return uniqueProductsByName(brandPerfumes);
    }

    const QUIZ_ANSWER_ALIASES = ["xerjoff parfum", "xerjoff"];
    const QUIZ_DISCOUNT_RATE = 0;
    const QUIZ_DURATION_SECONDS = 10;
    const FIRST_ORDER_COUPON_CODE = "OVA22";
    const translations = {
      en: {
        navHome: "Home",
        navProducts: "Products",
        navAllProducts: "All Products",
        navUnisex: "Unisex",
        navContact: "Contact Us",
        navMen: "Men Perfume",
        navWomen: "Women Perfume",
        navBest: "Best Seller",
        navBrands: "Brands",
        introEyebrow: "Ova Signature Intro",
        introTitle: "Ova Store",
        introSubtitle: "A signature opening before the scent journey begins",
        introEnterBtn: "Log In",
        introLoadingText: "Preparing your signature experience",
        heroKicker: "Top Seller",
        heroTitle: "Best Selling Perfumes",
        heroSubtitle: "Up to 30% off on selected favorites.",
        heroOrders: "500+ Orders",
        heroTopSellerLabel: "Top Seller",
        heroBtn: "Shop Now",
        heroSecondaryBtn: "Best Seller",
        offerStrong: "Buy 3 Perfumes, Get 50% Off",
        offerSpan: "Free delivery on your first order to all governorates",
        couponBannerText: "Luxury Deal",
        couponFloatEyebrow: "Exclusive Offer",
        couponFloatTitle: "Buy 3 Perfumes, Get 50% Off",
        couponFloatCopy: "Shop Now",
        couponFloatCopied: "Taking you there…",
        couponFloatNote: "Tap to shop the offer",
        installTitle: "Install Ova Store",
        installText: "Add Ova Store to your phone for faster access and an app-like shopping experience.",
        installBtn: "Install App",
        installHint: "Tap the button to install Ova Store on your phone.",
        bestSellerTitle: "Best Seller",
        bestSellerSubtitle: "Explore the perfumes our customers return to most for compliments, confidence, and signature presence.",
        brandsTitle: "Brands",
        brandsSubtitle: "Browse iconic fragrance houses and modern perfume labels chosen for style, performance, and character.",
        promoBadgeOffer: "3 for 50% Off",
        menPromoCaption: "Men's Section",
        womenPromoCaption: "Women's Section",
        menVideoText: "For Him",
        womenVideoText: "For Her",
        menFilterNote: "Filter by type and price to reach the right scent faster.",
        womenFilterNote: "Narrow the collection by mood and budget in one step.",
        shopAll: "Shop All",
        addToCart: "Add To Cart",
        modalOffer: "3 for 50% Off",
        back: "Back",
        checkout: "Checkout",
        searchTitle: "Search Products",
        searchPlaceholder: "Type any perfume name...",
        menSearchPlaceholder: "Search Perfume...",
        womenSearchPlaceholder: "Search Perfume...",
        whatsapp: "WhatsApp",
        allTypes: "All Types",
        fresh: "Fresh",
        sweet: "Sweet",
        fruity: "Fruity",
        floral: "Floral",
        spicy: "Spicy",
        oud: "Oud",
        woody: "Woody",
        musk: "Musk",
        daily: "Daily",
        luxury: "Luxury",
        evening: "Evening",
        allPrices: "All Prices",
        below1000: "Below 1000",
        noMatch: "No perfumes match this filter yet.",
        customerRating: "customer rating",
        longevity: "Longevity",
        sillage: "Sillage",
        type: "Type",
        price: "Price",
        qty: "Qty",
        offer: "Offer",
        subtotal: "Subtotal",
        total: "Total",
        discount: "Discount",
        quiz: "Quiz",
        addMoreItem: "Add <strong>{count} more item</strong> to unlock a free perfume.",
        addThreeHint: "Add <strong>3 perfumes</strong> and get 50% off.",
        continueShopping: "Continue Shopping",
        khamrahVideoKicker: "The Film",
        khamrahVideoSub: "Tap to discover",
        offerActive: "Offer active: <strong>{count} free piece</strong> applied. {names}.",
        freeFrom: "{qty} free from {name}",
        paidFree: "{paid} paid + {free} free",
        moreForFree: "add {count} more item for a free piece",
        freeDeliveryWeek: "<strong>Free delivery:</strong> on your first order.",
        quizTitle: "Smart Perfume Finder",
        quizDesc: "Tell us the mood, occasion, and scent style you want, and we will instantly recommend the best perfumes for you.",
        quizDetailOne: "Mood Match",
        quizDetailTwo: "Occasion Match",
        quizDetailThree: "Instant Picks",
        quizSecondsLeft: "{count} Seconds Left",
        quizBonusUnlocked: "Recommendations Ready",
        quizTimeOver: "Get your recommendations in seconds",
        quizUsed: "You already unlocked your recommendation bonus on this device.",
        quizUsedShort: "Recommendation bonus already used on this device.",
        quizTimeEnded: "Your recommendation bonus has already been used.",
        quizCorrect: "Perfect match. We recommended perfumes that fit your taste.",
        quizWrong: "Adjust the mood or scent style and try again.",
        quizTypeFirst: "Choose your preferences first.",
        quizInput: "Your scent style",
        quizConfirm: "Find My Perfume",
        quizResultsTitle: "Recommended for you",
        compare: "Compare",
        compareNow: "Compare Now",
        compareClear: "Clear",
        compareBarTitle: "Compare perfumes",
        compareModalTitle: "Perfume Comparison",
        compareModalDesc: "Compare performance, style, and use case side by side.",
        closeCompare: "Close",
        buyNow: "Buy Now",
        quickCheckoutTitle: "Fast Checkout",
        quickCheckoutText: "Add this perfume and continue instantly to checkout.",
        modalSubline: "Luxury perfume profile curated for your taste",
        profileTitle: "Profile",
        bestForTitle: "Best For",
        topNotes: "Top Notes",
        heartNotes: "Heart Notes",
        baseNotes: "Base Notes",
        reviewsTitle: "Customer Reviews",
        reviewPlaceholder: "Write a quick impression about this perfume...",
        reviewSubmit: "Post Review",
        reviewEmpty: "Be the first to leave a review for this perfume.",
        reviewSaved: "Your review was added successfully.",
        trustSectionTitle: "Why Ova Feels Premium",
        trustBadgeOne: "Authentic Picks",
        trustCardTitleOne: "Real perfumes with clear scent identity",
        trustCardTextOne: "Every product card is matched with real profile details, longevity, and scent direction so the customer understands what they are buying.",
        trustBadgeTwo: "Fast Support",
        trustCardTitleTwo: "WhatsApp help before and after order",
        trustCardTextTwo: "Customers can ask about notes, compare perfumes, and confirm the right scent quickly before paying.",
        trustBadgeThree: "Easy Buying",
        trustCardTitleThree: "Mobile-first checkout that feels smooth",
        trustCardTextThree: "Quick add to cart, direct product modal, easy wallet copy, and a cleaner payment experience built for phone users.",
        testimonialBadgeOne: "Top Feedback",
        testimonialTitleOne: "The perfume details actually helped me choose.",
        testimonialTextOne: "Customers understand vibe, notes, and performance faster, which makes the purchase feel safer and more premium.",
        testimonialBadgeTwo: "Customer Love",
        testimonialTitleTwo: "The mobile experience is clean and fast.",
        testimonialTextTwo: "From quick compare to direct checkout, the shopping flow now feels lighter and more international.",
        testimonialBadgeThree: "Why It Works",
        testimonialTitleThree: "I found alternatives close to my taste in seconds.",
        testimonialTextThree: "Smart recommendation and compare tools help shoppers move from confusion to purchase much faster.",
        close: "Close",
        countdownLabel: "Limited Time Offer Ends In:"
      },
      ar: {
        navHome: "الرئيسية",
        navProducts: "المنتجات",
        navAllProducts: "كل المنتجات",
        navUnisex: "يونيسكس",
        navContact: "تواصل معنا",
        navMen: "برفانات رجالي",
        navWomen: "برفانات حريمي",
        navBest: "الأكثر مبيعًا",
        navBrands: "البراندات",
        introEyebrow: "بداية أوفا المميزة",
        introTitle: "Ova Store",
        introSubtitle: "لمسة افتتاحية سريعة قبل بداية رحلة العطر",
        introEnterBtn: "دخول",
        introLoadingText: "جاري تجهيز التجربة المميزة",
        heroKicker: "توب سيلر",
        heroTitle: "أفضل البرفانات مبيعًا",
        heroSubtitle: "خصومات تصل إلى 30% على البرفانات المختارة.",
        heroOrders: "+500 طلب",
        heroTopSellerLabel: "توب سيلر",
        heroBtn: "تسوق الآن",
        heroSecondaryBtn: "الأكثر مبيعًا",
        offerStrong: "اشتري 3 برفانات واحصل على خصم 50%",
        offerSpan: "توصيل مجاني لأول أوردر لجميع المحافظات",
        couponBannerText: "عرض فاخر",
        couponFloatEyebrow: "عرض حصري",
        couponFloatTitle: "اشتري 3 برفانات واحصل على خصم 50%",
        couponFloatCopy: "تسوق الآن",
        couponFloatCopied: "جاري التوجيه…",
        couponFloatNote: "اضغط للتسوق الآن",
        installTitle: "ثبت Ova Store",
        installText: "أضف Ova Store إلى موبايلك للوصول السريع وتجربة تشبه التطبيق.",
        installBtn: "ثبت التطبيق",
        installHint: "اضغط على الزر لتثبيت Ova Store على موبايلك.",
        bestSellerTitle: "الأكثر مبيعًا",
        bestSellerSubtitle: "اكتشف العطور التي يعود إليها عملاؤنا دائمًا لما تعطيه من حضور وثقة وانطباع مميز.",
        brandsTitle: "البراندات",
        brandsSubtitle: "تصفح بيوت العطور الشهيرة والبراندات المختارة بعناية من حيث الأسلوب والثبات والشخصية.",
        promoBadgeOffer: "اشتري 3 واحصل على خصم 50%",
        menPromoCaption: "قسم رجالي",
        womenPromoCaption: "قسم حريمي",
        menVideoText: "برفانات رجالي",
        womenVideoText: "برفانات حريمي",
        menFilterNote: "فلتر حسب النوع والسعر للوصول للعطر المناسب أسرع.",
        womenFilterNote: "فلتر حسب المود والميزانية بخطوة واحدة.",
        shopAll: "عرض الكل",
        addToCart: "أضف للسلة",
        modalOffer: "اشتري 3 واحصل على خصم 50%",
        back: "رجوع",
        checkout: "إتمام الطلب",
        searchTitle: "ابحث عن المنتجات",
        searchPlaceholder: "اكتب اسم أي برفان...",
        menSearchPlaceholder: "ابحث عن برفان...",
        womenSearchPlaceholder: "ابحث عن برفان...",
        whatsapp: "واتساب",
        allTypes: "كل الأنواع",
        fresh: "منعش",
        sweet: "حلو",
        fruity: "فاكهي",
        floral: "زهري",
        spicy: "سبايسي",
        oud: "عود",
        woody: "خشبي",
        musk: "مسك",
        daily: "يومي",
        luxury: "فاخر",
        evening: "مسائي",
        allPrices: "كل الأسعار",
        below1000: "أقل من 1000",
        noMatch: "لا يوجد برفانات مطابقة لهذا الفلتر.",
        customerRating: "تقييم العملاء",
        longevity: "الثبات",
        sillage: "الفوحان",
        type: "النوع",
        price: "السعر",
        qty: "الكمية",
        offer: "العرض",
        subtotal: "الإجمالي",
        total: "الإجمالي الكلي",
        discount: "الخصم",
        quiz: "خصم المسابقة",
        addMoreItem: "أضف <strong>{count} قطعة أخرى</strong> لتفعيل الهدية المجانية.",
        addThreeHint: "أضف <strong>3 برفانات</strong> واحصل على خصم 50%.",
        continueShopping: "أكمل التسوق",
        khamrahVideoKicker: "الفيلم",
        khamrahVideoSub: "دوس تكتشف",
        offerActive: "العرض متفعل: <strong>{count} قطعة مجانية</strong> اتطبقت. {names}.",
        freeFrom: "{qty} مجاني من {name}",
        paidFree: "{paid} مدفوع + {free} مجاني",
        moreForFree: "أضف {count} قطعة أخرى لتحصل على قطعة مجانية",
        quizTitle: "مرشح البرفان الذكي",
        quizDesc: "قولنا المود والمناسبة والستايل اللي بتحبه، وهنطلع لك أفضل البرفانات المناسبة فورًا.",
        quizDetailOne: "مطابقة المود",
        quizDetailTwo: "مطابقة المناسبة",
        quizDetailThree: "ترشيحات فورية",
        quizSecondsLeft: "متبقي {count} ثواني",
        quizBonusUnlocked: "الترشيحات جاهزة",
        quizTimeOver: "اعرف الترشيحات المناسبة لك في ثواني",
        quizUsed: "تم استخدام بونص الترشيح على هذا الجهاز بالفعل.",
        quizUsedShort: "تم استخدام بونص الترشيح بالفعل.",
        quizTimeEnded: "تم استخدام بونص الترشيح بالفعل.",
        quizCorrect: "اختيار ممتاز. رشحنا لك البرفانات المناسبة لذوقك.",
        quizWrong: "غيّر المود أو الستايل وجرب مرة ثانية.",
        quizTypeFirst: "اختر التفضيلات أولًا.",
        quizInput: "ستايل الريحة",
        quizConfirm: "رشح لي برفان",
        quizResultsTitle: "الترشيحات المناسبة لك",
        compare: "قارن",
        compareNow: "قارن الآن",
        compareClear: "مسح",
        compareBarTitle: "مقارنة البرفانات",
        compareModalTitle: "مقارنة البرفانات",
        compareModalDesc: "قارن بين الأداء والستايل والاستخدام جنب بعض.",
        closeCompare: "إغلاق",
        buyNow: "اشتري الآن",
        quickCheckoutTitle: "شراء سريع",
        quickCheckoutText: "أضف البرفان ده وكمل الطلب فورًا.",
        modalSubline: "بروفايل فاخر للبرفان مناسب لذوقك",
        profileTitle: "البروفايل",
        bestForTitle: "أنسب استخدام",
        topNotes: "المقدمة",
        heartNotes: "القلب",
        baseNotes: "القاعدة",
        reviewsTitle: "آراء العملاء",
        reviewPlaceholder: "اكتب رأيك السريع عن البرفان...",
        reviewSubmit: "أضف رأيك",
        reviewEmpty: "كن أول واحد يضيف رأيه عن البرفان ده.",
        reviewSaved: "تمت إضافة رأيك بنجاح.",
        trustSectionTitle: "ليه Ova تحسها Premium",
        trustBadgeOne: "اختيارات أصلية",
        trustCardTitleOne: "برفانات حقيقية بتفاصيل واضحة",
        trustCardTextOne: "كل منتج عنده وصف فعلي للريحة والثبات والفوحان علشان العميل يفهم هو بيشتري إيه بالضبط.",
        trustBadgeTwo: "دعم سريع",
        trustCardTitleTwo: "مساعدة واتساب قبل وبعد الطلب",
        trustCardTextTwo: "العميل يقدر يسأل ويقارن ويختار البرفان الصح بسرعة قبل ما يدفع.",
        trustBadgeThree: "شراء أسهل",
        trustCardTitleThree: "تجربة موبايل مريحة وسريعة",
        trustCardTextThree: "إضافة سريعة للسلة، مودال مباشر، نسخ أرقام الدفع، وتجربة دفع أنضف للموبايل.",
        testimonialBadgeOne: "أعلى تقييم",
        testimonialTitleOne: "تفاصيل البرفان ساعدتني أختار فعلًا.",
        testimonialTextOne: "العميل بيفهم الفيب والنوتس والأداء أسرع، وده بيخلي الشراء أأمن وأفخم.",
        testimonialBadgeTwo: "حب العملاء",
        testimonialTitleTwo: "تجربة الموبايل بقت سريعة ونظيفة.",
        testimonialTextTwo: "من المقارنة السريعة لحد الطلب، رحلة الشراء بقت أخف وأقرب للمواقع العالمية.",
        testimonialBadgeThree: "سبب النجاح",
        testimonialTitleThree: "لقيت بدائل قريبة من ذوقي في ثواني.",
        testimonialTextThree: "الترشيح الذكي والمقارنة خلّوا العميل يخرج من الحيرة للشراء بشكل أسرع.",
        close: "إغلاق",
        countdownLabel: "ينتهي العرض في:"
      }
    };
    const cart = JSON.parse(localStorage.getItem("ovaCart") || "[]");
    let currentLang = localStorage.getItem("ovaLang") || "en";
    let modalQty = 1;
    let currentProduct = null;
    let requestedProductName = null;
    let requestedProductSlug = null;
    const SELECTED_PRODUCT_STORAGE_KEY = "ovaSelectedProduct";
    let remoteCatalogHydrationPromise = null;
    const prefetchedProductAssetUrls = new Set();
    let menLoaded = false;
    let womenLoaded = false;
    let menSectionRendered = false;
    let womenSectionRendered = false;
    let quizSectionRendered = false;
    let homepageUiInitialized = false;
    let quizTimerValue = QUIZ_DURATION_SECONDS;
    let quizTimerStarted = false;
    let quizTimerFinished = false;
    let quizTimerInterval = null;
    let quizDiscountUnlocked = false;
    let quizAttemptUsed = JSON.parse(localStorage.getItem("ovaQuizAttemptUsed") || "false");
    let quizStartedAt = Number(localStorage.getItem("ovaQuizStartedAt") || "0");
    const menInitialProducts = [...menPerfumes];
    const menAllProducts = [...menPerfumes, ...extraMenPerfumes, ...moreMenPerfumes];
    const womenInitialProducts = [...womenPerfumes];
    const womenAllProducts = [...womenPerfumes, ...moreWomenPerfumes, ...latestWomenPerfumes];

    function t(key, vars = {}) {
      const dictionary = translations[currentLang] || translations.en;
      let value = dictionary[key] || translations.en[key] || key;
      Object.entries(vars).forEach(([name, replacement]) => {
        value = value.replaceAll(`{${name}}`, replacement);
      });
      return value;
    }

    function formatTypeLabel(typeValue) {
      const translated = translations[currentLang]?.[typeValue];
      if (translated) return translated;

      return String(typeValue || "")
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
    }

    function getViewDetailsLabel() {
      return currentLang === "ar" ? "عرض التفاصيل" : "View Details";
    }

    function getCardDetailsLabel() {
      return currentLang === "ar" ? "التفاصيل" : "Details";
    }

    function setProductButtonLabel(button, label) {
      const labelNode = button && button.querySelector(".product-btn-label");
      if (labelNode) {
        labelNode.textContent = label;
        return;
      }
      if (button) button.textContent = label;
    }

    function getHideDetailsLabel() {
      return currentLang === "ar" ? "إخفاء التفاصيل" : "Hide Details";
    }

    function escapeHtml(value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function slugifyProductValue(value) {
      return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 120);
    }

    function getSiteOrigin() {
      return (window.location.origin || "https://ovaperfume.com").replace(/\/+$/, "");
    }

    function buildAbsoluteAssetUrl(value) {
      const raw = String(value || "").trim();
      if (!raw) return `${getSiteOrigin()}/images/site-assets/logooo-2.webp`;
      try {
        return new URL(raw, `${getSiteOrigin()}/`).href;
      } catch (error) {
        return `${getSiteOrigin()}/images/site-assets/logooo-2.webp`;
      }
    }

    function getProductSlugValue(productOrName) {
      if (productOrName && typeof productOrName === "object") {
        return String(productOrName.slug || "").trim() || slugifyProductValue(productOrName.name || "");
      }
      return slugifyProductValue(productOrName || "");
    }

    function buildProductPageUrl(productOrName) {
      const slug = getProductSlugValue(productOrName);
      return slug ? `index.html?product_slug=${encodeURIComponent(slug)}` : "index.html";
    }

    function resolveRelativePageUrl(url) {
      try {
        const resolved = new URL(url, window.location.href);
        return `${resolved.pathname}${resolved.search}`;
      } catch (error) {
        return String(url || "");
      }
    }

    function getStoredSelectedProduct(name) {
      try {
        const raw = sessionStorage.getItem(SELECTED_PRODUCT_STORAGE_KEY);
        if (!raw) return null;
        const product = JSON.parse(raw);
        if (!product || !product.name) return null;
        if (name && normalizeSearchTerm(product.name) !== normalizeSearchTerm(name)) return null;
        return product;
      } catch (error) {
        return null;
      }
    }

    function storeSelectedProduct(product) {
      if (!product || !product.name) return;
      try {
        sessionStorage.setItem(SELECTED_PRODUCT_STORAGE_KEY, JSON.stringify(product));
      } catch (error) {
        console.warn("Unable to cache selected product in sessionStorage.", error);
      }
    }

    function prefetchProductAssets(productOrName) {
      const product = typeof productOrName === "object"
        ? productOrName
        : (getProductByName(productOrName) || getProductBySlug(productOrName));
      if (!product) return;

      storeSelectedProduct(product);

      [product.img, product.img2].filter(Boolean).forEach((src) => {
        if (prefetchedProductAssetUrls.has(src)) return;
        prefetchedProductAssetUrls.add(src);
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });

      startRemoteCatalogHydration();
    }

    function getRequestedProductNameFromUrl() {
      try {
        const params = new URLSearchParams(window.location.search);
        return params.get("product") || "";
      } catch (error) {
        return "";
      }
    }

    function getRequestedProductSlugFromUrl() {
      try {
        const pathMatch = String(window.location.pathname || "").match(/^\/product\/([^/?#]+)/i);
        if (pathMatch && pathMatch[1]) {
          return decodeURIComponent(pathMatch[1]);
        }
        const params = new URLSearchParams(window.location.search);
        return params.get("product_slug") || "";
      } catch (error) {
        return "";
      }
    }

    const sectionTypeOrder = ["sweet", "fresh", "fruity", "floral", "spicy", "oud", "woody", "musk", "luxury"];

    function deriveFilterTypes(product) {
      const combined = `${product.name || ""} ${product.type || ""} ${product.detailsHtml || ""}`.toLowerCase();
      const matches = [];

      if (
        combined.includes("vanilla") ||
        combined.includes("sweet") ||
        combined.includes("sugar") ||
        combined.includes("caramel") ||
        combined.includes("gourmand") ||
        combined.includes("marshmallow") ||
        combined.includes("biscuit") ||
        combined.includes("chocolate") ||
        combined.includes("فانيليا") ||
        combined.includes("سكر") ||
        combined.includes("كراميل") ||
        combined.includes("شوكولات")
      ) matches.push("sweet");

      if (
        combined.includes("fresh") ||
        combined.includes("citrus") ||
        combined.includes("marine") ||
        combined.includes("aqua") ||
        combined.includes("bergamot") ||
        combined.includes("green") ||
        combined.includes("mint") ||
        combined.includes("watery") ||
        combined.includes("منعش") ||
        combined.includes("حمض") ||
        combined.includes("أكوا") ||
        combined.includes("بحري")
      ) matches.push("fresh");

      if (
        combined.includes("fruity") ||
        combined.includes("pear") ||
        combined.includes("tropical") ||
        combined.includes("soft fruity") ||
        combined.includes("apple") ||
        combined.includes("berry") ||
        combined.includes("فاكهي") ||
        combined.includes("كمثرى") ||
        combined.includes("فواكه")
      ) matches.push("fruity");

      if (
        combined.includes("floral") ||
        combined.includes("rose") ||
        combined.includes("jasmine") ||
        combined.includes("flower") ||
        combined.includes("peony") ||
        combined.includes("iris") ||
        combined.includes("lavender") ||
        combined.includes("زهور") ||
        combined.includes("ورد") ||
        combined.includes("ياسمين")
      ) matches.push("floral");

      if (
        combined.includes("spicy") ||
        combined.includes("spice") ||
        combined.includes("amber") ||
        combined.includes("oriental") ||
        combined.includes("warm") ||
        combined.includes("incense") ||
        combined.includes("عنبر") ||
        combined.includes("شرقي") ||
        combined.includes("دافي") ||
        combined.includes("توابل")
      ) matches.push("spicy");

      if (
        combined.includes("oud") ||
        combined.includes("عود")
      ) matches.push("oud");

      if (
        combined.includes("woody") ||
        combined.includes("wood") ||
        combined.includes("cedar") ||
        combined.includes("sandal") ||
        combined.includes("leather") ||
        combined.includes("smoky") ||
        combined.includes("smoke") ||
        combined.includes("tobacco") ||
        combined.includes("patchouli") ||
        combined.includes("خشب") ||
        combined.includes("جلد") ||
        combined.includes("سموك")
      ) matches.push("woody");

      if (
        combined.includes("musk") ||
        combined.includes("musky") ||
        combined.includes("powder") ||
        combined.includes("powdery") ||
        combined.includes("clean") ||
        combined.includes("مسك") ||
        combined.includes("بودر") ||
        combined.includes("نضيف")
      ) matches.push("musk");

      if (!matches.length) {
        const fallbackType = inferType(product.name || "", product.price || 0, combined);
        if (fallbackType === "sweet" || fallbackType === "fresh" || fallbackType === "luxury") matches.push(fallbackType);
        else if (fallbackType === "evening") matches.push("spicy");
        else if (fallbackType === "daily") matches.push("musk");
        else matches.push("woody");
      }

      return [...new Set(matches)];
    }

    function getDisplayType(product) {
      const rawType = String(product.detailType || product.type || "").trim();
      if (!rawType) return "";
      return /[\/-]/.test(rawType) ? rawType : formatTypeLabel(rawType);
    }

    const compareProducts = [];
    let compareBarExpanded = false;

    function isMobileCompareBar() {
      return window.innerWidth <= 700;
    }

    function setCompareBarExpanded(expanded) {
      compareBarExpanded = Boolean(expanded);
      updateCompareBar();
    }

    function toggleCompareBarExpanded(force) {
      const nextState = typeof force === "boolean" ? force : !compareBarExpanded;
      setCompareBarExpanded(nextState);
    }

    function parseProductText(product) {
      return `${product.name || ""} ${product.type || ""} ${product.detailsHtml || ""}`.toLowerCase();
    }

    function removeCompareProduct(name) {
      const index = compareProducts.findIndex((item) => item.name === name);
      if (index === -1) return;
      compareProducts.splice(index, 1);
      if (!compareProducts.length) {
        compareBarExpanded = false;
      }
      updateCompareBar();
      syncCompareButtons();
      if (currentProduct) renderModalCompareSummary(currentProduct);
    }

    function getAccordChips(product) {
      const chips = [...new Set((product.filterTypes || deriveFilterTypes(product)).map(formatTypeLabel))];
      const text = parseProductText(product);
      if (text.includes("vanilla") || text.includes("فانيليا")) chips.push(currentLang === "ar" ? "فانيليا" : "Vanilla");
      if (text.includes("amber") || text.includes("عنبر")) chips.push(currentLang === "ar" ? "عنبر" : "Amber");
      if (text.includes("clean") || text.includes("نظيف")) chips.push(currentLang === "ar" ? "نظيف" : "Clean");
      return [...new Set(chips)].slice(0, 6);
    }

    function getProductProfile(product) {
      const text = parseProductText(product);
      const types = product.filterTypes || deriveFilterTypes(product);
      if (types.includes("luxury") || text.includes("luxury") || text.includes("فاخر") || product.price >= 2000) {
        return currentLang === "ar" ? "فاخر وثابت ويبان بسرعة" : "Luxurious, rich, and attention-grabbing";
      }
      if (types.includes("fresh") || text.includes("fresh") || text.includes("منعش")) {
        return currentLang === "ar" ? "نظيف ومنعش وسهل كل يوم" : "Clean, fresh, and easy to wear daily";
      }
      if (types.includes("musk") || text.includes("clean") || text.includes("powder") || text.includes("مسك")) {
        return currentLang === "ar" ? "نضيف وناعم ومريح في اللبس" : "Clean, musky, and very easy to wear";
      }
      if (types.includes("sweet") || text.includes("sweet") || text.includes("vanilla") || text.includes("حلو")) {
        return currentLang === "ar" ? "سويت جذاب ولمسته دافئة" : "Sweet, attractive, and softly warm";
      }
      return currentLang === "ar" ? "متوازن وأنيق ويشتغل في أكتر من وقت" : "Balanced, elegant, and versatile";
    }

    function getBestFor(product) {
      const text = parseProductText(product);
      const types = product.filterTypes || deriveFilterTypes(product);
      if (types.includes("spicy") || types.includes("oud") || text.includes("evening") || text.includes("date") || text.includes("مسائي") || text.includes("سهر")) {
        return currentLang === "ar" ? "السهرات والخروجات المهمة" : "Evenings and standout nights";
      }
      if (types.includes("fresh") || text.includes("fresh") || text.includes("daily") || text.includes("office") || text.includes("يومي")) {
        return currentLang === "ar" ? "الجامعة والشغل والاستخدام اليومي" : "Office, daytime, and everyday wear";
      }
      if (types.includes("musk") || text.includes("clean") || text.includes("powder")) {
        return currentLang === "ar" ? "اليومي والخروجات الهادية" : "Daily wear and easy casual outings";
      }
      return currentLang === "ar" ? "المناسبات والخروجات والهدية" : "Occasions, going out, and gifting";
    }

    function buildNoteLayers(product) {
      const types = product.filterTypes || deriveFilterTypes(product);
      const top = [];
      const heart = [];
      const base = [];

      if (types.includes("fresh")) top.push(currentLang === "ar" ? "حمضيات منعشة" : "Citrus splash");
      if (types.includes("fruity")) top.push(currentLang === "ar" ? "فواكه لامعة" : "Juicy fruits");
      if (types.includes("spicy")) top.push(currentLang === "ar" ? "توابل ناعمة" : "Soft spices");

      if (types.includes("floral")) heart.push(currentLang === "ar" ? "قلب زهري ناعم" : "Soft floral heart");
      if (types.includes("sweet")) heart.push(currentLang === "ar" ? "فانيليا أو سكر خفيف" : "Vanilla sweetness");
      if (types.includes("musk")) heart.push(currentLang === "ar" ? "مسك نضيف" : "Clean musk");

      if (types.includes("woody")) base.push(currentLang === "ar" ? "قاعدة خشبية" : "Woody base");
      if (types.includes("oud")) base.push(currentLang === "ar" ? "عود أنيق" : "Elegant oud");
      if (types.includes("spicy")) base.push(currentLang === "ar" ? "عنبر دافي" : "Warm amber");
      if (types.includes("sweet")) base.push(currentLang === "ar" ? "فانيليا ثابتة" : "Lasting vanilla");

      if (!top.length) top.push(currentLang === "ar" ? "افتتاحية ناعمة" : "Soft opening");
      if (!heart.length) heart.push(currentLang === "ar" ? "قلب متوازن" : "Balanced heart");
      if (!base.length) base.push(currentLang === "ar" ? "قاعدة ثابتة" : "Smooth dry down");

      return {
        top: top.slice(0, 2).join(currentLang === "ar" ? " • " : " • "),
        heart: heart.slice(0, 2).join(currentLang === "ar" ? " • " : " • "),
        base: base.slice(0, 2).join(currentLang === "ar" ? " • " : " • ")
      };
    }

    function getOccasionChips(product) {
      const text = parseProductText(product);
      const types = product.filterTypes || deriveFilterTypes(product);
      const chips = [];

      if (types.includes("fresh") || text.includes("fresh") || text.includes("daily") || text.includes("office") || text.includes("منعش")) {
        chips.push(currentLang === "ar" ? "يومي" : "Daily");
        chips.push(currentLang === "ar" ? "شغل" : "Office");
      }
      if (types.includes("musk") && !types.includes("fresh")) {
        chips.push(currentLang === "ar" ? "هادي" : "Soft");
      }
      if (types.includes("sweet") || text.includes("sweet") || text.includes("warm") || text.includes("vanilla") || text.includes("سويت")) {
        chips.push(currentLang === "ar" ? "ديت" : "Date");
      }
      if (types.includes("luxury") || types.includes("oud") || types.includes("spicy") || text.includes("luxury") || text.includes("evening") || text.includes("فاخر") || product.price >= 1800) {
        chips.push(currentLang === "ar" ? "مناسبات" : "Occasions");
        chips.push(currentLang === "ar" ? "سهرات" : "Evening");
      }

      if (!chips.length) chips.push(currentLang === "ar" ? "مرن" : "Versatile");
      return [...new Set(chips)].slice(0, 4);
    }

    function getTrustBadges(product) {
      const badges = [
        currentLang === "ar" ? "تفاصيل واضحة" : "Clear details",
        currentLang === "ar" ? "ثبات موضح" : "Longevity guide",
        currentLang === "ar" ? "اختيار مضمون" : "Safe blind-buy hint"
      ];
      if ((product.rating || 0) >= 4.9) {
        badges.unshift(currentLang === "ar" ? "أعلى تقييم" : "Top rated");
      }
      return badges.slice(0, 4);
    }

    function getDefaultReviews(product) {
      const type = (product.filterTypes || []).includes("fresh")
        ? (currentLang === "ar" ? "مريح جدًا في اليوم" : "Very comfortable for daytime")
        : (currentLang === "ar" ? "فخم وواضح من أول رشة" : "Luxurious from the first spray");

      return [
        {
          author: currentLang === "ar" ? "عميل Ova" : "Ova Customer",
          text: currentLang === "ar" ? `${type} والثبات كان مناسب جدًا بالنسبة للسعر.` : `${type} and the performance felt great for the price.`,
          tag: currentLang === "ar" ? "مشتري موثق" : "Verified pick"
        },
        {
          author: currentLang === "ar" ? "تقييم سريع" : "Quick review",
          text: currentLang === "ar" ? "التفاصيل في الصفحة قريبة جدًا من إحساس البرفان الحقيقي." : "The page details were very close to the actual scent experience.",
          tag: currentLang === "ar" ? "تجربة حقيقية" : "Real usage"
        }
      ];
    }

    function getStoredReviews() {
      try {
        return JSON.parse(localStorage.getItem("ovaProductReviews") || "{}");
      } catch (error) {
        return {};
      }
    }

    function saveStoredReviews(reviewsMap) {
      localStorage.setItem("ovaProductReviews", JSON.stringify(reviewsMap));
    }

    function getPageProductByName(name) {
      const directProduct = getProductByName(name);
      const currentMatch = currentProduct && normalizeSearchTerm(currentProduct.name) === normalizeSearchTerm(name)
        ? currentProduct
        : null;
      const storedProduct = getStoredSelectedProduct(name);

      if (directProduct && currentMatch) {
        return mergeProductData({ ...currentMatch }, directProduct);
      }
      if (directProduct && storedProduct) {
        return mergeProductData({ ...storedProduct }, directProduct);
      }
      if (currentMatch && storedProduct) {
        return mergeProductData({ ...storedProduct }, currentMatch);
      }
      return directProduct || currentMatch || storedProduct || null;
    }

    function getReviewsForProduct(name) {
      const stored = getStoredReviews();
      const saved = Array.isArray(stored[name]) ? stored[name] : [];
      const product = getPageProductByName(name);
      const defaults = product ? getDefaultReviews(product) : [];
      return [...saved, ...defaults].slice(0, 5);
    }

    function renderReviewsInModal(name) {
      const wrap = document.getElementById("modalReviews");
      if (!wrap) return;
      const reviews = getReviewsForProduct(name);

      wrap.innerHTML = `
        <div class="modal-reviews-head">
          <h3>${t("reviewsTitle")}</h3>
          <span>${reviews.length}</span>
        </div>
        <div class="modal-review-list">
          ${reviews.length ? reviews.map((review) => `
            <div class="modal-review-item">
              <strong>${escapeHtml(review.author)}</strong>
              ${escapeHtml(review.text)}
              <span>${escapeHtml(review.tag || "")}</span>
            </div>
          `).join("") : `<div class="modal-review-item">${t("reviewEmpty")}</div>`}
        </div>
        <div class="modal-review-form">
          <textarea id="modalReviewInput" placeholder="${t("reviewPlaceholder")}"></textarea>
          <button type="button" onclick="submitModalReview('${name.replace(/'/g, "\\'")}')">${t("reviewSubmit")}</button>
        </div>
      `;
    }

    function submitModalReview(name) {
      const input = document.getElementById("modalReviewInput");
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;

      const reviewsMap = getStoredReviews();
      const entry = {
        author: currentLang === "ar" ? "عميل Ova" : "Ova Customer",
        text,
        tag: currentLang === "ar" ? "رأي جديد" : "New review"
      };
      reviewsMap[name] = [entry, ...(reviewsMap[name] || [])].slice(0, 3);
      saveStoredReviews(reviewsMap);
      renderReviewsInModal(name);
      const message = document.getElementById("quizMessage");
      if (message) {
        updateQuizStatus(t("reviewSaved"), "success");
      }
    }

    function toggleCompareProduct(name) {
      const index = compareProducts.findIndex((item) => item.name === name);
      const isAdding = index < 0;
      if (index >= 0) {
        compareProducts.splice(index, 1);
      } else {
        const product = getPageProductByName(name);
        if (!product) return;
        if (compareProducts.length >= 3) compareProducts.shift();
        compareProducts.push(product);
      }
      if (isAdding && isMobileCompareBar()) {
        compareBarExpanded = true;
      }
      updateCompareBar();
      syncCompareButtons();
      if (currentProduct) renderModalCompareSummary(currentProduct);
    }

    function toggleCompareCurrentProduct() {
      if (!currentProduct) return;
      toggleCompareProduct(currentProduct.name);
    }

    function clearCompareProducts() {
      compareProducts.length = 0;
      compareBarExpanded = false;
      updateCompareBar();
      syncCompareButtons();
      if (currentProduct) renderModalCompareSummary(currentProduct);
    }

    function updateCompareBar() {
      const bar = document.getElementById("compareBar");
      const picked = document.getElementById("comparePicked");
      const count = document.getElementById("compareCount");
      if (!bar || !picked) return;

      picked.innerHTML = compareProducts.map((product, index) => `
        <span class="compare-pill">
          <span>${index + 1}. ${escapeHtml(product.name)}</span>
          <button class="compare-pill-remove" type="button" data-compare-remove="${escapeHtml(product.name)}" aria-label="${currentLang === "ar" ? "إزالة البرفان من المقارنة" : "Remove perfume from compare"}">&times;</button>
        </span>
      `).join("");
      picked.querySelectorAll("[data-compare-remove]").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          removeCompareProduct(button.getAttribute("data-compare-remove"));
        });
      });
      if (count) count.textContent = String(compareProducts.length);
      const hasItems = compareProducts.length > 0;
      if (!hasItems) {
        compareBarExpanded = false;
      }
      if (!isMobileCompareBar()) {
        compareBarExpanded = false;
      }
      const overlay = document.getElementById("compareBarOverlay");
      const isMobileOpen = hasItems && isMobileCompareBar() && compareBarExpanded;
      bar.classList.toggle("is-visible", isMobileCompareBar() ? isMobileOpen : hasItems);
      bar.classList.toggle("is-expanded", isMobileOpen);
      bar.classList.remove("is-peeking");
      if (overlay) overlay.classList.toggle("is-visible", isMobileOpen);
      document.body.classList.toggle("compare-bar-open", isMobileOpen);
    }

    function syncCompareButtons() {
      document.querySelectorAll("[data-compare-product]").forEach((button) => {
        const active = compareProducts.some((item) => item.name === button.dataset.compareProduct);
        button.classList.toggle("is-active", active);
        setProductButtonLabel(button, active ? (currentLang === "ar" ? "مضاف" : "Added") : t("compare"));
      });

      const modalButton = document.getElementById("modalCompareBtn");
      if (modalButton && currentProduct) {
        const active = compareProducts.some((item) => item.name === currentProduct.name);
        modalButton.classList.toggle("is-active", active);
        modalButton.textContent = active ? (currentLang === "ar" ? "ضمن المقارنة" : "In Compare") : t("compare");
      }
    }

    function renderModalCompareSummary(product) {
      const wrap = document.getElementById("modalCompareSummary");
      if (!wrap || !product) return;
      const exists = compareProducts.some((item) => item.name === product.name);
      wrap.innerHTML = exists
        ? (currentLang === "ar" ? "هذا البرفان مضاف حاليًا إلى المقارنة. افتح المقارنة لرؤية الفرق جنب باقي الاختيارات." : "This perfume is already in your comparison list. Open compare to see it side by side.")
        : (currentLang === "ar" ? "أضف البرفان للمقارنة وشوف الفرق في الثبات والفوحان والستايل مع أي برفان ثاني." : "Add this perfume to compare longevity, sillage, and overall style against other perfumes.");
    }

    function openCompareModal() {
      if (!compareProducts.length) return;
      const wrap = document.getElementById("compareModalTableWrap");
      const rows = [
        [t("price"), compareProducts.map((product) => `${product.price} EGP`)],
        [t("type"), compareProducts.map((product) => getDisplayType(product) || "-")],
        [t("longevity"), compareProducts.map((product) => product.longevity || "-")],
        [t("sillage"), compareProducts.map((product) => product.sillage || "-")],
        [t("profileTitle"), compareProducts.map((product) => getProductProfile(product))],
        [t("bestForTitle"), compareProducts.map((product) => getBestFor(product))]
      ];

      wrap.innerHTML = `
        <table class="compare-table">
          <thead>
            <tr>
              <th>${currentLang === "ar" ? "المعيار" : "Criteria"}</th>
              ${compareProducts.map((product) => `<th>${escapeHtml(product.name)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map(([label, values]) => `
              <tr>
                <td><strong>${label}</strong></td>
                ${values.map((value) => `<td>${value}</td>`).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
      document.body.classList.add("compare-modal-open");
      document.getElementById("compareModal").style.display = "block";
    }

    function closeCompareModal() {
      document.body.classList.remove("compare-modal-open");
      document.getElementById("compareModal").style.display = "none";
    }

    function renderModalExperience(product) {
      const noteLayers = buildNoteLayers(product);
      document.getElementById("modalSubline").innerText = t("modalSubline");
      document.getElementById("modalAccords").innerHTML = getAccordChips(product)
        .map((chip) => `<span class="modal-chip">${chip}</span>`)
        .join("");
      document.getElementById("modalProfile").innerHTML = `
        <div class="modal-profile-card">
          <small>${t("profileTitle")}</small>
          <strong>${getProductProfile(product)}</strong>
        </div>
        <div class="modal-profile-card">
          <small>${t("bestForTitle")}</small>
          <strong>${getBestFor(product)}</strong>
        </div>
      `;
      document.getElementById("modalPyramid").innerHTML = `
        <div class="modal-note-card">
          <span>${t("topNotes")}</span>
          <p>${noteLayers.top}</p>
        </div>
        <div class="modal-note-card">
          <span>${t("heartNotes")}</span>
          <p>${noteLayers.heart}</p>
        </div>
        <div class="modal-note-card">
          <span>${t("baseNotes")}</span>
          <p>${noteLayers.base}</p>
        </div>
      `;
      document.getElementById("modalOccasions").innerHTML = getOccasionChips(product)
        .map((chip) => `<span class="modal-chip">${chip}</span>`)
        .join("");
      document.getElementById("modalTrustBadges").innerHTML = getTrustBadges(product)
        .map((badge) => `<span class="trust-badge">${badge}</span>`)
        .join("");
      renderModalCompareSummary(product);
      const quickBar = document.getElementById("modalQuickBar");
      if (quickBar) {
        quickBar.style.display = window.innerWidth <= 700 ? "flex" : "none";
      }
    }

    function getQuizSelections() {
      return {
        mood: document.getElementById("quizMood")?.value || "luxury",
        occasion: document.getElementById("quizOccasion")?.value || "evening",
        scent: document.getElementById("quizScent")?.value || "sweet"
      };
    }

    function scoreQuizProduct(product, selections) {
      const types = product.filterTypes || deriveFilterTypes(product);
      const text = parseProductText(product);
      let score = 0;

      if (selections.scent && types.includes(selections.scent)) score += 5;
      if (selections.mood === "luxury" && (product.price >= 1800 || types.includes("luxury") || text.includes("فاخر"))) score += 4;
      if (selections.mood !== "luxury" && types.includes(selections.mood)) score += 4;

      if (selections.occasion === "daily" || selections.occasion === "office") {
        if (types.includes("fresh") || types.includes("musk") || text.includes("daily")) score += 3;
      }
      if (selections.occasion === "evening" || selections.occasion === "date") {
        if (types.includes("sweet") || types.includes("spicy") || types.includes("woody") || text.includes("evening")) score += 3;
      }

      return score + Number(product.rating || 0);
    }

    function renderQuizResults(products) {
      const grid = document.getElementById("quizResults");
      if (!grid) return;
      quizSectionRendered = true;
      const fragment = document.createDocumentFragment();
      products.forEach((product) => fragment.appendChild(createProductCard(product)));
      grid.replaceChildren(fragment);
      syncCompareButtons();
    }

    function renderDeferredSection(sectionKey) {
      if (sectionKey === "men") {
        if (menSectionRendered) return;
        menSectionRendered = true;
        applyFilters("men");
        return;
      }

      if (sectionKey === "women") {
        if (womenSectionRendered) return;
        womenSectionRendered = true;
        applyFilters("women");
        return;
      }

      if (sectionKey === "quiz") {
        if (quizSectionRendered) return;
        renderQuizResults(bestSellerProducts.slice(0, 3));
      }
    }

    function initDeferredSectionRendering() {
      const targets = [
        { key: "men", element: document.getElementById("perfumesSection") },
        { key: "women", element: document.getElementById("womensPerfumesSection") }
      ];

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const sectionKey = entry.target.dataset.deferSection;
            renderDeferredSection(sectionKey);
            observer.unobserve(entry.target);
          });
        }, {
          rootMargin: "300px 0px",
          threshold: 0.01
        });

        targets.forEach(({ key, element }) => {
          if (!element) return;
          element.dataset.deferSection = key;
          observer.observe(element);
        });
      }

      scheduleIdleWork(() => renderDeferredSection("men"), 1400);
      scheduleIdleWork(() => renderDeferredSection("women"), 1800);
      scheduleIdleWork(() => renderDeferredSection("quiz"), 2200);
    }

    function refreshQuizResultsForLanguage() {
      const existingNames = [...document.querySelectorAll("#quizResults .product-card h4")]
        .map((node) => node.textContent.trim())
        .filter(Boolean);
      const products = existingNames.length
        ? existingNames.map((name) => getProductByName(name)).filter(Boolean)
        : bestSellerProducts.slice(0, 4);
      renderQuizResults(products);
    }

    function populateSectionTypeFilter(sectionKey) {
      const filter = document.getElementById(sectionKey === "men" ? "menTypeFilter" : "womenTypeFilter");
      if (!filter) return;

      const selectedValue = filter.value || "all";
      const availableTypes = [...new Set(
        getSectionSource(sectionKey)
          .flatMap((product) => product.filterTypes || [])
          .filter(Boolean)
      )].sort((a, b) => {
        const aIndex = sectionTypeOrder.indexOf(a);
        const bIndex = sectionTypeOrder.indexOf(b);
        const safeA = aIndex === -1 ? sectionTypeOrder.length : aIndex;
        const safeB = bIndex === -1 ? sectionTypeOrder.length : bIndex;
        return safeA - safeB || a.localeCompare(b);
      });

      filter.innerHTML = "";

      const allOption = document.createElement("option");
      allOption.value = "all";
      allOption.text = t("allTypes");
      filter.appendChild(allOption);

      availableTypes.forEach((typeValue) => {
        const option = document.createElement("option");
        option.value = typeValue;
        option.text = formatTypeLabel(typeValue);
        filter.appendChild(option);
      });

      filter.value = selectedValue === "all" || availableTypes.includes(selectedValue) ? selectedValue : "all";
    }

    function applyLanguage() {
      const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.innerText = value;
      };

      document.documentElement.lang = currentLang === "ar" ? "ar" : "en";
      document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
      document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
      document.getElementById("langToggle").innerText = currentLang === "ar" ? "EN" : "AR";
      document.getElementById("bottomLangToggle").innerText = currentLang === "ar" ? "EN" : "AR";
      document.getElementById("navHome").innerText = t("navHome");
      document.getElementById("bottomNavHome").innerText = t("navHome");
      document.getElementById("navProducts").innerText = t("navProducts");
      document.getElementById("bottomNavProducts").innerText = t("navProducts");
      document.getElementById("navAllProducts").innerText = t("navAllProducts");
      document.getElementById("bottomNavAllProducts").innerText = t("navAllProducts");
      document.getElementById("navUnisex").innerText = t("navUnisex");
      document.getElementById("bottomNavUnisex").innerText = t("navUnisex");
      document.getElementById("navContact").innerText = t("navContact");
      document.getElementById("bottomNavContact").innerText = t("navContact");
      document.getElementById("navMen").innerText = t("navMen");
      document.getElementById("bottomNavMen").innerText = t("navMen");
      document.getElementById("navWomen").innerText = t("navWomen");
      document.getElementById("bottomNavWomen").innerText = t("navWomen");
      document.getElementById("navBest").innerText = t("navBest");
      document.getElementById("bottomNavBest").innerText = t("navBest");
      document.getElementById("navBrands").innerText = t("navBrands");
      document.getElementById("bottomNavBrands").innerText = t("navBrands");
      setText("introEyebrow", t("introEyebrow"));
      setText("introTitle", t("introTitle"));
      setText("introSubtitle", t("introSubtitle"));
      setText("introEnterBtn", t("introEnterBtn"));
      setText("introLoadingText", t("introLoadingText"));
      setText("heroKicker", t("heroKicker"));
      document.getElementById("heroTitle").innerText = t("heroTitle");
      setText("heroSubtitle", t("heroSubtitle"));
      setText("heroOrders", t("heroOrders"));
      setText("heroTopSellerLabel", t("heroTopSellerLabel"));
      document.getElementById("heroBtn").innerText = t("heroBtn");
      document.getElementById("heroSecondaryBtn").innerText = t("heroSecondaryBtn");
      setText("offerStrong", t("offerStrong"));
      setText("offerSpan", t("offerSpan"));
      setText("couponBannerText", t("couponBannerText"));
      setText("couponFloatTitle", t("couponFloatTitle"));
      setText("couponFloatNote", t("couponFloatNote"));
      document.querySelectorAll(".promo-topbar-repeat-couponBannerText").forEach((el) => el.innerText = t("couponBannerText"));
      document.querySelectorAll(".promo-topbar-repeat-couponFloatCode").forEach((el) => el.innerText = currentLang === "ar" ? "خصم 50%" : "50% OFF");
      document.querySelectorAll(".promo-topbar-repeat-couponFloatTitle").forEach((el) => el.innerText = t("couponFloatTitle"));
      document.querySelectorAll(".promo-topbar-repeat-couponFloatNote").forEach((el) => el.innerText = t("couponFloatNote"));
      document.getElementById("bestSellerTitle")?.setAttribute("aria-label", t("bestSellerTitle"));
      document.getElementById("bestSellerTitleWrap")?.setAttribute("data-ghost", t("bestSellerTitle"));
      document.getElementById("brandsTitle").innerText = t("brandsTitle");
      document.getElementById("brandsTitleWrap")?.setAttribute("data-ghost", t("brandsTitle"));
      setText("menPromoCaption", t("menPromoCaption"));
      setText("womenPromoCaption", t("womenPromoCaption"));
      setText("menPromoTag", t("promoBadgeOffer"));
      setText("womenPromoTag", t("promoBadgeOffer"));
      setText("menVideoText", t("menVideoText"));
      setText("womenVideoText", t("womenVideoText"));
      document.getElementById("menFilterNote").innerText = t("menFilterNote");
      document.getElementById("womenFilterNote").innerText = t("womenFilterNote");
      document.getElementById("menShopAllBtn").innerText = t("shopAll");
      document.getElementById("womenShopAllBtn").innerText = t("shopAll");
      setPromoBannerCopyState(false);
      setFloatingCouponButtonState(false);
      setText("brandsKicker", currentLang === "ar" ? "تسوق حسب" : "Shop By");
      renderBrandRails();
      const modalOfferText = document.getElementById("modalOfferText");
      const modalAddBtn = document.getElementById("modalAddBtn");
      const modalBuyNowBtn = document.getElementById("modalBuyNowBtn");
      const modalQuickTitle = document.getElementById("modalQuickTitle");
      const modalQuickText = document.getElementById("modalQuickText");
      const modalQuickBtn = document.getElementById("modalQuickBtn");
      if (modalOfferText) modalOfferText.innerText = t("modalOffer");
      if (modalAddBtn) modalAddBtn.innerText = t("addToCart");
      if (modalBuyNowBtn) modalBuyNowBtn.innerText = t("buyNow");
      if (modalQuickTitle) modalQuickTitle.innerText = t("quickCheckoutTitle");
      if (modalQuickText) modalQuickText.innerText = t("quickCheckoutText");
      if (modalQuickBtn) modalQuickBtn.innerText = t("buyNow");
      setText("compareBarTitle", t("compareBarTitle"));
      setText("compareNowBtn", t("compareNow"));
      setText("compareClearBtn", t("compareClear"));
      setText("compareModalTitle", t("compareModalTitle"));
      setText("compareModalDesc", t("compareModalDesc"));
      setText("compareCloseBtn", t("closeCompare"));
      document.getElementById("cartBack").innerText = String.fromCharCode(8592) + " " + t("back");
      document.getElementById("searchBack").innerText = String.fromCharCode(8592) + " " + t("back");
      document.getElementById("cartCheckoutBtn").innerText = t("checkout");
      document.getElementById("cartContinueBtn").innerText = t("continueShopping");
      setText("khamrahVideoKicker", t("khamrahVideoKicker"));
      setText("khamrahVideoSub", t("khamrahVideoSub"));
      document.getElementById("searchTitle").innerText = t("searchTitle");
      document.getElementById("sidebarSearch").placeholder = t("searchPlaceholder");
      document.getElementById("closeSearchBtn").innerText = t("close");
      document.getElementById("whatsappFloat").innerText = t("whatsapp");
      document.getElementById("menSearchInput").placeholder = t("menSearchPlaceholder");
      document.getElementById("womenSearchInput").placeholder = t("womenSearchPlaceholder");
      setText("countdownLabel", t("countdownLabel"));

      const optionMaps = [
        ["menPriceFilter", ["allPrices", "below1000", "1000 - 1499", "1500 - 1999", "2000+"]],
        ["womenPriceFilter", ["allPrices", "below1000", "1000 - 1499", "1500 - 1999", "2000+"]]
      ];

      optionMaps.forEach(([id, keys]) => {
        const options = document.getElementById(id).options;
        keys.forEach((key, index) => {
          if (!options[index]) return;
          options[index].text = translations[currentLang][key] || key;
        });
      });

      populateSectionTypeFilter("men");
      populateSectionTypeFilter("women");
      renderHeroTopSellerStrip();
      renderBestSellerHero();
      renderQuizState();
      renderGrid("bestSellerSlider", [...bestSellerProducts, ...extraBestSellerProducts]);
      if (menSectionRendered) applyFilters("men");
      if (womenSectionRendered) applyFilters("women");
      if (quizSectionRendered) refreshQuizResultsForLanguage();
      renderCart();
      updateCompareBar();
      syncCompareButtons();
      if (currentProduct) {
        renderModalExperience(currentProduct);
        renderReviewsInModal(currentProduct.name);
      }
      if (requestedProductName || requestedProductSlug) {
        renderProductDetailPage(requestedProductName || requestedProductSlug);
      }
    }

    function toggleLanguage() {
      currentLang = currentLang === "en" ? "ar" : "en";
      localStorage.setItem("ovaLang", currentLang);
      applyLanguage();
    }

    const INTRO_SEEN_KEY = "ovaIntroSeen";

    function hasSeenIntro() {
      try {
        if (localStorage.getItem(INTRO_SEEN_KEY) === "true") {
          return true;
        }
      } catch (error) {
        console.warn("Intro localStorage unavailable, falling back to cookie.", error);
      }

      return document.cookie
        .split(";")
        .map((entry) => entry.trim())
        .some((entry) => entry === `${INTRO_SEEN_KEY}=true`);
    }

    function markIntroSeen() {
      try {
        localStorage.setItem(INTRO_SEEN_KEY, "true");
      } catch (error) {
        console.warn("Unable to persist intro state in localStorage.", error);
      }

      document.cookie = `${INTRO_SEEN_KEY}=true; path=/; max-age=31536000; SameSite=Lax`;
    }

    function closeIntroScreen(markSeen = false) {
      const introScreen = document.getElementById("introScreen");
      const introLoader = document.getElementById("introLoader");
      const introButton = document.getElementById("introEnterBtn");
      if (!introScreen) return;

      if (markSeen) {
        markIntroSeen();
      }

      if (introLoader) introLoader.classList.add("is-visible");
      if (introButton) introButton.disabled = true;
      introScreen.classList.add("is-hidden");
      document.body.classList.remove("intro-active");
    }

    function hideIntroImmediately() {
      const introScreen = document.getElementById("introScreen");
      const introLoader = document.getElementById("introLoader");
      const introButton = document.getElementById("introEnterBtn");
      if (!introScreen) return;
      if (introLoader) introLoader.classList.remove("is-visible");
      if (introButton) introButton.disabled = false;
      introScreen.classList.add("is-hidden");
      document.body.classList.remove("intro-active");
    }

    function isHistoryReturnNavigation() {
      const navigationEntry = typeof performance !== "undefined" && typeof performance.getEntriesByType === "function"
        ? performance.getEntriesByType("navigation")[0]
        : null;

      if (navigationEntry && navigationEntry.type === "back_forward") {
        return true;
      }

      if (typeof performance !== "undefined" && performance.navigation && performance.navigation.type === 2) {
        return true;
      }

      return false;
    }

    function enterSite() {
      const introLoader = document.getElementById("introLoader");
      const introButton = document.getElementById("introEnterBtn");
      if (introButton) introButton.disabled = true;
      if (introLoader) introLoader.classList.add("is-visible");

      window.setTimeout(() => {
        closeIntroScreen(true);
      }, 320);
    }

    function initIntroScreen() {
      const introScreen = document.getElementById("introScreen");
      const introLoader = document.getElementById("introLoader");
      const introButton = document.getElementById("introEnterBtn");
      if (!introScreen) return;

      const introAlreadySeen = hasSeenIntro();

      if (introAlreadySeen || isHistoryReturnNavigation()) {
        hideIntroImmediately();
        return;
      }

      introScreen.classList.remove("is-hidden");
      document.body.classList.add("intro-active");
      if (introLoader) introLoader.classList.remove("is-visible");
      if (introButton) introButton.disabled = false;
    }

    window.addEventListener("pageshow", (event) => {
      if (hasSeenIntro() || event.persisted || isHistoryReturnNavigation()) {
        hideIntroImmediately();
      }
    });

    function toggleDropdown(id) {
      const el = document.getElementById(id);
      const shouldOpen = el.style.display !== "block";
      closeDropdown(id === "hamburger" ? "bottomHamburger" : "hamburger");
      if (id === "hamburger") {
        closeBottomProductsMenu();
        closeBottomContactMenu();
      } else {
        closeProductsMenu();
        closeContactMenu();
      }
      el.style.display = shouldOpen ? "block" : "none";
      if (!shouldOpen) {
        closeProductsMenu();
        closeBottomProductsMenu();
        closeContactMenu();
        closeBottomContactMenu();
      }
    }

    function closeDropdown(id) {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
      if (id === "hamburger") {
        closeProductsMenu();
        closeContactMenu();
      } else if (id === "bottomHamburger") {
        closeBottomProductsMenu();
        closeBottomContactMenu();
      }
    }

    function toggleProductsMenu() {
      const submenu = document.getElementById("productsSubmenu");
      const arrow = document.getElementById("navProductsArrow");
      const isOpen = submenu && submenu.style.display === "block";
      closeContactMenu();
      if (submenu) submenu.style.display = isOpen ? "none" : "block";
      if (arrow) arrow.innerText = isOpen ? "+" : "-";
    }

    function closeProductsMenu() {
      const submenu = document.getElementById("productsSubmenu");
      const arrow = document.getElementById("navProductsArrow");
      if (submenu) submenu.style.display = "none";
      if (arrow) arrow.innerText = "+";
    }

    function toggleContactMenu() {
      const submenu = document.getElementById("contactSubmenu");
      const arrow = document.getElementById("navContactArrow");
      const isOpen = submenu && submenu.style.display === "block";
      closeProductsMenu();
      if (submenu) submenu.style.display = isOpen ? "none" : "block";
      if (arrow) arrow.innerText = isOpen ? "+" : "-";
    }

    function closeContactMenu() {
      const submenu = document.getElementById("contactSubmenu");
      const arrow = document.getElementById("navContactArrow");
      if (submenu) submenu.style.display = "none";
      if (arrow) arrow.innerText = "+";
    }

    function toggleBottomProductsMenu() {
      const submenu = document.getElementById("bottomProductsSubmenu");
      const arrow = document.getElementById("bottomNavProductsArrow");
      const isOpen = submenu && submenu.style.display === "block";
      closeBottomContactMenu();
      if (submenu) submenu.style.display = isOpen ? "none" : "block";
      if (arrow) arrow.innerText = isOpen ? "+" : "-";
    }

    function closeBottomProductsMenu() {
      const submenu = document.getElementById("bottomProductsSubmenu");
      const arrow = document.getElementById("bottomNavProductsArrow");
      if (submenu) submenu.style.display = "none";
      if (arrow) arrow.innerText = "+";
    }

    function toggleBottomContactMenu() {
      const submenu = document.getElementById("bottomContactSubmenu");
      const arrow = document.getElementById("bottomNavContactArrow");
      const isOpen = submenu && submenu.style.display === "block";
      closeBottomProductsMenu();
      if (submenu) submenu.style.display = isOpen ? "none" : "block";
      if (arrow) arrow.innerText = isOpen ? "+" : "-";
    }

    function closeBottomContactMenu() {
      const submenu = document.getElementById("bottomContactSubmenu");
      const arrow = document.getElementById("bottomNavContactArrow");
      if (submenu) submenu.style.display = "none";
      if (arrow) arrow.innerText = "+";
    }

    function buildHomepageFallbackDetailsHtml(product) {
      return `
        <p><strong>الوصف:</strong><br>${product.name} من تشكيلات Ova Store بطابع ${getDisplayType(product) || "Luxury"} مع حضور واضح ولمسة مناسبة لعشاق البرفانات الملفتة.</p>
        <p><strong>النوع:</strong> ${getDisplayType(product) || "Luxury"}</p>
        <p><strong>الثبات:</strong> ${product.longevity || "Good"}</p>
        <p><strong>الفوحان:</strong> ${product.sillage || "Moderate"}</p>
        <p><strong>الاستخدام:</strong> ${product.type === "fresh" ? "يومي - صيف - شغل" : product.type === "sweet" ? "سهر - خروجات - شتاء" : "يومي - مناسبات"}</p>
      `;
    }

    function getAllHomepageProductPools() {
      const catalogProducts = Object.entries(window.ovaBrandCatalog || {}).flatMap(([brandKey, brand]) =>
        ((brand && brand.products) || []).map((product) => ({
          ...product,
          brandKey,
          brandTitle: brand.title || brandKey,
          section: "brand"
        }))
      );

      return [
        ...bestSellerProducts,
        ...extraBestSellerProducts,
        ...newArrivalProducts,
        ...menPerfumes,
        ...extraMenPerfumes,
        ...moreMenPerfumes,
        ...womenPerfumes,
        ...moreWomenPerfumes,
        ...latestWomenPerfumes,
        ...brandProducts,
        ...catalogProducts,
        ...allProducts
      ];
    }

    const bestSellerHeroImageOverrides = new Map(
      bestSellerHeroProducts.map((product) => [product.name, product.img])
    );

    function sortRemoteHomepageProducts(list) {
      return [...list].sort((left, right) => {
        if (Number(left.isBestSeller) !== Number(right.isBestSeller)) {
          return Number(right.isBestSeller) - Number(left.isBestSeller);
        }
        if (Number(left.isFeatured) !== Number(right.isFeatured)) {
          return Number(right.isFeatured) - Number(left.isFeatured);
        }
        return (left.sortOrder || 0) - (right.sortOrder || 0);
      });
    }

    function syncHomepageCollection(target, source, section) {
      if (window.ovaRemoteCatalog?.syncArray) {
        window.ovaRemoteCatalog.syncArray(target, source.map((product) => ({ ...product })));
      } else {
        target.splice(0, target.length, ...source.map((product) => ({ ...product })));
      }
      decorateProducts(target, section);
    }

    async function hydrateHomepageFromRemoteCatalog() {
      if (!window.ovaRemoteCatalog) return false;

      try {
        const remoteProducts = await window.ovaRemoteCatalog.fetchProducts();
        const normalizedRemoteProducts = window.ovaRemoteCatalog.normalizeProducts(remoteProducts);
        if (!normalizedRemoteProducts.length) return false;

        const remoteBrandCatalog = window.ovaRemoteCatalog.groupBrandCatalog(remoteProducts, window.ovaBrandCatalog || {});
        if (window.ovaBrandCatalog) {
          window.ovaRemoteCatalog.syncObject(window.ovaBrandCatalog, remoteBrandCatalog);
        }

        const sortedRemoteProducts = sortRemoteHomepageProducts(normalizedRemoteProducts);
        const bestSellerPool = sortedRemoteProducts.filter((product) => product.isBestSeller);
        const heroPoolBase = bestSellerPool.length ? bestSellerPool : sortedRemoteProducts.filter((product) => product.isFeatured);
        const heroPool = (heroPoolBase.length ? heroPoolBase : sortedRemoteProducts)
          .slice(0, 4)
          .map((product) => ({
            ...product,
            img: bestSellerHeroImageOverrides.get(product.name) || product.img
          }));

        const visibleBestSellers = bestSellerPool.length ? bestSellerPool : sortedRemoteProducts.slice(0, 16);
        const menSectionPool = sortRemoteHomepageProducts(
          normalizedRemoteProducts.filter((product) => product.category === "men" || product.category === "unisex")
        );
        const womenSectionPool = sortRemoteHomepageProducts(
          normalizedRemoteProducts.filter((product) => product.category === "women" || product.category === "unisex")
        );
        const remoteBrandProducts = uniqueProductsByName(
          sectionBrandKeys.flatMap((brandKey) => {
            const brand = window.ovaBrandCatalog?.[brandKey];
            return ((brand?.products || []).map((product) => ({
              ...product,
              brandKey,
              brandTitle: brand.title || brandKey
            })));
          })
        );

        syncHomepageCollection(bestSellerProducts, visibleBestSellers.slice(0, 8), "best");
        syncHomepageCollection(extraBestSellerProducts, visibleBestSellers.slice(8), "best");
        syncHomepageCollection(bestSellerHeroProducts, heroPool, "best");
        syncHomepageCollection(menPerfumes, menSectionPool.slice(0, 8), "men");
        syncHomepageCollection(extraMenPerfumes, menSectionPool.slice(8, 16), "men");
        syncHomepageCollection(moreMenPerfumes, menSectionPool.slice(16), "men");
        syncHomepageCollection(womenPerfumes, womenSectionPool.slice(0, 8), "women");
        syncHomepageCollection(moreWomenPerfumes, womenSectionPool.slice(8, 16), "women");
        syncHomepageCollection(latestWomenPerfumes, womenSectionPool.slice(16), "women");
        syncHomepageCollection(brandProducts, remoteBrandProducts, "brand");

        const refreshedAllProducts = uniqueProductsByName([
          ...bestSellerProducts,
          ...extraBestSellerProducts,
          ...menPerfumes,
          ...extraMenPerfumes,
          ...moreMenPerfumes,
          ...womenPerfumes,
          ...moreWomenPerfumes,
          ...latestWomenPerfumes,
          ...brandProducts
        ]);

        syncHomepageCollection(allProducts, refreshedAllProducts, "catalog");
        rebuildAllProductsByNameMap();
        homepageProductMatchesByName = null;
        applyDetailsMapToHomepage(productDetailMap);
        return true;
      } catch (error) {
        console.warn("Remote catalog unavailable for homepage, using static fallback.", error);
        return false;
      }
    }

    function startRemoteCatalogHydration() {
      if (!window.ovaRemoteCatalog) return Promise.resolve(false);
      if (!remoteCatalogHydrationPromise) {
        remoteCatalogHydrationPromise = hydrateHomepageFromRemoteCatalog();
      }
      return remoteCatalogHydrationPromise;
    }

    let homepageProductMatchesByName = null;

    function getHomepageProductMatchesByName() {
      if (homepageProductMatchesByName) return homepageProductMatchesByName;
      homepageProductMatchesByName = new Map();
      getAllHomepageProductPools().forEach((product) => {
        const key = normalizeSearchTerm(product?.name);
        if (!key) return;
        if (!homepageProductMatchesByName.has(key)) {
          homepageProductMatchesByName.set(key, []);
        }
        homepageProductMatchesByName.get(key).push(product);
      });
      return homepageProductMatchesByName;
    }

    function getProductByName(name) {
      const matches = getHomepageProductMatchesByName().get(normalizeSearchTerm(name)) || [];
      if (!matches.length) return null;

      const merged = matches.reduce((result, product) => mergeProductData(result, product), {});
      if (!merged.detailsHtml) merged.detailsHtml = buildHomepageFallbackDetailsHtml(merged);
      if (!merged.img2) merged.img2 = merged.img;
      return merged;
    }

    function getProductBySlug(slug) {
      const targetSlug = slugifyProductValue(slug);
      if (!targetSlug) return null;

      const matches = getAllHomepageProductPools().filter((product) => {
        const productSlug = getProductSlugValue(product);
        return productSlug === targetSlug;
      });

      if (!matches.length) return null;

      const merged = matches.reduce((result, product) => mergeProductData(result, product), {});
      if (!merged.detailsHtml) merged.detailsHtml = buildHomepageFallbackDetailsHtml(merged);
      if (!merged.img2) merged.img2 = merged.img;
      return merged;
    }

    const offerExcludedNames = new Set(["Ibraq Tobacco Collection"]);

    function getCartOfferSummary(items) {
      const eligibleItems = items.filter((item) => !offerExcludedNames.has(item.name));
      const totalQty = eligibleItems.reduce((sum, item) => sum + item.qty, 0);
      const subtotalAll = eligibleItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const qualifies = totalQty >= 3;
      const discount = qualifies ? Math.round(subtotalAll * 0.5) : 0;
      return { freeByName: {}, discount, freePieces: 0, totalQty, qualifies, subtotalAll };
    }

    function getItemFreeUnits() {
      return 0;
    }

    function getItemSubtotal(item, offerSummary = getCartOfferSummary(cart)) {
      const base = item.price * item.qty;
      if (offerExcludedNames.has(item.name)) return base;
      return offerSummary.qualifies ? Math.round(base * 0.5) : base;
    }

    function getQuizDiscountAmount(totalBeforeQuiz) {
      return 0;
    }

    function setPromoBannerCopyState(copied) {
      const promoTopbar = document.getElementById("promoTopbar");
      const promoNote = document.getElementById("couponFloatNote");
      if (promoTopbar) promoTopbar.classList.toggle("is-copied", !!copied);
      if (promoNote) promoNote.innerText = copied ? t("couponFloatCopied") : t("couponFloatNote");
      document.querySelectorAll(".promo-topbar-repeat-couponFloatNote").forEach((el) => {
        el.innerText = copied ? t("couponFloatCopied") : t("couponFloatNote");
      });
    }

    function setFloatingCouponButtonState(copied) {
      const copyButton = document.getElementById("couponFloatCopyBtn");
      if (!copyButton) return;
      copyButton.innerText = copied ? t("couponFloatCopied") : t("couponFloatCopy");
      copyButton.classList.toggle("is-copied", !!copied);
    }

    function handlePromoTopbarKeydown(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      copyFloatingCouponCode();
    }

    async function copyFloatingCouponCode() {
      const target = document.getElementById("bestSellerSection");
      if (target) target.scrollIntoView({ behavior: "smooth" });

      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(18);
      }

      setPromoBannerCopyState(true);
      clearTimeout(window.ovaCouponCopyTimer);
      window.ovaCouponCopyTimer = setTimeout(() => {
        setPromoBannerCopyState(false);
      }, 1200);
    }

    function updateQuizStatus(message = "", state = "") {
      const quizMessage = document.getElementById("quizMessage");
      if (!quizMessage) return;
      quizMessage.className = "quiz-message" + (state ? " " + state : "");
      quizMessage.innerText = message;
    }

    function lockQuizAttempt(message) {
      quizAttemptUsed = true;
      quizTimerFinished = true;
      localStorage.setItem("ovaQuizAttemptUsed", JSON.stringify(true));
      localStorage.removeItem("ovaQuizStartedAt");
      renderQuizState();
      if (message) updateQuizStatus(message, "error");
    }

    function syncQuizAttemptState() {
      if (quizDiscountUnlocked) {
        quizAttemptUsed = true;
        localStorage.setItem("ovaQuizAttemptUsed", JSON.stringify(true));
        localStorage.removeItem("ovaQuizStartedAt");
        return;
      }

      if (quizAttemptUsed) {
        quizTimerFinished = true;
      }
    }

    function renderQuizState() {
      const quizTimer = document.getElementById("quizTimer");
      const quizButton = document.querySelector(".quiz-form button");
      if (quizButton) quizButton.disabled = false;
      if (quizTimer) quizTimer.innerText = t("quizTimeOver");
    }

    function startQuizTimer() {
      renderQuizState();
    }

    function submitQuizAnswer() {
      const selections = getQuizSelections();
      if (!selections.mood || !selections.occasion || !selections.scent) {
        updateQuizStatus(t("quizTypeFirst"), "error");
        return;
      }

      const ranked = [...allProducts]
        .filter((product, index, arr) => arr.findIndex((item) => item.name === product.name) === index)
        .map((product) => ({ product, score: scoreQuizProduct(product, selections) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((entry) => entry.product);

      renderQuizResults(ranked);
      renderQuizState();
      updateQuizStatus(t("quizCorrect"), "success");
    }

    function getStars(rating) {
      const fullStars = Math.round(Number(rating));
      return "\u2605".repeat(fullStars) + "\u2606".repeat(5 - fullStars);
    }

    function matchesPrice(product, priceValue) {
      if (priceValue === "all") return true;
      if (priceValue === "0-999") return product.price < 1000;
      if (priceValue === "1000-1499") return product.price >= 1000 && product.price <= 1499;
      if (priceValue === "1500-1999") return product.price >= 1500 && product.price <= 1999;
      if (priceValue === "2000+") return product.price >= 2000;
      return true;
    }

    function getOriginalPrice(product) {
      const basePrice = Number(product?.price) || 0;
      const name = String(product?.name || "");
      let hash = 0;

      for (let i = 0; i < name.length; i += 1) {
        hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
      }

      const increments = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
      return basePrice + increments[hash % increments.length];
    }

    function getSavingsAmount(product) {
      return Math.max(0, getOriginalPrice(product) - (Number(product?.price) || 0));
    }

    function getSavingsText(product) {
      const savings = getSavingsAmount(product);
      return currentLang === "ar"
        ? `وفرت ${savings} EGP`
        : `You saved ${savings} EGP`;
    }

    function getPriceMarkup(product) {
      return `
        <span class="product-old-price">${getOriginalPrice(product)} EGP</span>
        <span class="product-current-price">${product.price} EGP</span>
        <span class="product-savings">${getSavingsText(product)}</span>
      `;
    }

    function sectionHasActiveFilters(sectionKey) {
      const searchInput = document.getElementById(sectionKey === "men" ? "menSearchInput" : "womenSearchInput");
      const typeFilter = document.getElementById(sectionKey === "men" ? "menTypeFilter" : "womenTypeFilter");
      const priceFilter = document.getElementById(sectionKey === "men" ? "menPriceFilter" : "womenPriceFilter");

      const hasSearch = Boolean(searchInput?.value.trim());
      const hasTypeFilter = typeFilter && typeFilter.value !== "all";
      const hasPriceFilter = priceFilter && priceFilter.value !== "all";

      return hasSearch || hasTypeFilter || hasPriceFilter;
    }

    function getSectionSource(sectionKey) {
      if (sectionKey === "men") {
        return menLoaded || sectionHasActiveFilters("men") ? menAllProducts : menInitialProducts;
      }

      return womenLoaded || sectionHasActiveFilters("women") ? womenAllProducts : womenInitialProducts;
    }

    function applyFilters(sectionKey) {
      if (sectionKey === "men") {
        menSectionRendered = true;
      } else if (sectionKey === "women") {
        womenSectionRendered = true;
      }

      const gridId = sectionKey === "men" ? "perfumeGrid" : "womenPerfumes";
      const searchInput = document.getElementById(sectionKey === "men" ? "menSearchInput" : "womenSearchInput");
      const typeFilter = document.getElementById(sectionKey === "men" ? "menTypeFilter" : "womenTypeFilter");
      const priceFilter = document.getElementById(sectionKey === "men" ? "menPriceFilter" : "womenPriceFilter");
      const rawSearch = searchInput.value.trim();
      const search = normalizeSearchTerm(rawSearch);
      const sectionSource = getSectionSource(sectionKey);
      const sectionNameSet = new Set(sectionSource.map((product) => product.name));

      // Get brand-related perfumes for this section
      const brandPerfumes = getBrandPerfumes(search).filter((product) => sectionNameSet.has(product.name));
      
      // Get regular search results for this section
      const regularResults = sectionSource.filter((product) => {
        const searchText = getSearchText(product);
        return search === "" || searchText.includes(search);
      });

      // Combine results: brand perfumes first, then regular results
      const allResults = [...brandPerfumes];
      const seenNames = new Set(brandPerfumes.map((product) => product.name));
      
      // Add regular results that aren't already in brand results
      regularResults.forEach((product) => {
        if (!seenNames.has(product.name)) {
          seenNames.add(product.name);
          allResults.push(product);
        }
      });

      // Apply type and price filters
      const filtered = allResults.filter((product) => {
        const matchesType = typeFilter.value === "all" || (product.filterTypes || []).includes(typeFilter.value);
        return matchesType && matchesPrice(product, priceFilter.value);
      }).sort((a, b) => {
        if (search === "") return a.name.localeCompare(b.name);
        const rankDiff = getSearchRank(a, search) - getSearchRank(b, search);
        if (rankDiff !== 0) return rankDiff;
        return a.name.localeCompare(b.name);
      });

      renderGrid(gridId, filtered);
    }

    function createProductCard(product) {
      const card = document.createElement("div");
      card.className = "product-card";
      card.tabIndex = 0;
      card.setAttribute("role", "link");
      card.setAttribute("aria-label", `${product.name} details`);
      let pointerStart = null;
      let pointerMoved = false;

      const openProductPage = () => openModal(product.name);
      const warmProductPage = () => prefetchProductAssets(product);
      card.addEventListener("pointerenter", warmProductPage, { passive: true });
      card.addEventListener("focusin", warmProductPage);
      card.addEventListener("touchstart", warmProductPage, { passive: true });
      card.addEventListener("pointerdown", (event) => {
        pointerStart = { x: event.clientX, y: event.clientY };
        pointerMoved = false;
      });
      card.addEventListener("pointermove", (event) => {
        if (!pointerStart) return;
        if (Math.abs(event.clientX - pointerStart.x) > 10 || Math.abs(event.clientY - pointerStart.y) > 10) {
          pointerMoved = true;
        }
      });
      card.addEventListener("pointerup", () => {
        pointerStart = null;
      });
      card.addEventListener("pointercancel", () => {
        pointerStart = null;
        pointerMoved = false;
      });
      card.addEventListener("click", (event) => {
        if (pointerMoved) {
          pointerMoved = false;
          return;
        }
        if (event.target.closest("button")) return;
        openProductPage();
      });
      card.addEventListener("keydown", (event) => {
        if (event.target.closest("button")) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openProductPage();
      });

      // Stock badge logic
      let stockClass = "out-stock";
      let stockText = "Out of Stock";
      if (product.stock > 5) {
        stockClass = "in-stock";
        stockText = "In Stock";
      } else if (product.stock > 0) {
        stockClass = "low-stock";
        stockText = "Low Stock";
      }

      const stockBadge = document.createElement("div");
      stockBadge.className = `stock-badge ${stockClass}`;
      stockBadge.innerText = stockText;

      const highlightBadge = document.createElement("div");
      highlightBadge.className = "product-highlight-badge";
      highlightBadge.innerText = "الأكثر طلبًا";
      if (!mostRequestedProducts.has(product.name)) {
        highlightBadge.style.display = "none";
      }

      const img = document.createElement("img");
      img.src = product.img;
      img.alt = product.name;
      img.loading = "lazy";
      img.decoding = "async";
      if (product.img2) img.dataset.secondImg = product.img2;

      const h4 = document.createElement("h4");
      h4.innerText = product.name;

      const price = document.createElement("p");
      price.className = "product-price";
      price.innerHTML = getPriceMarkup(product);

      const productType = document.createElement("div");
      productType.className = "product-type";
      productType.innerText = getDisplayType(product);

      const actions = document.createElement("div");
      actions.className = "product-card-actions";

      const addButton = document.createElement("button");
      addButton.className = "product-add-btn";
      addButton.innerText = t("addToCart");
      addButton.onclick = () => addToCart(product.name, img);

      const buyButton = document.createElement("button");
      buyButton.className = "product-buy-btn";
      buyButton.innerText = t("buyNow");
      buyButton.onclick = () => buyNow(product.name, img);

      const actionNote = document.createElement("div");
      actionNote.className = "product-action-note";
      actionNote.innerText = t("offerStrong");

      actions.append(addButton, buyButton);
      card.append(stockBadge, highlightBadge, img, h4, price, productType, actions, actionNote);
      return card;
    }

    function initCountdownTimer() {
      const timerEl = document.querySelector(".countdown-timer");
      if (!timerEl) return;

      function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const diff = Math.max(0, tomorrow - now);
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        const display = timerEl.querySelector(".countdown-display");
        if (display) {
          display.innerHTML = `
            <div class="countdown-item"><div class="countdown-value">${String(hours).padStart(2, '0')}</div><div class="countdown-label">H</div></div>
            <div class="countdown-item"><div class="countdown-value">${String(minutes).padStart(2, '0')}</div><div class="countdown-label">M</div></div>
            <div class="countdown-item"><div class="countdown-value">${String(seconds).padStart(2, '0')}</div><div class="countdown-label">S</div></div>
          `;
        }
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    }

    function renderBestSellerHero() {
      const hero = document.getElementById("bestSellerHero");
      const dotsRoot = document.getElementById("bestSellerHeroDots");
      if (!hero || !dotsRoot) return;

      hero.innerHTML = "";
      dotsRoot.innerHTML = "";

      bestSellerHeroProducts.forEach((product, index) => {
        const card = document.createElement("a");
        card.className = "best-seller-hero-card";
        card.href = buildProductPageUrl(product);
        card.setAttribute("aria-label", `${product.name} featured collection`);
        card.dataset.index = String(index);
        const warmProductPage = () => prefetchProductAssets(product);
        card.addEventListener("pointerenter", warmProductPage, { passive: true });
        card.addEventListener("focusin", warmProductPage);
        card.addEventListener("touchstart", warmProductPage, { passive: true });
        card.addEventListener("click", (event) => {
          event.preventDefault();
          openModal(product.name);
        });

        card.innerHTML = `
          <div class="best-seller-hero-media">
            <img src="${product.img}" alt="${product.name}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async" />
          </div>
          <div class="best-seller-hero-copy">
            <strong class="best-seller-hero-title">${product.name}</strong>
          </div>
        `;

        hero.appendChild(card);

        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "best-seller-hero-dot" + (index === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", `Show slide ${index + 1}`);
        dot.dataset.index = String(index);
        dot.addEventListener("click", () => {
          scrollBestSellerHeroTo(index, true);
        });
        dotsRoot.appendChild(dot);
      });
    }

    function renderHeroTopSellerStrip() {
      const strip = document.getElementById("heroTopSellerStrip");
      if (!strip) return;

      const featuredProducts = uniqueProductsByName([...bestSellerProducts, ...extraBestSellerProducts]).slice(0, 4);
      const heroStripImageMap = new Map(
        bestSellerHeroProducts.map((product) => [product.name, product.img])
      );
      strip.innerHTML = "";

      featuredProducts.forEach((product) => {
        const heroImage = heroStripImageMap.get(product.name) || product.img;
        const card = document.createElement("div");
        card.className = "hero-top-seller-card";
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", `${product.name} top seller`);
        const warmProductPage = () => prefetchProductAssets(product);
        card.addEventListener("pointerenter", warmProductPage, { passive: true });
        card.addEventListener("focusin", warmProductPage);
        card.addEventListener("touchstart", warmProductPage, { passive: true });
        card.onclick = () => openModal(product.name);
        card.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openModal(product.name);
        });
        card.innerHTML = `
          <img src="${heroImage}" alt="${product.name}" loading="lazy" decoding="async">
          <strong>${product.name}</strong>
        `;
        strip.appendChild(card);
      });
    }

    function getBestSellerHeroStep() {
      const hero = document.getElementById("bestSellerHero");
      if (!hero) return 0;
      return hero.clientWidth;
    }

    function setBestSellerHeroActive(index) {
      document.querySelectorAll(".best-seller-hero-dot").forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    }

    function getBestSellerHeroIndex() {
      const hero = document.getElementById("bestSellerHero");
      const step = getBestSellerHeroStep();
      if (!hero || !step) return 0;
      return Math.max(0, Math.min(bestSellerHeroProducts.length - 1, Math.round(hero.scrollLeft / step)));
    }

    function scrollBestSellerHeroTo(index, smooth = false) {
      const hero = document.getElementById("bestSellerHero");
      const step = getBestSellerHeroStep();
      if (!hero || !step) return;

      const safeIndex = Math.max(0, Math.min(bestSellerHeroProducts.length - 1, index));
      hero.scrollTo({
        left: step * safeIndex,
        behavior: smooth ? "smooth" : "auto"
      });
      setBestSellerHeroActive(safeIndex);
    }

    function renderGrid(id, list) {
      const grid = document.getElementById(id);
      if (!grid) return;
      const uniqueList = [];
      const seenNames = new Set();
      const seenImages = new Set();
      const fragment = document.createDocumentFragment();

      list.forEach((product) => {
        const nameKey = String(product.name || "").trim().toLowerCase();
        const imageKey = String(product.img || "").trim().toLowerCase();
        if (!nameKey || !imageKey) return;
        if (seenNames.has(nameKey) || seenImages.has(imageKey)) return;

        seenNames.add(nameKey);
        seenImages.add(imageKey);
        uniqueList.push(product);
      });

      if (!uniqueList.length) {
        const empty = document.createElement("div");
        empty.className = "empty-grid";
        empty.innerText = t("noMatch");
        grid.replaceChildren(empty);
        return;
      }
      uniqueList.forEach((product) => fragment.appendChild(createProductCard(product)));
      grid.replaceChildren(fragment);
      syncCompareButtons();
      if (typeof window.refreshOvaScrollReveal === "function") {
        window.refreshOvaScrollReveal();
      }
      if (id === "bestSellerSlider") {
        window.setTimeout(initKhamrahFlight, 30);
        window.setTimeout(function () {
          if (typeof window.initBestSellerCarousel === "function") window.initBestSellerCarousel();
        }, 30);
      }
    }

    let khamrahFlightTrigger = null;
    let khamrahFlyerEl = null;

    function initKhamrahFlight() {
      if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
      if (window.innerWidth < 320) return;
      gsap.registerPlugin(ScrollTrigger);

      const heroSection = document.querySelector(".hero-mobile-luxury");
      const heroBottleBtn = document.querySelector('.hml-bottle[data-name="Khamrah Waha"]');
      const bestSellerSection = document.getElementById("bestSellerSection");
      if (!heroSection || !heroBottleBtn || !bestSellerSection) return;
      const heroImg = heroBottleBtn.querySelector("img");
      if (!heroImg) return;

      const getCard = () => Array.from(document.querySelectorAll("#bestSellerSlider .product-card"))
        .find((card) => {
          const h4 = card.querySelector("h4");
          return h4 && h4.textContent.trim() === "Khamrah Waha";
        });

      const card = getCard();
      const cardImg = card ? card.querySelector("img") : null;
      if (cardImg) cardImg.style.opacity = "0";

      if (!khamrahFlyerEl) {
        khamrahFlyerEl = document.createElement("img");
        khamrahFlyerEl.alt = "";
        khamrahFlyerEl.setAttribute("aria-hidden", "true");
        Object.assign(khamrahFlyerEl.style, {
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "3500",
          pointerEvents: "none",
          opacity: "0",
          willChange: "transform, width, height, opacity",
          filter: "drop-shadow(0 20px 26px rgba(20,14,6,.32))"
        });
        document.body.appendChild(khamrahFlyerEl);
      }
      khamrahFlyerEl.src = heroImg.currentSrc || heroImg.src;

      if (khamrahFlightTrigger) {
        khamrahFlightTrigger.kill();
        khamrahFlightTrigger = null;
      }

      let startRect = null;

      khamrahFlightTrigger = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        endTrigger: bestSellerSection,
        end: "top 25%",
        scrub: 0.35,
        onRefresh: () => {
          startRect = heroImg.getBoundingClientRect();
        },
        onUpdate: (self) => {
          if (!startRect) startRect = heroImg.getBoundingClientRect();
          const liveCard = getCard();
          const liveCardImg = liveCard ? liveCard.querySelector("img") : null;
          const p = self.progress;

          if (!liveCardImg) {
            khamrahFlyerEl.style.opacity = "0";
            heroImg.style.opacity = "1";
            return;
          }

          if (p <= 0.01) {
            khamrahFlyerEl.style.opacity = "0";
            heroImg.style.opacity = "1";
            liveCardImg.style.opacity = "0";
            return;
          }

          heroImg.style.opacity = String(Math.max(0, 1 - p * 6));

          if (p > 0.96) {
            khamrahFlyerEl.style.opacity = "0";
            liveCardImg.style.opacity = "1";
            return;
          }

          liveCardImg.style.opacity = "0";
          khamrahFlyerEl.style.opacity = String(Math.min(1, p * 6));

          const endRect = liveCardImg.getBoundingClientRect();
          const w = startRect.width + (endRect.width - startRect.width) * p;
          const h = startRect.height + (endRect.height - startRect.height) * p;
          const x = startRect.left + (endRect.left - startRect.left) * p;
          const y = startRect.top + (endRect.top - startRect.top) * p;
          const rot = (1 - p) * -8;

          khamrahFlyerEl.style.width = w + "px";
          khamrahFlyerEl.style.height = h + "px";
          khamrahFlyerEl.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
        }
      });

      ScrollTrigger.refresh();
    }

    let bestSellerHeroAutoTimer = null;
    let bestSellerHeroResumeTimer = null;

    function stopBestSellerHeroAutoPlay() {
      clearInterval(bestSellerHeroAutoTimer);
      bestSellerHeroAutoTimer = null;
    }

    function startBestSellerHeroAutoPlay() {
      const hero = document.getElementById("bestSellerHero");
      if (!hero || bestSellerHeroProducts.length < 2) return;
      stopBestSellerHeroAutoPlay();
      bestSellerHeroAutoTimer = window.setInterval(() => {
        const currentIndex = getBestSellerHeroIndex();
        const nextIndex = (currentIndex + 1) % bestSellerHeroProducts.length;
        scrollBestSellerHeroTo(nextIndex, true);
      }, 5000);
    }

    function queueBestSellerHeroAutoPlay() {
      clearTimeout(bestSellerHeroResumeTimer);
      bestSellerHeroResumeTimer = window.setTimeout(() => {
        startBestSellerHeroAutoPlay();
      }, 1800);
    }

    function initBestSellerHero() {
      const hero = document.getElementById("bestSellerHero");
      if (!hero) return;

      renderHeroTopSellerStrip();
      renderBestSellerHero();
      scrollBestSellerHeroTo(0, false);
      startBestSellerHeroAutoPlay();

      hero.addEventListener("scroll", () => {
        setBestSellerHeroActive(getBestSellerHeroIndex());
      }, { passive: true });

      ["touchstart", "pointerdown", "mouseenter"].forEach((eventName) => {
        hero.addEventListener(eventName, stopBestSellerHeroAutoPlay, { passive: true });
      });

      ["touchend", "pointerup", "mouseleave"].forEach((eventName) => {
        hero.addEventListener(eventName, queueBestSellerHeroAutoPlay, { passive: true });
      });

      window.addEventListener("resize", () => {
        scrollBestSellerHeroTo(getBestSellerHeroIndex(), false);
      }, { passive: true });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopBestSellerHeroAutoPlay();
        } else {
          queueBestSellerHeroAutoPlay();
        }
      });
    }

    function showAllPerfumes() {
      if (menLoaded) return;
      menLoaded = true;
      populateSectionTypeFilter("men");
      applyFilters("men");
      document.getElementById("menShopAllBtn").style.display = "none";
    }

    function showWomenPerfumes() {
      if (womenLoaded) return;
      womenLoaded = true;
      populateSectionTypeFilter("women");
      applyFilters("women");
      document.getElementById("womenShopAllBtn").style.display = "none";
    }

    function scrollBestSeller() {
      const slider = document.getElementById("bestSellerSlider");
      const step = Math.min(slider.clientWidth * 0.75, 320);
      const max = slider.scrollWidth - slider.clientWidth;
      const next = slider.scrollLeft + step;

      if (next >= max - 8) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      slider.scrollBy({ left: step, behavior: "smooth" });
    }

    function renderGallery(images, activeIndex = 0) {
      const valid = images.filter(Boolean);
      const main = document.getElementById("modalImg");
      const thumbs = document.getElementById("modalExtraImages");
      if (!main || !thumbs) return;
      thumbs.innerHTML = "";

      if (!valid.length) return;

      const safeIndex = Math.max(0, Math.min(activeIndex, valid.length - 1));
      const mainSrc = valid[safeIndex];
      main.src = mainSrc;

      valid.forEach((src, index) => {
        if (index === safeIndex) return;
        const img = document.createElement("img");
        img.src = src;
        img.loading = "lazy";
        img.decoding = "async";
        img.onclick = () => {
          renderGallery(valid, index);
        };
        thumbs.appendChild(img);
      });
    }

    function getProductPageCopy(product) {
      const brand = product.brandTitle || product.brandKey || "Ova Store";
      if (currentLang === "ar") {
        return {
          back: "الرجوع للرئيسية",
          kicker: "صفحة البرفان",
          brand,
          intro: "كل تفاصيل البرفان بقت هنا بشكل كامل ومرتب: الصور، البروفايل، النوتس، المراجعات، وأزرار الشراء والمقارنة في مكان واحد.",
          accords: "أبرز الإحساس",
          occasions: "أنسب وقت",
          profile: "بروفايل البرفان",
          pyramid: "هرم النوتس",
          details: "كل التفاصيل",
          trust: "ليه البرفان مميز",
          compare: "ملاحظة المقارنة",
          reviews: t("reviewsTitle")
        };
      }

      return {
        back: "Back to Home",
        kicker: "Perfume Page",
        brand,
        intro: "Everything that used to live inside the product modal now appears here in one polished page: imagery, profile, notes, reviews, and direct shopping actions.",
        accords: "Main Accords",
        occasions: "Best Moments",
        profile: "Perfume Profile",
        pyramid: "Note Pyramid",
        details: "Full Details",
        trust: "Why It Stands Out",
        compare: "Compare Tip",
        reviews: t("reviewsTitle")
      };
    }

    function stripHtmlForSeo(value) {
      return String(value || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function setMetaContent(id, value, attribute = "content") {
      const node = document.getElementById(id);
      if (!node) return;
      node.setAttribute(attribute, value);
    }

    function removeDynamicProductSchema() {
      const node = document.getElementById("dynamicProductSchema");
      if (node) node.remove();
    }

    function updateDefaultSeo() {
      document.title = "Ova Perfume Egypt | Ova Store Official Website";
      setMetaContent("metaDescription", "Ova Perfume Egypt official website. Discover luxury perfumes, best sellers, and premium men, women, and unisex fragrance collections from Ova Store.");
      setMetaContent("metaRobots", "index, follow, max-image-preview:large");
      setMetaContent("canonicalLink", "https://ovaperfume.com/", "href");
      setMetaContent("ogType", "website");
      setMetaContent("ogTitle", "Ova Perfume Egypt | Ova Store Official Website");
      setMetaContent("ogDescription", "Shop luxury perfumes, best sellers, and premium fragrance collections for women, men, and unisex at the official Ova Perfume Egypt website.");
      setMetaContent("ogUrl", "https://ovaperfume.com/");
      setMetaContent("ogImage", "https://ovaperfume.com/images/site-assets/logooo-2.webp");
      setMetaContent("ogImageSecure", "https://ovaperfume.com/images/site-assets/logooo-2.webp");
      setMetaContent("twitterCard", "summary_large_image");
      setMetaContent("twitterTitle", "Ova Perfume Egypt | Ova Store Official Website");
      setMetaContent("twitterDescription", "Explore luxury perfumes, best sellers, and signature fragrance collections at the official Ova Perfume Egypt website.");
      setMetaContent("twitterImage", "https://ovaperfume.com/images/site-assets/logooo-2.webp");
      removeDynamicProductSchema();
    }

    function updateProductSeo(product) {
      if (!product) {
        updateDefaultSeo();
        return;
      }

      const productUrl = `${getSiteOrigin()}${buildProductPageUrl(product)}`;
      const imageUrl = buildAbsoluteAssetUrl(product.img || product.img2);
      const brand = product.brandTitle || product.brandKey || "Ova Store";
      const description = (
        product.description ||
        stripHtmlForSeo(product.detailsHtml || "") ||
        `${product.name} perfume from ${brand} at Ova Store Egypt.`
      ).slice(0, 155);
      const title = `${product.name} | ${brand} | Ova Store`;
      const productType = getDisplayType(product) || product.category || "Perfume";

      document.title = title;
      setMetaContent("metaDescription", description);
      setMetaContent("metaRobots", "index, follow, max-image-preview:large");
      setMetaContent("canonicalLink", productUrl, "href");
      setMetaContent("ogType", "product");
      setMetaContent("ogTitle", title);
      setMetaContent("ogDescription", description);
      setMetaContent("ogUrl", productUrl);
      setMetaContent("ogImage", imageUrl);
      setMetaContent("ogImageSecure", imageUrl);
      setMetaContent("twitterCard", "summary_large_image");
      setMetaContent("twitterTitle", title);
      setMetaContent("twitterDescription", description);
      setMetaContent("twitterImage", imageUrl);

      removeDynamicProductSchema();
      const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: [imageUrl],
        description,
        category: productType,
        brand: {
          "@type": "Brand",
          name: brand
        },
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "EGP",
          price: String(Number(product.price || 0)),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition"
        }
      };

      if (product.rating) {
        schema.aggregateRating = {
          "@type": "AggregateRating",
          ratingValue: String(product.rating),
          reviewCount: "1"
        };
      }

      const script = document.createElement("script");
      script.id = "dynamicProductSchema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    function setProductPageMode(active) {
      const allowedIds = new Set([
        "navbar",
        "bottomNavbar",
        "productDetailPage",
        "cart",
        "searchSidebar",
        "compareBar",
        "compareBarOverlay",
        "compareModal",
        "whatsappFloat",
        "promoToast",
        "promoOverlay"
      ]);

      document.body.classList.toggle("product-page-mode", active);
      if (active) {
        document.body.classList.remove("intro-active");
      }

      [...document.body.children].forEach((child) => {
        if (child.tagName === "SCRIPT") return;
        child.hidden = active ? !allowedIds.has(child.id) : false;
      });

      const detailPage = document.getElementById("productDetailPage");
      if (detailPage) detailPage.hidden = !active;
    }

    async function renderProductDetailPage(name) {
      let product = getProductByName(name);
      if (!product) {
        product = getProductBySlug(name) || getProductBySlug(requestedProductSlug);
      }
      const storedProduct = getStoredSelectedProduct(name);
      if (storedProduct) {
        product = product ? mergeProductData({ ...storedProduct }, product) : { ...storedProduct };
      }
      if (!product) {
        await hydrateHomepageSharedBrandDetails();
        product = getProductByName(name);
        if (!product) {
          product = getProductBySlug(name) || getProductBySlug(requestedProductSlug);
        }
        if (storedProduct) {
          product = product ? mergeProductData({ ...storedProduct }, product) : { ...storedProduct };
        }
      }

      setProductPageMode(true);

      if (!product) {
        const page = document.getElementById("productDetailPage");
        if (page) {
          page.innerHTML = `
            <div class="product-page-empty">
              <div class="product-page-empty-card">
                <h2>${currentLang === "ar" ? "البرفان غير موجود" : "Perfume Not Found"}</h2>
                <p>${currentLang === "ar" ? "المنتج المطلوب غير متاح حاليًا أو تم تغيير اسمه. ارجع للرئيسية واختار برفان ثاني." : "The requested perfume is unavailable or its name has changed. Head back to the homepage and choose another perfume."}</p>
                <a class="product-page-back" href="index.html">${currentLang === "ar" ? "الرجوع للرئيسية" : "Back to Home"}</a>
              </div>
            </div>
          `;
        }
        document.title = "Perfume Not Found | Ova Store";
        setMetaContent("metaRobots", "noindex, follow");
        removeDynamicProductSchema();
        return;
      }

      const needsEnhancedDetails = !product.detailsHtml || !product.img2;

      requestedProductName = product.name;
      requestedProductSlug = getProductSlugValue(product);
      modalQty = 1;
      currentProduct = product;
      if (!currentProduct.img2) currentProduct.img2 = currentProduct.img;
      if (!currentProduct.detailsHtml) currentProduct.detailsHtml = buildHomepageFallbackDetailsHtml(currentProduct);

      const pageCopy = getProductPageCopy(product);
      const backLink = document.getElementById("productBackLink");
      const pageKicker = document.getElementById("productPageKicker");
      const pageBrand = document.getElementById("productPageBrand");
      const pageIntro = document.getElementById("productPageIntro");
      const headingMap = {
        productAccordsHeading: pageCopy.accords,
        productOccasionsHeading: pageCopy.occasions,
        productProfileHeading: pageCopy.profile,
        productPyramidHeading: pageCopy.pyramid,
        productDetailsHeading: pageCopy.details,
        productTrustHeading: pageCopy.trust,
        productCompareHeading: pageCopy.compare,
        productReviewsHeading: pageCopy.reviews
      };

      if (backLink) {
        backLink.href = "index.html";
        backLink.textContent = pageCopy.back;
        backLink.onclick = (event) => {
          event.preventDefault();
          navigateToHomepage();
        };
      }
      if (pageKicker) pageKicker.textContent = pageCopy.kicker;
      if (pageBrand) pageBrand.textContent = pageCopy.brand;
      if (pageIntro) pageIntro.textContent = pageCopy.intro;
      Object.entries(headingMap).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      });

      renderGallery([product.img, product.img2]);
      document.getElementById("modalName").innerText = product.name;
      document.getElementById("modalPrice").innerHTML = getPriceMarkup(product);
      document.getElementById("modalStock").innerText = currentLang === "ar" ? "متوفر الآن" : "In Stock";
      document.getElementById("modalRating").innerText = getStars(product.rating) + " " + product.rating + " " + t("customerRating");
      document.getElementById("modalStats").innerHTML = `
        <span>${t("longevity")}: ${product.longevity}</span>
        <span>${t("sillage")}: ${product.sillage}</span>
        <span>${t("type")}: ${getDisplayType(product)}</span>
      `;
      renderModalExperience(product);
      document.getElementById("modalDetails").innerHTML = product.detailsHtml || "";
      document.getElementById("modalQty").innerText = modalQty;
      renderReviewsInModal(name);
      syncCompareButtons();
      const productUrl = buildProductPageUrl(product);
      if (`${window.location.pathname}${window.location.search}` !== resolveRelativePageUrl(productUrl)) {
        window.history.replaceState({}, "", productUrl);
      }
      updateProductSeo(product);
      window.scrollTo({ top: 0, behavior: "auto" });

      if (needsEnhancedDetails) {
        hydrateHomepageSharedBrandDetails().then(() => {
          const hydratedProduct = getProductByName(product.name) || getProductBySlug(requestedProductSlug);
          if (!hydratedProduct) return;
          const hasNewDetails = !!hydratedProduct.detailsHtml && hydratedProduct.detailsHtml !== product.detailsHtml;
          const hasNewAltImage = !!hydratedProduct.img2 && hydratedProduct.img2 !== product.img2;
          if (!hasNewDetails && !hasNewAltImage) return;
          const mergedProduct = mergeProductData(product || {}, hydratedProduct);
          const sameProductOpen = currentProduct && normalizeSearchTerm(currentProduct.name) === normalizeSearchTerm(mergedProduct.name);
          if (sameProductOpen) {
            renderProductDetailPage(mergedProduct.name);
          }
        });
      }
    }

    function navigateToHomepage(options = {}) {
      const { replaceHistory = false } = options;
      requestedProductName = null;
      requestedProductSlug = null;
      currentProduct = null;
      setProductPageMode(false);
      ensureHomepageUiInitialized(false);
      updateDefaultSeo();
      hideIntroImmediately();
      const targetUrl = "index.html";
      if (`${window.location.pathname}${window.location.search}` !== resolveRelativePageUrl(targetUrl)) {
        const historyMethod = replaceHistory ? "replaceState" : "pushState";
        window.history[historyMethod]({}, "", targetUrl);
      }
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    function navigateToProductPage(name, options = {}) {
      const { replaceHistory = false } = options;
      if (!name) return;

      const product = getProductByName(name) || getProductBySlug(name) || (typeof name === "object" ? name : null);
      if (product) {
        storeSelectedProduct(product);
      }

      const target = product?.name || name;
      const targetUrl = buildProductPageUrl(product || name);
      requestedProductName = product?.name || "";
      requestedProductSlug = getProductSlugValue(product || name);

      if (`${window.location.pathname}${window.location.search}` !== resolveRelativePageUrl(targetUrl)) {
        const historyMethod = replaceHistory ? "replaceState" : "pushState";
        window.history[historyMethod]({}, "", targetUrl);
      }

      renderProductDetailPage(target);
    }

    function openModal(name) {
      if (!name) return;
      navigateToProductPage(name);
    }

    function closeModal() {
      currentProduct = null;
    }

    function modalIncrease() {
      modalQty += 1;
      const qty = document.getElementById("modalQty");
      if (qty) qty.innerText = modalQty;
    }

    function modalDecrease() {
      modalQty = Math.max(1, modalQty - 1);
      const qty = document.getElementById("modalQty");
      if (qty) qty.innerText = modalQty;
    }

    function updateBadge() {
      const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
      document.getElementById("cartCountBadge").innerText = totalItems;
      document.getElementById("bottomCartCountBadge").innerText = totalItems;
    }

    function renderCart() {
      const wrap = document.getElementById("cartItems");
      const cartOfferHint = document.getElementById("cartOfferHint");
      const cartDeliveryNote = document.getElementById("cartDeliveryNote");
      const offerSummary = getCartOfferSummary(cart);
      const fragment = document.createDocumentFragment();
      let totalBeforeQuiz = 0;

      if (cartDeliveryNote) {
        cartDeliveryNote.innerHTML = currentLang === "ar"
          ? "<strong>التوصيل مجاني:</strong> على أول طلب ليك."
          : (typeof t === "function" ? t("freeDeliveryWeek") : "<strong>Free delivery:</strong> on your first order.");
      }

      cart.forEach((item, index) => {
        const subtotal = getItemSubtotal(item, offerSummary);
        totalBeforeQuiz += subtotal;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.setAttribute("role", "button");
        row.tabIndex = 0;
        row.style.cursor = "pointer";
        row.title = currentLang === "ar" ? "افتح تفاصيل البرفان" : "Open perfume details";
        row.innerHTML = `
          <img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async">
          <div class="cart-info">
            <h3>${item.name}</h3>
            <p>${t("price")}: ${item.price} EGP</p>
            <div class="qty-controls">
              <button onclick="changeQty(${index}, -1)">-</button>
              <span>${item.qty}</span>
              <button onclick="changeQty(${index}, 1)">+</button>
            </div>
            ${offerSummary.qualifies ? `<p class="cart-offer-badge">${currentLang === "ar" ? "خصم 50% مفعّل" : "50% OFF applied"}</p>` : `<p>${t("offer")}: ${currentLang === "ar" ? `أضف ${3 - offerSummary.totalQty} كمان واحصل على خصم 50%` : `Add ${3 - offerSummary.totalQty} more to unlock 50% off`}</p>`}
            <p>${t("subtotal")}: ${subtotal} EGP</p>
          </div>
        `;
        row.addEventListener("click", (event) => {
          if (event.target.closest("button")) return;
          openCartProductFromItem(item);
        });
        row.addEventListener("keydown", (event) => {
          if (event.target.closest("button")) return;
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openCartProductFromItem(item);
        });
        fragment.appendChild(row);
      });

      wrap.replaceChildren(fragment);

      if (!cart.length) {
        cartOfferHint.innerHTML = t("addThreeHint");
      } else if (offerSummary.qualifies) {
        cartOfferHint.innerHTML = currentLang === "ar"
          ? "🎉 مبروك! خصم 50% اتطبق على طلبك."
          : "🎉 Nice! 50% off is applied to your order.";
      } else {
        cartOfferHint.innerHTML = currentLang === "ar"
          ? `اشتري 3 برفانات واحصل على خصم 50% — كمان ${3 - offerSummary.totalQty}`
          : `Buy 3 perfumes and get 50% off — ${3 - offerSummary.totalQty} more to go`;
      }

      const quizDiscount = getQuizDiscountAmount(totalBeforeQuiz);
      const finalTotal = totalBeforeQuiz - quizDiscount;
      document.getElementById("total").innerText = t("total") + ": " + finalTotal + " EGP";
      updateBadge();
      localStorage.setItem("ovaCart", JSON.stringify(cart));
    }

    function openCartProductFromItem(item) {
      if (!item || !item.name) return;
      const cartPanel = document.getElementById("cart");
      setPanelOpen(cartPanel, false);
      if (typeof openModal === "function") {
        setTimeout(() => openModal(item.name), 120);
      }
    }

    function flyToCart(imgElement) {
      const cartIcon = document.getElementById("bottomNavbar")?.classList.contains("is-visible")
        ? document.querySelector("#bottomNavbar .cart-btn")
        : document.querySelector("#navbar .cart-btn");
      const a = imgElement.getBoundingClientRect();
      const b = cartIcon.getBoundingClientRect();
      const clone = imgElement.cloneNode(true);

      clone.className = "fly-img";
      clone.style.left = a.left + "px";
      clone.style.top = a.top + "px";

      document.body.appendChild(clone);

      clone.style.setProperty("--x", b.left + b.width / 2 - (a.left + a.width / 2) + "px");
      clone.style.setProperty("--y", b.top + b.height / 2 - (a.top + a.height / 2) + "px");

      clone.addEventListener("animationend", () => clone.remove());
      cartIcon.classList.add("cart-pulse");
      setTimeout(() => cartIcon.classList.remove("cart-pulse"), 700);
    }

    function revealNavbarAndCart() {
      if (navbar) {
        navbar.classList.remove("navbar-hidden");
      }
      const bottomNavbar = document.getElementById("bottomNavbar");
      if (bottomNavbar) {
        bottomNavbar.classList.add("is-visible");
      }
      ["cartCountBadge", "bottomCartCountBadge"].forEach((id) => {
        const cartBadge = document.getElementById(id);
        if (cartBadge) {
          cartBadge.style.visibility = "visible";
          cartBadge.style.opacity = "1";
        }
      });
    }

    function addToCart(name, imgElement) {
      const product = getPageProductByName(name);
      if (!product) return;

      revealNavbarAndCart();
      if (imgElement) flyToCart(imgElement);

      const existing = cart.find((item) => item.name === product.name);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          name: product.name,
          price: product.price,
          img: product.img,
          qty: 1
        });
      }

      renderCart();
    }

    function buyNow(name, imgElement) {
      addToCart(name, imgElement);
      checkout();
    }

    function modalAddToCart() {
      if (!currentProduct) return;
      const product = getPageProductByName(currentProduct.name) || currentProduct;

      revealNavbarAndCart();
      const pageImage = document.getElementById("modalImg");
      if (pageImage) flyToCart(pageImage);

      const existing = cart.find((item) => item.name === product.name);

      if (existing) {
        existing.qty += modalQty;
      } else {
        cart.push({
          name: product.name,
          price: product.price,
          img: product.img,
          qty: modalQty
        });
      }

      renderCart();
    }

    function buyNowFromModal() {
      if (!currentProduct) return;
      modalAddToCart();
      checkout();
    }

    function changeQty(index, step) {
      cart[index].qty += step;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      renderCart();
    }

    function setPanelOpen(target, open) {
      const el = typeof target === "string" ? document.getElementById(target) : target;
      if (!el) return;
      el.classList.toggle("is-open", !!open);
      el.setAttribute("aria-hidden", open ? "false" : "true");
    }

    function isPanelOpen(target) {
      const el = typeof target === "string" ? document.getElementById(target) : target;
      return !!el && el.classList.contains("is-open");
    }

    function toggleCart(force = false) {
      const el = document.getElementById("cart");
      const open = force === true ? true : !isPanelOpen(el);
      setPanelOpen(el, open);
    }

    function checkout() {
      localStorage.setItem("ovaCart", JSON.stringify(cart));
      localStorage.setItem("ovaFreeDeliveryCampaign", "true");
      window.location.href = "checkout.html";
    }

    function openSearchSidebar() {
      setPanelOpen("searchSidebar", true);
      requestAnimationFrame(() => document.getElementById("sidebarSearch")?.focus());
    }

    function closeSearchSidebar() {
      setPanelOpen("searchSidebar", false);
    }

    function openSearchProduct(name) {
      closeSearchSidebar();
      openModal(name);
    }

    function addSearchProduct(name) {
      closeSearchSidebar();
      addToCart(name);
    }

    const handleSidebarSearchInput = debounce(function () {
      const rawValue = this.value.trim();
      const value = normalizeSearchTerm(rawValue);
      const out = document.getElementById("sidebarResults");
      const fragment = document.createDocumentFragment();

      if (!value) {
        out.replaceChildren();
        return;
      }

      // Get brand-related perfumes first
      const brandPerfumes = getBrandPerfumes(value);
      
      // Get regular search results
      const regularResults = allProducts.filter((product) => {
        const searchText = getSearchText(product);
        return searchText.includes(value);
      });

      // Combine results: brand perfumes first, then regular results
      const allResults = [...brandPerfumes];
      const seenNames = new Set(brandPerfumes.map((product) => product.name));
      
      // Add regular results that aren't already in brand results
      regularResults.forEach((product) => {
        if (!seenNames.has(product.name)) {
          seenNames.add(product.name);
          allResults.push(product);
        }
      });

      // Sort results: prioritize exact matches and starting with search term
      allResults.sort((a, b) => {
        const rankDiff = getSearchRank(a, value) - getSearchRank(b, value);
        if (rankDiff !== 0) return rankDiff;
        return a.name.localeCompare(b.name);
      });

      if (allResults.length === 0) {
        out.innerHTML = `<div style="padding:20px; text-align:center; color:#666;">لا يوجد برفانات مطابقة لـ "${rawValue}"</div>`;
        return;
      }

      allResults.forEach((product) => {
        const card = document.createElement("div");
        card.className = "search-result";
        
        const displayName = highlightSearchTerm(product.name, rawValue);
        const matchedAlias = getMatchedSearchAlias(product, value);
        const aliasLine = matchedAlias && !normalizeSearchTerm(product.name).includes(value)
          ? `<small style="display:block; margin-top:4px; color:#8b6a33;">${matchedAlias}</small>`
          : "";
        
        card.innerHTML = `
          <img src="${product.img}" alt="${product.name}" loading="lazy" decoding="async">
          <h3>${displayName}${aliasLine}<br><small>${getPriceMarkup(product)}</small></h3>
          <button>${t("addToCart")}</button>
        `;
        card.querySelector("img").onclick = () => openSearchProduct(product.name);
        card.querySelector("button").onclick = () => addSearchProduct(product.name);
        fragment.appendChild(card);
      });
      out.replaceChildren(fragment);
    }, 120);

    document.getElementById("sidebarSearch").addEventListener("input", handleSidebarSearchInput);

    function highlightSearchTerm(name, term) {
      const safeTerm = escapeRegExp(term);
      if (!safeTerm) return name;
      const regex = new RegExp(`(${safeTerm})`, 'gi');
      return name.replace(regex, '<strong>$1</strong>');
    }

    const slider = document.getElementById("bestSellerSlider");
    let drag = false;
    let startX = 0;
    let scrollStart = 0;
    let bestSellerAutoDirection = 1;
    let bestSellerResumeTimer = null;
    let bestSellerAutoFrame = 0;
    let bestSellerLastAutoTick = 0;
    let bestSellerAutoEnabled = false;
    let bestSellerSliderVisible = false;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function cancelBestSellerAutoScrollFrame() {
      if (!bestSellerAutoFrame) return;
      cancelAnimationFrame(bestSellerAutoFrame);
      bestSellerAutoFrame = 0;
    }

    function stopBestSellerAutoScroll() {
      bestSellerAutoEnabled = false;
      bestSellerLastAutoTick = 0;
      cancelBestSellerAutoScrollFrame();
    }

    function stepBestSellerAutoScroll(timestamp) {
      if (!bestSellerAutoEnabled || !slider) {
        cancelBestSellerAutoScrollFrame();
        return;
      }

      if (
        !drag &&
        !document.hidden &&
        bestSellerSliderVisible &&
        !reducedMotionQuery.matches &&
        slider.scrollWidth > slider.clientWidth + 6
      ) {
        if (!bestSellerLastAutoTick || timestamp - bestSellerLastAutoTick >= 24) {
          const maxScroll = slider.scrollWidth - slider.clientWidth;
          if (slider.scrollLeft <= 0) bestSellerAutoDirection = 1;
          if (slider.scrollLeft >= maxScroll - 2) bestSellerAutoDirection = -1;
          slider.scrollLeft += bestSellerAutoDirection * 0.45;
          bestSellerLastAutoTick = timestamp;
        }
      }

      bestSellerAutoFrame = requestAnimationFrame(stepBestSellerAutoScroll);
    }

    function startBestSellerAutoScroll() {
      if (!slider || reducedMotionQuery.matches) return;
      bestSellerAutoEnabled = true;
      if (bestSellerAutoFrame) return;
      bestSellerLastAutoTick = 0;
      bestSellerAutoFrame = requestAnimationFrame(stepBestSellerAutoScroll);
    }

    function queueBestSellerAutoScroll() {
      clearTimeout(bestSellerResumeTimer);
      bestSellerResumeTimer = setTimeout(() => {
        if (!document.hidden && bestSellerSliderVisible) {
          startBestSellerAutoScroll();
        }
      }, 1200);
    }

    if (slider) {
      slider.addEventListener("mousedown", (e) => {
        drag = true;
        stopBestSellerAutoScroll();
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
      });

      slider.addEventListener("mouseup", () => {
        drag = false;
        queueBestSellerAutoScroll();
      });

      slider.addEventListener("mouseleave", () => {
        drag = false;
        queueBestSellerAutoScroll();
        slider.style.cursor = "grab";
      });

      slider.addEventListener("mousemove", (e) => {
        if (!drag) return;
        e.preventDefault();
        slider.scrollLeft = scrollStart - (e.pageX - startX);
      });

      slider.addEventListener("touchstart", (e) => {
        stopBestSellerAutoScroll();
        startX = e.touches[0].pageX;
        scrollStart = slider.scrollLeft;
      }, { passive: true });

      slider.addEventListener("touchmove", (e) => {
        slider.scrollLeft = scrollStart - (e.touches[0].pageX - startX);
      }, { passive: true });

      slider.addEventListener("touchend", queueBestSellerAutoScroll, { passive: true });
      slider.addEventListener("mouseenter", () => {
        stopBestSellerAutoScroll();
        slider.style.cursor = "grab";
      });

      if ("IntersectionObserver" in window) {
        const bestSellerObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          bestSellerSliderVisible = !!entry?.isIntersecting;
          if (bestSellerSliderVisible) {
            queueBestSellerAutoScroll();
          } else {
            stopBestSellerAutoScroll();
          }
        }, { threshold: 0.15 });
        bestSellerObserver.observe(slider);
      }

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopBestSellerAutoScroll();
          return;
        }
        queueBestSellerAutoScroll();
      });

      if (!("IntersectionObserver" in window)) {
        scheduleIdleWork(startBestSellerAutoScroll, 1600);
      }
    }

    const brandsGrid = document.querySelector(".brands-grid");
    const mobileBrandsGridQuery = window.matchMedia("(max-width: 700px)");
    let brandsScrollTicking = false;
    let brandsAutoScrollTimer = null;
    let brandsResumeTimer = null;
    let brandsCarouselVisible = true;
    let brandsProgrammaticScroll = false;
    let brandsProgrammaticScrollTimer = null;

    function getBrandCards() {
      return brandsGrid ? [...brandsGrid.querySelectorAll(".brand-card")] : [];
    }

    function isBrandsStackedLayout() {
      return mobileBrandsGridQuery.matches;
    }

    function updateActiveBrandCard() {
      if (!brandsGrid) return;
      const cards = getBrandCards();
      if (!cards.length) return;

      if (isBrandsStackedLayout()) {
        cards.forEach((card) => {
          card.classList.remove("is-active", "is-near");
          card.removeAttribute("aria-current");
        });
        return;
      }

      const gridRect = brandsGrid.getBoundingClientRect();
      const gridCenter = gridRect.left + (gridRect.width / 2);
      let activeIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + (rect.width / 2);
        const distance = Math.abs(cardCenter - gridCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          activeIndex = index;
        }
      });

      cards.forEach((card, index) => {
        const offset = Math.abs(index - activeIndex);
        const isActive = offset === 0;
        const isNear = offset === 1;
        card.classList.toggle("is-active", isActive);
        card.classList.toggle("is-near", isNear);
        card.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function getActiveBrandIndex() {
      const cards = getBrandCards();
      const activeIndex = cards.findIndex((card) => card.classList.contains("is-active"));
      return activeIndex === -1 ? 0 : activeIndex;
    }

    function queueActiveBrandCardUpdate() {
      if (brandsScrollTicking) return;
      brandsScrollTicking = true;
      requestAnimationFrame(() => {
        updateActiveBrandCard();
        brandsScrollTicking = false;
      });
    }

    function scrollBrandToIndex(index, behavior = "smooth") {
      if (isBrandsStackedLayout()) return;
      const cards = getBrandCards();
      if (!cards.length) return;
      const safeIndex = ((index % cards.length) + cards.length) % cards.length;
      brandsProgrammaticScroll = true;
      clearTimeout(brandsProgrammaticScrollTimer);
      cards[safeIndex].scrollIntoView({
        behavior,
        block: "nearest",
        inline: "center"
      });
      brandsProgrammaticScrollTimer = setTimeout(() => {
        brandsProgrammaticScroll = false;
      }, 750);
    }

    function stopBrandsAutoScroll() {
      if (brandsAutoScrollTimer) {
        clearInterval(brandsAutoScrollTimer);
        brandsAutoScrollTimer = null;
      }
      clearTimeout(brandsResumeTimer);
    }

    function startBrandsAutoScroll() {
      if (!brandsGrid || reducedMotionQuery.matches || !brandsCarouselVisible || isBrandsStackedLayout()) return;
      if (brandsAutoScrollTimer) return;

      brandsAutoScrollTimer = setInterval(() => {
        if (document.hidden || !brandsCarouselVisible) return;
        updateActiveBrandCard();
        const nextIndex = getActiveBrandIndex() + 1;
        scrollBrandToIndex(nextIndex);
      }, 2100);
    }

    function queueBrandsAutoScrollResume(delay = 3200) {
      stopBrandsAutoScroll();
      if (!brandsGrid || reducedMotionQuery.matches || isBrandsStackedLayout()) return;
      brandsResumeTimer = setTimeout(() => {
        if (!document.hidden && brandsCarouselVisible) {
          startBrandsAutoScroll();
        }
      }, delay);
    }

    function initBrandsCarousel() {
      if (!brandsGrid) return;

      updateActiveBrandCard();

      const syncBrandsLayout = () => {
        updateActiveBrandCard();
        if (isBrandsStackedLayout()) {
          stopBrandsAutoScroll();
          return;
        }
        queueBrandsAutoScrollResume(1200);
      };

      if (typeof mobileBrandsGridQuery.addEventListener === "function") {
        mobileBrandsGridQuery.addEventListener("change", syncBrandsLayout);
      } else if (typeof mobileBrandsGridQuery.addListener === "function") {
        mobileBrandsGridQuery.addListener(syncBrandsLayout);
      }

      brandsGrid.addEventListener("scroll", () => {
        queueActiveBrandCardUpdate();
        if (!brandsProgrammaticScroll) {
          queueBrandsAutoScrollResume();
        }
      }, { passive: true });
      window.addEventListener("resize", queueActiveBrandCardUpdate, { passive: true });

      brandsGrid.addEventListener("mouseenter", () => {
        brandsGrid.style.cursor = "grab";
      });

      brandsGrid.addEventListener("pointerdown", () => {
        stopBrandsAutoScroll();
        brandsGrid.style.cursor = "grabbing";
      });

      brandsGrid.addEventListener("pointerup", () => {
        brandsGrid.style.cursor = "grab";
        queueBrandsAutoScrollResume();
      });

      brandsGrid.addEventListener("touchstart", () => {
        stopBrandsAutoScroll();
      }, { passive: true });

      brandsGrid.addEventListener("touchend", () => {
        queueBrandsAutoScrollResume();
      }, { passive: true });

      brandsGrid.addEventListener("wheel", (event) => {
        if (isBrandsStackedLayout()) return;
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        stopBrandsAutoScroll();
        brandsGrid.scrollBy({
          left: event.deltaY,
          behavior: "smooth"
        });
        queueBrandsAutoScrollResume();
      }, { passive: false });

      if ("IntersectionObserver" in window) {
        const brandsObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          brandsCarouselVisible = !!entry?.isIntersecting;
          if (brandsCarouselVisible) {
            queueBrandsAutoScrollResume(1200);
          } else {
            stopBrandsAutoScroll();
          }
        }, { threshold: 0.3 });
        brandsObserver.observe(brandsGrid);
      }

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopBrandsAutoScroll();
          return;
        }
        queueBrandsAutoScrollResume(1200);
      });

      if (!("IntersectionObserver" in window)) {
        scheduleIdleWork(() => startBrandsAutoScroll(), 1600);
      }
    }

    const navbar = document.getElementById("navbar");
    const bottomNavbar = document.getElementById("bottomNavbar");
    const heroSectionEl = document.querySelector(".hero-mobile-luxury");
    let lastY = window.scrollY;
    let navbarScrollTicking = false;
    let navbarIdleTimer = null;
    const getHeroBottom = () => (heroSectionEl ? heroSectionEl.offsetTop + heroSectionEl.offsetHeight : 0);
    const handleNavbarScroll = () => {
      const y = window.scrollY;
      const isMobile = window.innerWidth <= 700;
      const withinHero = y < getHeroBottom() - 80;

      if (withinHero) {
        navbar.classList.remove("navbar-hidden", "ova-nav-glass");
        clearTimeout(navbarIdleTimer);
      } else {
        if (y <= 4) {
          navbar.classList.remove("navbar-hidden", "ova-nav-glass");
        } else {
          navbar.classList.add("ova-nav-glass");
          navbar.classList.remove("navbar-hidden");
        }

        clearTimeout(navbarIdleTimer);
        if (y > 4) {
          navbarIdleTimer = window.setTimeout(() => {
            navbar.classList.add("navbar-hidden");
          }, 900);
        }
      }

      if (!isMobile) {
        if (y > 120 && y > lastY) {
          bottomNavbar.classList.add("is-visible");
        } else {
          bottomNavbar.classList.remove("is-visible");
        }
      } else {
        bottomNavbar.classList.add("is-visible");
      }

      closeDropdown("bottomHamburger");
      closeBottomProductsMenu();
      lastY = y;
    };

    window.addEventListener("scroll", () => {
      if (navbarScrollTicking) return;
      navbarScrollTicking = true;
      requestAnimationFrame(() => {
        handleNavbarScroll();
        navbarScrollTicking = false;
      });
    }, { passive: true });

    const handleResize = debounce(() => {
      updateCompareBar();
    }, 120);

    window.addEventListener("resize", handleResize, { passive: true });

    // Make bottom navbar always visible on mobile
    if (window.innerWidth <= 700) {
      bottomNavbar.classList.add("is-visible");
    }

    // Hide the fixed bottom navigation only while the footer is on screen.
    const pageFooter = document.querySelector("footer");
    if (bottomNavbar && pageFooter && "IntersectionObserver" in window) {
      const footerObserver = new IntersectionObserver(([entry]) => {
        bottomNavbar.classList.toggle("is-footer-visible", entry.isIntersecting);
      }, { threshold: 0.08 });
      footerObserver.observe(pageFooter);
    }

    let secretTapCount = 0;
    let secretTapTimer = null;
    const secretOrdersTrigger = document.getElementById("secretOrdersTrigger");

    if (secretOrdersTrigger) {
      secretOrdersTrigger.addEventListener("click", () => {
        secretTapCount += 1;

        if (secretTapTimer) clearTimeout(secretTapTimer);

        if (secretTapCount >= 5) {
          window.location.href = "secret-orders-kreem.html";
          return;
        }

        secretTapTimer = setTimeout(() => {
          secretTapCount = 0;
        }, 1800);
      });
    }

    document.addEventListener("click", (event) => {
      if (event.target.id === "compareModal") closeCompareModal();
      if (!event.target.closest(".dropdown")) {
        closeDropdown("hamburger");
        closeDropdown("bottomHamburger");
        closeProductsMenu();
        closeBottomProductsMenu();
      }
    });

    ["hamburger", "bottomHamburger"].forEach((dropdownId) => {
      const dropdownContent = document.getElementById(dropdownId);
      if (!dropdownContent) return;
      dropdownContent.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          closeDropdown(dropdownId);
          closeProductsMenu();
          closeBottomProductsMenu();
        });
      });
    });

    document.getElementById("menSearchInput").addEventListener("input", () => applyFilters("men"));
    document.getElementById("menTypeFilter").addEventListener("change", () => applyFilters("men"));
    document.getElementById("menPriceFilter").addEventListener("change", () => applyFilters("men"));
    document.getElementById("womenSearchInput").addEventListener("input", () => applyFilters("women"));
    document.getElementById("womenTypeFilter").addEventListener("change", () => applyFilters("women"));
    document.getElementById("womenPriceFilter").addEventListener("change", () => applyFilters("women"));
    /* Smart Perfume Finder section was removed - its listeners/observer are no longer wired. */

    // Promotion Toast Notification Handler
    function initPromoToast() {
      const promoToast = document.getElementById("promoToast");
      const promoOverlay = document.getElementById("promoOverlay");
      const promoToastTitle = document.getElementById("promoToastTitle");
      const promoToastSubtitle = document.getElementById("promoToastSubtitle");
      const promoToastText1 = document.getElementById("promoToastText1");
      const promoToastText2 = document.getElementById("promoToastText2");
      const promoToastHighlight = document.getElementById("promoToastHighlight");

      function updatePromoText() {
        if (currentLang === "ar") {
          promoToastTitle.textContent = "عرض خاص";
          promoToastSubtitle.textContent = "اشتري 3 واحصل على خصم 50%";
          promoToastText1.textContent = "احصل على قطعة إضافية";
          promoToastHighlight.textContent = "مجانية تمامًا";
          promoToastText2.textContent = "عند شرائك أي وحدتين من مجموعتنا المميزة!";
        } else {
          promoToastTitle.textContent = "Special Offer";
          promoToastSubtitle.textContent = "3 for 50% Off";
          promoToastText1.textContent = "Get an extra piece";
          promoToastHighlight.textContent = "completely free";
          promoToastText2.textContent = "when you purchase any 2 perfumes from our collection!";
        }
      }

      function showPromoToast() {
        updatePromoText();
        promoToast.classList.remove("is-hiding");
        promoToast.classList.add("is-visible");
        promoOverlay.classList.add("is-visible");
      }

      window.closePromoToast = function() {
        promoToast.classList.add("is-hiding");
        promoToast.classList.remove("is-visible");
        promoOverlay.classList.remove("is-visible");
        
        setTimeout(() => {
          promoToast.classList.remove("is-hiding");
        }, 500);
      };

      // Promo toast disabled - not showing anymore
      // setInterval(showPromoToast, 120000); // 120000 ms = 2 minutes
      // setTimeout(showPromoToast, 1000);

      // Close toast when overlay is clicked
      promoOverlay.addEventListener("click", window.closePromoToast);

      // Update text when language changes
      const originalToggleLanguage = window.toggleLanguage;
      window.toggleLanguage = function() {
        originalToggleLanguage();
        updatePromoText();
      };
    }

    requestedProductName = getRequestedProductNameFromUrl();
    requestedProductSlug = getRequestedProductSlugFromUrl();

    if (requestedProductName || requestedProductSlug) {
      document.body.classList.remove("intro-active");
      document.getElementById("introScreen")?.classList.add("is-hidden");
    }

    function ensureHomepageUiInitialized(showIntro = false) {
      if (!homepageUiInitialized) {
        homepageUiInitialized = true;
        initCountdownTimer();
        initBestSellerHero();
        initBrandsCarousel();
        renderBrandRails();
        initDeferredSectionRendering();
        scheduleIdleWork(() => initPromoToast(), 1400);
        scheduleIdleWork(() => hydrateHomepageSharedBrandDetails(), 2200);
      }

      if (showIntro) {
        initIntroScreen();
      } else {
        hideIntroImmediately();
      }
    }

    window.addEventListener("popstate", () => {
      requestedProductName = getRequestedProductNameFromUrl();
      requestedProductSlug = getRequestedProductSlugFromUrl();

      if (requestedProductName || requestedProductSlug) {
        hideIntroImmediately();
        renderProductDetailPage(requestedProductName || requestedProductSlug);
        return;
      }

      navigateToHomepage({ replaceHistory: true });
    });

    async function bootstrapHomepage() {
      syncQuizAttemptState();
      applyLanguage();
      const remoteCatalogTask = startRemoteCatalogHydration();

      if (requestedProductName || requestedProductSlug) {
        remoteCatalogTask.then((didHydrate) => {
          if (!didHydrate || !(requestedProductName || requestedProductSlug)) return;
          renderProductDetailPage(requestedProductName || requestedProductSlug);
        });
      } else {
        updateDefaultSeo();
        ensureHomepageUiInitialized(true);
        remoteCatalogTask.then((didHydrate) => {
          if (!didHydrate || requestedProductName || requestedProductSlug) return;
          applyLanguage();
        });
      }
    }

    bootstrapHomepage();
