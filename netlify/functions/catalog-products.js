const {
  jsonResponse,
  requireSupabaseConfig,
  supabaseFetch
} = require("./_supabase");
const { PRODUCT_SELECT_FIELDS } = require("./_catalogAdmin");

const PRODUCTS_TABLE = "catalog_products";

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingSupabase = requireSupabaseConfig();
  if (missingSupabase) return missingSupabase;

  try {
    const { payload } = await supabaseFetch(
      `/rest/v1/${PRODUCTS_TABLE}`,
      {
        method: "GET",
        headers: {
          Prefer: "count=exact"
        }
      },
      {
        select: PRODUCT_SELECT_FIELDS,
        status: "eq.active",
        order: "sort_order.asc,updated_at.desc"
      }
    );

    return jsonResponse(200, {
      ok: true,
      products: Array.isArray(payload) ? payload : []
    });
  } catch (error) {
    return jsonResponse(500, {
      ok: false,
      error: error?.payload?.message || error?.message || "Failed to load catalog products"
    });
  }
};
