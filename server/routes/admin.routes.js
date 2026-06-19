const r = require("express").Router();
const c = require("../controllers/admin.controller");
const { protect, requireRole } = require("../middleware/auth");
r.use(protect, requireRole("admin", "superadmin"));
r.get("/dashboard", c.dashboard);
module.exports = r;
