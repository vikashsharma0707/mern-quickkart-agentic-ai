// // // import { useEffect, useRef, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { askAssistant, runAgent, pushUser, clear } from "../../features/ai/aiSlice";
// // // import useVoiceInput from "../../hooks/useVoiceInput";

// // // const AGENTS = [
// // //   { k: "chat-to-order", t: "💬 Chat to Order", ex: "2 kg onions, 1 Amul milk aur 12 eggs order kar do" },
// // //   { k: "grocery-planner", t: "🧺 Grocery Planner", ex: "5 logon ke liye 1 week ka grocery plan banao" },
// // //   { k: "meal-planning", t: "🥗 Meal Planner (RAG)", ex: "7 din ka high protein diet plan banao" },
// // //   { k: "festival-shopping", t: "🎉 Festival Shopping", ex: "Ganesh Chaturthi ke liye shopping karni hai" },
// // //   { k: "budget-optimization", t: "💰 Budget Optimizer", ex: "₹2500 ke andar monthly groceries" },
// // //   { k: "shopping-crew", t: "🤖 Multi-Agent Crew", ex: "Best weekly basket under ₹1000" },
// // //   { k: "emergency-shopping", t: "🚨 Emergency Shopping", ex: "Guest aa rahe hain 30 minute me" },
// // //   { k: "personal-shopper", t: "🛍️ Personal Shopper", ex: "Mere usual items order kar do" },
// // //   { k: "whatsapp-ordering", t: "📩 Send Groceries", ex: "Maa ke ghar par ₹1500 ke groceries bhej do" },
// // //   { k: "negotiation", t: "🤝 Deal Negotiator", ex: "Cheapest monthly grocery basket" },
// // //   { k: "health-aware", t: "🩺 Health Aware", ex: "I am diabetic, suggest safe snacks" },
// // //   { k: "family-shopping", t: "👨‍👩‍👧 Family Cart Merge", ex: "Merge my family's carts" },
// // //   { k: "seasonal", t: "🍋 Seasonal Picks", ex: "What's good this season?" },
// // //   { k: "auto-reorder", t: "🔁 Auto Reorder", ex: "What should I reorder?" },
// // //   { k: "autonomous", t: "⚙️ Auto Mode Check", ex: "Run my auto-ordering rules now" },
// // // ];

// // // export default function AIAssistant() {
// // //   const dispatch = useDispatch();
// // //   const { history, loading } = useSelector((s) => s.ai);
// // //   const [text, setText] = useState("");
// // //   const { listening, text: voice, start, stop, supported } = useVoiceInput();
// // //   const endRef = useRef();
// // //   useEffect(() => { if (voice) setText(voice); }, [voice]);
// // //   useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

// // //   const send = (msg, agentKey) => {
// // //     if (!msg?.trim()) return;
// // //     dispatch(pushUser(msg));
// // //     setText("");
// // //     if (agentKey) dispatch(runAgent({ key: agentKey, message: msg }));
// // //     else dispatch(askAssistant(msg));
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto p-4">
// // //       <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 mb-4">
// // //         <div className="text-2xl font-bold">🤖 AI Shopping Assistant</div>
// // //         <div className="text-sm opacity-80">One chat, 20 autonomous agents. Hindi / English / Hinglish.</div>
// // //       </div>

// // //       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
// // //         {AGENTS.map((a) => (
// // //           <button key={a.k} onClick={() => send(a.ex, a.k)} className="card p-3 text-left hover:border-brand hover:shadow-md transition">
// // //             <div className="font-semibold text-sm">{a.t}</div>
// // //             <div className="text-xs text-gray-500 mt-1 italic">"{a.ex}"</div>
// // //           </button>
// // //         ))}
// // //       </div>

// // //       <div className="card p-4 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3">
// // //         {!history.length && <div className="text-gray-400 text-sm">Click a quick card above or type your request below.</div>}
// // //         {history.map((m, i) => (
// // //           <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
// // //             <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-brand text-white" : "bg-gray-100"}`}>
// // //               {m.role === "user" ? m.text : <AssistantMsg p={m.payload} />}
// // //             </div>
// // //           </div>
// // //         ))}
// // //         {loading && <div className="text-gray-400 text-sm">🤖 Thinking…</div>}
// // //         <div ref={endRef} />
// // //       </div>

