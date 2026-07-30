const { jsonResponse } = require("./_supabase");
const { adminJsonResponse, clearSessionCookie } = require("./_adminAuth");

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return adminJsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  return adminJsonResponse(
    200,
    {
      ok: true
    },
    {
      "Set-Cookie": clearSessionCookie()
    }
  );
};
