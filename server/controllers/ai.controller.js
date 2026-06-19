const asyncHandler = require("../utils/asyncHandler");
const { ok, fail } = require("../utils/apiResponse");
const { callLLMJson } = require("../agents/llm");
const { ragAnswer, buildCorpus } = require("../rag/ragService");

const chatToOrder = require("../agents/chatToOrderAgent");
const voiceToOrder = require("../agents/voiceToOrderAgent");
const whatsappOrdering = require("../agents/whatsappOrderingAgent");
const groceryPlanner = require("../agents/groceryPlannerAgent");
const mealPlanning = require("../agents/mealPlanningAgent");
const festivalShopping = require("../agents/festivalShoppingAgent");
const autoReorder = require("../agents/autoReorderAgent");
const budgetOptimization = require("../agents/budgetOptimizationAgent");
const shoppingCrew = require("../agents/shoppingCrewAgent");
const smartReplacement = require("../agents/smartReplacementAgent");
const familyShopping = require("../agents/familyShoppingAgent");
const emergencyShopping = require("../agents/emergencyShoppingAgent");
const inventoryPrediction = require("../agents/inventoryPredictionAgent");
const personalShopper = require("../agents/personalShopperAgent");
const smartReminder = require("../agents/smartReminderAgent");
const healthAware = require("../agents/healthAwareAgent");
const seasonal = require("../agents/seasonalRecommendationAgent");
const negotiation = require("../agents/negotiationAgent");
const autonomous = require("../agents/autonomousOrderingAgent");

const AGENT_MAP = {
  "chat-to-order": (uid, msg) => chatToOrder.run(uid, msg),
  "voice-to-order": (uid, msg) => voiceToOrder.run(uid, msg),
  "whatsapp-ordering": (uid, msg) => whatsappOrdering.run(uid, msg),
  "grocery-planner": (uid, msg) => groceryPlanner.run(uid, msg),
  "meal-planning": (uid, msg) => mealPlanning.run(uid, msg),
  "festival-shopping": (uid, msg) => festivalShopping.run(uid, msg),
  "auto-reorder": (uid) => autoReorder.run(uid),
  "budget-optimization": (uid, msg) => budgetOptimization.run(uid, msg),
  "shopping-crew": (uid, msg) => shoppingCrew.run(uid, msg),
  "family-shopping": (uid) => familyShopping.run(uid),
  "emergency-shopping": (uid, msg) => emergencyShopping.run(uid, msg),
  "personal-shopper": (uid) => personalShopper.run(uid),
  "smart-reminder": (uid) => smartReminder.run(uid),
  "health-aware": (uid, msg) => healthAware.run(uid, msg),
  "seasonal": (uid) => seasonal.run(uid),
  "negotiation": (uid, msg) => negotiation.run(uid, msg),
  "autonomous": (uid) => autonomous.run(uid),
};

exports.assistant = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) return fail(res, 400, "Message required");

  const routing = await callLLMJson({
    system:
      'Route a grocery-app user message to ONE agent. Return JSON {"agent":"<key>"}. Keys: ' +
      "chat-to-order, whatsapp-ordering, grocery-planner, meal-planning, festival-shopping, " +
      "budget-optimization, shopping-crew, emergency-shopping, personal-shopper, family-shopping, " +
      "health-aware, negotiation, seasonal, auto-reorder, rag-qa.",
    messages: [{ role: "user", content: message }],
  }).catch(() => ({ agent: "chat-to-order" }));

  const agentKey = routing.agent;
  if (agentKey === "rag-qa") {
    const result = await ragAnswer(message);
    return ok(res, { agent: "rag-qa", ...result });
  }
  const handler = AGENT_MAP[agentKey] || AGENT_MAP["chat-to-order"];
  return ok(res, await handler(req.user._id, message));
});

exports.runAgent = asyncHandler(async (req, res) => {
  const handler = AGENT_MAP[req.params.agentKey];
  if (!handler) return fail(res, 404, "Unknown agent");
  return ok(res, await handler(req.user._id, req.body.message || ""));
});

exports.replacement = asyncHandler(async (req, res) =>
  ok(res, await smartReplacement.run(req.user._id, req.body)));

exports.reorderNow = asyncHandler(async (req, res) => {
  const r = await autoReorder.reorder(req.user._id);
  return ok(res, r, "Usual items added to cart");
});

exports.ragQuery = asyncHandler(async (req, res) => {
  const { question, collections } = req.body;
  if (!question) return fail(res, 400, "Question required");
  return ok(res, await ragAnswer(question, collections));
});

exports.rebuildRag = asyncHandler(async (_req, res) => {
  await buildCorpus(); return ok(res, null, "RAG rebuilt");
});

exports.inventoryPrediction = asyncHandler(async (req, res) =>
  ok(res, await inventoryPrediction.run(req.user._id, req.body.horizon || "tomorrow")));

exports.createAutoRule = asyncHandler(async (req, res) =>
  ok(res, await autonomous.createRule(req.user._id, req.body)));
exports.listAutoRules = asyncHandler(async (req, res) =>
  ok(res, await autonomous.listRules(req.user._id)));
exports.deleteAutoRule = asyncHandler(async (req, res) => {
  await autonomous.deleteRule(req.user._id, req.params.id);
  return ok(res, null, "Deleted");
});
