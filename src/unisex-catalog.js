/* Wrapped in an IIFE so its internals (brandCatalog, featuredBrandKeys, ...)
   stay private. They used to be top-level consts, which collided with the
   same names declared by all-perfume.html and threw
   "Identifier 'brandCatalog' has already been declared", aborting that
   page's inline script. Only window.ovaUnisexProducts is exported. */
(function () {
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

  function uniqueUnisexProductsByName(list) {
    const seen = new Set();
    return list.filter((product) => {
      const key = product.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const brandCatalog = window.ovaBrandCatalog || {};
  const featuredBrandKeys = ["dior", "armani", "lattafa", "kayali", "jeanpaulgaultier", "tomford", "xerjoff", "rarescents"];
  const brandUnisexProducts = featuredBrandKeys.flatMap((brandKey) => {
    const brand = brandCatalog[brandKey];
    return (brand?.products || []).map((product) => ({
      ...product,
      brandKey,
      brandTitle: brand.title || brandKey
    }));
  });

  const extraUnisexProducts = [
    {
      name: "Wild Cold 200ml",
      price: 1050,
      img: "images/site-assets/wild-cold.webp",
      img2: "images/site-assets/wild-colt-alt-2.webp"
    },
    {
      name: "Assaf Angel 200ml",
      price: 1200,
      img: "images/site-assets/assaf-angel-main.webp",
      img2: "images/site-assets/assaf-angel-alt.webp"
    },
    {
      name: "Assaf Pink Lady 200ml",
      price: 1200,
      img: "images/site-assets/assaf-pink-lady-main.jpg",
      img2: "images/site-assets/assaf-pink-lady-alt.webp"
    },
    {
      name: "Diamond Pink Score 200ml",
      price: 1050,
      img: "images/site-assets/diamond-pink-score-main.webp",
      img2: "images/site-assets/diamond-pink-score-alt.webp"
    },
    {
      name: "One & Only 200ml",
      price: 850,
      img: "images/site-assets/one-and-only-main-2.webp",
      img2: "images/site-assets/one-and-only-notes-2.webp"
    },
    {
      name: "Qissa Imperial Valley 200ml",
      price: 850,
      img: "images/site-assets/gissah-imperial-valley-perfume-premium-edp-200ml-pewangi-arab.webp",
      img2: "images/site-assets/imp-valley.webp"
    },
    {
      name: "Imagination",
      price: 850,
      img: "images/site-assets/products-by-louis-vuitton-imagination.webp",
      img2: "images/site-assets/imagination-notes.webp"
    },
    {
      name: "Baccarat Rouge Master Box Original",
      price: 850,
      img: "images/site-assets/baccarat-rouge-master-box-2.webp",
      img2: "images/site-assets/maison-francis-kurkdjian-baccarat-rouge-540-extrait-de-parfum.webp"
    },
    {
      name: "Spanish Tobacco",
      price: 850,
      img: "images/site-assets/spanish-tobacco-main-2.webp",
      img2: "images/site-assets/spanish-tobacco-main-2.webp"
    },
    {
      name: "Arabian Tobacco",
      price: 850,
      img: "images/site-assets/arabian-tobacco-alt-2.webp",
      img2: "images/site-assets/arabian-tobacco-alt-2.webp"
    },
    {
      name: "Khamrah 40ml",
      price: 850,
      img: "images/site-assets/khamrah-40ml-main-2.webp",
      img2: "images/site-assets/khamrah-40ml-notes-2.webp"
    }
  ];

  window.ovaUnisexProducts = uniqueUnisexProductsByName([
    ...brandUnisexProducts,
    ...extraUnisexProducts
  ]).filter((product) => unisexNames.has(product.name));

})();
