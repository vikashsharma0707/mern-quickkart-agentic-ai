const Product = require("../models/Product");
const Cart = require("../models/Cart");
const AILog = require("../models/AILog");

async function findProductByName(name) {
  if (!name) return null;
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (await Product.findOne({ name: new RegExp(safe, "i") })) ||
         (await Product.findOne({ $text: { $search: name } }));
}

async function addItemsToCart(userId, items) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  const added = [];
  const notFound = [];
  for (const it of items) {
    const p = await findProductByName(it.name);
    if (!p) { notFound.push(it.name); continue; }
    const ex = cart.items.find(x => x.product.toString() === p._id.toString());
    const qty = Number(it.qty) || 1;
    if (ex) ex.qty += qty; else cart.items.push({ product: p._id, qty, price: p.price });
    added.push({ name: p.name, qty, price: p.price });
  }
  cart.total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
  await cart.save();
  return { cart: await cart.populate("items.product"), added, notFound };
}

async function logAgent(user, agent, input, output) {
  try { await AILog.create({ user, agent, input: String(input || "").slice(0, 1000), output }); } catch {}
}

module.exports = { findProductByName, addItemsToCart, logAgent };
