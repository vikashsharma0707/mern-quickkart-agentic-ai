const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");

exports.place = asyncHandler(async (req, res) => {
  const { address, paymentMethod = "cod" } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || !cart.items.length) return fail(res, 400, "Cart empty");
  const items = cart.items.map(i => ({ product: i.product._id, name: i.product.name, qty: i.qty, price: i.price }));
  const amount = items.reduce((s, i) => s + i.qty * i.price, 0);
  // decrement stock
  for (const i of cart.items) await Product.updateOne({ _id: i.product._id }, { $inc: { stock: -i.qty } });
  const order = await Order.create({
    user: req.user._id, items, amount, address,
    payment: { method: paymentMethod, paid: paymentMethod === "cod" ? false : false },
    timeline: [{ status: "placed", note: "Order placed" }],
    etaMinutes: 12,
  });
  cart.items = []; cart.total = 0; await cart.save();
  // auto-assign nearest online delivery partner
  const partner = await User.findOne({ role: "delivery", online: true });
  if (partner) {
    order.deliveryPartner = partner._id;
    order.timeline.push({ status: "confirmed", note: `Assigned ${partner.name}` });
    order.status = "confirmed";
    await order.save();
  }
  req.app.get("io")?.emit(`order:${order._id}`, order);
  return ok(res, order, "Order placed");
});

exports.list = asyncHandler(async (req, res) => {
  const q = req.user.role === "admin" || req.user.role === "superadmin" ? {} :
            req.user.role === "delivery" ? { deliveryPartner: req.user._id } :
            { user: req.user._id };
  const orders = await Order.find(q).sort("-createdAt").populate("user", "name email").populate("deliveryPartner", "name phone");
  return ok(res, orders);
});

exports.get = asyncHandler(async (req, res) => {
  const o = await Order.findById(req.params.id).populate("user", "name email").populate("deliveryPartner", "name phone location");
  if (!o) return fail(res, 404, "Not found");
  return ok(res, o);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const { status, note } = req.body;
  const o = await Order.findById(req.params.id);
  if (!o) return fail(res, 404, "Not found");
  o.status = status;
  o.timeline.push({ status, note: note || "" });
  if (status === "delivered" && o.deliveryPartner) {
    await User.updateOne({ _id: o.deliveryPartner }, { $inc: { earnings: 40 } });
  }
  await o.save();
  req.app.get("io")?.emit(`order:${o._id}`, o);
  return ok(res, o);
});

exports.cancel = asyncHandler(async (req, res) => {
  const o = await Order.findById(req.params.id);
  if (!o) return fail(res, 404, "Not found");
  if (o.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
    return fail(res, 403, "Forbidden");
  o.status = "cancelled"; o.timeline.push({ status: "cancelled", note: "By user" });
  await o.save(); return ok(res, o, "Cancelled");
});
