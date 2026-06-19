// // const mongoose = require("mongoose");
// // module.exports = mongoose.model("Order", new mongoose.Schema({
// //   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //   items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, name: String, qty: Number, price: Number }],
// //   amount: Number,
// //   address: Object,
// //   status: { type: String, enum: ["placed","confirmed","packed","out_for_delivery","delivered","cancelled"], default: "placed" },
// //   payment: { method: String, paid: { type: Boolean, default: false }, razorpayOrderId: String, razorpayPaymentId: String, signature: String },
// //   deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //   eta: String, etaMinutes: Number,
// //   aiAgent: String,
// //   timeline: [{ at: { type: Date, default: Date.now }, status: String, note: String }],
// // }, { timestamps: true }));


// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },

//   items: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product"
//     },
//     name: String,
//     qty: Number,
//     price: Number
//   }],

//   amount: {
//     type: Number,
//     required: true
//   },

//   totalAmount: {
//     type: Number
//   },

//   address: {
//     type: Object,
//     required: false
//   },

//   paymentMethod: {
//     type: String,
//     enum: ["cod", "razorpay", "pending"],
//     default: "cod"
//   },

//   payment: {
//     method: String,
//     paid: {
//       type: Boolean,
//       default: false
//     },
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     signature: String
//   },

//   status: {
//     type: String,
//     enum: [
//       "pending",
//       "placed",
//       "confirmed",
//       "packed",
//       "out_for_delivery",
//       "delivered",
//       "cancelled"
//     ],
//     default: "pending"          // ← Changed to pending (AI flow ke liye best)
//   },

//   deliveryPartner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },

//   eta: String,
//   etaMinutes: Number,

//   aiAgent: String,              // Track karne ke liye

//   timeline: [{
//     at: { type: Date, default: Date.now },
//     status: String,
//     note: String
//   }],

// }, { timestamps: true });

// // Virtual for easy order ID display
// orderSchema.virtual('shortId').get(function() {
//   return this._id.toString().slice(-8).toUpperCase();
// });

// module.exports = mongoose.model("Order", orderSchema);



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    qty: Number,
    price: Number
  }],

  amount: { type: Number, required: true },
  totalAmount: { type: Number },

  address: { type: Object },

  paymentMethod: {
    type: String,
    enum: ["cod", "online", "pending"],   // ← "online" added
    default: "pending"
  },

  payment: {
    method: String,
    paid: { type: Boolean, default: false },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    signature: String
  },

  status: {
    type: String,
    enum: ["pending", "placed", "confirmed", "packed", "out_for_delivery", "delivered", "cancelled"],
    default: "pending"
  },

  deliveryPartner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  eta: String,
  etaMinutes: Number,
  aiAgent: String,

  timeline: [{
    at: { type: Date, default: Date.now },
    status: String,
    note: String
  }],

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);