// // //       <div className="mt-3 flex gap-2">
// // //         {supported && (
// // //           <button onClick={listening ? stop : start} className={`btn ${listening ? "bg-red-500 text-white" : "btn-outline"}`}>
// // //             {listening ? "🎙️ Stop" : "🎤"}
// // //           </button>
// // //         )}
// // //         <input className="input flex-1" placeholder="Type or speak..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)} />
// // //         <button className="btn btn-primary" onClick={() => send(text)} disabled={loading}>Send</button>
// // //         <button className="btn btn-outline" onClick={() => dispatch(clear())}>Clear</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function AssistantMsg({ p }) {
// // //   if (!p) return null;
// // //   return (
// // //     <div className="text-sm space-y-1">
// // //       <div className="text-xs uppercase font-bold text-purple-700">{p.agent}</div>
// // //       <div>{p.reply}</div>
// // //       {p.added?.length > 0 && (
// // //         <div className="text-xs mt-1">
// // //           ✅ Added: {p.added.map((a) => `${a.qty}× ${a.name}`).join(", ")}
// // //         </div>
// // //       )}
// // //       {p.notFound?.length > 0 && (
// // //         <div className="text-xs text-red-600">⚠ Not found: {p.notFound.join(", ")}</div>
// // //       )}
// // //       {p.sources?.length > 0 && (
// // //         <div className="text-xs text-gray-500">📚 Sources: {p.sources.length}</div>
// // //       )}
// // //       {p.alternatives?.length > 0 && (
// // //         <ul className="text-xs list-disc pl-4">{p.alternatives.map((a) => <li key={a._id}>{a.name} — ₹{a.price}</li>)}</ul>
// // //       )}
// // //       {p.predictions?.length > 0 && (
// // //         <table className="text-xs mt-1 w-full">
// // //           <thead><tr><th className="text-left">Item</th><th>Pred</th><th>Stock</th></tr></thead>
// // //           <tbody>{p.predictions.slice(0, 6).map((x) => (<tr key={x.name}><td>{x.name}</td><td>{x.predicted}</td><td className={x.reorder ? "text-red-600" : ""}>{x.stock}</td></tr>))}</tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // }









// // import { useEffect, useRef, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { askAssistant, runAgent, pushUser, clear } from "../../features/ai/aiSlice";
// // import useVoiceInput from "../../hooks/useVoiceInput";

// // const AGENTS = [
// //   { k: "chat-to-order", t: "💬 Chat to Order", ex: "2 kg onions, 1 Amul milk aur 12 eggs order kar do" },
// //   { k: "grocery-planner", t: "🧺 Grocery Planner", ex: "5 logon ke liye 1 week ka grocery plan banao" },
// //   { k: "meal-planning", t: "🥗 Meal Planner (RAG)", ex: "7 din ka high protein diet plan banao" },
// //   { k: "festival-shopping", t: "🎉 Festival Shopping", ex: "Ganesh Chaturthi ke liye shopping karni hai" },
// //   { k: "budget-optimization", t: "💰 Budget Optimizer", ex: "₹2500 ke andar monthly groceries" },
// //   { k: "shopping-crew", t: "🤖 Multi-Agent Crew", ex: "Best weekly basket under ₹1000" },
// //   { k: "emergency-shopping", t: "🚨 Emergency Shopping", ex: "Guest aa rahe hain 30 minute me" },
// //   { k: "personal-shopper", t: "🛍️ Personal Shopper", ex: "Mere usual items order kar do" },
// //   { k: "whatsapp-ordering", t: "📩 Send Groceries", ex: "Maa ke ghar par ₹1500 ke groceries bhej do" },
// //   { k: "negotiation", t: "🤝 Deal Negotiator", ex: "Cheapest monthly grocery basket" },
// //   { k: "health-aware", t: "🩺 Health Aware", ex: "I am diabetic, suggest safe snacks" },
// //   { k: "family-shopping", t: "👨‍👩‍👧 Family Cart Merge", ex: "Merge my family's carts" },
// //   { k: "seasonal", t: "🍋 Seasonal Picks", ex: "What's good this season?" },
// //   { k: "auto-reorder", t: "🔁 Auto Reorder", ex: "What should I reorder?" },
// //   { k: "autonomous", t: "⚙️ Auto Mode Check", ex: "Run my auto-ordering rules now" },
// // ];

// // export default function AIAssistant() {
// //   const dispatch = useDispatch();
// //   const { history, loading } = useSelector((s) => s.ai);
// //   const [text, setText] = useState("");
// //   const [selectedAgent, setSelectedAgent] = useState(null);
// //   const { listening, text: voice, start, stop, supported } = useVoiceInput();
// //   const endRef = useRef();
// //   useEffect(() => { if (voice) setText(voice); }, [voice]);
// //   useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

