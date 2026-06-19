const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "Plan a grocery basket for a family (parse people count + duration from message). Return JSON {\"items\":[{\"name\":\"\",\"qty\":number}],\"plan\":\"short summary\",\"reply\":\"\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "grocery-planner", message, out);
  return { agent: "grocery-planner", plan: out.plan, reply: out.reply, added, notFound, cart };
};
