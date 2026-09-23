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

// Groq's free tier has a far higher rate limit than Gemini's, so it is
// tried first when a key is configured - Gemini becomes the secondary
// brain, and the client-side scripted brain stays the last-resort
// fallback if both upstream APIs are unavailable.
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

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

  return `You are OVA AI, the personal fragrance assistant for Ova Perfume, a luxury perfume store in Egypt (ovaperfume.com). The store owner/founder is Salem.

Personality: warm, knowledgeable, and genuinely friendly - like a close friend who happens to know everything about perfume and this store, not a corporate script or a fixed set of canned replies. Every reply should sound freshly thought-through for this exact customer and this exact moment - even if two people ask the same thing, phrase it differently each time, the way a real person naturally would. Keep replies conversational and natural, never robotic or list-heavy unless the customer is comparing options. Match the customer's tone: if they are casual, be casual back; use light humor or a friendly aside where it fits naturally.

Language: the customer may write in Arabic (including Egyptian colloquial Arabic), English, or a mix. Always reply in the same language/dialect they used. If they write Egyptian Arabic, reply in natural Egyptian Arabic, not formal/classical Arabic.

What you actually do:
- Understand any question about perfumes, fragrance notes, occasions, budgets, or gifting - not just exact product names.
- Recommend real products from the catalog below when it fits the conversation. Never invent a product, brand, or price that is not in this list.
- When the customer asks you to recommend a perfume, pick exactly ONE - the single best match, not a list of two or three. Say its name plainly, then genuinely sell them on why THIS one specifically fits them: tie it to what they told you (occasion, season, vibe, who it's for, budget) and describe what makes it stand out, like a friend who's confident in their pick, not a salesperson reading options off a shelf. Make them feel like this is clearly the right choice, not one of several equally-fine options.
- Only offer a second alternative if the customer pushes back, says they don't like your pick, or explicitly asks for other options - never upfront.
- If you recommend a specific product, mention its exact name from the list so it can be linked automatically.
- Never ask for something the customer already told you. Re-read the whole conversation: if they mentioned gender, season, occasion, budget or scent family - even loosely, even in slang - treat it as decided and recommend on that basis.
- Only if the request is truly empty of any signal (e.g. just "رشحلي برفان") may you ask ONE short question before committing to your one pick.
- Respect every constraint given. If they said winter, do not suggest summer scents. If they said women's, do not suggest men's. If they gave a budget, stay under it.
- If asked something unrelated to perfume/the store (weather, math, etc.), answer briefly and kindly, then steer back to how you can help with their fragrance choice.
- Keep replies reasonably short - a few sentences, not an essay - unless the customer explicitly asks for detail, and always finish your final sentence.

OFFERS QUESTION - HANDLE SEPARATELY FROM RECOMMENDATIONS:
If the customer asks about offers, deals, discounts, coupons, or promotions (عروض / خصم / كوبون / عرض) - even as a short one-word message like "عندكم عروض؟" - this is NOT a request for a perfume recommendation. Do not suggest a product. Instead, answer directly and only with the current live offer described below (buy 3, get 50% off). Never claim there are no offers.

GENDER RULE - THIS OVERRIDES EVERYTHING ELSE:
The catalog below is split into three sections: FOR WOMEN, FOR MEN, and UNISEX.
- If the customer asks for a women's perfume (حريمي / نسائي / for her / for my wife / for my mother / for a girl), you may ONLY name products from the FOR WOMEN or UNISEX sections. Naming anything from FOR MEN is a serious mistake.
- If the customer asks for a men's perfume (رجالي / for him / for my husband / for a man), you may ONLY name products from the FOR MEN or UNISEX sections.
- Before you send a reply, check every product you named appears in an allowed section. If one does not, replace it.
- Never describe a perfume as رجالي when the customer asked for حريمي, or the reverse.

Store info you should use whenever it's relevant - these are the real facts from the store's own pages (checkout, payment, shipping/delivery policy, return/refund policy, terms & conditions). Always answer from these exact facts, never guess, invent, or state a different number/policy:

Store identity:
- Store name: Ova Perfume / Ova Store. Owner/founder: Salem. Site: ovaperfume.com. Support email: a.salem8812@gmail.com.

Current live offer on the site (the answer to any "do you have offers/discounts" question): buy any 3 perfumes and get 50% off the order - it applies automatically in the cart once 3 items are added, no code needed. There is no other discount, code, or promotion beyond this one.

Payment methods (exactly three options at checkout):
1. Cash on Delivery (COD) - pay the courier when the order arrives.
2. Wallet transfer - the customer can send to either of two numbers, then upload a screenshot of the transfer to confirm: InstaPay (01151446372, fastest confirmation) or Vodafone Cash (01099136720).
3. PayPal - for international/online card-linked payment.
- Contact / WhatsApp: +20 109 913 6720 - for anything you can't resolve, direct the customer there.

Shipping & delivery (from the Shipping & Delivery Policy page):
- Orders are reviewed after confirmation, then prepared for dispatch as quickly as possible; processing time can vary with stock availability and payment confirmation for manual (wallet) payments.
- Standard delivery usually takes 3 to 4 days, unless the customer is told a different timing. Location, weekends, holidays, courier conditions, or an incomplete address can affect this.
- The customer is responsible for entering a correct address, city, and phone number; Ova Store is not responsible for delays caused by incomplete or wrong shipping info.
- If the courier can't reach the customer, Ova Store may follow up to arrange a second delivery attempt.
- Any shipping fees, if they apply, are communicated during checkout before the order is finalized.

Returns & exchanges (from the Return & Refund Policy page):
- Because perfumes are personal-use products, returns/exchanges are only considered if the item arrives damaged, incorrect, defective, or clearly different from what was ordered - not for change of mind or after the perfume has been opened/used.
- To review a claim, the product should be kept in as close to original condition as possible (packaging, bottle, accessories); the customer may be asked for photos or order details.
- If approved, a refund is processed using the most suitable method for that order; timing can vary.
- Refunds are not approved for: changing your mind after shipment, giving a wrong address, refusing the order without a valid reason, or using the perfume then asking to return it for preference reasons.
- To report a problem, the customer should contact the store with their order details, product name, and a clear description of the issue.

General terms (from the Terms & Conditions page):
- All perfumes are subject to availability; if something sells out after ordering, the store contacts the customer to offer an alternative or a cancellation.
- Prices are listed in the currency shown on the site and may change without notice. Orders are only confirmed after a payment method is chosen and the order is reviewed by the team.
- After checkout, the customer gets an order summary; the store may verify details before processing, especially if shipping info or payment proof is unclear.
- Product photos/descriptions are kept as accurate as possible, but small differences in packaging or bottle look can happen due to supplier batch changes.

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

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!groqKey && !geminiKey) {
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

  const systemPrompt = buildSystemPrompt(lang);
  const debug = String(req.query && req.query.debug || "") === "1";

  // Tries Groq (higher free-tier limit) first, then falls back to Gemini
  // if Groq is not configured or fails. Either provider succeeding is
  // treated the same way by the caller below.
  async function tryGroq() {
    if (!groqKey) return null;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((turn) => ({
        role: turn.role === "user" ? "user" : "assistant",
        content: String(turn.text || "")
      })),
      { role: "user", content: message }
    ];

    const callGroq = () => fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.8,
        max_tokens: 1024
      })
    });

    let upstream = await callGroq();
    if (upstream.status === 429) {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      upstream = await callGroq();
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      console.error("Groq API error:", upstream.status, errText);
      return { failed: true, status: upstream.status, errText };
    }

    const data = await upstream.json();
    const text = (data.choices && data.choices[0] && data.choices[0].message &&
      data.choices[0].message.content) || "";
    if (!text.trim()) return { failed: true, status: 502, errText: "empty response" };

    return { failed: false, text: text.trim() };
  }

  async function tryGemini() {
    if (!geminiKey) return null;

    const contents = [
      ...history.map((turn) => ({
        role: turn.role === "user" ? "user" : "model",
        parts: [{ text: String(turn.text || "") }]
      })),
      { role: "user", parts: [{ text: message }] }
    ];

    const payload = {
      system_instruction: { parts: [{ text: systemPrompt }] },
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

    // The free tier caps at 20 requests/minute. A single customer rarely
    // hits that, but the window is shared across everyone on the site, so
    // a burst of traffic can trip it. Rather than immediately failing,
    // wait out Google's own suggested delay and try once more - a request
    // that would otherwise fail usually succeeds a second later.
    const callGemini = () => fetch(`${GEMINI_URL}?key=${geminiKey}`, {
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
      return { failed: true, status: upstream.status, errText };
    }

    const data = await upstream.json();
    const candidate = (data.candidates && data.candidates[0]) || null;
    const text = (candidate && candidate.content && candidate.content.parts &&
      candidate.content.parts[0] && candidate.content.parts[0].text) || "";

    if (!text) {
      return { failed: true, status: 502, errText: "empty response", finishReason: candidate && candidate.finishReason };
    }

    // Occasionally the upstream stops mid-sentence (finishReason MAX_TOKENS
    // or an upstream hiccup). Rather than showing the customer a clipped
    // half-sentence, treat it as a failure so the page falls back further.
    const finish = candidate && candidate.finishReason;
    const looksCut = finish && finish !== "STOP";
    if (looksCut && text.trim().length < 40) {
      return { failed: true, status: 502, errText: "response interrupted" };
    }

    return { failed: false, text: text.trim() };
  }

  try {
    let result = await tryGroq();
    let usedFallback = false;

    if (!result || result.failed) {
      usedFallback = true;
      result = await tryGemini();
    }

    if (!result || result.failed) {
      const status = (result && result.status) || 502;
      res.status(502).json({
        error: status === 429
          ? "The assistant is getting a lot of questions right now - please try again in a moment."
          : "The assistant is temporarily unavailable.",
        ...(debug ? { upstreamStatus: status, upstream: String((result && result.errText) || "").slice(0, 500), usedFallback } : {})
      });
      return;
    }

    const products = findMentionedProducts(result.text);

    // `product` stays for backwards compatibility with any cached page.
    res.status(200).json({ text: result.text, products, product: products[0] || null });
  } catch (error) {
    console.error("OVA AI chat function error:", error);
    res.status(500).json({ error: "Something went wrong reaching the assistant." });
  }
};
