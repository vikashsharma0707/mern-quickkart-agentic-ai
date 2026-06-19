const crypto = require("crypto");
const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");
const { signAccess, signRefresh, verifyRefresh } = require("../utils/jwt");

const tokens = (u) => ({ accessToken: signAccess({ id: u._id, role: u.role }), refreshToken: signRefresh({ id: u._id }) });

exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (await User.findOne({ email })) return fail(res, 400, "Email exists");
  const user = await User.create({ name, email, phone, password, role: role || "customer" });
  const t = tokens(user); user.refreshTokens.push(t.refreshToken); await user.save();
  return ok(res, { user: { id: user._id, name, email, role: user.role }, ...t }, "Registered");
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return fail(res, 401, "Invalid credentials");
  const t = tokens(user); user.refreshTokens.push(t.refreshToken); await user.save();
  return ok(res, { user: { id: user._id, name: user.name, email, role: user.role }, ...t }, "Logged in");
});

exports.refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return fail(res, 400, "No refresh token");
  try {
    const decoded = verifyRefresh(refreshToken);
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshTokens.includes(refreshToken)) return fail(res, 401, "Invalid refresh");
    const t = tokens(user);
    user.refreshTokens = user.refreshTokens.filter(x => x !== refreshToken);
    user.refreshTokens.push(t.refreshToken); await user.save();
    return ok(res, t);
  } catch { return fail(res, 401, "Expired"); }
});

exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken && req.user) {
    req.user.refreshTokens = req.user.refreshTokens.filter(x => x !== refreshToken);
    await req.user.save();
  }
  return ok(res, null, "Logged out");
});

exports.forgot = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return ok(res, null, "If email exists, reset token issued");
  const token = crypto.randomBytes(24).toString("hex");
  user.resetToken = token; user.resetExpires = new Date(Date.now() + 30 * 60 * 1000); await user.save();
  return ok(res, { resetToken: token }, "Reset token (dev only — would be emailed)");
});

exports.reset = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({ resetToken: token, resetExpires: { $gt: new Date() } });
  if (!user) return fail(res, 400, "Invalid/expired token");
  user.password = password; user.resetToken = undefined; user.resetExpires = undefined; await user.save();
  return ok(res, null, "Password reset");
});

exports.me = asyncHandler(async (req, res) => ok(res, req.user));
