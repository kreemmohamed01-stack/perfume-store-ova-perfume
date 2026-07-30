// ====== PRODUCT DATA ENHANCEMENT ======
// Enhance products with metadata for filtering and reviews

const featureTypeOrder = ["sweet", "fresh", "fruity", "floral", "spicy", "oud", "woody", "musk", "luxury"];
const featureTypeTranslations = {
  en: {
    sweet: "Sweet",
    fresh: "Fresh",
    fruity: "Fruity",
    floral: "Floral",
    spicy: "Spicy",
    oud: "Oud",
    woody: "Woody",
    musk: "Musk",
    luxury: "Luxury"
  },
  ar: {
    sweet: "حلو",
    fresh: "منعش",
    fruity: "فاكهي",
    floral: "زهري",
    spicy: "سبايسي",
    oud: "عود",
    woody: "خشبي",
    musk: "مسك",
    luxury: "فاخر"
  }
};

function getFeatureLang() {
  return localStorage.getItem("ovaLang") || "en";
}

function formatFeatureTypeLabel(typeValue) {
  const lang = getFeatureLang();
  const translated = featureTypeTranslations[lang]?.[typeValue];
  if (translated) return translated;

  return String(typeValue || "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function deriveFeatureTypeTags(product) {
  const combined = `${product.name || ""} ${product.detailType || product.type || ""} ${product.detailsHtml || ""}`.toLowerCase();
  const matches = [];

  if (combined.includes("vanilla") || combined.includes("sweet") || combined.includes("sugar") || combined.includes("caramel") || combined.includes("gourmand") || combined.includes("marshmallow") || combined.includes("chocolate")) matches.push("sweet");
  if (combined.includes("fresh") || combined.includes("citrus") || combined.includes("marine") || combined.includes("aqua") || combined.includes("bergamot") || combined.includes("green") || combined.includes("mint") || combined.includes("watery")) matches.push("fresh");
  if (combined.includes("fruity") || combined.includes("pear") || combined.includes("tropical") || combined.includes("apple") || combined.includes("berry")) matches.push("fruity");
  if (combined.includes("floral") || combined.includes("rose") || combined.includes("jasmine") || combined.includes("flower") || combined.includes("peony") || combined.includes("iris") || combined.includes("lavender")) matches.push("floral");
  if (combined.includes("spicy") || combined.includes("spice") || combined.includes("amber") || combined.includes("oriental") || combined.includes("warm") || combined.includes("incense")) matches.push("spicy");
  if (combined.includes("oud")) matches.push("oud");
  if (combined.includes("woody") || combined.includes("wood") || combined.includes("cedar") || combined.includes("sandal") || combined.includes("leather") || combined.includes("smoky") || combined.includes("smoke") || combined.includes("tobacco") || combined.includes("patchouli")) matches.push("woody");
  if (combined.includes("musk") || combined.includes("musky") || combined.includes("powder") || combined.includes("powdery") || combined.includes("clean")) matches.push("musk");

  if (!matches.length) {
    const name = String(product.name || "").toLowerCase();
    let fallbackType = "luxury";
    if (name.includes("vanilla") || name.includes("opium") || name.includes("sweet") || name.includes("gourmand")) fallbackType = "sweet";
    else if (name.includes("bleu de chanel") || name.includes("acqua") || name.includes("imagination") || name.includes("issey") || name.includes("sauvage") || name.includes("y eau")) fallbackType = "fresh";
    else if (name.includes("black") || name.includes("eros") || name.includes("amber") || name.includes("elixir")) fallbackType = "spicy";
    else if (name.includes("leather") || name.includes("woody") || name.includes("oud") || name.includes("tobacco")) fallbackType = "woody";
    else if ((Number(product.price) || 0) >= 1700) fallbackType = "luxury";
    matches.push(fallbackType);
  }

  return [...new Set(matches)];
}

function formatCategoryLabel(categoryValue) {
  const category = String(categoryValue || "").toLowerCase();
  if (category === "men") return "Men";
  if (category === "women") return "Women";
  return "Unisex";
}

function enhanceProductsWithMetadata(products) {
  return products.map((product, index) => {
    const imagePath = String(product.img || "").toLowerCase();
    let category = String(product.catalogCategory || "").toLowerCase();
    if (!category) {
      category = "unisex";
      if (imagePath.includes("women")) category = "women";
      else if (imagePath.includes("men")) category = "men";
    }

    // Infer brand
    const name = String(product.name || "").toLowerCase();
    let brand = "Other";
    if (name.includes("chanel")) brand = "Chanel";
    else if (name.includes("dior")) brand = "Dior";
    else if (name.includes("armani")) brand = "Armani";
    else if (name.includes("givenchy")) brand = "Givenchy";
    else if (name.includes("versace")) brand = "Versace";
    else if (name.includes("tom ford")) brand = "Tom Ford";
    else if (name.includes("ysl") || name.includes("saint laurent")) brand = "Yves Saint Laurent";
    else if (name.includes("prada")) brand = "Prada";
    else if (name.includes("creed")) brand = "Creed";
    else if (name.includes("lattafa")) brand = "Lattafa";
    else if (name.includes("kayali")) brand = "Kayali";
    else if (name.includes("gaultier") || name.includes("male")) brand = "Jean Paul Gaultier";

    const typeTags = [...new Set([...(Array.isArray(product.filterTypes) ? product.filterTypes : []), ...deriveFeatureTypeTags(product)])];
    const type = typeTags[0] || "luxury";
    const rawDisplayType = String(product.detailType || product.type || "").trim();
    const displayType = rawDisplayType && /[\/-]/.test(rawDisplayType)
      ? rawDisplayType
      : formatFeatureTypeLabel(type);

    const stock = 18;

    return {
      ...product,
      category,
      brand,
      type,
      typeTags,
      displayType,
      stock,
      reviewCount: Math.floor(Math.random() * 50) + 5,
      reviews: JSON.parse(localStorage.getItem(`reviews_${product.name}`) || "[]")
    };
  });
}

// ====== FILTER & SORT LOGIC ======

let currentFilters = {
  search: "",
  type: null,
  category: null,
  priceRange: null,
  sort: "featured"
};

function buildFilterOptions(products) {
  const types = [...new Set(products.flatMap((p) => p.typeTags || []))].filter(Boolean)
    .sort((a, b) => {
      const aIndex = featureTypeOrder.indexOf(a);
      const bIndex = featureTypeOrder.indexOf(b);
      const safeA = aIndex === -1 ? featureTypeOrder.length : aIndex;
      const safeB = bIndex === -1 ? featureTypeOrder.length : bIndex;
      return safeA - safeB || a.localeCompare(b);
    });
  const categories = [...new Set(products.map(p => p.category))].filter(Boolean);
  const priceRanges = [
    { label: "Under 500 EGP", min: 0, max: 500 },
    { label: "500 - 1000 EGP", min: 500, max: 1000 },
    { label: "1000 - 1500 EGP", min: 1000, max: 1500 },
    { label: "Over 1500 EGP", min: 1500, max: Infinity }
  ];

  return { types, categories, priceRanges };
}

function getFeatureOriginalPrice(product) {
  const basePrice = Number(product?.price) || 0;
  const name = String(product?.name || "");
  let hash = 0;

  for (let i = 0; i < name.length; i += 1) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }

  const increments = [150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
  return basePrice + increments[hash % increments.length];
}

function getFeaturePriceMarkup(product) {
  return `
    <span class="product-old-price">${getFeatureOriginalPrice(product)} EGP</span>
    <span class="product-current-price">${product.price} EGP</span>
  `;
}

function renderFilterUI(products) {
  const options = buildFilterOptions(products);
  const allTypesLabel = getFeatureLang() === "ar" ? "كل الأنواع" : "All Types";

  // Render type filters
  const typeFiltersContainer = document.getElementById("typeFilters");
  if (typeFiltersContainer) {
    typeFiltersContainer.innerHTML = "";
    ["All Types", ...options.types].forEach((type) => {
      const btn = document.createElement("button");
      btn.className = "filter-tab";
      if (type !== "All Types" && currentFilters.type === type) btn.classList.add("active");
      if (type === "All Types" && !currentFilters.type) btn.classList.add("active");
      btn.innerText = type === "All Types" ? allTypesLabel : formatFeatureTypeLabel(type);
      btn.onclick = () => {
        currentFilters.type = type === "All Types" ? null : type;
        renderFilterUI(products);
        filterAndRenderProducts(products);
      };
      typeFiltersContainer.appendChild(btn);
    });
  }

  // Render category filters
  const categoryFiltersContainer = document.getElementById("categoryFilters");
  if (categoryFiltersContainer) {
    categoryFiltersContainer.innerHTML = "";
    ["All Categories", ...options.categories].forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "filter-tab";
      if (cat !== "All Categories" && currentFilters.category === cat) btn.classList.add("active");
      if (cat === "All Categories" && !currentFilters.category) btn.classList.add("active");
      btn.innerText = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.onclick = () => {
        currentFilters.category = cat === "All Categories" ? null : cat;
        renderFilterUI(products);
        filterAndRenderProducts(products);
      };
      categoryFiltersContainer.appendChild(btn);
    });
  }

  // Render price filters
  const priceFiltersContainer = document.getElementById("priceFilters");
  if (priceFiltersContainer) {
    priceFiltersContainer.innerHTML = "";
    ["All Prices", ...options.priceRanges].forEach((priceRange, idx) => {
      const btn = document.createElement("button");
      btn.className = "filter-tab";
      const label = typeof priceRange === "string" ? priceRange : priceRange.label;
      const isActive = typeof priceRange === "string" ? !currentFilters.priceRange : 
                       currentFilters.priceRange === `${priceRange.min}-${priceRange.max}`;
      if (isActive) btn.classList.add("active");
      btn.innerText = label;
      btn.onclick = () => {
        if (label === "All Prices") {
          currentFilters.priceRange = null;
        } else {
          currentFilters.priceRange = `${priceRange.min}-${priceRange.max}`;
        }
        renderFilterUI(products);
        filterAndRenderProducts(products);
      };
      priceFiltersContainer.appendChild(btn);
    });
  }
}

