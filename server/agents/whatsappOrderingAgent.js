const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "User wants to send groceries to someone (e.g., 'Maa ke ghar Rs 1500 ke groceries bhej do'). Pick a sensible basket within the budget. Return JSON {\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\",\"recipient\":\"\",\"budget\":number}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "whatsapp-ordering", message, out);
  return { agent: "whatsapp-ordering", recipient: out.recipient, budget: out.budget, reply: out.reply, added, notFound, cart };
};
