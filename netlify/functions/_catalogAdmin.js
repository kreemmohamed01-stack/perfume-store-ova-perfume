function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function normalizeText(value, fallback = "") {
  return String(value ?? fallback).trim();
}

function normalizeBoolean(value, fallback = false) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const lowered = value.trim().toLowerCase();
    if (["true", "1", "yes", "on"].includes(lowered)) return true;
    if (["false", "0", "no", "off"].includes(lowered)) return false;
  }
  return fallback;
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeStatus(value) {
  const normalized = normalizeText(value, "active").toLowerCase();
  if (["active", "hidden", "draft", "archived"].includes(normalized)) {
    return normalized;
  }
  return "active";
}

function sanitizeMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value;
}

function sanitizeProductPayload(input = {}) {
  const name = normalizeText(input.name);
  return {
    name,
    slug: normalizeText(input.slug) || slugify(name),
    brand_key: normalizeText(input.brand_key).toLowerCase(),
    brand_title: normalizeText(input.brand_title),
    price: normalizeNumber(input.price, 0),
    image_url: normalizeText(input.image_url),
    image_alt_url: normalizeText(input.image_alt_url),
    category: normalizeText(input.category, "unisex").toLowerCase(),
    badge: normalizeText(input.badge),
    size_label: normalizeText(input.size_label),
    description: normalizeText(input.description),
    details_html: normalizeText(input.details_html),
    status: normalizeStatus(input.status),
    is_featured: normalizeBoolean(input.is_featured),
    is_best_seller: normalizeBoolean(input.is_best_seller),
    sort_order: normalizeNumber(input.sort_order, 0),
    source_page: normalizeText(input.source_page),
    metadata: sanitizeMetadata(input.metadata)
  };
}

const PRODUCT_SELECT_FIELDS = [
  "id",
  "slug",
  "name",
  "brand_key",
  "brand_title",
  "price",
  "image_url",
  "image_alt_url",
  "category",
  "badge",
  "size_label",
  "description",
  "details_html",
  "status",
  "is_featured",
  "is_best_seller",
  "sort_order",
  "source_page",
  "metadata",
  "created_at",
  "updated_at"
].join(",");

module.exports = {
  PRODUCT_SELECT_FIELDS,
  sanitizeProductPayload,
  slugify
};
