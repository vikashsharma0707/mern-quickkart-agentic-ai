/**
 * OpenRouter LLM wrapper with JSON-mode helper.
 * If OPENROUTER_API_KEY is missing, returns a heuristic fallback so the
 * agents still function in dev/demo mode.
 */
const fetch = require("node-fetch");

const MODEL = process.env.OPENROUTER_MODEL || "google/gemini-flash-1.5";
const URL = "https://openrouter.ai/api/v1/chat/completions";

async function callLLM({ system, messages, json = false }) {
  const key = process.env.OPENROUTER_API_KEY;
  const msgs = [system && { role: "system", content: system }, ...messages].filter(Boolean);
  if (!key) {
    // dev fallback
    const last = messages[messages.length - 1]?.content || "";
    return json
      ? `{"items":[],"reply":"(dev mode — no LLM key) You said: ${last.replace(/"/g, "'").slice(0, 80)}"}`
      : `(dev mode) ${last.slice(0, 200)}`;
  }
  const body = {
    model: MODEL, messages: msgs, temperature: 0.4,
    response_format: json ? { type: "json_object" } : undefined,
  };
  const r = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://quickkart.ai",
      "X-Title": "QuickKart AI",
    },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`OpenRouter ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return j.choices?.[0]?.message?.content || "";
}

async function callLLMJson(opts) {
  const text = await callLLM({ ...opts, json: true });
  try { return JSON.parse(text); }
  catch {
    const m = text.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : { error: "parse", raw: text };
  }
}

module.exports = { callLLM, callLLMJson };
