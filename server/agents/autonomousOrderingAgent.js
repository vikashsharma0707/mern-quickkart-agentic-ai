const AutoRule = require("../models/AutoRule");
const { addItemsToCart, logAgent } = require("./_shared");

exports.run = async (userId) => {
  const rules = await AutoRule.find({ user: userId, active: true });
  const due = rules.filter(r => !r.lastTriggered || (Date.now() - new Date(r.lastTriggered).getTime()) > r.intervalDays * 86400000);
  const items = due.map(r => ({ name: r.productName, qty: r.qty }));
  const { cart, added, notFound } = items.length ? await addItemsToCart(userId, items) : { cart: null, added: [], notFound: [] };
  for (const r of due) { r.lastTriggered = new Date(); await r.save(); }
  await logAgent(userId, "autonomous", "", { triggered: due.length });
  return { agent: "autonomous", reply: `Auto-rules: ${rules.length} total, ${due.length} triggered.`, triggered: due.length, added, notFound, cart };
};

exports.createRule = async (userId, { productName, qty, intervalDays }) =>
  AutoRule.create({ user: userId, productName, qty, intervalDays });
exports.listRules = async (userId) => AutoRule.find({ user: userId });
exports.deleteRule = async (userId, id) => AutoRule.deleteOne({ _id: id, user: userId });
