const Order = require("../models/Order");
const Product = require("../models/Product");
const { logAgent } = require("./_shared");

exports.run = async (userId, horizon = "tomorrow") => {
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  const sales = await Order.aggregate([
    { $match: { createdAt: { $gte: since } } },
    { $unwind: "$items" },
    { $group: { _id: "$items.name", qty: { $sum: "$items.qty" } } },
    { $sort: { qty: -1 } }, { $limit: 30 },
  ]);
  const predictions = sales.map(s => ({
    name: s._id,
    avgDaily: +(s.qty / 14).toFixed(1),
    predicted: horizon === "week" ? +(s.qty / 2).toFixed(0) : +(s.qty / 14).toFixed(0),
  }));
  // attach current stock
  for (const p of predictions) {
    const prod = await Product.findOne({ name: p.name });
    p.stock = prod?.stock ?? 0;
    p.reorder = p.stock < p.predicted * 1.5;
  }
  await logAgent(userId, "inventory-prediction", horizon, { count: predictions.length });
  return { agent: "inventory-prediction", horizon, predictions };
};
