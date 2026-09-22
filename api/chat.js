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
- Never ask for something the customer already told you. Re-read the whole conversation first: if they already said the gender, occasion, budget or scent family, use it instead of asking again. Ask at most ONE short clarifying question, and only when you genuinely cannot recommend anything sensible without it.
- Prefer giving two or three concrete picks from the catalog over asking more questions. It is better to suggest and then offer to refine than to interrogate.
- If asked something unrelated to perfume/the store (weather, math, etc.), answer briefly and kindly, then steer back to how you can help with their fragrance choice.
- Keep replies reasonably short - a few sentences, not an essay - unless the customer explicitly asks for detail.

Catalog (name | brand | price in EGP):
${catalogBlock}

${isAr ? "Reply in Arabic (Egyptian colloquial by default, matching the customer)." : "Reply in English."}`;
}

// Returns every catalog product named in the reply, in the order the model
// mentioned them, so the page can show a card for each one instead of
// singling out just the first match.
function findMentionedProducts(text) {
  if (!text) return [];
  const lower = text.toLowerCase();

  const hits = [];
  for (const p of catalog) {
    const at = lower.indexOf(p.name.toLowerCase());
    if (at !== -1) hits.push({ product: p, at, len: p.name.length });
  }
  // Longest name first so "Khamrah Qahwa" wins over "Khamrah" at the same spot.
  hits.sort((a, b) => b.len - a.len);

  const taken = [];
  const chosen = [];
  for (const h of hits) {
    const end = h.at + h.len;
    // Skip a match sitting inside a longer name already claimed.
    if (taken.some((r) => h.at < r.end && end > r.at)) continue;
    taken.push({ at: h.at, end });
    chosen.push(h);
  }

  return chosen.sort((a, b) => a.at - b.at).map((h) => h.product).slice(0, 6);
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
      // This model reasons before answering, and that reasoning is billed
      // against maxOutputTokens - with a small budget it burned the whole
      // allowance thinking and returned a truncated half-sentence. Short
      // chat replies need no internal reasoning, so it is switched off and
      // the ceiling raised to leave room for a complete answer.
      thinkingConfig: { thinkingBudget: 0 },
      maxOutputTokens: 800
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
    const candidate = (data.candidates && data.candidates[0]) || null;
    const text = (candidate && candidate.content && candidate.content.parts &&
      candidate.content.parts[0] && candidate.content.parts[0].text) || "";

    if (!text) {
      // Includes the MAX_TOKENS case, where the model spent its whole
      // budget and returned no usable text. Failing here lets the page
      // fall back to the local brain instead of rendering nothing.
      const debug = String(req.query && req.query.debug || "") === "1";
      res.status(502).json({
        error: "The assistant did not return a reply.",
        ...(debug ? { finishReason: candidate && candidate.finishReason, raw: JSON.stringify(data).slice(0, 500) } : {})
      });
      return;
    }

    // Occasionally the upstream stops mid-sentence (finishReason MAX_TOKENS
    // or an upstream hiccup). Rather than showing the customer a clipped
    // half-sentence, treat it as a failure so the page falls back to the
    // local brain, which always returns a complete answer.
    const finish = candidate && candidate.finishReason;
    const looksCut = finish && finish !== "STOP";
    if (looksCut && text.trim().length < 40) {
      res.status(502).json({ error: "The assistant was interrupted." });
      return;
    }

    const products = findMentionedProducts(text);

    // `product` stays for backwards compatibility with any cached page.
    res.status(200).json({ text: text.trim(), products, product: products[0] || null });
  } catch (error) {
    console.error("OVA AI chat function error:", error);
    res.status(500).json({ error: "Something went wrong reaching the assistant." });
  }
};
