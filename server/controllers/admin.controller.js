const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

exports.dashboard = asyncHandler(async (_req, res) => {
  const [users, orders, revenueAgg, pending, delivered, partners, oos] = await Promise.all([
    User.countDocuments({ role: "customer" }),
    Order.countDocuments(),
    Order.aggregate([{ $match: { "payment.paid": true } }, { $group: { _id: null, t: { $sum: "$amount" } } }]),
    Order.countDocuments({ status: { $in: ["placed", "confirmed", "packed", "out_for_delivery"] } }),
    Order.countDocuments({ status: "delivered" }),
    User.countDocuments({ role: "delivery", online: true }),
    Product.countDocuments({ stock: { $lte: 0 } }),
  ]);
  const revenue = revenueAgg[0]?.t || 0;

  // Daily revenue (last 7 days)
  const daily = await Order.aggregate([
    { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, total: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);
  const topProducts = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.name", qty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } } } },
    { $sort: { qty: -1 } }, { $limit: 5 },
  ]);
  return ok(res, { stats: { users, orders, revenue, pending, delivered, partners, outOfStock: oos }, daily, topProducts });
});
