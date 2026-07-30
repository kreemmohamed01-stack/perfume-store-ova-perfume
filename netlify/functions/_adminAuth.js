const crypto = require("crypto");
const { corsHeaders, jsonResponse } = require("./_supabase");

const SESSION_COOKIE_NAME = "ova_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 12;

function getAdminConfig() {
  return {
    email: String(process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
    password: String(process.env.ADMIN_PASSWORD || ""),
    sessionSecret: String(process.env.ADMIN_SESSION_SECRET || "")
  };
}

function requireAdminConfig() {
  const { email, password, sessionSecret } = getAdminConfig();
  if (!email || !password || !sessionSecret) {
    return jsonResponse(500, {
      ok: false,
      error: "Missing ADMIN_EMAIL, ADMIN_PASSWORD, or ADMIN_SESSION_SECRET"
    });
  }
  return null;
}

function parseCookies(cookieHeader = "") {
  return String(cookieHeader || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((acc, pair) => {
      const separatorIndex = pair.indexOf("=");
      if (separatorIndex === -1) return acc;
      const key = pair.slice(0, separatorIndex).trim();
      const value = pair.slice(separatorIndex + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function toBase64Url(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = String(value || "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
}

function signPayload(encodedPayload, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(encodedPayload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionToken(email) {
  const { sessionSecret } = getAdminConfig();
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    email,
    iat: issuedAt,
    exp: issuedAt + SESSION_DURATION_SECONDS
  };
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, sessionSecret);
  return `${encodedPayload}.${signature}`;
}

function verifySessionToken(token) {
  const { sessionSecret } = getAdminConfig();
  const [encodedPayload, signature] = String(token || "").split(".");
  if (!encodedPayload || !signature || !sessionSecret) return null;

  const expectedSignature = signPayload(encodedPayload, sessionSecret);
  if (!safeCompare(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (!payload?.email || !payload?.exp || payload.exp < now) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

function serializeSessionCookie(token, maxAge = SESSION_DURATION_SECONDS) {
  return [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    `Max-Age=${maxAge}`
  ].join("; ");
}

function clearSessionCookie() {
  return [
    `${SESSION_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
    "Max-Age=0"
  ].join("; ");
}

function getAdminSession(event) {
  const cookies = parseCookies(event?.headers?.cookie || event?.headers?.Cookie || "");
  const token = cookies[SESSION_COOKIE_NAME];
  return verifySessionToken(token);
}

function requireAdminSession(event) {
  const missingConfig = requireAdminConfig();
  if (missingConfig) return { response: missingConfig };

  const session = getAdminSession(event);
  if (!session) {
    return {
      response: jsonResponse(401, { ok: false, error: "Unauthorized" })
    };
  }

  return { session };
}

function adminJsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: corsHeaders(extraHeaders),
    body: JSON.stringify(body)
  };
}

module.exports = {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
  adminJsonResponse,
  clearSessionCookie,
  createSessionToken,
  getAdminConfig,
  getAdminSession,
  requireAdminConfig,
  requireAdminSession,
  serializeSessionCookie,
  safeCompare
};
