const { jsonResponse } = require("./_supabase");
const { adminJsonResponse, requireAdminSession } = require("./_adminAuth");

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return adminJsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const auth = requireAdminSession(event);
  if (auth.response) return auth.response;

  return adminJsonResponse(200, {
    ok: true,
    authenticated: true,
    user: {
      email: auth.session.email
    }
  });
};
