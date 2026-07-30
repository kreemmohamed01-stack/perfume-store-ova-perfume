const { requireSupabaseConfig, supabaseFetch } = require("./_supabase");

const PRODUCTS_TABLE = "catalog_products";

function xmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getBaseUrl(event) {
  const protocol = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host || event.headers.Host || "ovaperfume.com";
  return `${protocol}://${host}`.replace(/\/+$/, "");
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Method not allowed</error>"
    };
  }

  const missingSupabase = requireSupabaseConfig();
  if (missingSupabase) {
    return {
      statusCode: missingSupabase.statusCode || 500,
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Missing Supabase configuration</error>"
    };
  }

  try {
    const { payload } = await supabaseFetch(
      `/rest/v1/${PRODUCTS_TABLE}`,
      {
        method: "GET"
      },
      {
        select: "slug,updated_at",
        status: "eq.active",
        order: "sort_order.asc,updated_at.desc"
      }
    );

    const baseUrl = getBaseUrl(event);
    const urls = (Array.isArray(payload) ? payload : [])
      .filter((product) => product && product.slug)
      .map((product) => {
        const loc = `${baseUrl}/index.html?product_slug=${encodeURIComponent(String(product.slug).trim())}`;
        const lastmod = String(product.updated_at || "").slice(0, 10);
        return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    ${lastmod ? `<lastmod>${xmlEscape(lastmod)}</lastmod>` : ""}\n  </url>`;
      })
      .join("\n");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      },
      body: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      },
      body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Failed to build product sitemap</error>"
    };
  }
};
