// OVA AI - serverless chat endpoint (Vercel function).
//
// Called by ova-ai.html instead of the local fallback brain. Keeps the
// Gemini API key server-side only (read from the GEMINI_API_KEY
// environment variable in the Vercel project settings) - it is never sent
// to or visible from the browser.
//
// Request body:  { message: string, history: [{role: "user"|"model", text}], lang: "ar"|"en" }
// Response body: { text: string, product: { name, price, img, brandKey } | null }

const catalog = require("./_data/catalog.json");

const GEMINI_MODEL = "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// A compact catalog listing the model can ground its answers in. Keeping it
// to name/brand/price (no long descriptions) keeps the prompt small and
// fast while still letting the model recommend real, in-stock products
// instead of inventing perfumes that do not exist on the site.
function buildCatalogBlock() {
  return catalog
    .map((p) => `${p.name} | ${p.brand} | ${p.price} EGP`)
    .join("\n");
}

function buildSystemPrompt(lang) {
  const isAr = lang === "ar";
  const catalogBlock = buildCatalogBlock();

  return `You are OVA AI, the personal fragrance assistant for Ova Perfume, a luxury perfume store in Egypt (ovaperfume.com).

Personality: warm, knowledgeable, and genuinely friendly - like a well-read friend who happens to know everything about perfume, not a corporate script. Keep replies conversational and natural, never robotic or list-heavy unless the customer is comparing options. Match the customer's tone: if they are casual, be casual back.

Language: the customer may write in Arabic (including Egyptian colloquial Arabic), English, or a mix. Always reply in the same language/dialect they used. If they write Egyptian Arabic, reply in natural Egyptian Arabic, not formal/classical Arabic.

What you actually do:
- Understand any question about perfumes, fragrance notes, occasions, budgets, or gifting - not just exact product names.
- Recommend real products from the catalog below when it fits the conversation. Never invent a product, brand, or price that is not in this list.
- If you recommend a specific product, mention its exact name from the list so it can be linked automatically.
- Ask a clarifying question when you genuinely need one (budget, gender, occasion, scent family) instead of guessing blindly - but do not interrogate the customer with multiple questions in a row.
- If asked something unrelated to perfume/the store (weather, math, etc.), answer briefly and kindly, then steer back to how you can help with their fragrance choice.
- Keep replies reasonably short - a few sentences, not an essay - unless the customer explicitly asks for detail.

Catalog (name | brand | price in EGP):
${catalogBlock}

${isAr ? "Reply in Arabic (Egyptian colloquial by default, matching the customer)." : "Reply in English."}`;
}

function findMentionedProduct(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  let best = null;
  for (const p of catalog) {
    const nameLower = p.name.toLowerCase();
    if (lower.includes(nameLower)) {
      if (!best || nameLower.length > best.name.length) best = p;
    }
  }
  return best;
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is not configured with an API key yet." });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const message = String(body.message || "").trim();
  const lang = body.lang === "ar" ? "ar" : "en";
  const history = Array.isArray(body.history) ? body.history.slice(-10) : [];

  if (!message) {
    res.status(400).json({ error: "Missing message" });
    return;
  }

  const contents = [
    ...history.map((turn) => ({
      role: turn.role === "user" ? "user" : "model",
      parts: [{ text: String(turn.text || "") }]
    })),
    { role: "user", parts: [{ text: message }] }
  ];

  const payload = {
    system_instruction: { parts: [{ text: buildSystemPrompt(lang) }] },
    contents,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 400
    }
  };

  try {
    const upstream = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("Gemini API error:", upstream.status, errText);
      // `debug=1` surfaces the upstream reason so a misconfigured key or
      // quota problem can be diagnosed without guessing. It never leaks the
      // key itself - only Google's error message.
      const debug = String(req.query && req.query.debug || "") === "1";
      res.status(502).json({
        error: "The assistant is temporarily unavailable.",
        ...(debug ? { upstreamStatus: upstream.status, upstream: errText.slice(0, 500) } : {})
      });
      return;
    }

    const data = await upstream.json();
    const text = (data.candidates && data.candidates[0] && data.candidates[0].content &&
      data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text) || "";

    if (!text) {
      res.status(502).json({ error: "The assistant did not return a reply." });
      return;
    }

    const product = findMentionedProduct(text);

    res.status(200).json({ text: text.trim(), product });
  } catch (error) {
    console.error("OVA AI chat function error:", error);
    res.status(500).json({ error: "Something went wrong reaching the assistant." });
  }
};
