const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "User is shopping for an Indian festival (Diwali, Holi, Ganesh Chaturthi, Eid, Christmas, etc.). Build a festival-specific basket. Return JSON {\"festival\":\"\",\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "festival-shopping", message, out);
  return { agent: "festival-shopping", festival: out.festival, reply: out.reply, added, notFound, cart };
};