function filterAndRenderProducts(allProducts) {
  let filtered = allProducts.filter(product => {
    // Search filter
    if (currentFilters.search && !product.name.toLowerCase().includes(currentFilters.search.toLowerCase())) {
      return false;
    }
    // Type filter
    if (currentFilters.type && !(product.typeTags || []).includes(currentFilters.type)) {
      return false;
    }
    // Category filter
    if (currentFilters.category && product.category !== currentFilters.category) {
      return false;
    }
    // Price filter
    if (currentFilters.priceRange) {
      const [min, max] = currentFilters.priceRange.split("-").map(Number);
      if (product.price < min || product.price > max) {
        return false;
      }
    }
    return true;
  });

  // Sort
  switch (currentFilters.sort) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case "newest":
      // Already in order
      break;
    case "featured":
    default:
      // Original order
      break;
  }

  renderProductGrid(filtered);
}

function renderProductGrid(products) {
  const grid = document.getElementById("allProductsGrid");
  const emptyState = document.getElementById("emptyState");

  if (!grid) return;

  grid.innerHTML = "";

  if (products.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Stock badge
    let stockClass = "out-stock";
    let stockText = "Out of Stock";
    if (product.stock > 5) {
      stockClass = "in-stock";
      stockText = "In Stock";
    } else if (product.stock > 0) {
      stockClass = "low-stock";
      stockText = "Low Stock";
    }

    card.innerHTML = `
      <div class="stock-badge ${stockClass}">${stockText}</div>
      <img src="${product.img}" alt="${product.name}" onclick="openModal('${product.name.replace(/'/g, "\\'")}')">
      <h3>${product.name}</h3>
      <p class="product-price">${getFeaturePriceMarkup(product)}</p>
      <div class="product-rating">${getStars(product.rating)} ${product.rating}</div>
      <div class="product-rating-count">${product.reviewCount} reviews</div>
      <div class="product-stats">
        <span>${product.displayType || formatFeatureTypeLabel(product.type)}</span>
        <span>${formatCategoryLabel(product.category)}</span>
      </div>
      <div class="product-card-actions">
        <button class="product-more-btn">View Details</button>
        <button class="${product.stock <= 0 ? "disabled" : ""}" ${product.stock <= 0 ? "disabled" : ""}>Add to Cart</button>
      </div>
    `;

    const moreButton = card.querySelector(".product-more-btn");
    const button = card.querySelector(".product-card-actions button:last-child");
    moreButton.onclick = () => openModal(product.name);
    if (product.stock > 0) {
      const img = card.querySelector("img");
      button.onclick = () => quickAdd(product.name, img);
    }

    grid.appendChild(card);
  });
}

