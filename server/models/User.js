const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AddressSchema = new mongoose.Schema({
  label: String, line1: String, line2: String, city: String, state: String,
  pincode: String, lat: Number, lng: Number,
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: String,
  password: { type: String, required: true },
  role: { type: String, enum: ["customer","admin","delivery","vendor","warehouse","superadmin"], default: "customer" },
  addresses: [AddressSchema],
  resetToken: String,
  resetExpires: Date,
  refreshTokens: [String],
  preferences: { diet: String, allergies: [String], language: { type: String, default: "en" } },
  isActive: { type: Boolean, default: true },
  // delivery partner fields
  vehicle: String, license: String, location: { lat: Number, lng: Number },
  online: { type: Boolean, default: false }, earnings: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.matchPassword = function (pw) { return bcrypt.compare(pw, this.password); };

module.exports = mongoose.model("User", userSchema);
