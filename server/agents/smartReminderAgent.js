const Order = require("../models/Order");
const { logAgent } = require("./_shared");

exports.run = async (userId) => {
  const orders = await Order.find({ user: userId }).sort("-createdAt").limit(10);
  const lastByItem = {};
  for (const o of orders) for (const it of o.items) {
    if (!lastByItem[it.name] || o.createdAt > lastByItem[it.name].at)
      lastByItem[it.name] = { at: o.createdAt, qty: it.qty };
  }
  const today = Date.now();
  const reminders = Object.entries(lastByItem)
    .map(([name, v]) => ({ name, daysSince: Math.floor((today - new Date(v.at).getTime()) / 86400000) }))
    .filter(r => r.daysSince >= 7).slice(0, 8);
  await logAgent(userId, "smart-reminder", "", { reminders });
  return { agent: "smart-reminder", reply: `${reminders.length} reminders.`, reminders };
};
