const r = require("express").Router();
const c = require("../controllers/payment.controller");
const { protect } = require("../middleware/auth");
r.use(protect);
r.post("/razorpay/:id", c.createRazorpayOrder);
r.post("/verify", c.verify);
module.exports = r;
