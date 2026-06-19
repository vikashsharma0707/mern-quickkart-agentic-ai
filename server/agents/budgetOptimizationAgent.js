const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "User has a budget (parse INR). Suggest groceries within budget, optimizing nutrition + value. Return JSON {\"budget\":number,\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "budget-optimization", message, out);
  return { agent: "budget-optimization", budget: out.budget, reply: out.reply, added, notFound, cart };
};
