const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  // Multi-agent crew: planner -> budget -> health -> finalizer (single LLM call orchestrates)
  const out = await callLLMJson({
    system: "You are a 4-agent crew (Planner, BudgetOptimizer, HealthGuardian, Finalizer). Produce best weekly basket. Return JSON {\"plan\":\"\",\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\",\"agents\":[\"Planner\",\"Budget\",\"Health\",\"Finalizer\"]}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "shopping-crew", message, out);
  return { agent: "shopping-crew", plan: out.plan, crew: out.agents, reply: out.reply, added, notFound, cart };
};
