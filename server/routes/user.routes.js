const r = require("express").Router();
const c = require("../controllers/user.controller");
const { protect, requireRole } = require("../middleware/auth");
r.put("/profile", protect, c.updateProfile);
r.post("/addresses", protect, c.addAddress);
r.delete("/addresses/:id", protect, c.deleteAddress);
r.get("/", protect, requireRole("admin", "superadmin"), c.listUsers);
module.exports = r;
