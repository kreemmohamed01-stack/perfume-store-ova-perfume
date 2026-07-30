(function remoteCatalogBootstrap() {
  function titleCase(value) {
    return String(value || "")
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function normalizeRemoteProduct(product) {
    const metadata = product && typeof product.metadata === "object" && !Array.isArray(product.metadata)
      ? product.metadata
      : {};

    return {
      id: product.id || "",
      slug: product.slug || "",
      name: product.name || "",
      price: Number(product.price || 0),
      img: product.image_url || "",
      img2: product.image_alt_url || product.image_url || "",
      category: product.category || "unisex",
      badge: product.badge || "",
      description: product.description || "",
      detailsHtml: product.details_html || "",
      status: product.status || "active",
      sizeLabel: product.size_label || "",
      brandKey: product.brand_key || "",
      brandTitle: product.brand_title || titleCase(product.brand_key || ""),
      isFeatured: !!product.is_featured,
      isBestSeller: !!product.is_best_seller,
      sortOrder: Number(product.sort_order || 0),
      type: metadata.type || "",
      detailType: metadata.detailType || "",
      longevity: metadata.longevity || "",
      sillage: metadata.sillage || "",
      rating: metadata.rating || "",
      filterTypes: Array.isArray(metadata.filterTypes) ? metadata.filterTypes : [],
      heroImage: metadata.heroImage || ""
    };
  }

  async function fetchProducts() {
    const response = await fetch("/.netlify/functions/catalog-products", {
      method: "GET",
      credentials: "same-origin"
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || "Failed to load remote catalog");
    }

    return Array.isArray(data.products) ? data.products : [];
  }

  function groupBrandCatalog(remoteProducts, existingCatalog = {}) {
    const grouped = {};
    remoteProducts.map(normalizeRemoteProduct).forEach((product) => {
      const brandKey = String(product.brandKey || "").trim().toLowerCase();
      if (!brandKey) return;

      const existingBrand = existingCatalog[brandKey] || {};
      if (!grouped[brandKey]) {
        grouped[brandKey] = {
          title: product.brandTitle || existingBrand.title || titleCase(brandKey),
          subtitle: existingBrand.subtitle || "",
          heroImage: product.heroImage || existingBrand.heroImage || product.img2 || product.img,
          products: []
        };
      }

      grouped[brandKey].products.push({
        ...product
      });
    });

    Object.values(grouped).forEach((brand) => {
      brand.products.sort((left, right) => {
        if (Number(left.isBestSeller) !== Number(right.isBestSeller)) {
          return Number(right.isBestSeller) - Number(left.isBestSeller);
        }
        return (left.sortOrder || 0) - (right.sortOrder || 0);
      });
    });

    return grouped;
  }

  function syncArray(target, source) {
    target.splice(0, target.length, ...source);
    return target;
  }

  function syncObject(target, source) {
    Object.keys(target).forEach((key) => {
      delete target[key];
    });
    Object.entries(source).forEach(([key, value]) => {
      target[key] = value;
    });
    return target;
  }

  window.ovaRemoteCatalog = {
    fetchProducts,
    groupBrandCatalog,
    normalizeRemoteProduct,
    normalizeProducts(products) {
      return (products || []).map(normalizeRemoteProduct);
    },
    syncArray,
    syncObject
  };
})();