// //   // Clicking a card only fills the input + remembers the agent. No API call.
// //   const selectAgent = (agent) => {
// //     setText(agent.ex);
// //     setSelectedAgent(agent.k);
// //   };

// //   const send = (msg) => {
// //     if (!msg?.trim()) return;
// //     dispatch(pushUser(msg));
// //     setText("");
// //     if (selectedAgent) {
// //       dispatch(runAgent({ key: selectedAgent, message: msg }));
// //     } else {
// //       dispatch(askAssistant(msg));
// //     }
// //     // Reset agent selection after the message is sent.
// //     setSelectedAgent(null);
// //   };

// //   const handleClear = () => {
// //     dispatch(clear());
// //     setSelectedAgent(null);
// //     setText("");
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto p-4">
// //       <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 mb-4">
// //         <div className="text-2xl font-bold">🤖 AI Shopping Assistant</div>
// //         <div className="text-sm opacity-80">One chat, 20 autonomous agents. Hindi / English / Hinglish.</div>
// //       </div>

// //       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
// //         {AGENTS.map((a) => (
// //           <button
// //             key={a.k}
// //             onClick={() => selectAgent(a)}
// //             className={`card p-3 text-left hover:border-brand hover:shadow-md transition ${
// //               selectedAgent === a.k ? "border-brand ring-2 ring-brand" : ""
// //             }`}
// //           >
// //             <div className="font-semibold text-sm">{a.t}</div>
// //             <div className="text-xs text-gray-500 mt-1 italic">"{a.ex}"</div>
// //           </button>
// //         ))}
// //       </div>

// //       {selectedAgent && (
// //         <div className="mb-2 flex items-center gap-2 text-xs text-purple-700">
// //           <span>
// //             Agent selected: <strong>{AGENTS.find((a) => a.k === selectedAgent)?.t}</strong>
// //           </span>
// //           <button
// //             type="button"
// //             className="underline"
// //             onClick={() => setSelectedAgent(null)}
// //           >
// //             Clear agent
// //           </button>
// //         </div>
// //       )}

// //       <div className="card p-4 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3">
// //         {!history.length && <div className="text-gray-400 text-sm">Click a quick card above or type your request below.</div>}
// //         {history.map((m, i) => (
// //           <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
// //             <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-brand text-white" : "bg-gray-100"}`}>
// //               {m.role === "user" ? m.text : <AssistantMsg p={m.payload} />}
// //             </div>
// //           </div>
// //         ))}
// //         {loading && <div className="text-gray-400 text-sm">🤖 Thinking…</div>}
// //         <div ref={endRef} />
// //       </div>

// //       <div className="mt-3 flex gap-2">
// //         {supported && (
// //           <button onClick={listening ? stop : start} className={`btn ${listening ? "bg-red-500 text-white" : "btn-outline"}`}>
// //             {listening ? "🎙️ Stop" : "🎤"}
// //           </button>
// //         )}
// //         <input
// //           className="input flex-1"
// //           placeholder="Type or speak..."
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyDown={(e) => e.key === "Enter" && send(text)}
// //         />
// //         <button className="btn btn-primary" onClick={() => send(text)} disabled={loading}>Send</button>
// //         <button className="btn btn-outline" onClick={handleClear}>Clear</button>
// //       </div>
// //     </div>
// //   );
// // }

// // function AssistantMsg({ p }) {
// //   if (!p) return null;
// //   return (
// //     <div className="text-sm space-y-1">
// //       <div className="text-xs uppercase font-bold text-purple-700">{p.agent}</div>
// //       <div>{p.reply}</div>
// //       {p.added?.length > 0 && (
// //         <div className="text-xs mt-1">
// //           ✅ Added: {p.added.map((a) => `${a.qty}× ${a.name}`).join(", ")}
// //         </div>
// //       )}
// //       {p.notFound?.length > 0 && (
// //         <div className="text-xs text-red-600">⚠ Not found: {p.notFound.join(", ")}</div>
// //       )}
// //       {p.sources?.length > 0 && (
// //         <div className="text-xs text-gray-500">📚 Sources: {p.sources.length}</div>
// //       )}
// //       {p.alternatives?.length > 0 && (
// //         <ul className="text-xs list-disc pl-4">{p.alternatives.map((a) => <li key={a._id}>{a.name} — ₹{a.price}</li>)}</ul>
// //       )}
// //       {p.predictions?.length > 0 && (
// //         <table className="text-xs mt-1 w-full">
// //           <thead><tr><th className="text-left">Item</th><th>Pred</th><th>Stock</th></tr></thead>
// //           <tbody>{p.predictions.slice(0, 6).map((x) => (<tr key={x.name}><td>{x.name}</td><td>{x.predicted}</td><td className={x.reorder ? "text-red-600" : ""}>{x.stock}</td></tr>))}</tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }



// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ShoppingCart, 
//   Brain, 
//   Users, 
//   TrendingUp, 
//   AlertTriangle, 
//   RefreshCw, 
//   Mic, 
//   Send, 
//   Paperclip, 
//   Copy, 
//   ThumbsUp, 
//   ThumbsDown, 
//   Play, 
//   Pause 
// } from "lucide-react";

// // Mock Data
// const agents = [
//   {
//     id: 1,
//     name: "Grocery Planner",
//     icon: "🛒",
//     desc: "Builds intelligent shopping lists",
//     status: "online",
//     lastRun: "2 min ago"
//   },
//   {
//     id: 2,
//     name: "Meal Planner",
//     icon: "🧠",
//     desc: "Creates personalized meal plans",
//     status: "working",
//     lastRun: "Just now"
//   },
//   {
//     id: 3,
//     name: "Shopping Crew",
//     icon: "🤖",
//     desc: "Multi-agent shopping execution",
//     status: "online",
//     lastRun: "15 min ago"
//   },
//   {
//     id: 4,
//     name: "Budget Optimizer",
//     icon: "💰",
//     desc: "Maximizes savings automatically",
//     status: "offline",
//     lastRun: "1 hr ago"
//   },
//   {
//     id: 5,
//     name: "Emergency Shopping",
//     icon: "🚨",
//     desc: "Instant crisis fulfillment",
//     status: "online",
//     lastRun: "Yesterday"
//   },
// ];

// const mockMessages = [
//   {
//     id: 1,
//     type: "assistant",
//     content: "Good morning! I noticed you're running low on milk and eggs. Would you like me to build a smart grocery list?",
//     time: "10:22 AM"
//   }
// ];

// const mockActivity = [
//   { time: "10:25 AM", event: "Budget Optimizer saved ₹250 on dairy", agent: "💰" },
//   { time: "10:26 AM", event: "Meal Planner generated 7-day high-protein plan", agent: "🧠" },
//   { time: "10:27 AM", event: "Shopping Crew added 8 items to cart", agent: "🤖" },
// ];

// const suggestedPrompts = [
//   "🥛 Order milk and bread",
//   "🥗 Create a high protein meal plan",
//   "💰 Save money on groceries this week",
//   "🎉 Festival shopping suggestions",
//   "🚨 Emergency grocery basket"
// ];

// const insights = [
//   "💡 You usually buy milk every 6 days",
//   "💡 Potato prices dropped 18% this week",
//   "💡 Switching to Amul saves ₹180/month",
//   "💡 Your protein intake is 22g below target"
// ];

// function AgentCard({ agent, isActive, onSelect }) {
//   const statusColors = {
//     online: "bg-emerald-500",
//     working: "bg-amber-500",
//     offline: "bg-gray-400"
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -2 }}
//       whileTap={{ scale: 0.98 }}
//       onClick={() => onSelect(agent)}
//       className={`group p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
//         isActive 
//           ? "border-violet-500 bg-violet-50 shadow-lg shadow-violet-500/20" 
//           : "border-gray-200 hover:border-gray-300 hover:shadow-md"
//       }`}
//     >
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 flex items-center justify-center text-3xl bg-white rounded-xl shadow-sm border">
//           {agent.icon}
//         </div>
//         <div className="flex-1 min-w-0">
//           <div className="flex items-center justify-between">
//             <h3 className="font-semibold text-lg tracking-tight">{agent.name}</h3>
//             <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]}`} />
//           </div>
//           <p className="text-sm text-gray-500 line-clamp-2 mt-1">{agent.desc}</p>
//           <div className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
//             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
//             {agent.lastRun}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function MessageBubble({ message, onRegenerate, onCopy }) {
//   const isUser = message.type === "user";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
//     >
//       <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
//         <div
//           className={`px-5 py-4 rounded-3xl text-[15px] leading-relaxed ${
//             isUser 
//               ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-none" 
//               : "glass border border-white/60 bg-white/90 backdrop-blur-xl shadow-sm rounded-bl-none"
//           }`}
//         >
//           {message.content}
//         </div>
        
