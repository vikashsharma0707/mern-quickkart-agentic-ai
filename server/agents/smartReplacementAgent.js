const Product = require("../models/Product");
const { callLLMJson } = require("./llm");
const { logAgent } = require("./_shared");

exports.run = async (userId, { productId, productName }) => {
  let p = null;
  if (productId) p = await Product.findById(productId);
  if (!p && productName) p = await Product.findOne({ name: new RegExp(productName, "i") });
  if (!p) return { agent: "smart-replacement", reply: "Product not found", alternatives: [] };
  const alts = await Product.find({ category: p.category, _id: { $ne: p._id }, stock: { $gt: 0 } }).limit(5);
  await logAgent(userId, "smart-replacement", productName || productId, { for: p.name, alts: alts.map(a => a.name) });
  return { agent: "smart-replacement", for: p.name, reply: `${alts.length} alternatives in same category`, alternatives: alts };
};
