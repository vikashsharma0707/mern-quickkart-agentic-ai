const { verifyAccess } = require("../utils/jwt");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization || "";
    const token = h.startsWith("Bearer ") ? h.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "No token" });
    const decoded = verifyAccess(token);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid token" });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

exports.requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role))
    return res.status(403).json({ success: false, message: "Forbidden" });
  next();
};
