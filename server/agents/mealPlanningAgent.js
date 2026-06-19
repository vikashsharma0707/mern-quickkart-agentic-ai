const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "Create a meal/diet plan (e.g., 7-day high-protein). Return JSON {\"plan\":[{\"day\":\"\",\"meals\":[\"\"]}],\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "meal-planning", message, out);
  return { agent: "meal-planning", plan: out.plan, reply: out.reply, added, notFound, cart };
};
