// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { askAssistant, runAgent, pushUser, clear } from "../../features/ai/aiSlice";
// import useVoiceInput from "../../hooks/useVoiceInput";

// const AGENTS = [
//   { k: "chat-to-order", t: "💬 Chat to Order", ex: "2 kg onions, 1 Amul milk aur 12 eggs order kar do" },
//   { k: "grocery-planner", t: "🧺 Grocery Planner", ex: "5 logon ke liye 1 week ka grocery plan banao" },
//   { k: "meal-planning", t: "🥗 Meal Planner (RAG)", ex: "7 din ka high protein diet plan banao" },
//   { k: "festival-shopping", t: "🎉 Festival Shopping", ex: "Ganesh Chaturthi ke liye shopping karni hai" },
//   { k: "budget-optimization", t: "💰 Budget Optimizer", ex: "₹2500 ke andar monthly groceries" },
//   { k: "shopping-crew", t: "🤖 Multi-Agent Crew", ex: "Best weekly basket under ₹1000" },
//   { k: "emergency-shopping", t: "🚨 Emergency Shopping", ex: "Guest aa rahe hain 30 minute me" },
//   { k: "personal-shopper", t: "🛍️ Personal Shopper", ex: "Mere usual items order kar do" },
//   { k: "whatsapp-ordering", t: "📩 Send Groceries", ex: "Maa ke ghar par ₹1500 ke groceries bhej do" },
//   { k: "negotiation", t: "🤝 Deal Negotiator", ex: "Cheapest monthly grocery basket" },
//   { k: "health-aware", t: "🩺 Health Aware", ex: "I am diabetic, suggest safe snacks" },
//   { k: "family-shopping", t: "👨‍👩‍👧 Family Cart Merge", ex: "Merge my family's carts" },
//   { k: "seasonal", t: "🍋 Seasonal Picks", ex: "What's good this season?" },
//   { k: "auto-reorder", t: "🔁 Auto Reorder", ex: "What should I reorder?" },
//   { k: "autonomous", t: "⚙️ Auto Mode Check", ex: "Run my auto-ordering rules now" },
// ];

// export default function AIAssistant() {
//   const dispatch = useDispatch();
//   const { history, loading } = useSelector((s) => s.ai);
//   const [text, setText] = useState("");
//   const { listening, text: voice, start, stop, supported } = useVoiceInput();
//   const endRef = useRef();
//   useEffect(() => { if (voice) setText(voice); }, [voice]);
//   useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

//   const send = (msg, agentKey) => {
//     if (!msg?.trim()) return;
//     dispatch(pushUser(msg));
//     setText("");
//     if (agentKey) dispatch(runAgent({ key: agentKey, message: msg }));
//     else dispatch(askAssistant(msg));
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 mb-4">
//         <div className="text-2xl font-bold">🤖 AI Shopping Assistant</div>
//         <div className="text-sm opacity-80">One chat, 20 autonomous agents. Hindi / English / Hinglish.</div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
//         {AGENTS.map((a) => (
//           <button key={a.k} onClick={() => send(a.ex, a.k)} className="card p-3 text-left hover:border-brand hover:shadow-md transition">
//             <div className="font-semibold text-sm">{a.t}</div>
//             <div className="text-xs text-gray-500 mt-1 italic">"{a.ex}"</div>
//           </button>
//         ))}
//       </div>

//       <div className="card p-4 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3">
//         {!history.length && <div className="text-gray-400 text-sm">Click a quick card above or type your request below.</div>}
//         {history.map((m, i) => (
//           <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
//             <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-brand text-white" : "bg-gray-100"}`}>
//               {m.role === "user" ? m.text : <AssistantMsg p={m.payload} />}
//             </div>
//           </div>
//         ))}
//         {loading && <div className="text-gray-400 text-sm">🤖 Thinking…</div>}
//         <div ref={endRef} />
//       </div>

