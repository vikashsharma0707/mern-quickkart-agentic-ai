const mongoose = require("mongoose");
module.exports = mongoose.model("Category", new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  image: String, icon: String, active: { type: Boolean, default: true },
}, { timestamps: true }));
