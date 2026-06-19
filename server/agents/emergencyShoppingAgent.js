const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "EMERGENCY: guests arriving soon. Build fastest-prep snack/drink basket. Mark items as priority. Return JSON {\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\",\"eta\":\"10-15 min\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "emergency-shopping", message, out);
  return { agent: "emergency-shopping", reply: out.reply, eta: out.eta, added, notFound, cart };
};
