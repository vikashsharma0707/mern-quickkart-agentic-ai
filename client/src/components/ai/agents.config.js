// Single source of truth for all 15 agents.
// DO NOT remove or merge entries — every existing agent must stay visible & functional.

export const AGENTS = [
  { k: "chat-to-order", t: "Chat To Order", icon: "MessageSquareText", ex: "2 kg onions, 1 Amul milk aur 12 eggs order kar do", group: "Shopping" },
  { k: "personal-shopper", t: "Personal Shopper", icon: "ShoppingBag", ex: "Mere usual items order kar do", group: "Shopping" },
  { k: "shopping-crew", t: "Shopping Crew", icon: "Users2", ex: "Best weekly basket under ₹1000", group: "Shopping" },

  { k: "grocery-planner", t: "Grocery Planner", icon: "ClipboardList", ex: "5 logon ke liye 1 week ka grocery plan banao", group: "Planning" },
  { k: "meal-planning", t: "Meal Planner", icon: "Salad", ex: "7 din ka high protein diet plan banao", group: "Planning" },
  { k: "budget-optimization", t: "Budget Optimizer", icon: "PiggyBank", ex: "₹2500 ke andar monthly groceries", group: "Planning" },

  { k: "family-shopping", t: "Family Cart Merge", icon: "Users", ex: "Merge my family's carts", group: "Family" },
  { k: "whatsapp-ordering", t: "WhatsApp Ordering", icon: "Send", ex: "Maa ke ghar par ₹1500 ke groceries bhej do", group: "Family" },

  { k: "seasonal", t: "Seasonal Picks", icon: "Leaf", ex: "What's good this season?", group: "Smart" },
  { k: "negotiation", t: "Deal Negotiator", icon: "Handshake", ex: "Cheapest monthly grocery basket", group: "Smart" },
  { k: "health-aware", t: "Health Aware", icon: "HeartPulse", ex: "I am diabetic, suggest safe snacks", group: "Smart" },

  { k: "auto-reorder", t: "Auto Reorder", icon: "RotateCcw", ex: "What should I reorder?", group: "Automation" },
  { k: "autonomous", t: "Autonomous Mode", icon: "Cog", ex: "Run my auto-ordering rules now", group: "Automation" },

  { k: "emergency-shopping", t: "Emergency Shopping", icon: "Siren", ex: "Guest aa rahe hain 30 minute me", group: "Urgent" },

  { k: "festival-shopping", t: "Festival Shopping", icon: "PartyPopper", ex: "Ganesh Chaturthi ke liye shopping karni hai", group: "Festival" },
];

export const GROUPS = ["Shopping", "Planning", "Family", "Smart", "Automation", "Urgent", "Festival"];

export const SUGGESTED_PROMPTS = [
  { emoji: "🥛", text: "Order milk and bread" },
  { emoji: "🥗", text: "Create a high protein meal plan" },
  { emoji: "💰", text: "Save money on groceries" },
  { emoji: "🎉", text: "Festival shopping" },
  { emoji: "🚨", text: "Emergency grocery basket" },
  { emoji: "🤖", text: "Weekly grocery basket" },
];

export const EXECUTION_STEPS = [
  "Intent Analyzer",
  "Product Search Agent",
  "Inventory Agent",
  "Pricing Agent",
  "Recommendation Agent",
  "Cart Builder Agent",
  "Order Processor",
];

export const CREW_WORKFLOW = [
  "Planner Agent",
  "Search Agent",
  "Price Agent",
  "Inventory Agent",
  "Recommendation Agent",
  "Checkout Agent",
];