//         {!isUser && (
//           <div className="flex items-center gap-2 mt-2">
//             <button 
//               onClick={onCopy}
//               className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
//             >
//               <Copy size={16} />
//             </button>
//             <button 
//               onClick={onRegenerate}
//               className="text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
//             >
//               <RefreshCw size={16} />
//             </button>
//             <button className="text-gray-400 hover:text-emerald-500 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
//               <ThumbsUp size={16} />
//             </button>
//             <button className="text-gray-400 hover:text-rose-500 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
//               <ThumbsDown size={16} />
//             </button>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// function TypingIndicator() {
//   return (
//     <div className="flex items-center gap-3 pl-4 py-3">
//       <div className="flex gap-1.5">
//         {[0, 1, 2].map((i) => (
//           <motion.div
//             key={i}
//             animate={{ scale: [1, 1.3, 1] }}
//             transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
//             className="w-2 h-2 bg-violet-500 rounded-full"
//           />
//         ))}
//       </div>
//       <span className="text-sm text-gray-400">Agents are thinking...</span>
//     </div>
//   );
// }

// function ResponseCard({ type }) {
//   if (type === "product") {
//     return (
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="glass border border-white/70 bg-white/95 rounded-3xl overflow-hidden shadow-xl max-w-md"
//       >
//         <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-6xl">
//           🥛
//         </div>
//         <div className="p-5">
//           <div className="flex justify-between items-start">
//             <div>
//               <h4 className="font-semibold">Amul Taaza Milk (1L)</h4>
//               <p className="text-emerald-600 font-medium">₹62 <span className="line-through text-gray-400 text-sm">₹68</span></p>
//             </div>
//             <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">18% OFF</div>
//           </div>
//           <button className="mt-4 w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-medium active:scale-[0.985] transition-transform">
//             Add to Cart • 1 tap
//           </button>
//         </div>
//       </motion.div>
//     );
//   }
  
//   if (type === "meal") {
//     return (
//       <motion.div className="glass p-5 rounded-3xl border">
//         <h4 className="font-semibold mb-4 flex items-center gap-2">🥗 3-Day High Protein Plan</h4>
//         <div className="space-y-4">
//           {["Breakfast: Greek Yogurt + Eggs", "Lunch: Grilled Chicken Bowl", "Dinner: Paneer Stir Fry"].map((item, i) => (
//             <div key={i} className="flex gap-3 text-sm">
//               <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">✓</div>
//               <div>{item}</div>
//             </div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   }

//   return null;
// }

// function AgentWorkflow() {
//   const steps = ["Intent Analyzer", "Product Search", "Inventory Check", "Price Comparison", "Recommendation", "Cart Builder"];
  
//   return (
//     <div className="space-y-6">
//       <div className="text-sm uppercase tracking-widest text-gray-400 font-medium">Shopping Crew • Live</div>
//       <div className="space-y-8">
//         {steps.map((step, index) => (
//           <motion.div 
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="flex items-center gap-4"
//           >
//             <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-medium text-sm">
//               {index + 1}
//             </div>
//             <div className="flex-1 h-px bg-gradient-to-r from-violet-200 via-gray-200 to-transparent" />
//             <div className="text-sm font-medium">{step}</div>
//             <div className="text-emerald-500">✓</div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function AIAssistant() {
//   const [messages, setMessages] = useState(mockMessages);
//   const [input, setInput] = useState("");
//   const [activeAgent, setActiveAgent] = useState(agents[0]);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showVoice, setShowVoice] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const chatRef = useRef(null);

