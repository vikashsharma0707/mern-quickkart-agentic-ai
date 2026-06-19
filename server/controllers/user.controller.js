const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, preferences } = req.body;
  Object.assign(req.user, { name: name ?? req.user.name, phone: phone ?? req.user.phone });
  if (preferences) req.user.preferences = { ...req.user.preferences, ...preferences };
  await req.user.save();
  return ok(res, req.user, "Profile updated");
});

exports.addAddress = asyncHandler(async (req, res) => {
  req.user.addresses.push(req.body); await req.user.save();
  return ok(res, req.user.addresses);
});
exports.deleteAddress = asyncHandler(async (req, res) => {
  req.user.addresses = req.user.addresses.filter(a => a._id.toString() !== req.params.id);
  await req.user.save(); return ok(res, req.user.addresses);
});
exports.listUsers = asyncHandler(async (_req, res) => ok(res, await User.find().select("-password")));
