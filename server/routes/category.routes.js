const r = require("express").Router();
const c = require("../controllers/category.controller");
const { protect, requireRole } = require("../middleware/auth");
const upload = require("../middleware/upload");
r.get("/", c.list);
r.post("/", protect, requireRole("admin", "superadmin"), upload.single("image"), c.create);
r.put("/:id", protect, requireRole("admin", "superadmin"), upload.single("image"), c.update);
r.delete("/:id", protect, requireRole("admin", "superadmin"), c.remove);
module.exports = r;