//       <div className="mt-3 flex gap-2">
//         {supported && (
//           <button onClick={listening ? stop : start} className={`btn ${listening ? "bg-red-500 text-white" : "btn-outline"}`}>
//             {listening ? "🎙️ Stop" : "🎤"}
//           </button>
//         )}
//         <input className="input flex-1" placeholder="Type or speak..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)} />
//         <button className="btn btn-primary" onClick={() => send(text)} disabled={loading}>Send</button>
//         <button className="btn btn-outline" onClick={() => dispatch(clear())}>Clear</button>
//       </div>
//     </div>
//   );
// }

// function AssistantMsg({ p }) {
//   if (!p) return null;
//   return (
//     <div className="text-sm space-y-1">
//       <div className="text-xs uppercase font-bold text-purple-700">{p.agent}</div>
//       <div>{p.reply}</div>
//       {p.added?.length > 0 && (
//         <div className="text-xs mt-1">
//           ✅ Added: {p.added.map((a) => `${a.qty}× ${a.name}`).join(", ")}
//         </div>
//       )}
//       {p.notFound?.length > 0 && (
//         <div className="text-xs text-red-600">⚠ Not found: {p.notFound.join(", ")}</div>
//       )}
//       {p.sources?.length > 0 && (
//         <div className="text-xs text-gray-500">📚 Sources: {p.sources.length}</div>
//       )}
//       {p.alternatives?.length > 0 && (
//         <ul className="text-xs list-disc pl-4">{p.alternatives.map((a) => <li key={a._id}>{a.name} — ₹{a.price}</li>)}</ul>
//       )}
//       {p.predictions?.length > 0 && (
//         <table className="text-xs mt-1 w-full">
//           <thead><tr><th className="text-left">Item</th><th>Pred</th><th>Stock</th></tr></thead>
//           <tbody>{p.predictions.slice(0, 6).map((x) => (<tr key={x.name}><td>{x.name}</td><td>{x.predicted}</td><td className={x.reorder ? "text-red-600" : ""}>{x.stock}</td></tr>))}</tbody>
//         </table>
//       )}
//     </div>
//   );
// }









import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { askAssistant, runAgent, pushUser, clear } from "../../features/ai/aiSlice";
import useVoiceInput from "../../hooks/useVoiceInput";

const AGENTS = [
  { k: "chat-to-order", t: "💬 Chat to Order", ex: "2 kg onions, 1 Amul milk aur 12 eggs order kar do" },
  { k: "grocery-planner", t: "🧺 Grocery Planner", ex: "5 logon ke liye 1 week ka grocery plan banao" },
  { k: "meal-planning", t: "🥗 Meal Planner (RAG)", ex: "7 din ka high protein diet plan banao" },
  { k: "festival-shopping", t: "🎉 Festival Shopping", ex: "Ganesh Chaturthi ke liye shopping karni hai" },
  { k: "budget-optimization", t: "💰 Budget Optimizer", ex: "₹2500 ke andar monthly groceries" },
  { k: "shopping-crew", t: "🤖 Multi-Agent Crew", ex: "Best weekly basket under ₹1000" },
  { k: "emergency-shopping", t: "🚨 Emergency Shopping", ex: "Guest aa rahe hain 30 minute me" },
  { k: "personal-shopper", t: "🛍️ Personal Shopper", ex: "Mere usual items order kar do" },
  { k: "whatsapp-ordering", t: "📩 Send Groceries", ex: "Maa ke ghar par ₹1500 ke groceries bhej do" },
  { k: "negotiation", t: "🤝 Deal Negotiator", ex: "Cheapest monthly grocery basket" },
  { k: "health-aware", t: "🩺 Health Aware", ex: "I am diabetic, suggest safe snacks" },
  { k: "family-shopping", t: "👨‍👩‍👧 Family Cart Merge", ex: "Merge my family's carts" },
  { k: "seasonal", t: "🍋 Seasonal Picks", ex: "What's good this season?" },
  { k: "auto-reorder", t: "🔁 Auto Reorder", ex: "What should I reorder?" },
  { k: "autonomous", t: "⚙️ Auto Mode Check", ex: "Run my auto-ordering rules now" },
];

