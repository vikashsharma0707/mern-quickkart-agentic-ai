const Cart = require("../models/Cart");
const User = require("../models/User");
const { logAgent } = require("./_shared");

exports.run = async (userId) => {
  // Demo: merge with one other random customer's cart (in real app, link family members)
  const others = await User.find({ role: "customer", _id: { $ne: userId } }).limit(2);
  const myCart = await Cart.findOne({ user: userId }) || await Cart.create({ user: userId, items: [] });
  for (const u of others) {
    const c = await Cart.findOne({ user: u._id });
    if (!c) continue;
    for (const it of c.items) {
      const ex = myCart.items.find(x => x.product.toString() === it.product.toString());
      if (ex) ex.qty += it.qty;
      else myCart.items.push({ product: it.product, qty: it.qty, price: it.price });
    }
  }
  myCart.total = myCart.items.reduce((s, i) => s + i.price * i.qty, 0);
  await myCart.save();
  await logAgent(userId, "family-shopping", "", { merged: others.length });
  return { agent: "family-shopping", reply: `Merged ${others.length} family cart(s).`, cart: await myCart.populate("items.product") };
};
