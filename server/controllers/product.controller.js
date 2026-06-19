const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");

exports.list = asyncHandler(async (req, res) => {
  const { q, category, limit = 50, page = 1, sort = "-createdAt" } = req.query;
  const filter = { approved: true };
  if (q) filter.$text = { $search: q };
  if (category) {
    const cat = await Category.findOne({ $or: [{ slug: category }, { _id: category.length === 24 ? category : null }] });
    if (cat) filter.category = cat._id;
  }
  const docs = await Product.find(filter).populate("category").sort(sort).limit(+limit).skip((+page - 1) * +limit);
  return ok(res, docs);
});

exports.get = asyncHandler(async (req, res) => {
  const p = await Product.findOne({ $or: [{ slug: req.params.id }, { _id: req.params.id.length === 24 ? req.params.id : null }] }).populate("category");
  if (!p) return fail(res, 404, "Not found");
  return ok(res, p);
});

exports.create = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.files?.length) body.images = req.files.map(f => `/uploads/${f.filename}`);
  if (!body.slug) body.slug = body.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
  const p = await Product.create(body);
  return ok(res, p, "Created");
});

exports.update = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.files?.length) body.images = req.files.map(f => `/uploads/${f.filename}`);
  const p = await Product.findByIdAndUpdate(req.params.id, body, { new: true });
  return ok(res, p, "Updated");
});

exports.remove = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id); return ok(res, null, "Deleted");
});

exports.bulkUpload = asyncHandler(async (req, res) => {
  const items = req.body.items || [];
  const created = await Product.insertMany(items.map(i => ({ ...i, slug: i.slug || (i.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).slice(2, 7)) })));
  return ok(res, { count: created.length }, "Bulk uploaded");
});
