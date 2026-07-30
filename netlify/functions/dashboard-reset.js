const {
  TABLE_NAME,
  jsonResponse,
  supabaseFetch,
  requireSupabaseConfig
} = require("./_supabase");

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return jsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingConfig = requireSupabaseConfig();
  if (missingConfig) return missingConfig;

  try {
    await supabaseFetch(
      `/rest/v1/${TABLE_NAME}`,
      {
        method: "DELETE",
        headers: {
          Prefer: "return=minimal"
        }
      },
      {
        event_name: "not.is.null"
      }
    );

    return jsonResponse(200, {
      ok: true,
      message: "Live dashboard events were reset successfully."
    });
  } catch (error) {
    return jsonResponse(502, {
      ok: false,
      error: "Failed to reset live dashboard data",
      details: error.payload || String(error.message || error)
    });
  }
};
