import { useEffect, useState } from "react";
import api from "../../api/axios";
import { socket } from "../../api/socket";
const STATUSES = ["packed","out_for_delivery","delivered"];
export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [earnings, setE] = useState({ earnings: 0, deliveredCount: 0 });
  const [online, setOnline] = useState(true);
  const load = async () => {
    setOrders((await api.get("/delivery/orders")).data.data);
    setE((await api.get("/delivery/earnings")).data.data);
  };
  useEffect(() => { load(); }, []);
  const toggle = async () => {
    const r = await api.post("/delivery/online", { online: !online });
    setOnline(r.data.data.online);
  };
  const update = async (id, status) => { await api.put(`/orders/${id}/status`, { status }); load(); };
  const sendLoc = () => {
    navigator.geolocation?.getCurrentPosition(async (p) => {
      const loc = { lat: p.coords.latitude, lng: p.coords.longitude };
      await api.post("/delivery/location", loc);
      socket.emit("partner:location", { partnerId: "me", ...loc });
    });
  };
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Delivery Partner</h1>
        <button onClick={toggle} className={`btn ${online ? "bg-green-600 text-white" : "btn-outline"}`}>{online ? "🟢 Online" : "🔘 Offline"}</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4"><div className="text-xs text-gray-500">Earnings</div><div className="text-2xl font-bold">₹{earnings.earnings}</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500">Delivered</div><div className="text-2xl font-bold">{earnings.deliveredCount}</div></div>
        <button className="card p-4 text-left hover:shadow-md" onClick={sendLoc}><div className="text-xs text-gray-500">Share GPS</div><div className="text-lg">📍 Update location</div></button>
      </div>
      <div className="card divide-y">
        {orders.map((o) => (
          <div key={o._id} className="p-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="font-semibold">#{o._id.slice(-6)} · ₹{o.amount}</div>
              <div className="text-xs text-gray-500">{o.address?.line1}, {o.address?.city}</div>
            </div>
            <select className="input w-44" value={o.status} onChange={(e) => update(o._id, e.target.value)}>
              {[o.status, ...STATUSES.filter((s) => s !== o.status)].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
        {!orders.length && <div className="p-4 text-gray-400">No assigned orders.</div>}
      </div>
    </div>
  );
}