export default function AIAssistant() {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((s) => s.ai);
  const [text, setText] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { listening, text: voice, start, stop, supported } = useVoiceInput();
  const endRef = useRef();
  useEffect(() => { if (voice) setText(voice); }, [voice]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  // Clicking a card only fills the input + remembers the agent. No API call.
  const selectAgent = (agent) => {
    setText(agent.ex);
    setSelectedAgent(agent.k);
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
    // Reset agent selection after the message is sent.
    setSelectedAgent(null);
  };

  const handleClear = () => {
    dispatch(clear());
    setSelectedAgent(null);
    setText("");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 mb-4">
        <div className="text-2xl font-bold">🤖 AI Shopping Assistant</div>
        <div className="text-sm opacity-80">One chat, 20 autonomous agents. Hindi / English / Hinglish.</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {AGENTS.map((a) => (
          <button
            key={a.k}
            onClick={() => selectAgent(a)}
            className={`card p-3 text-left hover:border-brand hover:shadow-md transition ${
              selectedAgent === a.k ? "border-brand ring-2 ring-brand" : ""
            }`}
          >
            <div className="font-semibold text-sm">{a.t}</div>
            <div className="text-xs text-gray-500 mt-1 italic">"{a.ex}"</div>
          </button>
        ))}
      </div>

      {selectedAgent && (
        <div className="mb-2 flex items-center gap-2 text-xs text-purple-700">
          <span>
            Agent selected: <strong>{AGENTS.find((a) => a.k === selectedAgent)?.t}</strong>
          </span>
          <button
            type="button"
            className="underline"
            onClick={() => setSelectedAgent(null)}
          >
            Clear agent
          </button>
        </div>
      )}

      <div className="card p-4 min-h-[300px] max-h-[420px] overflow-y-auto space-y-3">
        {!history.length && <div className="text-gray-400 text-sm">Click a quick card above or type your request below.</div>}
        {history.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === "user" ? "bg-brand text-white" : "bg-gray-100"}`}>
              {m.role === "user" ? m.text : <AssistantMsg p={m.payload} />}
            </div>
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm">🤖 Thinking…</div>}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2">
        {supported && (
          <button onClick={listening ? stop : start} className={`btn ${listening ? "bg-red-500 text-white" : "btn-outline"}`}>
            {listening ? "🎙️ Stop" : "🎤"}
          </button>
        )}
        <input
          className="input flex-1"
          placeholder="Type or speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(text)}
        />
        <button className="btn btn-primary" onClick={() => send(text)} disabled={loading}>Send</button>
        <button className="btn btn-outline" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

function AssistantMsg({ p }) {
  if (!p) return null;
  return (
    <div className="text-sm space-y-1">
      <div className="text-xs uppercase font-bold text-purple-700">{p.agent}</div>
      <div>{p.reply}</div>
      {p.added?.length > 0 && (
        <div className="text-xs mt-1">
          ✅ Added: {p.added.map((a) => `${a.qty}× ${a.name}`).join(", ")}
        </div>
      )}
      {p.notFound?.length > 0 && (
        <div className="text-xs text-red-600">⚠ Not found: {p.notFound.join(", ")}</div>
      )}
      {p.sources?.length > 0 && (
        <div className="text-xs text-gray-500">📚 Sources: {p.sources.length}</div>
      )}
      {p.alternatives?.length > 0 && (
        <ul className="text-xs list-disc pl-4">{p.alternatives.map((a) => <li key={a._id}>{a.name} — ₹{a.price}</li>)}</ul>
      )}
      {p.predictions?.length > 0 && (
        <table className="text-xs mt-1 w-full">
          <thead><tr><th className="text-left">Item</th><th>Pred</th><th>Stock</th></tr></thead>
          <tbody>{p.predictions.slice(0, 6).map((x) => (<tr key={x.name}><td>{x.name}</td><td>{x.predicted}</td><td className={x.reorder ? "text-red-600" : ""}>{x.stock}</td></tr>))}</tbody>
        </table>
      )}
    </div>
  );
}