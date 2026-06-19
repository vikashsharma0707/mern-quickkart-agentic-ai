import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [d, setD] = useState(null);
  useEffect(() => { api.get("/admin/dashboard").then((r) => setD(r.data.data)); }, []);
  if (!d) return <div className="p-10">Loading…</div>;
  const s = d.stats;
  const tiles = [
    ["Users", s.users, "👥"], ["Orders", s.orders, "📦"], ["Revenue", `₹${s.revenue}`, "💰"],
    ["Pending", s.pending, "⏳"], ["Delivered", s.delivered, "✅"], ["Partners Online", s.partners, "🛵"],
    ["Out of Stock", s.outOfStock, "🚫"],
  ];
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link to="/admin/products" className="btn btn-outline">Products</Link>
          <Link to="/admin/orders" className="btn btn-outline">Orders</Link>
          <Link to="/admin/ai" className="btn btn-primary">AI Control</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tiles.map(([t, v, e]) => (
          <div key={t} className="card p-4">
            <div className="text-2xl">{e}</div>
            <div className="text-gray-500 text-xs uppercase">{t}</div>
            <div className="text-2xl font-bold">{v}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card p-4">
          <div className="font-semibold mb-2">Daily Revenue (last 7d)</div>
          {d.daily.length ? d.daily.map((x) => (
            <div key={x._id} className="flex items-center gap-2 text-sm py-1">
              <span className="w-24">{x._id}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded"><div className="h-2 bg-brand rounded" style={{ width: `${Math.min(100, x.total / 10)}%` }} /></div>
              <span className="w-20 text-right font-semibold">₹{x.total}</span>
            </div>
          )) : <div className="text-gray-400 text-sm">No data yet.</div>}
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Top Products</div>
          {d.topProducts.map((p) => (
            <div key={p._id} className="flex justify-between text-sm py-1">
              <span>{p._id}</span><span className="font-semibold">{p.qty} sold · ₹{p.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
