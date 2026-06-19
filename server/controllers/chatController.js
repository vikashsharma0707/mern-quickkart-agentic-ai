// // // // const OpenAI = require('openai');
// // // // const Product = require('../models/Product');
// // // // const Cart = require('../models/Cart');

// // // // const openai = new OpenAI({
// // // //   baseURL: "https://openrouter.ai/api/v1",
// // // //   apiKey: process.env.OPENROUTER_API_KEY,
// // // // });

// // // // exports.chatToOrder = async (req, res) => {
// // // //   try {
// // // //     const { message, userId } = req.body;

// // // //     if (!message) return res.status(400).json({ success: false, message: "Message is required" });

// // // //     // Get user cart
// // // //     let cart = await Cart.findOne({ user: userId });
// // // //     if (!cart) {
// // // //       cart = await Cart.create({ user: userId, items: [], total: 0 });
// // // //     }

// // // //     // Get all products for context
// // // //     const products = await Product.find({ stock: { $gt: 0 } }).select("name price unit category");

// // // //     const systemPrompt = `
// // // // You are QuickKart AI - a smart grocery ordering assistant.
// // // // You understand Hindi + English mixed language.
// // // // User wants to order items quickly.

// // // // Current Cart: ${JSON.stringify(cart.items.map(i => ({name: i.name, qty: i.qty})))}

// // // // Available Products: ${products.map(p => `${p.name} (${p.unit}) - ₹${p.price}`).join(", ")}

// // // // Rules:
// // // // - Extract quantity and product name from user message.
// // // // - Be helpful, friendly and fast.
// // // // - If user says "order kar do", "add kar do", "de do" etc. → add to cart.
// // // // - Always confirm what you understood.
// // // // - At the end ask for confirmation before final order.
// // // // `;

// // // //     const completion = await openai.chat.completions.create({
// // // //       model: "google/gemini-2.0-flash-exp:free", // ya jo bhi model aap use kar rahe ho
// // // //       messages: [
// // // //         { role: "system", content: systemPrompt },
// // // //         { role: "user", content: message }
// // // //       ],
// // // //       temperature: 0.7,
// // // //     });

// // // //     const aiReply = completion.choices[0].message.content;

// // // //     // Simple intent detection for auto-add
// // // //     if (message.toLowerCase().includes("order") || 
// // // //         message.toLowerCase().includes("add") || 
// // // //         message.toLowerCase().includes("de do") ||
// // // //         message.toLowerCase().includes("kar do")) {

// // // //       // Basic parsing (can be improved with better NLP)
// // // //       const addedItems = await autoAddToCart(message, cart, products);
// // // //       if (addedItems.length > 0) {
// // // //         await cart.save();
// // // //       }
// // // //     }

// // // //     res.json({
// // // //       success: true,
// // // //       reply: aiReply,
// // // //       cart: cart
// // // //     });

// // // //   } catch (error) {
// // // //     console.error(error);
// // // //     res.status(500).json({ success: false, message: "AI agent failed" });
// // // //   }
// // // // };

// // // // // Helper function to auto add items
// // // // async function autoAddToCart(message, cart, products) {
// // // //   const added = [];
// // // //   const lowerMsg = message.toLowerCase();

// // // //   for (const prod of products) {
// // // //     const prodName = prod.name.toLowerCase();
// // // //     if (lowerMsg.includes(prodName)) {
// // // //       // Extract quantity (simple regex)
// // // //       const qtyMatch = lowerMsg.match(/(\d+)\s*(kg|litre|liter|pc|piece|pack|gm|ml)?/);
// // // //       const qty = qtyMatch ? parseInt(qtyMatch[1]) : 1;

// // // //       // Add or update in cart
// // // //       const existing = cart.items.findIndex(i => i.product.toString() === prod._id.toString());
      
// // // //       if (existing !== -1) {
// // // //         cart.items[existing].qty += qty;
// // // //       } else {
// // // //         cart.items.push({
// // // //           product: prod._id,
// // // //           name: prod.name,
// // // //           qty: qty,
// // // //           price: prod.price
// // // //         });
// // // //       }
// // // //       added.push({ name: prod.name, qty });
// // // //     }
// // // //   }

