


/**
 * DirectOrderAgent
 * ------------------------------------------------------------------
 * Smart conversational grocery ordering agent for QuickKart.
 * Handles natural language → cart → order → payment flow.
 * ------------------------------------------------------------------
 */

const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const { callLLMJson } = require('./llm');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ACTIONS = Object.freeze({
  ADD_TO_CART: 'add_to_cart',
  CONFIRM_ORDER: 'confirm_order',
  PROCESS_PAYMENT: 'process_payment',
});

const PAYMENT_METHODS = Object.freeze({
  COD: 'cod',
  ONLINE: 'online',
  PENDING: 'pending',
});

const AGENT_NAME = 'directOrderAgent';
const FALLBACK_REPLY = 'Sorry bhai, abhi issue hai. Phir se try karo.';

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------

function buildSystemPrompt() {
  return `
You are QuickKart AI - a fast, intelligent grocery ordering assistant.

Return ONLY valid JSON (no extra text):

{
  "action": "add_to_cart" | "confirm_order" | "process_payment",
  "items": [{"productName": "Rice", "quantity": 5}],
  "paymentMethod": "cod" | "online" | null,
  "reply": "Short friendly Hinglish message"
}

Rules:
- "online", "razorpay", "upi", "card", "online payment" → action: "process_payment", paymentMethod: "online"
- "cod", "cash", "cash on delivery" → action: "process_payment", paymentMethod: "cod"
- "order kar do", "place order", "confirm", "final kar do" → action: "confirm_order"
- Default action is "add_to_cart" if only items are mentioned.
`.trim();
}

// ---------------------------------------------------------------------------
// Intent Extraction
// ---------------------------------------------------------------------------

async function extractIntent(message) {
  try {
    const result = await callLLMJson({
      system: buildSystemPrompt(),
      messages: [{ role: 'user', content: message }],
    });

    return {
      action: result?.action || null,
      items: Array.isArray(result?.items) ? result.items : [],
      paymentMethod: result?.paymentMethod || null,
      reply: typeof result?.reply === 'string' ? result.reply.trim() : '',
    };
  } catch (err) {
    console.error("LLM Intent Extraction Failed:", err);
    return { action: 'add_to_cart', items: [], paymentMethod: null, reply: '' };
  }
}

// ---------------------------------------------------------------------------
// Cart Helpers
// ---------------------------------------------------------------------------

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], total: 0 });
  }
  return cart;
}

function resolveProduct(products, requestedName) {
  if (!requestedName) return null;
  const needle = requestedName.toLowerCase().trim();
  return products.find(p => p.name.toLowerCase().includes(needle)) || null;
}

function applyItemsToCart(cart, items, products) {
  const added = [];

  for (const item of items) {
    const product = resolveProduct(products, item?.productName);
    if (!product) continue;

    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));

    const existing = cart.items.findIndex(
      i => i.product?._id?.toString() === product._id.toString()
    );

    if (existing !== -1) {
      cart.items[existing].qty += qty;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        qty,
        price: product.price,
      });
    }
    added.push({ name: product.name, qty });
  }

  cart.total = cart.items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return added;
}

async function clearCart(cart) {
  cart.items = [];
  cart.total = 0;
  await cart.save();
}

// ---------------------------------------------------------------------------
// Order Helpers
// ---------------------------------------------------------------------------

async function createOrder(userId, cart, paymentMethod) {
  const order = await Order.create({
    user: userId,
    items: cart.items.map(i => ({
      product: i.product,
      name: i.name,
      qty: i.qty,
      price: i.price,
    })),
    amount: cart.total,
    totalAmount: cart.total,
    address: {},
    paymentMethod,
    status: "pending",
    aiAgent: AGENT_NAME,
    timeline: [{
      status: "pending",
      note: `Order created via ${AGENT_NAME} - Payment: ${paymentMethod}`
    }]
  });
  return order;
}

function shortOrderId(order) {
  return order._id.toString().slice(-8).toUpperCase();
}

// ---------------------------------------------------------------------------
// Response Builders
// ---------------------------------------------------------------------------

function buildPaymentResponse(order, paymentMethod) {
  if (paymentMethod === PAYMENT_METHODS.ONLINE) {
    return {
      reply: `✅ Order Created Successfully!\n\nOrder ID: #${shortOrderId(order)}\nTotal: ₹${order.amount}\n\nRazorpay payment khul raha hai...`,
      orderId: order._id.toString(),
      orderCreated: true,
      paymentMethod: PAYMENT_METHODS.ONLINE,
      needsRazorpay: true
    };
  }

  return {
    reply: `✅ Order Confirmed with COD!\n\nOrder ID: #${shortOrderId(order)}\nTotal: ₹${order.amount}\n\nThank you for shopping with QuickKart!`,
    orderId: order._id.toString(),
    orderCreated: true,
    paymentMethod: PAYMENT_METHODS.COD
  };
}

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

exports.run = async (userId, message) => {
  if (!userId || typeof message !== 'string' || !message.trim()) {
    return { reply: FALLBACK_REPLY };
  }

  try {
    const products = await Product.find({ stock: { $gt: 0 } })
      .select("name price unit category")
      .lean();

    const cart = await getOrCreateCart(userId);
    const { action, items, paymentMethod, reply } = await extractIntent(message);

    const addedItems = applyItemsToCart(cart, items, products);

    if (addedItems.length > 0) {
      await cart.save();
    }

    // 1. User directly chose payment method
    if (action === ACTIONS.PROCESS_PAYMENT && paymentMethod) {
      if (cart.items.length === 0) {
        return { reply: "Cart khali hai. Pehle kuch items add karo." };
      }

      const order = await createOrder(userId, cart, paymentMethod);
      await clearCart(cart);

      return buildPaymentResponse(order, paymentMethod);
    }

    // 2. User wants to confirm order
    if (action === ACTIONS.CONFIRM_ORDER) {
      if (cart.items.length === 0) {
        return { reply: "Cart khali hai. Pehle kuch items add karo." };
      }

      const order = await createOrder(userId, cart, PAYMENT_METHODS.PENDING);
      await clearCart(cart);

      return {
        reply: `✅ Order Created!\nOrder ID: #${shortOrderId(order)}\nTotal: ₹${order.amount}\n\nPayment Kaise Karna Hai?\n\nReply karo: "COD" ya "Online"`,
        orderId: order._id.toString(),
        needsPaymentConfirmation: true
      };
    }

    // 3. Default: Add to cart
    const itemList = addedItems.length 
      ? addedItems.map(i => `${i.qty} ${i.name}`).join(", ") 
      : "items";

    return {
      reply: reply || `✅ ${itemList} cart mein add kar diye hain.\nTotal: ₹${cart.total}\n\nOrder confirm karna hai?`,
      cartUpdated: true,
      addedItems
    };

  } catch (error) {
    console.error('[DirectOrderAgent] Error:', error);
    return { reply: FALLBACK_REPLY };
  }
};