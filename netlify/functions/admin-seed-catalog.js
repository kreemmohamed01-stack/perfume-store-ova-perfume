const { supabaseFetch, requireSupabaseConfig } = require("./_supabase");
const { adminJsonResponse, requireAdminSession } = require("./_adminAuth");
const { sanitizeProductPayload, slugify } = require("./_catalogAdmin");

const PRODUCTS_TABLE = "catalog_products";

function getBaseUrl(event) {
  const protocol = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host || event.headers.Host;
  return `${protocol}://${host}`;
}

async function loadText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.text();
}

function extractArrayLiteral(source, variableName) {
  const match = source.match(new RegExp(`const\\s+${variableName}\\s*=\\s*(\\[[\\s\\S]*?\\]);`));
  if (!match) return [];
  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    return [];
  }
}

function extractObjectLiteral(source, variableName) {
  const match = source.match(new RegExp(`const\\s+${variableName}\\s*=\\s*(\\{[\\s\\S]*?\\});`));
  if (!match) return {};
  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    return {};
  }
}

function extractAssignedObjectLiteral(source, leftExpression) {
  const escaped = leftExpression.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`${escaped}\\s*=\\s*(\\{[\\s\\S]*?\\});`));
  if (!match) return {};
  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    return {};
  }
}

function extractSetValues(source, variableName) {
  const match = source.match(new RegExp(`const\\s+${variableName}\\s*=\\s*new\\s+Set\\((\\[[\\s\\S]*?\\])\\);`));
  if (!match) return [];
  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch (error) {
    return [];
  }
}

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCategory(name, categorySets, fallback = "unisex") {
  const cleanName = String(name || "").trim();
  if (!cleanName) return fallback;
  const inMen = categorySets.men.has(cleanName);
  const inWomen = categorySets.women.has(cleanName);
  const inUnisex = categorySets.unisex.has(cleanName);
  if (inUnisex || (inMen && inWomen)) return "unisex";
  if (inWomen) return "women";
  if (inMen) return "men";
  return fallback;
}

function mergeSnapshots(target, source) {
  if (!source) return target;
  Object.entries(source).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === "string") {
      if (!value.trim()) return;
      if (!String(target[key] || "").trim() || (key === "detailsHtml" && value.length > String(target[key] || "").length)) {
        target[key] = value;
      }
      return;
    }
    if (Array.isArray(value)) {
      if (!value.length) return;
      target[key] = [...new Set([...(Array.isArray(target[key]) ? target[key] : []), ...value])];
      return;
    }
    if (typeof value === "object") {
      target[key] = { ...(target[key] || {}), ...value };
      return;
    }
    target[key] = value;
  });
  return target;
}

function chunk(list, size) {
  const batches = [];
  for (let index = 0; index < list.length; index += size) {
    batches.push(list.slice(index, index + size));
  }
  return batches;
}

