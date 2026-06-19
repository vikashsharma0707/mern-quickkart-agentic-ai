const Product = require("../models/Product");
const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "Find the cheapest grocery basket for the user's intent. Return JSON {\"items\":[{\"name\":\"\",\"qty\":number}],\"strategy\":\"\",\"reply\":\"\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  // compute hypothetical savings vs MRP
  let savings = 0;
  for (const a of added) {
    const p = await Product.findOne({ name: a.name });
    if (p?.mrp) savings += Math.max(0, (p.mrp - p.price) * a.qty);
  }
  await logAgent(userId, "negotiation", message, { savings });
  return { agent: "negotiation", reply: out.reply, strategy: out.strategy, savings, added, notFound, cart };
};
