const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: "text" },
  slug: { type: String, required: true, unique: true },
  description: String,
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  price: { type: Number, required: true },
  mrp: Number,
  unit: String, // 500g, 1L, 12pcs
  images: [String],
  stock: { type: Number, default: 0 },
  tags: [String],
  nutrition: { calories: Number, protein: Number, carbs: Number, fat: Number, fiber: Number },
  diet: [String], // veg, vegan, gluten-free, diabetic-safe
  approved: { type: Boolean, default: true },
  rating: { type: Number, default: 4.2 },
  reviewsCount: { type: Number, default: 0 },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
productSchema.index({ name: "text", description: "text", brand: "text", tags: "text" });
module.exports = mongoose.model("Product", productSchema);
