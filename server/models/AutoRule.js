const mongoose = require("mongoose");
module.exports = mongoose.model("AutoRule", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productName: String, qty: Number, intervalDays: Number, lastTriggered: Date, active: { type: Boolean, default: true },
}, { timestamps: true }));