function updateFilters() {
  const searchInput = document.getElementById("productSearch");
  const sortSelect = document.getElementById("sortSelect");

  if (searchInput) {
    currentFilters.search = searchInput.value;
  }
  if (sortSelect) {
    currentFilters.sort = sortSelect.value;
  }

  // Trigger re-render
  renderFilterUI(window.allProductsEnhanced || []);
  filterAndRenderProducts(window.allProductsEnhanced || []);
}

// ====== REVIEWS SYSTEM ======

function addProductReview(productName, rating, reviewText) {
  const reviews = JSON.parse(localStorage.getItem(`reviews_${productName}`) || "[]");
  reviews.push({
    rating: parseInt(rating),
    text: reviewText,
    date: new Date().toLocaleDateString(),
    author: "Anonymous"
  });
  localStorage.setItem(`reviews_${productName}`, JSON.stringify(reviews));

  // Update product in allProducts
  if (window.allProductsEnhanced) {
    const product = window.allProductsEnhanced.find(p => p.name === productName);
    if (product) {
      product.reviews = reviews;
      product.reviewCount = reviews.length;
      product.rating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    }
  }

  return reviews;
}

function getProductReviews(productName) {
  return JSON.parse(localStorage.getItem(`reviews_${productName}`) || "[]");
}

