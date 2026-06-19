const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");

async function recalc(cart) {
  cart.total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
  await cart.save();
  return cart;
}

exports.get = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  return ok(res, cart);
});

exports.add = asyncHandler(async (req, res) => {
  const { productId, qty = 1 } = req.body;
  const p = await Product.findById(productId);
  if (!p) return fail(res, 404, "Product not found");
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
  const ex = cart.items.find(i => i.product.toString() === productId);
  if (ex) ex.qty += qty; else cart.items.push({ product: p._id, qty, price: p.price });
  await recalc(cart);
  return ok(res, await cart.populate("items.product"));
});

exports.update = asyncHandler(async (req, res) => {
  const { productId, qty } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return fail(res, 404, "Cart empty");
  const ex = cart.items.find(i => i.product.toString() === productId);
  if (!ex) return fail(res, 404, "Item not in cart");
  ex.qty = qty;
  if (ex.qty <= 0) cart.items = cart.items.filter(i => i.product.toString() !== productId);
  await recalc(cart);
  return ok(res, await cart.populate("items.product"));
});

exports.remove = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return ok(res, null);
  cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
  await recalc(cart);
  return ok(res, await cart.populate("items.product"));
});

exports.clear = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) { cart.items = []; await recalc(cart); }
  return ok(res, cart);
});
