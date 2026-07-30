const {
  jsonResponse,
  requireSupabaseConfig,
  supabaseFetch
} = require("./_supabase");
const { adminJsonResponse, requireAdminSession } = require("./_adminAuth");
const { PRODUCT_SELECT_FIELDS, sanitizeProductPayload } = require("./_catalogAdmin");

const PRODUCTS_TABLE = "catalog_products";

function parseBody(rawBody) {
  try {
    return JSON.parse(rawBody || "{}");
  } catch (error) {
    return null;
  }
}

function isSupabaseMissingTableError(error) {
  const message = String(error?.payload?.message || error?.message || "").toLowerCase();
  return message.includes("catalog_products") && (message.includes("does not exist") || message.includes("relation"));
}

async function listProducts() {
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
      order: "sort_order.asc,updated_at.desc"
    }
  );

  return Array.isArray(payload) ? payload : [];
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return adminJsonResponse(204, { ok: true });
  }

  const missingSupabase = requireSupabaseConfig();
  if (missingSupabase) return missingSupabase;

  const auth = requireAdminSession(event);
  if (auth.response) return auth.response;

  try {
    if (event.httpMethod === "GET") {
      const products = await listProducts();
      return adminJsonResponse(200, {
        ok: true,
        products
      });
    }

    if (event.httpMethod === "POST") {
      const body = parseBody(event.body);
      if (!body) {
        return adminJsonResponse(400, { ok: false, error: "Invalid request body" });
      }

      const product = sanitizeProductPayload(body);
      if (!product.name) {
        return adminJsonResponse(400, { ok: false, error: "Product name is required" });
      }

      const { payload } = await supabaseFetch(
        `/rest/v1/${PRODUCTS_TABLE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Prefer: "return=representation"
          },
          body: JSON.stringify(product)
        }
      );

      return adminJsonResponse(200, {
        ok: true,
        product: Array.isArray(payload) ? payload[0] || null : payload
      });
    }

    if (event.httpMethod === "PUT") {
      const body = parseBody(event.body);
      if (!body || !body.id) {
        return adminJsonResponse(400, { ok: false, error: "Product id is required" });
      }

      const id = String(body.id);
      const product = sanitizeProductPayload(body);
      delete product.created_at;
      delete product.updated_at;

      const { payload } = await supabaseFetch(
        `/rest/v1/${PRODUCTS_TABLE}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Prefer: "return=representation"
          },
          body: JSON.stringify(product)
        },
        {
          id: `eq.${id}`
        }
      );

      return adminJsonResponse(200, {
        ok: true,
        product: Array.isArray(payload) ? payload[0] || null : payload
      });
    }

    if (event.httpMethod === "DELETE") {
      const body = parseBody(event.body);
      const id = String(body?.id || "").trim();
      if (!id) {
        return adminJsonResponse(400, { ok: false, error: "Product id is required" });
      }

      await supabaseFetch(
        `/rest/v1/${PRODUCTS_TABLE}`,
        {
          method: "DELETE",
          headers: {
            Prefer: "return=minimal"
          }
        },
        {
          id: `eq.${id}`
        }
      );

      return adminJsonResponse(200, {
        ok: true,
        deletedId: id
      });
    }

    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  } catch (error) {
    if (isSupabaseMissingTableError(error)) {
      return adminJsonResponse(500, {
        ok: false,
        error: "Supabase table catalog_products is missing. Run the SQL setup first."
      });
    }

    return adminJsonResponse(500, {
      ok: false,
      error: error?.payload?.message || error?.message || "Unexpected admin products error"
    });
  }
};
