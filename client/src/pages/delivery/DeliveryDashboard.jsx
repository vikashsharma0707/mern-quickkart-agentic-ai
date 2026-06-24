// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { socket } from "../../api/socket";
// const STATUSES = ["packed","out_for_delivery","delivered"];
// export default function DeliveryDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [earnings, setE] = useState({ earnings: 0, deliveredCount: 0 });
//   const [online, setOnline] = useState(true);
//   const load = async () => {
//     setOrders((await api.get("/delivery/orders")).data.data);
//     setE((await api.get("/delivery/earnings")).data.data);
//   };
//   useEffect(() => { load(); }, []);
//   const toggle = async () => {
//     const r = await api.post("/delivery/online", { online: !online });
//     setOnline(r.data.data.online);
//   };
//   const update = async (id, status) => { await api.put(`/orders/${id}/status`, { status }); load(); };
//   const sendLoc = () => {
//     navigator.geolocation?.getCurrentPosition(async (p) => {
//       const loc = { lat: p.coords.latitude, lng: p.coords.longitude };
//       await api.post("/delivery/location", loc);
//       socket.emit("partner:location", { partnerId: "me", ...loc });
//     });
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Delivery Partner</h1>
//         <button onClick={toggle} className={`btn ${online ? "bg-green-600 text-white" : "btn-outline"}`}>{online ? "🟢 Online" : "🔘 Offline"}</button>
//       </div>
//       <div className="grid grid-cols-3 gap-3">
//         <div className="card p-4"><div className="text-xs text-gray-500">Earnings</div><div className="text-2xl font-bold">₹{earnings.earnings}</div></div>
//         <div className="card p-4"><div className="text-xs text-gray-500">Delivered</div><div className="text-2xl font-bold">{earnings.deliveredCount}</div></div>
//         <button className="card p-4 text-left hover:shadow-md" onClick={sendLoc}><div className="text-xs text-gray-500">Share GPS</div><div className="text-lg">📍 Update location</div></button>
//       </div>
//       <div className="card divide-y">
//         {orders.map((o) => (
//           <div key={o._id} className="p-3 flex items-center gap-3">
//             <div className="flex-1">
//               <div className="font-semibold">#{o._id.slice(-6)} · ₹{o.amount}</div>
//               <div className="text-xs text-gray-500">{o.address?.line1}, {o.address?.city}</div>
//             </div>
//             <select className="input w-44" value={o.status} onChange={(e) => update(o._id, e.target.value)}>
//               {[o.status, ...STATUSES.filter((s) => s !== o.status)].map((s) => <option key={s} value={s}>{s}</option>)}
//             </select>
//           </div>
//         ))}
//         {!orders.length && <div className="p-4 text-gray-400">No assigned orders.</div>}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, PackageCheck, MapPin, Power, Loader2 } from "lucide-react";

import api from "../../api/axios";
import { socket } from "../../api/socket";
import Stat from "../../components/dashboard/Stat";
import ChartCard from "../../components/dashboard/ChartCard";
import { SkeletonCard, EmptyState } from "../../components/dashboard/SkeletonCard";

const STATUSES = ["packed", "out_for_delivery", "delivered"];

const STATUS_LABEL = {
  packed: "Packed",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const STATUS_STYLE = {
  packed: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  out_for_delivery: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

export default function DeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [earnings, setE] = useState({ earnings: 0, deliveredCount: 0 });
  const [online, setOnline] = useState(true);
  const [loading, setLoading] = useState(true);
  const [locLoading, setLocLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const load = async () => {
    try {
      const [o, e] = await Promise.all([api.get("/delivery/orders"), api.get("/delivery/earnings")]);
      setOrders(o.data.data ?? []);
      setE(e.data.data ?? { earnings: 0, deliveredCount: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async () => {
    const r = await api.post("/delivery/online", { online: !online });
    setOnline(r.data.data.online);
  };

  const update = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/orders/${id}/status`, { status });
      await load();
    } finally {
      setUpdatingId(null);
    }
  };

  const sendLoc = () => {
    setLocLoading(true);
    navigator.geolocation?.getCurrentPosition(
      async (p) => {
        const loc = { lat: p.coords.latitude, lng: p.coords.longitude };
        await api.post("/delivery/location", loc);
        socket.emit("partner:location", { partnerId: "me", ...loc });
        setLocLoading(false);
      },
      () => setLocLoading(false)
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] bg-[radial-gradient(circle_at_20%_-10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(217,70,239,0.12),transparent_40%)] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Delivery Partner</h1>
            <p className="text-sm text-white/40 mt-0.5">Manage your assigned orders & status</p>
          </div>

          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.96 }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-colors ${
              online
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : "bg-white/[0.04] text-white/50 border-white/10"
            }`}
          >
            <span className={`relative h-2.5 w-2.5 rounded-full ${online ? "bg-emerald-400" : "bg-white/30"}`}>
              {online && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
            </span>
            {online ? "Online" : "Offline"}
            <Power size={14} />
          </motion.button>
        </header>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {loading ? (
            <>
              <SkeletonCard className="h-20" />
              <SkeletonCard className="h-20" />
              <SkeletonCard className="h-20" />
            </>
          ) : (
            <>
              <Stat icon={IndianRupee} label="Earnings" value={`₹${(earnings.earnings ?? 0).toLocaleString("en-IN")}`} tint="text-emerald-300" />
              <Stat icon={PackageCheck} label="Delivered" value={earnings.deliveredCount ?? 0} tint="text-cyan-300" />
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={sendLoc}
                disabled={locLoading}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex items-center gap-3 text-left hover:bg-white/[0.06] transition-colors disabled:opacity-60"
              >
                <div className="rounded-lg p-2 bg-white/[0.06] border border-white/10 text-fuchsia-300">
                  {locLoading ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} strokeWidth={1.75} />}
                </div>
                <div>
                  <p className="text-xs text-white/45">Share GPS</p>
                  <p className="text-sm font-semibold text-white">{locLoading ? "Updating…" : "Update location"}</p>
                </div>
              </motion.button>
            </>
          )}
        </section>

        {/* ASSIGNED ORDERS */}
        <ChartCard title="Assigned Orders" subtitle={`${orders.length} order${orders.length === 1 ? "" : "s"}`}>
          {loading ? (
            <div className="space-y-2">
              <SkeletonCard className="h-16" />
              <SkeletonCard className="h-16" />
              <SkeletonCard className="h-16" />
            </div>
          ) : orders.length ? (
            <div className="divide-y divide-white/5">
              {orders.map((o, i) => (
                <motion.div
                  key={o._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="py-3 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">#{o._id.slice(-6)}</span>
                      <span className="text-white/40 text-sm">₹{o.amount}</span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[o.status] || "bg-white/10 text-white/60 border-white/20"}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {STATUS_LABEL[o.status] ?? o.status}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 truncate">
                      {o.address?.line1}{o.address?.line1 && o.address?.city ? ", " : ""}{o.address?.city}
                    </p>
                  </div>

                  <select
                    className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400/50 disabled:opacity-50"
                    value={o.status}
                    disabled={updatingId === o._id}
                    onChange={(e) => update(o._id, e.target.value)}
                  >
                    {[o.status, ...STATUSES.filter((s) => s !== o.status)].map((s) => (
                      <option key={s} value={s} className="bg-[#11131c]">
                        {STATUS_LABEL[s] ?? s}
                      </option>
                    ))}
                  </select>
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="No assigned orders" subtitle="New deliveries will appear here once assigned." />
          )}
        </ChartCard>
      </div>
    </div>
  );
}