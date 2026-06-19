const auto = require("./autoReorderAgent");
exports.run = async (userId) => {
  const r = await auto.reorder(userId);
  return { agent: "personal-shopper", reply: `Added your usual ${r.added.length} items.`, added: r.added, cart: r.cart };
};
