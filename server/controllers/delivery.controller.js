const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

exports.toggleOnline = asyncHandler(async (req, res) => {
  req.user.online = !!req.body.online;
  if (req.body.location) req.user.location = req.body.location;
  await req.user.save();
  return ok(res, { online: req.user.online });
});

exports.myOrders = asyncHandler(async (req, res) =>
  ok(res, await Order.find({ deliveryPartner: req.user._id }).sort("-createdAt"))
);

exports.updateLocation = asyncHandler(async (req, res) => {
  req.user.location = req.body; await req.user.save();
  req.app.get("io")?.emit(`partner:${req.user._id}:location`, req.body);
  return ok(res, req.user.location);
});

exports.earnings = asyncHandler(async (req, res) => {
  const delivered = await Order.countDocuments({ deliveryPartner: req.user._id, status: "delivered" });
  return ok(res, { earnings: req.user.earnings, deliveredCount: delivered });
});