//   // Auto scroll
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTo({
//         top: chatRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   }, [messages, isTyping]);

//   const sendMessage = () => {
//     if (!input.trim()) return;
    
//     const userMsg = { id: Date.now(), type: "user", content: input, time: "10:28 AM" };
//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
    
//     setIsTyping(true);
    
//     setTimeout(() => {
//       setIsTyping(false);
//       const assistantReply = {
//         id: Date.now() + 1,
//         type: "assistant",
//         content: "I've analyzed your request and created a smart shopping list with 7 items under ₹850. Here's the optimized cart:",
//         time: "10:28 AM"
//       };
//       setMessages(prev => [...prev, assistantReply]);
//     }, 1800);
//   };

//   const handleSuggestedPrompt = (prompt) => {
//     setInput(prompt);
//     setTimeout(() => sendMessage(), 100);
//   };

//   return (
//     <div className="h-screen flex flex-col overflow-hidden bg-zinc-950 text-white">
//       {/* Top Metrics Bar */}
//       <div className="h-14 border-b border-white/10 bg-zinc-900/80 backdrop-blur-xl flex items-center px-6 z-50">
//         <div className="flex-1 flex items-center gap-8">
//           <div>
//             <div className="text-[10px] uppercase tracking-widest text-zinc-500">AI Requests Today</div>
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-2xl font-semibold text-white tabular-nums">184
//             </motion.div>
//           </div>
//           <div>
//             <div className="text-[10px] uppercase tracking-widest text-zinc-500">Money Saved</div>
//             <motion.div className="text-2xl font-semibold text-emerald-400 tabular-nums">₹2,840</motion.div>
//           </div>
//           <div>
//             <div className="text-[10px] uppercase tracking-widest text-zinc-500">Active Agents</div>
//             <motion.div className="text-2xl font-semibold text-white tabular-nums">4</motion.div>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="px-4 py-1.5 bg-white/5 rounded-2xl text-xs flex items-center gap-2 border border-white/10">
//             <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
//             All systems operational
//           </div>
//           <button className="px-5 py-2 text-sm font-medium bg-white text-black rounded-2xl hover:bg-white/90 transition-colors">
//             New Session
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* LEFT SIDEBAR - Agents */}
//         <div className="w-80 border-r border-white/10 bg-zinc-900 flex flex-col">
//           <div className="p-6 border-b border-white/10">
//             <div className="uppercase text-xs tracking-[2px] text-zinc-500 font-medium mb-1">AI COMMAND CENTER</div>
//             <h1 className="text-3xl font-bold tracking-tighter">SmartCart AI</h1>
//           </div>

//           <div className="p-6 flex-1 overflow-auto space-y-3 custom-scroll">
//             {agents.map((agent) => (
//               <AgentCard 
//                 key={agent.id} 
//                 agent={agent} 
//                 isActive={activeAgent.id === agent.id}
//                 onSelect={setActiveAgent}
//               />
//             ))}
//           </div>

//           <div className="p-4 border-t border-white/10">
//             <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-2xl text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2">
//               <RefreshCw size={18} /> Deploy New Agent
//             </button>
//           </div>
//         </div>

//         {/* CENTER CHAT */}
//         <div className="flex-1 flex flex-col">
//           {/* Chat Header */}
//           <div className="h-16 border-b border-white/10 bg-zinc-900/80 backdrop-blur flex items-center px-8 justify-between">
//             <div className="flex items-center gap-4">
//               <div className="text-2xl">{activeAgent.icon}</div>
//               <div>
//                 <div className="font-semibold">{activeAgent.name}</div>
//                 <div className="text-xs text-emerald-400 flex items-center gap-1.5">
//                   <span className="inline-block w-2 h-2 bg-current rounded-full" /> LIVE
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 text-sm">
//               <button className="flex items-center gap-2 px-5 py-2 rounded-2xl hover:bg-white/5 transition-colors">
//                 <Play size={18} /> History
//               </button>
//               <button className="flex items-center gap-2 px-5 py-2 rounded-2xl hover:bg-white/5 transition-colors">
//                 Clear Chat
//               </button>
//             </div>
//           </div>

//           {/* Chat Area */}
//           <div 
//             ref={chatRef}
//             className="flex-1 overflow-auto p-8 custom-scroll space-y-8 bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[length:40px_40px]"
//           >
//             {messages.length === 1 && (
//               <EmptyState onPromptClick={handleSuggestedPrompt} />
//             )}

//             <AnimatePresence>
//               {messages.map((msg, idx) => (
//                 <MessageBubble 
//                   key={idx} 
//                   message={msg} 
//                   onRegenerate={() => {}} 
//                   onCopy={() => navigator.clipboard.writeText(msg.content)}
//                 />
//               ))}
//             </AnimatePresence>

//             {isTyping && <TypingIndicator />}
            
//             {/* Smart Response Cards */}
//             {messages.length > 1 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
//                 <ResponseCard type="product" />
//                 <ResponseCard type="meal" />
//               </div>
//             )}

//             {/* Agent Workflow */}
//             {messages.length > 2 && (
//               <div className="mt-10">
//                 <AgentWorkflow />
//               </div>
//             )}
//           </div>

//           {/* Input Area */}
//           <div className="p-6 border-t border-white/10 bg-zinc-900">
//             <div className="glass border border-white/20 bg-zinc-950/70 rounded-3xl p-2 shadow-2xl">
//               <div className="flex items-center gap-3 px-4">
//                 <button 
//                   onClick={() => setShowVoice(true)}
//                   className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
//                 >
//                   <Mic size={22} className="text-violet-400" />
//                 </button>
                
//                 <button className="p-3 hover:bg-white/10 rounded-2xl transition-colors">
//                   <Paperclip size={22} />
//                 </button>

//                 <textarea
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       sendMessage();
//                     }
//                   }}
//                   placeholder="Ask anything about shopping, meals, or budgets..."
//                   rows={1}
//                   className="flex-1 bg-transparent py-5 px-4 outline-none resize-y max-h-[180px] text-[15px]"
//                 />

//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={sendMessage}
//                   disabled={!input.trim()}
//                   className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 disabled:opacity-40 rounded-2xl flex items-center justify-center transition-all active:scale-95"
//                 >
//                   <Send size={22} />
//                 </motion.button>
//               </div>
//             </div>

//             {/* Prompt Suggestions */}
//             <div className="flex gap-2 mt-4 flex-wrap">
//               {suggestedPrompts.slice(0, 4).map((prompt, i) => (
//                 <button 
//                   key={i}
//                   onClick={() => handleSuggestedPrompt(prompt)}
//                   className="text-xs px-5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl transition-colors"
//                 >
//                   {prompt}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* RIGHT PANEL - Activity + Insights */}
//         <div className="w-80 border-l border-white/10 bg-zinc-900 flex flex-col">
//           <div className="p-6 border-b border-white/10">
//             <div className="uppercase text-xs tracking-widest mb-3 text-zinc-400">LIVE ACTIVITY</div>
//           </div>

//           <div className="flex-1 overflow-auto custom-scroll p-6 space-y-8">
//             {/* Insights */}
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="text-amber-400">💡</span>
//                 <div className="uppercase text-xs tracking-widest text-zinc-400">AI INSIGHTS</div>
//               </div>
//               <div className="space-y-3">
//                 {insights.map((insight, i) => (
//                   <motion.div 
//                     key={i}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.1 }}
//                     className="text-sm leading-snug bg-zinc-800/70 p-4 rounded-2xl border-l-4 border-amber-400"
//                   >
//                     {insight}
//                   </motion.div>
//                 ))}
//               </div>
//             </div>

//             {/* Activity Feed */}
//             <div>
//               <div className="uppercase text-xs tracking-widest text-zinc-400 mb-4">AGENT LOG</div>
//               <div className="space-y-6">
//                 {mockActivity.map((act, index) => (
//                   <motion.div 
//                     key={index}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="flex gap-4"
//                   >
//                     <div className="text-xs text-zinc-500 font-mono pt-0.5 whitespace-nowrap">{act.time}</div>
//                     <div>
//                       <div className="text-xl mb-1">{act.agent}</div>
//                       <div className="text-sm text-zinc-300 leading-tight">{act.event}</div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Voice Modal */}
//           <AnimatePresence>
//             {showVoice && (
//               <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90">
//                 <motion.div 
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   exit={{ scale: 0.8, opacity: 0 }}
//                   className="w-[380px] glass rounded-3xl p-10 text-center"
//                 >
//                   <div className="mx-auto mb-8 w-24 h-24 rounded-full border-8 border-violet-500/30 flex items-center justify-center relative">
//                     <motion.div 
//                       animate={{ scale: isListening ? [1, 1.4, 1] : 1 }}
//                       transition={{ repeat: Infinity, duration: 1.8 }}
//                       className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center"
//                     >
//                       <Mic size={48} className="text-violet-400" />
//                     </motion.div>
//                   </div>

//                   <div className="text-2xl font-medium mb-2">
//                     {isListening ? "Listening..." : "Speak now"}
//                   </div>
//                   <p className="text-zinc-400 text-sm mb-10">Your voice is being processed by the Shopping Crew</p>

//                   <div 
//                     onClick={() => {
//                       setIsListening(!isListening);
//                       setTimeout(() => {
//                         setShowVoice(false);
//                         setIsListening(false);
//                         // Simulate voice input
//                         setInput("Build me an emergency grocery list for 2 days");
//                         setTimeout(sendMessage, 400);
//                       }, 2200);
//                     }}
//                     className="cursor-pointer mx-auto w-40 h-40 rounded-full border border-white/30 flex items-center justify-center text-sm uppercase tracking-widest hover:bg-white/5 transition-colors"
//                   >
//                     {isListening ? "END" : "TAP TO SPEAK"}
//                   </div>
//                 </motion.div>
//               </div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState({ onPromptClick }) {
//   return (
//     <div className="h-full flex flex-col items-center justify-center text-center pt-12">
//       <motion.div 
//         animate={{ rotate: [0, 12, -12, 0] }}
//         transition={{ duration: 4, repeat: Infinity }}
//         className="text-[120px] mb-6"
//       >
//         🛍️
//       </motion.div>
      
//       <h2 className="text-4xl font-semibold tracking-tighter mb-3">How can I help you shop today?</h2>
//       <p className="text-zinc-400 max-w-md">Ask me anything — from smart grocery lists to personalized meal plans and budget optimization.</p>

//       <div className="mt-12 grid grid-cols-1 gap-3 w-full max-w-md">
//         {suggestedPrompts.map((prompt, i) => (
//           <motion.button 
//             key={i}
//             whileHover={{ scale: 1.01 }}
//             onClick={() => onPromptClick(prompt)}
//             className="text-left px-6 py-5 rounded-3xl border border-white/10 hover:border-white/30 bg-zinc-900/70 hover:bg-zinc-900 transition-all text-sm"
//           >
//             {prompt}
//           </motion.button>
//         ))}
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askAssistant, runAgent, pushUser, clear } from "../../features/ai/aiSlice";
import useVoiceInput from "../../hooks/useVoiceInput";

