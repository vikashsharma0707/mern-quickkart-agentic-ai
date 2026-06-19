/**
 * Lightweight in-memory RAG: TF-style cosine similarity over a small corpus.
 * Collections: products, nutrition, support. The corpus is built at boot.
 */
const Product = require("../models/Product");
const { callLLM } = require("../agents/llm");

let CORPUS = []; // { collection, text, meta }

function tokenize(s) { return (s || "").toLowerCase().match(/[a-z0-9]+/g) || []; }
function vec(tokens) {
  const v = {};
  for (const t of tokens) v[t] = (v[t] || 0) + 1;
  return v;
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (const k in a) { na += a[k] * a[k]; if (b[k]) dot += a[k] * b[k]; }
  for (const k in b) nb += b[k] * b[k];
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-9);
}

async function buildCorpus() {
  CORPUS = [];
  const products = await Product.find().lean().limit(500);
  for (const p of products) {
    CORPUS.push({
      collection: "products",
      text: `${p.name} ${p.brand || ""} ${p.description || ""} ${(p.tags || []).join(" ")}`,
      meta: { id: p._id, name: p.name, price: p.price, image: p.images?.[0] },
    });
    if (p.nutrition) {
      CORPUS.push({
        collection: "nutrition",
        text: `${p.name} calories ${p.nutrition.calories} protein ${p.nutrition.protein} carbs ${p.nutrition.carbs} fat ${p.nutrition.fat}`,
        meta: { id: p._id, name: p.name, nutrition: p.nutrition },
      });
    }
  }
  // Static support docs
  const support = [
    { t: "Delivery in 10 minutes for orders within 3km. Standard delivery up to 30 minutes." },
    { t: "Return policy: report damaged or wrong items within 24 hours for full refund." },
    { t: "Payment: COD, UPI, all major cards, and wallets supported via Razorpay." },
    { t: "Account: use Forgot Password to reset. Refresh tokens expire in 7 days." },
    { t: "Quality: all fresh produce is hand-picked. Dairy is FSSAI-certified." },
  ];
  support.forEach((s, i) => CORPUS.push({ collection: "support", text: s.t, meta: { id: `support_${i}` } }));
  // pre-tokenize
  for (const c of CORPUS) { c.tokens = tokenize(c.text); c.vec = vec(c.tokens); }
  console.log(`[RAG] corpus built: ${CORPUS.length} docs`);
}

function search(query, collections, k = 5) {
  const q = vec(tokenize(query));
  return CORPUS
    .filter(d => !collections?.length || collections.includes(d.collection))
    .map(d => ({ ...d, score: cosine(q, d.vec) }))
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

async function ragAnswer(question, collections = ["products", "nutrition", "support"]) {
  if (!CORPUS.length) await buildCorpus();
  const hits = search(question, collections, 5);
  const context = hits.map(h => `- (${h.collection}) ${h.text}`).join("\n");
  const reply = await callLLM({
    system: "Answer the user question using ONLY the provided context. Be concise. If not in context, say you don't know.",
    messages: [{ role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` }],
  });
  return { reply, sources: hits.map(h => ({ collection: h.collection, score: +h.score.toFixed(3), meta: h.meta })) };
}

module.exports = { ragAnswer, buildCorpus, search };