function renderReviewsInModal(productName) {
  const reviews = getProductReviews(productName);
  const reviewsContainer = document.getElementById("modalReviews") || createReviewsContainer();

  reviewsContainer.innerHTML = "<h3 style='margin:12px 0 10px;font-size:14px;'>Customer Reviews</h3>";

  if (reviews.length > 0) {
    reviews.slice(0, 3).forEach(review => {
      const reviewEl = document.createElement("div");
      reviewEl.className = "modal-review-item";
      reviewEl.innerHTML = `
        <strong>⭐ ${review.rating}/5</strong>
        <p>${review.text}</p>
        <small>${review.date}</small>
      `;
      reviewsContainer.appendChild(reviewEl);
    });
  } else {
    const emptyMsg = document.createElement("p");
    emptyMsg.innerText = "No reviews yet. Be the first to review!";
    emptyMsg.style.fontSize = "12px";
    emptyMsg.style.color = "#999";
    reviewsContainer.appendChild(emptyMsg);
  }

  // Add review form
  const form = document.createElement("div");
  form.className = "modal-review-form";
  form.innerHTML = `
    <textarea id="reviewText" placeholder="Share your thoughts..." rows="3" style="width:100%;"></textarea>
    <div style="display:flex;gap:8px;">
      <select id="reviewRating" style="flex:0;width:80px;padding:8px;border:1px solid rgba(0,0,0,0.1);border-radius:8px;">
        <option value="5">⭐⭐⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="2">⭐⭐</option>
        <option value="1">⭐</option>
      </select>
      <button style="flex:1;background:#8b6a33;color:#fff;border-radius:8px;cursor:pointer;font-weight:600;font-size:12px;" onclick="submitReview('${productName.replace(/'/g, "\\'")}')">Submit Review</button>
    </div>
  `;
  reviewsContainer.appendChild(form);

  return reviewsContainer;
}

function createReviewsContainer() {
  const container = document.createElement("div");
  container.id = "modalReviews";
  container.className = "modal-reviews";
  const modalContent = document.querySelector(".modal-content") || document.querySelector(".modal-box");
  if (modalContent) {
    modalContent.appendChild(container);
  }
  return container;
}

function submitReview(productName) {
  const reviewText = document.getElementById("reviewText")?.value || "";
  const reviewRating = document.getElementById("reviewRating")?.value || 5;

  if (!reviewText.trim()) {
    alert("Please write a review");
    return;
  }

  addProductReview(productName, reviewRating, reviewText);
  document.getElementById("reviewText").value = "";
  renderReviewsInModal(productName);
  alert("Thank you for your review!");
}

// ====== USER ACCOUNT SYSTEM ======


