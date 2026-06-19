const Order = require("../models/Order");
const { addItemsToCart, logAgent } = require("./_shared");

async function detectUsual(userId) {
  const orders = await Order.find({ user: userId }).sort("-createdAt").limit(20);
  const freq = {};
  for (const o of orders) for (const it of o.items) {
    freq[it.name] = freq[it.name] || { name: it.name, count: 0, qty: 0 };
    freq[it.name].count++; freq[it.name].qty += it.qty;
  }
  return Object.values(freq).filter(f => f.count >= 2).slice(0, 10);
}

exports.run = async (userId) => {
  const usual = await detectUsual(userId);
  await logAgent(userId, "auto-reorder", "", { usual });
  return { agent: "auto-reorder", reply: usual.length ? `Found ${usual.length} usual items.` : "No repeat pattern yet.", suggestions: usual };
};

exports.reorder = async (userId) => {
  const usual = await detectUsual(userId);
  const { cart, added } = await addItemsToCart(userId, usual.map(u => ({ name: u.name, qty: Math.max(1, Math.round(u.qty / u.count)) })));
  return { cart, added };
};
