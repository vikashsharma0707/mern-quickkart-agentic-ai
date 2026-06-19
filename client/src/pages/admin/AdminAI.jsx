import { useState } from "react";
import api from "../../api/axios";
export default function AdminAI() {
  const [horizon, setH] = useState("tomorrow"); const [out, setOut] = useState(null);
  const [log, setLog] = useState("");
  const run = async () => {
    const r = await api.post("/ai/admin/inventory-prediction", { horizon });
    setOut(r.data.data);
  };
  const rebuild = async () => {
    const r = await api.post("/ai/rag/rebuild");
    setLog(r.data.message);
  };
  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">AI Control Center</h1>
      <div className="card p-4">
        <div className="font-semibold mb-2">Inventory Prediction</div>
        <div className="flex gap-2 mb-3">
          <select className="input w-40" value={horizon} onChange={(e) => setH(e.target.value)}>
            <option>tomorrow</option><option>week</option>
          </select>
          <button className="btn btn-primary" onClick={run}>Predict</button>
        </div>
        {out && (
          <table className="text-sm w-full"><thead><tr className="text-left"><th>Item</th><th>Predicted</th><th>Stock</th><th>Reorder?</th></tr></thead>
          <tbody>{out.predictions.map((p) => (
            <tr key={p.name} className="border-t">
              <td>{p.name}</td><td>{p.predicted}</td><td>{p.stock}</td><td className={p.reorder ? "text-red-600" : "text-green-600"}>{p.reorder ? "YES" : "OK"}</td>
            </tr>))}</tbody></table>
        )}
      </div>
      <div className="card p-4">
        <div className="font-semibold mb-2">RAG Knowledge Base</div>
        <button className="btn btn-outline" onClick={rebuild}>Rebuild Index</button>
        {log && <div className="text-green-700 text-sm mt-2">✅ {log}</div>}
      </div>
    </div>
  );
}