// // // //   // Recalculate total
// // // //   cart.total = cart.items.reduce((sum, item) => sum + item.qty * item.price, 0);
// // // //   return added;
// // // // }




// // // const OpenAI = require('openai');
// // // const Product = require('../models/Product');
// // // const Cart = require('../models/Cart');

// // // const openai = new OpenAI({
// // //   baseURL: "https://openrouter.ai/api/v1",
// // //   apiKey: process.env.OPENROUTER_API_KEY,
// // // });

// // // exports.chatToOrder = async (req, res) => {
// // //   try {
// // //     const { message } = req.body;
// // //     const userId = req.user._id;

// // //     if (!message) {
// // //       return res.status(400).json({ success: false, message: "Message is required" });
// // //     }

// // //     let cart = await Cart.findOne({ user: userId });
// // //     if (!cart) {
// // //       cart = await Cart.create({ user: userId, items: [], total: 0 });
// // //     }

// // //     const products = await Product.find({ stock: { $gt: 0 } })
// // //       .select("name price unit category")
// // //       .limit(50);

// // //     const systemPrompt = `You are QuickKart AI, a helpful Indian grocery assistant.
// // // Current cart: ${JSON.stringify(cart.items.map(i => ({name: i.name, qty: i.qty})))}
// // // Available products: ${products.map(p => `${p.name} - ₹${p.price}`).join(", ")}

// // // Respond in friendly Hinglish. Help user order items.`;

// // //     const completion = await openai.chat.completions.create({
// // //       model: "google/gemini-2.0-flash-exp:free",
// // //       messages: [
// // //         { role: "system", content: systemPrompt },
// // //         { role: "user", content: message }
// // //       ],
// // //       temperature: 0.7,
// // //     });

// // //     const aiReply = completion.choices[0].message.content;

// // //     res.json({
// // //       success: true,
// // //       reply: aiReply,
// // //       cart: cart
// // //     });

// // //   } catch (error) {
// // //     console.error("Chat Error:", error);
// // //     res.status(500).json({ 
// // //       success: false, 
// // //       message: "AI service mein issue hai, baad mein try karo" 
// // //     });
// // //   }
// // // };


// // const asyncHandler = require("../utils/asyncHandler");
// // const { ok, fail } = require("../utils/apiResponse");
// // const chatToOrder = require("../agents/chatToOrderAgent");   // ← Existing agent

// // // Main Chat Endpoint (Frontend se yahi call hoga)
// // exports.chatToOrder = asyncHandler(async (req, res) => {
// //   const { message } = req.body;
// //   const userId = req.user._id;

// //   if (!message?.trim()) {
// //     return fail(res, 400, "Message is required");
// //   }

// //   try {
// //     // Existing powerful agent use kar rahe hain
// //     const result = await chatToOrder.run(userId, message);

// //     return ok(res, {
// //       reply: result.reply || result.message || "Order processed!",
// //       cart: result.cart || null,
// //       addedItems: result.addedItems || [],
// //       agent: "chat-to-order"
// //     });
// //   } catch (error) {
// //     console.error("ChatToOrder Error:", error);
// //     return fail(res, 500, "AI agent mein issue hai, thodi der baad try karo");
// //   }
// // });

// const asyncHandler = require("../utils/asyncHandler");
// const { ok, fail } = require("../utils/apiResponse");
// const directOrderAgent = require("../agents/directOrderAgent");

// exports.chatToOrder = asyncHandler(async (req, res) => {
//   const { message } = req.body;
//   const userId = req.user._id;

//   if (!message?.trim()) {
//     return fail(res, 400, "Message is required");
//   }

//   const result = await directOrderAgent.run(userId, message);

//   return ok(res, result);
// });



const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");
const directOrderAgent = require("../agents/directOrderAgent");

exports.chatToOrder = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const userId = req.user?._id;

  if (!message?.trim()) {
    return fail(res, 400, "Message is required");
  }

  if (!userId) {
    return fail(res, 401, "User not authenticated");
  }

  try {
    const result = await directOrderAgent.run(userId, message.trim());

    return ok(res, {
      ...result,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("ChatToOrder Controller Error:", error);
    return fail(res, 500, "AI agent mein temporary issue hai. Please try again.");
  }
});