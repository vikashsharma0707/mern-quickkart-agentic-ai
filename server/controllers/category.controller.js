const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const { ok } = require("../utils/apiResponse");

exports.list = asyncHandler(async (_req, res) => ok(res, await Category.find({ active: true })));
exports.create = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) body.image = `/uploads/${req.file.filename}`;
  if (!body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, "-");
  return ok(res, await Category.create(body));
});
exports.update = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) body.image = `/uploads/${req.file.filename}`;
  return ok(res, await Category.findByIdAndUpdate(req.params.id, body, { new: true }));
});
exports.remove = asyncHandler(async (req, res) => { await Category.findByIdAndDelete(req.params.id); return ok(res, null); });