import MetricsBar from "../../components/ai/MetricsBar";
import AgentSidebar from "../../components/ai/AgentSidebar";
import ChatWindow from "../../components/ai/ChatWindow";
import ChatInput from "../../components/ai/ChatInput";
import ActivityPanel from "../../components/ai/ActivityPanel";
import { AGENTS } from "../../components/ai/agents.config";
import { Trash2, Menu } from "lucide-react";

export default function AIAssistant() {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((s) => s.ai);

  // Optional metrics/insights slice — falls back to zeros if not wired up yet.
  const metrics = useSelector((s) => s.ai?.metrics) ?? {};
  const insights = useSelector((s) => s.ai?.insights) ?? [];

  const [text, setText] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const { listening, text: voice, start, stop, supported } = useVoiceInput();

  useEffect(() => { if (voice) setText(voice); }, [voice]);

  // Clicking an agent card only fills the input + remembers the agent. No API call yet.
  const selectAgent = (agent) => {
    setText(agent.ex);
    setSelectedAgent(agent.k);
    setMobileDrawer(false);
  };

  const send = (msg) => {
    if (!msg?.trim()) return;
    dispatch(pushUser(msg));
    setText("");
    if (selectedAgent) {
      dispatch(runAgent({ key: selectedAgent, message: msg }));
    } else {
      dispatch(askAssistant(msg));
    }
    setSelectedAgent(null);
  };

  const handleRegenerate = (message) => {
    // Re-run the last user message preceding this assistant reply.
    const idx = history.indexOf(message);
    const lastUser = [...history.slice(0, idx)].reverse().find((m) => m.role === "user");
    if (lastUser) send(lastUser.text);
  };

  const handleClear = () => {
    dispatch(clear());
    setSelectedAgent(null);
    setText("");
  };

  const isCrew = selectedAgent === "shopping-crew";

  return (
    <div className="min-h-screen flex bg-[#0a0c12] bg-[radial-gradient(circle_at_20%_-10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(217,70,239,0.12),transparent_40%)] text-white">
      {/* Desktop sidebar */}
      <AgentSidebar selectedAgent={selectedAgent} onSelectAgent={selectAgent} />

      {/* Mobile drawer */}
      {mobileDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileDrawer(false)} />
          <div className="relative z-10">
            <AgentSidebar selectedAgent={selectedAgent} onSelectAgent={selectAgent} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-4 sm:px-6 pt-5 pb-3 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileDrawer(true)} className="lg:hidden rounded-lg border border-white/10 p-2 text-white/60">
                <Menu size={16} />
              </button>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">AI Shopping Assistant</h1>
                <p className="text-xs text-white/40">{AGENTS.length} autonomous agents · Hindi / English / Hinglish</p>
              </div>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.08]"
            >
              <Trash2 size={13} /> Clear
            </button>
          </div>

          <MetricsBar stats={metrics} />
        </div>

        {/* Chat */}
        <ChatWindow
          history={history}
          loading={loading}
          isCrew={isCrew}
          onPickPrompt={(p) => setText(p)}
          onRegenerate={handleRegenerate}
        />

        <ChatInput
          text={text}
          setText={setText}
          onSend={send}
          loading={loading}
          selectedAgent={selectedAgent}
          onClearAgent={() => setSelectedAgent(null)}
          voice={{ listening, text: voice, start, stop, supported }}
        />
      </div>

      <ActivityPanel insights={insights} />
    </div>
  );
}