async function upsertProducts(products) {
  const batches = chunk(products, 80);
  for (const batch of batches) {
    await supabaseFetch(
      `/rest/v1/${PRODUCTS_TABLE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify(batch)
      },
      {
        on_conflict: "slug"
      }
    );
  }
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return adminJsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return adminJsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingSupabase = requireSupabaseConfig();
  if (missingSupabase) return missingSupabase;

  const auth = requireAdminSession(event);
  if (auth.response) return auth.response;

  try {
    const baseUrl = getBaseUrl(event);
    const [indexHtml, allPerfumeHtml, brandHtml, catalogJs] = await Promise.all([
      loadText(`${baseUrl}/index.html`),
      loadText(`${baseUrl}/all-perfume.html`),
      loadText(`${baseUrl}/brand.html`),
      loadText(`${baseUrl}/js/catalog.js`)
    ]);

    const categorySets = {
      men: new Set(extractSetValues(indexHtml, "menOnlyNames")),
      women: new Set(extractSetValues(indexHtml, "womenOnlyNames")),
      unisex: new Set(extractSetValues(indexHtml, "unisexNames"))
    };

    const detailMap = {
      ...extractObjectLiteral(indexHtml, "productDetailMap"),
      ...extractObjectLiteral(brandHtml, "sharedProductDetailMap")
    };

    const brandCatalog = extractAssignedObjectLiteral(catalogJs, "window.ovaBrandCatalog");

    const sourceArrays = {
      bestSellerProducts: extractArrayLiteral(indexHtml, "bestSellerProducts"),
      extraBestSellerProducts: extractArrayLiteral(indexHtml, "extraBestSellerProducts"),
      standaloneSectionProducts: extractArrayLiteral(indexHtml, "standaloneSectionProducts"),
      bestSellerCatalogProducts: extractArrayLiteral(allPerfumeHtml, "bestSellerCatalogProducts"),
      unisexProducts: extractArrayLiteral(allPerfumeHtml, "unisexProducts"),
      offlineIndexProducts: extractArrayLiteral(allPerfumeHtml, "offlineIndexProducts")
    };

    const bestSellerNames = new Set(
      [
        ...sourceArrays.bestSellerProducts,
        ...sourceArrays.extraBestSellerProducts,
        ...sourceArrays.bestSellerCatalogProducts
      ]
        .map((product) => String(product?.name || "").trim())
        .filter(Boolean)
    );

    const mergedByName = new Map();
    let sortOrder = 0;

    function collectProduct(product, context = {}) {
      if (!product || !product.name) return;
      const name = String(product.name).trim();
      const key = name.toLowerCase();
      const detailSnapshot = detailMap[name] || {};
      const existing = mergedByName.get(key) || {
        name,
        slug: slugify(name),
        metadata: {},
        sort_order: sortOrder++
      };

      const merged = mergeSnapshots(existing, {
        ...product,
        ...detailSnapshot,
        brandKey: context.brandKey || product.brandKey,
        brandTitle: context.brandTitle || product.brandTitle,
        category: context.category || product.catalogCategory,
        isBestSeller: context.isBestSeller || bestSellerNames.has(name),
        sourcePage: context.sourcePage || existing.sourcePage || ""
      });

      mergedByName.set(key, merged);
    }

    Object.values(sourceArrays).forEach((list) => {
      list.forEach((product) => {
        collectProduct(product, {
          sourcePage: "static-site"
        });
      });
    });

    Object.entries(brandCatalog).forEach(([brandKey, brand]) => {
      const brandTitle = brand?.title || brandKey;
      (brand?.products || []).forEach((product) => {
        collectProduct(product, {
          brandKey,
          brandTitle,
          sourcePage: "brand-catalog"
        });
      });
    });

    const records = [...mergedByName.values()]
      .map((product, index) => {
        const category = normalizeCategory(product.name, categorySets, product.category || "unisex");
        const sanitized = sanitizeProductPayload({
          slug: product.slug || slugify(product.name),
          name: product.name,
          brand_key: String(product.brandKey || "").trim().toLowerCase(),
          brand_title: product.brandTitle || "",
          price: product.price || 0,
          image_url: product.img || product.image_url || "",
          image_alt_url: product.img2 || product.image_alt_url || product.img || "",
          category,
          badge: product.badge || "",
          size_label: product.sizeLabel || product.size_label || "",
          description: product.description || stripHtml(product.detailsHtml).slice(0, 220),
          details_html: product.detailsHtml || "",
          status: "active",
          is_featured: Boolean(product.isFeatured || product.is_featured),
          is_best_seller: Boolean(product.isBestSeller || product.is_best_seller || bestSellerNames.has(product.name)),
          sort_order: typeof product.sort_order === "number" ? product.sort_order : index,
          source_page: product.sourcePage || "static-site",
          metadata: {
            type: product.type || "",
            detailType: product.detailType || "",
            longevity: product.longevity || "",
            sillage: product.sillage || "",
            rating: product.rating || "",
            filterTypes: Array.isArray(product.filterTypes) ? product.filterTypes : [],
            heroImage: product.heroImage || "",
            seededAt: new Date().toISOString()
          }
        });
        return sanitized;
      })
      .filter((product) => product.name && product.image_url);

    await upsertProducts(records);

    return adminJsonResponse(200, {
      ok: true,
      imported: records.length,
      bestSellers: records.filter((product) => product.is_best_seller).length,
      brands: [...new Set(records.map((product) => product.brand_key).filter(Boolean))].length
    });
  } catch (error) {
    return adminJsonResponse(500, {
      ok: false,
      error: error?.message || "Failed to seed catalog"
    });
  }
};
