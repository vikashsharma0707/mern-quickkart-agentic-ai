const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const out = await callLLMJson({
    system: "Extract grocery order items from user's Hindi/English/Hinglish message. Return JSON {\"items\":[{\"name\":\"\",\"qty\":number}],\"reply\":\"short confirmation in same language\"}.",
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "chat-to-order", message, { added, notFound });
  return { agent: "chat-to-order", reply: out.reply || "Added to cart", added, notFound, cart };
};
