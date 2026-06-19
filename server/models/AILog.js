const mongoose = require("mongoose");
module.exports = mongoose.model("AILog", new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  agent: String,
  input: String,
  output: Object,
  tokens: Number,
}, { timestamps: true }));
