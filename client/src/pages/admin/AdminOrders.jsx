import { useEffect, useState } from "react";
import api from "../../api/axios";
const STATUSES = ["placed","confirmed","packed","out_for_delivery","delivered","cancelled"];
export default function AdminOrders() {
  const [list, setList] = useState([]);
  const load = () => api.get("/orders").then((r) => setList(r.data.data));
  useEffect(() => { load(); }, []);
  const update = async (id, status) => { await api.put(`/orders/${id}/status`, { status }); load(); };
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      <div className="card divide-y">
        {list.map((o) => (
          <div key={o._id} className="p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-semibold">#{o._id.slice(-6)} · {o.user?.name}</div>
              <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()} · ₹{o.amount}</div>
            </div>
            <select className="input w-44" value={o.status} onChange={(e) => update(o._id, e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
