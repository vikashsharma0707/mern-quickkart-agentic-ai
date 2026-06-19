const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId) => {
  const month = new Date().toLocaleString("en", { month: "long" });
  const out = await callLLMJson({
    system: `Suggest seasonal Indian fruits/vegetables/snacks for month=${month}. Return JSON {"items":[{"name":"","qty":number}],"reply":""}.`,
    messages: [{ role: "user", content: `What's good this season (${month})?` }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "seasonal", "", out);
  return { agent: "seasonal", month, reply: out.reply, added, notFound, cart };
};
