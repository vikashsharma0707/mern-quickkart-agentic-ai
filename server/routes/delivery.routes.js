const r = require("express").Router();
const c = require("../controllers/delivery.controller");
const { protect, requireRole } = require("../middleware/auth");
r.use(protect, requireRole("delivery", "admin", "superadmin"));
r.post("/online", c.toggleOnline);
r.post("/location", c.updateLocation);
r.get("/orders", c.myOrders);
r.get("/earnings", c.earnings);
module.exports = r;
