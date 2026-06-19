const crypto = require("crypto");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");

let Razorpay = null;
try { Razorpay = require("razorpay"); } catch {}

const rzp = () => Razorpay && process.env.RAZORPAY_KEY_ID
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

exports.createRazorpayOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return fail(res, 404, "Order not found");
  const inst = rzp();
  if (!inst) {
    // dev fallback
    const fake = { id: "order_dev_" + order._id, amount: order.amount * 100, currency: "INR" };
    order.payment.razorpayOrderId = fake.id; await order.save();
    return ok(res, { ...fake, key: "rzp_test_dev" });
  }
  const rorder = await inst.orders.create({ amount: order.amount * 100, currency: "INR", receipt: String(order._id) });
  order.payment.razorpayOrderId = rorder.id; await order.save();
  return ok(res, { ...rorder, key: process.env.RAZORPAY_KEY_ID });
});

exports.verify = asyncHandler(async (req, res) => {
  const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return fail(res, 404, "Order not found");
  if (process.env.RAZORPAY_KEY_SECRET && razorpay_signature) {
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    if (expected !== razorpay_signature) return fail(res, 400, "Invalid signature");
  }
  order.payment.paid = true;
  order.payment.razorpayPaymentId = razorpay_payment_id;
  order.payment.signature = razorpay_signature;
  order.timeline.push({ status: order.status, note: "Payment verified" });
  await order.save();
  return ok(res, order, "Payment verified");
});
