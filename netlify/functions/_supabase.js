const TABLE_NAME = "site_events";

function getEnv(name) {
  return process.env[name] || "";
}

function getSupabaseConfig() {
  const url = getEnv("SUPABASE_URL").replace(/\/+$/, "");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceRoleKey };
}

function corsHeaders(extraHeaders = {}) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders
  };
}

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: corsHeaders(extraHeaders),
    body: JSON.stringify(body)
  };
}

function buildRestUrl(pathname, query = {}) {
  const { url } = getSupabaseConfig();
  const target = new URL(`${url}${pathname}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      target.searchParams.set(key, value);
    }
  });
  return target.toString();
}

async function supabaseFetch(pathname, options = {}, query = {}) {
  const { serviceRoleKey } = getSupabaseConfig();
  const target = buildRestUrl(pathname, query);
  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    ...options.headers
  };

  const response = await fetch(target, {
    ...options,
    headers
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => "");

  if (!response.ok) {
    const error = new Error(`Supabase request failed with status ${response.status}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return {
    response,
    payload
  };
}

function requireSupabaseConfig() {
  const { url, serviceRoleKey } = getSupabaseConfig();
  if (!url || !serviceRoleKey) {
    return jsonResponse(500, {
      ok: false,
      error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    });
  }
  return null;
}

module.exports = {
  TABLE_NAME,
  corsHeaders,
  jsonResponse,
  supabaseFetch,
  requireSupabaseConfig
};
