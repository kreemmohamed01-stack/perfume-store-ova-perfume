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
// Grouped by who each scent is for, because a single trailing column was
// easy for the model to skim past - it kept answering a request for a
// women's perfume with men's ones. Separate headed lists make the wrong
// section something it has to actively cross into.
function buildCatalogBlock() {
  const groups = [
    ["FOR WOMEN (suitable when the customer asks for a women's / حريمي perfume)", "women"],
    ["FOR MEN (suitable when the customer asks for a men's / رجالي perfume)", "men"],
    ["UNISEX (suitable for anyone)", "unisex"]
  ];

  return groups
    .map(([heading, gender]) => {
      const lines = catalog
        .filter((p) => (p.gender || "unisex") === gender)
        .map((p) => `${p.name} | ${p.brand} | ${p.price} EGP`)
        .join("\n");
      return `### ${heading}\n${lines}`;
    })
    .join("\n\n");
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
- ALWAYS recommend first. Default to naming two or three real products from the catalog in essentially every reply about choosing a perfume. Do not open with a question.
- Never ask for something the customer already told you. Re-read the whole conversation: if they mentioned gender, season, occasion, budget or scent family - even loosely, even in slang - treat it as decided and recommend on that basis.
- Only if the request is truly empty of any signal (e.g. just "رشحلي برفان") may you ask ONE short question, and even then still offer a couple of picks alongside it.
- Respect every constraint given. If they said winter, do not suggest summer scents. If they said women's, do not suggest men's. If they gave a budget, stay under it.
- End with a brief offer to refine ("لو عايز أحلى منهم قولي") rather than a new question.
- If asked something unrelated to perfume/the store (weather, math, etc.), answer briefly and kindly, then steer back to how you can help with their fragrance choice.
- Keep replies reasonably short - a few sentences, not an essay - unless the customer explicitly asks for detail. Recommend at most three products, one short line each, and always finish your final sentence.

GENDER RULE - THIS OVERRIDES EVERYTHING ELSE:
The catalog below is split into three sections: FOR WOMEN, FOR MEN, and UNISEX.
- If the customer asks for a women's perfume (حريمي / نسائي / for her / for my wife / for my mother / for a girl), you may ONLY name products from the FOR WOMEN or UNISEX sections. Naming anything from FOR MEN is a serious mistake.
- If the customer asks for a men's perfume (رجالي / for him / for my husband / for a man), you may ONLY name products from the FOR MEN or UNISEX sections.
- Before you send a reply, check every product you named appears in an allowed section. If one does not, replace it.
- Never describe a perfume as رجالي when the customer asked for حريمي, or the reverse.

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
      // Arabic costs several times more tokens per word than English, so a
      // normal three-pick reply was running out of budget and stopping
      // mid-sentence. This leaves comfortable headroom.
      maxOutputTokens: 2048
    }
  };

  try {
    // The free tier caps at 20 requests/minute. A single customer rarely
    // hits that, but the window is shared across everyone on the site, so
    // a burst of traffic can trip it. Rather than immediately falling back
    // to the weaker local brain (which does not know the live catalog),
    // wait out Google's own suggested delay and try once more - a request
    // that would otherwise fail usually succeeds a second later.
    const callGemini = () => fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    let upstream = await callGemini();

    if (upstream.status === 429) {
      const errText = await upstream.text().catch(() => "");
      const retryMatch = errText.match(/retry in ([\d.]+)s/i);
      const waitMs = Math.min(retryMatch ? Math.ceil(parseFloat(retryMatch[1]) * 1000) : 1500, 4000);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      upstream = await callGemini();
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("Gemini API error:", upstream.status, errText);
      // `debug=1` surfaces the upstream reason so a misconfigured key or
      // quota problem can be diagnosed without guessing. It never leaks the
      // key itself - only Google's error message.
      const debug = String(req.query && req.query.debug || "") === "1";
      res.status(502).json({
        error: upstream.status === 429
          ? "The assistant is getting a lot of questions right now - please try again in a moment."
          : "The assistant is temporarily unavailable.",
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
