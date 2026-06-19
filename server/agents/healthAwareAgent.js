const User = require("../models/User");
const { callLLMJson } = require("./llm");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId, message) => {
  const user = await User.findById(userId);
  const pref = user?.preferences || {};
  const out = await callLLMJson({
    system: `User health profile: diet=${pref.diet || "n/a"}, allergies=${(pref.allergies || []).join(",") || "none"}. Recommend health-safe snacks/groceries that match the message. Return JSON {"items":[{"name":"","qty":number,"why":""}],"warnings":[""],"reply":""}.`,
    messages: [{ role: "user", content: message }],
  });
  const { cart, added, notFound } = await addItemsToCart(userId, out.items || []);
  await logAgent(userId, "health-aware", message, out);
  return { agent: "health-aware", reply: out.reply, warnings: out.warnings, added, notFound, cart };
};
