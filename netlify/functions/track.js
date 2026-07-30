const {
  TABLE_NAME,
  jsonResponse,
  supabaseFetch,
  requireSupabaseConfig
} = require("./_supabase");

function normalizeString(value) {
  const clean = String(value || "").trim();
  return clean || null;
}

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingConfig = requireSupabaseConfig();
  if (missingConfig) return missingConfig;

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, { ok: false, error: "Invalid JSON body" });
  }

  const eventName = normalizeString(body.event_name);
  if (!eventName) {
    return jsonResponse(400, { ok: false, error: "event_name is required" });
  }

  const row = {
    event_name: eventName,
    page: normalizeString(body.page),
    product_name: normalizeString(body.product_name),
    session_id: normalizeString(body.session_id),
    visitor_id: normalizeString(body.visitor_id),
    order_id: normalizeString(body.order_id),
    payload: body.payload && typeof body.payload === "object" ? body.payload : {}
  };

  try {
    await supabaseFetch(`/rest/v1/${TABLE_NAME}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify([row])
    });

    return jsonResponse(202, { ok: true });
  } catch (error) {
    return jsonResponse(502, {
      ok: false,
      error: "Failed to store event",
      details: error.payload || String(error.message || error)
    });
  }
};
