const { jsonResponse } = require("./_supabase");
const {
  adminJsonResponse,
  createSessionToken,
  getAdminConfig,
  requireAdminConfig,
  safeCompare,
  serializeSessionCookie
} = require("./_adminAuth");

exports.handler = async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return adminJsonResponse(204, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { ok: false, error: "Method not allowed" });
  }

  const missingConfig = requireAdminConfig();
  if (missingConfig) return missingConfig;

  try {
    const body = JSON.parse(event.body || "{}");
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const config = getAdminConfig();

    const isValidEmail = safeCompare(email, config.email);
    const isValidPassword = safeCompare(password, config.password);

    if (!isValidEmail || !isValidPassword) {
      return adminJsonResponse(401, { ok: false, error: "Invalid email or password" });
    }

    const token = createSessionToken(config.email);

    return adminJsonResponse(
      200,
      {
        ok: true,
        user: { email: config.email }
      },
      {
        "Set-Cookie": serializeSessionCookie(token)
      }
    );
  } catch (error) {
    return adminJsonResponse(400, { ok: false, error: "Invalid request body" });
  }
};
