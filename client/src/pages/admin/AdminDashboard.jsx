// // // import { useEffect, useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import api from "../../api/axios";

// // // export default function AdminDashboard() {
// // //   const [d, setD] = useState(null);
// // //   useEffect(() => { api.get("/admin/dashboard").then((r) => setD(r.data.data)); }, []);
// // //   if (!d) return <div className="p-10">Loading…</div>;
// // //   const s = d.stats;
// // //   const tiles = [
// // //     ["Users", s.users, "👥"], ["Orders", s.orders, "📦"], ["Revenue", `₹${s.revenue}`, "💰"],
// // //     ["Pending", s.pending, "⏳"], ["Delivered", s.delivered, "✅"], ["Partners Online", s.partners, "🛵"],
// // //     ["Out of Stock", s.outOfStock, "🚫"],
// // //   ];
// // //   return (
// // //     <div className="max-w-7xl mx-auto p-4">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
// // //         <div className="flex gap-2">
// // //           <Link to="/admin/products" className="btn btn-outline">Products</Link>
// // //           <Link to="/admin/orders" className="btn btn-outline">Orders</Link>
// // //           <Link to="/admin/ai" className="btn btn-primary">AI Control</Link>
// // //         </div>
// // //       </div>
// // //       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// // //         {tiles.map(([t, v, e]) => (
// // //           <div key={t} className="card p-4">
// // //             <div className="text-2xl">{e}</div>
// // //             <div className="text-gray-500 text-xs uppercase">{t}</div>
// // //             <div className="text-2xl font-bold">{v}</div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <div className="grid md:grid-cols-2 gap-4 mt-6">
// // //         <div className="card p-4">
// // //           <div className="font-semibold mb-2">Daily Revenue (last 7d)</div>
// // //           {d.daily.length ? d.daily.map((x) => (
// // //             <div key={x._id} className="flex items-center gap-2 text-sm py-1">
// // //               <span className="w-24">{x._id}</span>
// // //               <div className="flex-1 h-2 bg-gray-100 rounded"><div className="h-2 bg-brand rounded" style={{ width: `${Math.min(100, x.total / 10)}%` }} /></div>
// // //               <span className="w-20 text-right font-semibold">₹{x.total}</span>
// // //             </div>
// // //           )) : <div className="text-gray-400 text-sm">No data yet.</div>}
// // //         </div>
// // //         <div className="card p-4">
// // //           <div className="font-semibold mb-2">Top Products</div>
// // //           {d.topProducts.map((p) => (
// // //             <div key={p._id} className="flex justify-between text-sm py-1">
// // //               <span>{p._id}</span><span className="font-semibold">{p.qty} sold · ₹{p.revenue}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // import { useEffect, useMemo, useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   Users, ShoppingBag, IndianRupee, Clock, CheckCircle2, Bike, PackageX, TrendingUp,
// //   Search, Bell, Sun, Moon, Plus, Tag, Ticket, Settings2, ListChecks, Sparkles,
// //   MessageSquare, Wand2, SearchCode, BadgePercent, Radio, ServerCog, Database, Wifi,
// // } from "lucide-react";
// // import {
// //   AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
// //   ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
// // } from "recharts";

// // import api from "../../api/axios";
// // import KpiCard from "../../components/dashboard/KpiCard";
// // import ChartCard from "../../components/dashboard/ChartCard";
// // import DataTable from "../../components/dashboard/DataTable";
// // import StatusBadge from "../../components/dashboard/StatusBadge";
// // import Stat from "../../components/dashboard/Stat";
// // import { SkeletonCard, EmptyState } from "../../components/dashboard/SkeletonCard";

// // const PIE_COLORS = ["#818cf8", "#e879f9", "#34d399", "#fbbf24"];

// // function useClock() {
// //   const [now, setNow] = useState(new Date());
// //   useEffect(() => {
// //     const t = setInterval(() => setNow(new Date()), 1000);
// //     return () => clearInterval(t);
// //   }, []);
// //   return now;
// // }

// // function greeting(hour) {
// //   if (hour < 12) return "Good Morning";
// //   if (hour < 17) return "Good Afternoon";
// //   return "Good Evening";
// // }

// // export default function AdminDashboard() {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [dark, setDark] = useState(true);
// //   const now = useClock();

// //   useEffect(() => {
// //     let mounted = true;
// //     api
// //       .get("/admin/dashboard")
// //       .then((r) => mounted && setData(r.data?.data ?? r.data))
// //       .catch(() => mounted && setData(null))
// //       .finally(() => mounted && setLoading(false));
// //     return () => { mounted = false; };
// //   }, []);

// //   // Safe fallbacks so the UI never breaks on a partial API response.
// //   const s = data?.stats ?? {};
// //   const daily = data?.daily ?? [];
// //   const topProducts = data?.topProducts ?? [];
// //   const recentOrders = data?.recentOrders ?? [];
// //   const activities = data?.activities ?? [];
// //   const inventory = data?.inventory ?? {};
// //   const aiStats = data?.aiStats ?? {};
// //   const deliveryStats = data?.deliveryStats ?? {};

// //   const revenueSeries = useMemo(
// //     () => (daily.length ? daily.map((x) => ({ name: x._id, value: x.total })) : []),
// //     [daily]
// //   );
// //   const ordersSeries = useMemo(
// //     () => (daily.length ? daily.map((x) => ({ name: x._id, value: x.orders ?? Math.round((x.total ?? 0) / 500) })) : []),
// //     [daily]
// //   );
// //   const categorySeries = useMemo(() => {
// //     const c = data?.salesByCategory;
// //     return c?.length ? c : [
// //       { name: "Men", value: 38 }, { name: "Women", value: 34 }, { name: "Kids", value: 18 }, { name: "Accessories", value: 10 },
// //     ];
// //   }, [data]);

// //   const inStock = inventory.inStock ?? 0;
// //   const lowStock = inventory.lowStock ?? 0;
// //   const outOfStock = inventory.outOfStock ?? s.outOfStock ?? 0;
// //   const totalStock = Math.max(1, inStock + lowStock + outOfStock);

// //   const goalCurrent = data?.revenueGoal?.current ?? s.revenue ?? 0;
// //   const goalTarget = data?.revenueGoal?.target ?? 500000;
// //   const goalPct = Math.min(100, Math.round((goalCurrent / goalTarget) * 100));

// //   const kpis = [
// //     { label: "Total Users", value: s.users ?? "—", delta: s.usersDelta ?? 12.4, icon: Users, tint: "indigo" },
// //     { label: "Total Orders", value: s.orders ?? "—", delta: s.ordersDelta ?? 8.1, icon: ShoppingBag, tint: "fuchsia" },
// //     { label: "Revenue", value: `₹${(s.revenue ?? 0).toLocaleString("en-IN")}`, delta: s.revenueDelta ?? 18.5, icon: IndianRupee, tint: "emerald" },
// //     { label: "Pending Orders", value: s.pending ?? "—", delta: s.pendingDelta ?? -3.2, icon: Clock, tint: "amber" },
// //     { label: "Delivered Orders", value: s.delivered ?? "—", delta: s.deliveredDelta ?? 6.7, icon: CheckCircle2, tint: "cyan" },
// //     { label: "Active Delivery Partners", value: s.partners ?? "—", delta: s.partnersDelta ?? 4.0, icon: Bike, tint: "indigo" },
// //     { label: "Out of Stock", value: outOfStock, delta: s.outOfStockDelta ?? -1.5, icon: PackageX, tint: "rose" },
// //     { label: "Conversion Rate", value: `${s.conversionRate ?? 0}%`, delta: s.conversionDelta ?? 2.3, icon: TrendingUp, tint: "fuchsia" },
// //   ];

// //   const quickActions = [
// //     { label: "Add Product", icon: Plus, gradient: "from-indigo-500 to-violet-500" },
// //     { label: "Add Category", icon: Tag, gradient: "from-fuchsia-500 to-pink-500" },
// //     { label: "Create Coupon", icon: Ticket, gradient: "from-emerald-500 to-teal-500" },
// //     { label: "Manage Orders", icon: ListChecks, gradient: "from-amber-500 to-orange-500" },
// //     { label: "AI Settings", icon: Settings2, gradient: "from-cyan-500 to-blue-500" },
// //   ];

// //   const systemStatus = [
// //     { label: "Backend API", online: data?.system?.api ?? true, icon: ServerCog },
// //     { label: "MongoDB", online: data?.system?.mongo ?? true, icon: Database },
// //     { label: "Redis", online: data?.system?.redis ?? true, icon: Radio },
// //     { label: "Socket.IO", online: data?.system?.socket ?? true, icon: Wifi },
// //   ];

// //   return (
// //     <div className={dark ? "dark" : ""}>
// //       <div className="min-h-screen bg-[#0a0c12] bg-[radial-gradient(circle_at_20%_-10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(217,70,239,0.12),transparent_40%)] text-white">
// //         <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
// //           {/* HEADER */}
// //           <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //             <div>
// //               <p className="text-2xl font-semibold tracking-tight">
// //                 {greeting(now.getHours())}, Admin <span className="inline-block">👋</span>
// //               </p>
// //               <p className="text-sm text-white/40 mt-0.5">Here's what's happening today.</p>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               <div className="relative hidden md:block">
// //                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
// //                 <input
// //                   placeholder="Search anything..."
// //                   className="w-64 rounded-xl bg-white/[0.04] border border-white/10 pl-8 pr-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-400/50"
// //                 />
// //               </div>

// //               <button className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition-colors">
// //                 <Bell size={18} />
// //                 <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] flex items-center justify-center font-semibold">
// //                   {data?.notifications ?? 3}
// //                 </span>
// //               </button>

// //               <button
// //                 onClick={() => setDark((d) => !d)}
// //                 className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition-colors"
// //               >
// //                 {dark ? <Sun size={18} /> : <Moon size={18} />}
// //               </button>

// //               <div className="text-right hidden sm:block">
// //                 <p className="text-sm font-medium leading-none">{now.toLocaleTimeString()}</p>
// //                 <p className="text-[11px] text-white/40">{now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}</p>
// //               </div>

// //               <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center font-semibold text-sm ring-2 ring-white/10">
// //                 A
// //               </div>
// //             </div>
// //           </header>

// //           {/* KPI GRID */}
// //           <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
// //             {loading
// //               ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
// //               : kpis.map((k) => <KpiCard key={k.label} {...k} />)}
// //           </section>

// //           {/* ANALYTICS ROW */}
// //           <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
// //             <ChartCard title="Revenue Analytics" subtitle="Last 12 months" className="lg:col-span-2">
// //               {revenueSeries.length ? (
// //                 <div className="h-64">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <AreaChart data={revenueSeries}>
// //                       <defs>
// //                         <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
// //                           <stop offset="0%" stopColor="#818cf8" stopOpacity={0.45} />
// //                           <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
// //                         </linearGradient>
// //                       </defs>
// //                       <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
// //                       <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
// //                       <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
// //                       <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
// //                       <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} fill="url(#revFill)" />
// //                     </AreaChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               ) : <EmptyState />}
// //             </ChartCard>

// //             <ChartCard title="Sales Distribution" subtitle="By category">
// //               {categorySeries.length ? (
// //                 <div className="h-64">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <PieChart>
// //                       <Pie data={categorySeries} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} animationDuration={700}>
// //                         {categorySeries.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
// //                       </Pie>
// //                       <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="flex flex-wrap gap-3 justify-center -mt-2">
// //                     {categorySeries.map((c, i) => (
// //                       <span key={c.name} className="flex items-center gap-1.5 text-xs text-white/60">
// //                         <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
// //                         {c.name}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               ) : <EmptyState />}
// //             </ChartCard>
// //           </section>

// //           <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
// //             <ChartCard title="Orders Analytics" subtitle="Orders per day" className="lg:col-span-2">
// //               {ordersSeries.length ? (
// //                 <div className="h-56">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart data={ordersSeries}>
// //                       <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
// //                       <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
// //                       <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
// //                       <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
// //                       <Bar dataKey="value" fill="#e879f9" radius={[6, 6, 0, 0]} animationDuration={600} />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               ) : <EmptyState />}
// //             </ChartCard>

// //             {/* Revenue Goal Tracker */}
// //             <ChartCard title="Revenue Goal" subtitle={`₹${goalTarget.toLocaleString("en-IN")} monthly target`}>
// //               <div className="h-56 flex flex-col items-center justify-center">
// //                 <ResponsiveContainer width="100%" height="80%">
// //                   <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "goal", value: goalPct, fill: "#34d399" }]} startAngle={90} endAngle={-270}>
// //                     <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "rgba(255,255,255,0.06)" }} />
// //                   </RadialBarChart>
// //                 </ResponsiveContainer>
// //                 <div className="-mt-16 text-center">
// //                   <p className="text-2xl font-bold text-emerald-300">{goalPct}%</p>
// //                   <p className="text-[11px] text-white/40">₹{goalCurrent.toLocaleString("en-IN")} reached</p>
// //                 </div>
// //               </div>
// //             </ChartCard>
// //           </section>

// //           {/* LIVE ACTIVITY + TOP PRODUCTS */}
// //           <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
// //             <ChartCard title="Live Activity" subtitle="Real-time feed">
// //               <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
// //                 <AnimatePresence initial={false}>
// //                   {activities.length ? activities.map((a, i) => (
// //                     <motion.div
// //                       key={a.id ?? i}
// //                       initial={{ opacity: 0, x: -10 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       transition={{ delay: i * 0.04 }}
// //                       className="flex items-start gap-2.5 text-sm"
// //                     >
// //                       <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
// //                       <div>
// //                         <p className="text-white/80">{a.message}</p>
// //                         <p className="text-[11px] text-white/35">{a.time ?? "just now"}</p>
// //                       </div>
// //                     </motion.div>
// //                   )) : <EmptyState title="No recent activity" subtitle="New events will show up here live." />}
// //                 </AnimatePresence>
// //               </div>
// //             </ChartCard>

// //             <ChartCard title="Top Selling Products" className="lg:col-span-2">
// //               {topProducts.length ? (
// //                 <DataTable
// //                   columns={[
// //                     { key: "name", label: "Product", render: (r) => (
// //                       <span className="flex items-center gap-2">
// //                         <span className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] text-white/40 overflow-hidden">
// //                           {r.image ? <img src={r.image} alt="" className="h-full w-full object-cover" /> : "IMG"}
// //                         </span>
// //                         {r.name ?? r._id}
// //                       </span>
// //                     ) },
// //                     { key: "category", label: "Category" },
// //                     { key: "stock", label: "Stock" },
// //                     { key: "qty", label: "Sold" },
// //                     { key: "revenue", label: "Revenue", render: (r) => `₹${(r.revenue ?? 0).toLocaleString("en-IN")}` },
// //                   ]}
// //                   rows={topProducts}
// //                   searchKeys={["name", "category"]}
// //                 />
// //               ) : <EmptyState />}
// //             </ChartCard>
// //           </section>

// //           {/* RECENT ORDERS */}
// //           <section className="mb-6">
// //             <ChartCard title="Recent Orders">
// //               {recentOrders.length ? (
// //                 <DataTable
// //                   columns={[
// //                     { key: "orderId", label: "Order ID" },
// //                     { key: "customer", label: "Customer" },
// //                     { key: "amount", label: "Amount", render: (r) => `₹${(r.amount ?? 0).toLocaleString("en-IN")}` },
// //                     { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
// //                     { key: "date", label: "Date" },
// //                   ]}
// //                   rows={recentOrders}
// //                   searchKeys={["orderId", "customer", "status"]}
// //                   pageSize={6}
// //                 />
// //               ) : <EmptyState />}
// //             </ChartCard>
// //           </section>

// //           {/* INVENTORY + AI CONTROL CENTER */}
// //           <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
// //             <ChartCard title="Inventory Overview">
// //               <div className="space-y-4">
// //                 {[
// //                   { label: "In Stock", value: inStock, color: "bg-emerald-400" },
// //                   { label: "Low Stock", value: lowStock, color: "bg-amber-400" },
// //                   { label: "Out of Stock", value: outOfStock, color: "bg-rose-400" },
// //                 ].map((row) => (
// //                   <div key={row.label}>
// //                     <div className="flex justify-between text-xs text-white/60 mb-1">
// //                       <span>{row.label}</span>
// //                       <span>{row.value}</span>
// //                     </div>
// //                     <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
// //                       <motion.div
// //                         initial={{ width: 0 }}
// //                         animate={{ width: `${(row.value / totalStock) * 100}%` }}
// //                         transition={{ duration: 0.6 }}
// //                         className={`h-full rounded-full ${row.color}`}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </ChartCard>

// //             <ChartCard title="AI Control Center" subtitle="Live model activity" className="relative overflow-hidden">
// //               <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
// //               <div className="relative grid grid-cols-2 gap-3">
// //                 <Stat icon={MessageSquare} label="AI Chat Requests" value={aiStats.chatRequests ?? 0} tint="text-indigo-300" />
// //                 <Stat icon={Wand2} label="Recommendations" value={aiStats.recommendations ?? 0} tint="text-fuchsia-300" />
// //                 <Stat icon={SearchCode} label="AI Search Queries" value={aiStats.searchQueries ?? 0} tint="text-cyan-300" />
// //                 <Stat icon={Sparkles} label="Product Suggestions" value={aiStats.suggestions ?? 0} tint="text-emerald-300" />
// //               </div>
// //             </ChartCard>
// //           </section>

// //           {/* DELIVERY ANALYTICS + SYSTEM STATUS */}
// //           <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
// //             <ChartCard title="Delivery Analytics">
// //               <div className="grid grid-cols-3 gap-3 items-center">
// //                 <Stat icon={Bike} label="Active Riders" value={deliveryStats.activeRiders ?? 0} />
// //                 <Stat icon={CheckCircle2} label="Completed" value={deliveryStats.completed ?? 0} tint="text-emerald-300" />
// //                 <div className="h-24">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ value: Math.min(100, deliveryStats.avgTimeScore ?? 72), fill: "#22d3ee" }]} startAngle={90} endAngle={-270}>
// //                       <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "rgba(255,255,255,0.06)" }} />
// //                     </RadialBarChart>
// //                   </ResponsiveContainer>
// //                   <p className="text-center text-[11px] text-white/40 -mt-2">Avg {deliveryStats.avgTime ?? "28 min"}</p>
// //                 </div>
// //               </div>
// //             </ChartCard>

// //             <ChartCard title="Real-Time System Status">
// //               <div className="grid grid-cols-2 gap-3">
// //                 {systemStatus.map((sys) => (
// //                   <div key={sys.label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
// //                     <span className={`relative h-2.5 w-2.5 rounded-full ${sys.online ? "bg-emerald-400" : "bg-rose-400"}`}>
// //                       {sys.online && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
// //                     </span>
// //                     <sys.icon size={15} className="text-white/40" />
// //                     <span className="text-sm text-white/70">{sys.label}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </ChartCard>
// //           </section>

// //           {/* QUICK ACTIONS */}
// //           <section className="mb-10">
// //             <h3 className="text-sm font-semibold text-white/70 mb-3">Quick Actions</h3>
// //             <div className="flex flex-wrap gap-3">
// //               {quickActions.map((a) => (
// //                 <motion.button
// //                   key={a.label}
// //                   whileHover={{ scale: 1.03, y: -2 }}
// //                   whileTap={{ scale: 0.97 }}
// //                   className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${a.gradient} px-4 py-2.5 text-sm font-medium shadow-lg shadow-black/20`}
// //                 >
// //                   <a.icon size={16} />
// //                   {a.label}
// //                 </motion.button>
// //               ))}
// //             </div>
// //           </section>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ShoppingBag, IndianRupee, Clock, CheckCircle2, Bike, PackageX, TrendingUp,
  Search, Bell, Sun, Moon,
  Sparkles, MessageSquare, Wand2, SearchCode, Radio, ServerCog, Database, Wifi,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

import api from "../../api/axios";
import Sidebar from "../../components/dashboard/Sidebar";
import KpiCard from "../../components/dashboard/KpiCard";
import ChartCard from "../../components/dashboard/ChartCard";
import DataTable from "../../components/dashboard/DataTable";
import StatusBadge from "../../components/dashboard/StatusBadge";
import Stat from "../../components/dashboard/Stat";
import { SkeletonCard, EmptyState } from "../../components/dashboard/SkeletonCard";

const PIE_COLORS = ["#818cf8", "#e879f9", "#34d399", "#fbbf24"];

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function greeting(hour) {
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const now = useClock();

  useEffect(() => {
    let mounted = true;
    api
      .get("/admin/dashboard")
      .then((r) => mounted && setData(r.data?.data ?? r.data))
      .catch(() => mounted && setData(null))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // Safe fallbacks so the UI never breaks on a partial API response.
  const s = data?.stats ?? {};
  const daily = data?.daily ?? [];
  const topProducts = data?.topProducts ?? [];
  const recentOrders = data?.recentOrders ?? [];
  const activities = data?.activities ?? [];
  const inventory = data?.inventory ?? {};
  const aiStats = data?.aiStats ?? {};
  const deliveryStats = data?.deliveryStats ?? {};

  const revenueSeries = useMemo(
    () => (daily.length ? daily.map((x) => ({ name: x._id, value: x.total })) : []),
    [daily]
  );
  const ordersSeries = useMemo(
    () => (daily.length ? daily.map((x) => ({ name: x._id, value: x.orders ?? Math.round((x.total ?? 0) / 500) })) : []),
    [daily]
  );
  const categorySeries = useMemo(() => {
    const c = data?.salesByCategory;
    return c?.length ? c : [
      { name: "Men", value: 38 }, { name: "Women", value: 34 }, { name: "Kids", value: 18 }, { name: "Accessories", value: 10 },
    ];
  }, [data]);

  const inStock = inventory.inStock ?? 0;
  const lowStock = inventory.lowStock ?? 0;
  const outOfStock = inventory.outOfStock ?? s.outOfStock ?? 0;
  const totalStock = Math.max(1, inStock + lowStock + outOfStock);

  const goalCurrent = data?.revenueGoal?.current ?? s.revenue ?? 0;
  const goalTarget = data?.revenueGoal?.target ?? 500000;
  const goalPct = Math.min(100, Math.round((goalCurrent / goalTarget) * 100));

  const kpis = [
    { label: "Total Users", value: s.users ?? "—", delta: s.usersDelta ?? 12.4, icon: Users, tint: "indigo" },
    { label: "Total Orders", value: s.orders ?? "—", delta: s.ordersDelta ?? 8.1, icon: ShoppingBag, tint: "fuchsia" },
    { label: "Revenue", value: `₹${(s.revenue ?? 0).toLocaleString("en-IN")}`, delta: s.revenueDelta ?? 18.5, icon: IndianRupee, tint: "emerald" },
    { label: "Pending Orders", value: s.pending ?? "—", delta: s.pendingDelta ?? -3.2, icon: Clock, tint: "amber" },
    { label: "Delivered Orders", value: s.delivered ?? "—", delta: s.deliveredDelta ?? 6.7, icon: CheckCircle2, tint: "cyan" },
    { label: "Active Delivery Partners", value: s.partners ?? "—", delta: s.partnersDelta ?? 4.0, icon: Bike, tint: "indigo" },
    { label: "Out of Stock", value: outOfStock, delta: s.outOfStockDelta ?? -1.5, icon: PackageX, tint: "rose" },
    { label: "Conversion Rate", value: `${s.conversionRate ?? 0}%`, delta: s.conversionDelta ?? 2.3, icon: TrendingUp, tint: "fuchsia" },
  ];

  const systemStatus = [
    { label: "Backend API", online: data?.system?.api ?? true, icon: ServerCog },
    { label: "MongoDB", online: data?.system?.mongo ?? true, icon: Database },
    { label: "Redis", online: data?.system?.redis ?? true, icon: Radio },
    { label: "Socket.IO", online: data?.system?.socket ?? true, icon: Wifi },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen flex bg-[#0a0c12] bg-[radial-gradient(circle_at_20%_-10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_10%,rgba(217,70,239,0.12),transparent_40%)] text-white">
        <Sidebar />
        <div className="flex-1 max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
          {/* HEADER */}
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-2xl font-semibold tracking-tight">
                {greeting(now.getHours())}, Admin <span className="inline-block">👋</span>
              </p>
              <p className="text-sm text-white/40 mt-0.5">Here's what's happening today.</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  placeholder="Search anything..."
                  className="w-64 rounded-xl bg-white/[0.04] border border-white/10 pl-8 pr-3 py-2 text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-400/50"
                />
              </div>

              <button className="relative rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition-colors">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-500 text-[10px] flex items-center justify-center font-semibold">
                  {data?.notifications ?? 3}
                </span>
              </button>

              <button
                onClick={() => setDark((d) => !d)}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 hover:bg-white/[0.08] transition-colors"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none">{now.toLocaleTimeString()}</p>
                <p className="text-[11px] text-white/40">{now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" })}</p>
              </div>

              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center font-semibold text-sm ring-2 ring-white/10">
                A
              </div>
            </div>
          </header>

          {/* KPI GRID */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : kpis.map((k) => <KpiCard key={k.label} {...k} />)}
          </section>

          {/* ANALYTICS ROW */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <ChartCard title="Revenue Analytics" subtitle="Last 12 months" className="lg:col-span-2">
              {revenueSeries.length ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueSeries}>
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#818cf8" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
                      <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={2} fill="url(#revFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : <EmptyState />}
            </ChartCard>

            <ChartCard title="Sales Distribution" subtitle="By category">
              {categorySeries.length ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categorySeries} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} animationDuration={700}>
                        {categorySeries.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-3 justify-center -mt-2">
                    {categorySeries.map((c, i) => (
                      <span key={c.name} className="flex items-center gap-1.5 text-xs text-white/60">
                        <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              ) : <EmptyState />}
            </ChartCard>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <ChartCard title="Orders Analytics" subtitle="Orders per day" className="lg:col-span-2">
              {ordersSeries.length ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ordersSeries}>
                      <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "#11131c", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                      <Bar dataKey="value" fill="#e879f9" radius={[6, 6, 0, 0]} animationDuration={600} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : <EmptyState />}
            </ChartCard>

            {/* Revenue Goal Tracker */}
            <ChartCard title="Revenue Goal" subtitle={`₹${goalTarget.toLocaleString("en-IN")} monthly target`}>
              <div className="h-56 flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height="80%">
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: "goal", value: goalPct, fill: "#34d399" }]} startAngle={90} endAngle={-270}>
                    <RadialBar dataKey="value" cornerRadius={20} background={{ fill: "rgba(255,255,255,0.06)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="-mt-16 text-center">
                  <p className="text-2xl font-bold text-emerald-300">{goalPct}%</p>
                  <p className="text-[11px] text-white/40">₹{goalCurrent.toLocaleString("en-IN")} reached</p>
                </div>
              </div>
            </ChartCard>
          </section>

          {/* LIVE ACTIVITY + TOP PRODUCTS */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <ChartCard title="Live Activity" subtitle="Real-time feed">
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {activities.length ? activities.map((a, i) => (
                    <motion.div
                      key={a.id ?? i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <div>
                        <p className="text-white/80">{a.message}</p>
                        <p className="text-[11px] text-white/35">{a.time ?? "just now"}</p>
                      </div>
                    </motion.div>
                  )) : <EmptyState title="No recent activity" subtitle="New events will show up here live." />}
                </AnimatePresence>
              </div>
            </ChartCard>

            <ChartCard title="Top Selling Products" className="lg:col-span-2">
              {topProducts.length ? (
                <DataTable
                  columns={[
                    { key: "name", label: "Product", render: (r) => (
                      <span className="flex items-center gap-2">
                        <span className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] text-white/40 overflow-hidden">
                          {r.image ? <img src={r.image} alt="" className="h-full w-full object-cover" /> : "IMG"}
                        </span>
                        {r.name ?? r._id}
                      </span>
                    ) },
                    { key: "category", label: "Category" },
                    { key: "stock", label: "Stock" },
                    { key: "qty", label: "Sold" },
                    { key: "revenue", label: "Revenue", render: (r) => `₹${(r.revenue ?? 0).toLocaleString("en-IN")}` },
                  ]}
                  rows={topProducts}
                  searchKeys={["name", "category"]}
                />
              ) : <EmptyState />}
            </ChartCard>
          </section>

          {/* RECENT ORDERS */}
          <section className="mb-6">
            <ChartCard title="Recent Orders">
              {recentOrders.length ? (
                <DataTable
                  columns={[
                    { key: "orderId", label: "Order ID" },
                    { key: "customer", label: "Customer" },
                    { key: "amount", label: "Amount", render: (r) => `₹${(r.amount ?? 0).toLocaleString("en-IN")}` },
                    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
                    { key: "date", label: "Date" },
                  ]}
                  rows={recentOrders}
                  searchKeys={["orderId", "customer", "status"]}
                  pageSize={6}
                />
              ) : <EmptyState />}
            </ChartCard>
          </section>

          {/* INVENTORY + AI CONTROL CENTER */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard title="Inventory Overview">
              <div className="space-y-4">
                {[
                  { label: "In Stock", value: inStock, color: "bg-emerald-400" },
                  { label: "Low Stock", value: lowStock, color: "bg-amber-400" },
                  { label: "Out of Stock", value: outOfStock, color: "bg-rose-400" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span>{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(row.value / totalStock) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full rounded-full ${row.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <ChartCard title="AI Control Center" subtitle="Live model activity" className="relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="relative grid grid-cols-2 gap-3">
                <Stat icon={MessageSquare} label="AI Chat Requests" value={aiStats.chatRequests ?? 0} tint="text-indigo-300" />
                <Stat icon={Wand2} label="Recommendations" value={aiStats.recommendations ?? 0} tint="text-fuchsia-300" />
                <Stat icon={SearchCode} label="AI Search Queries" value={aiStats.searchQueries ?? 0} tint="text-cyan-300" />
                <Stat icon={Sparkles} label="Product Suggestions" value={aiStats.suggestions ?? 0} tint="text-emerald-300" />
              </div>
            </ChartCard>
          </section>

          {/* DELIVERY ANALYTICS + SYSTEM STATUS */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <ChartCard title="Delivery Analytics">
              <div className="grid grid-cols-3 gap-3 items-center">
                <Stat icon={Bike} label="Active Riders" value={deliveryStats.activeRiders ?? 0} />
                <Stat icon={CheckCircle2} label="Completed" value={deliveryStats.completed ?? 0} tint="text-emerald-300" />
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="60%" outerRadius="100%" data={[{ value: Math.min(100, deliveryStats.avgTimeScore ?? 72), fill: "#22d3ee" }]} startAngle={90} endAngle={-270}>
                      <RadialBar dataKey="value" cornerRadius={10} background={{ fill: "rgba(255,255,255,0.06)" }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <p className="text-center text-[11px] text-white/40 -mt-2">Avg {deliveryStats.avgTime ?? "28 min"}</p>
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Real-Time System Status">
              <div className="grid grid-cols-2 gap-3">
                {systemStatus.map((sys) => (
                  <div key={sys.label} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <span className={`relative h-2.5 w-2.5 rounded-full ${sys.online ? "bg-emerald-400" : "bg-rose-400"}`}>
                      {sys.online && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />}
                    </span>
                    <sys.icon size={15} className="text-white/40" />
                    <span className="text-sm text-white/70">{sys.label}</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </section>
        </div>
      </div>
    </div>
  );
}

























// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../../api/axios";

// export default function AdminDashboard() {
//   const [d, setD] = useState(null);
//   useEffect(() => { api.get("/admin/dashboard").then((r) => setD(r.data.data)); }, []);
//   if (!d) return <div className="p-10">Loading…</div>;
//   const s = d.stats;
//   const tiles = [
//     ["Users", s.users, "👥"], ["Orders", s.orders, "📦"], ["Revenue", `₹${s.revenue}`, "💰"],
//     ["Pending", s.pending, "⏳"], ["Delivered", s.delivered, "✅"], ["Partners Online", s.partners, "🛵"],
//     ["Out of Stock", s.outOfStock, "🚫"],
//   ];
//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <div className="flex gap-2">
//           <Link to="/admin/products" className="btn btn-outline">Products</Link>
//           <Link to="/admin/orders" className="btn btn-outline">Orders</Link>
//           <Link to="/admin/ai" className="btn btn-primary">AI Control</Link>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         {tiles.map(([t, v, e]) => (
//           <div key={t} className="card p-4">
//             <div className="text-2xl">{e}</div>
//             <div className="text-gray-500 text-xs uppercase">{t}</div>
//             <div className="text-2xl font-bold">{v}</div>
//           </div>
//         ))}
//       </div>
//       <div className="grid md:grid-cols-2 gap-4 mt-6">
//         <div className="card p-4">
//           <div className="font-semibold mb-2">Daily Revenue (last 7d)</div>
//           {d.daily.length ? d.daily.map((x) => (
//             <div key={x._id} className="flex items-center gap-2 text-sm py-1">
//               <span className="w-24">{x._id}</span>
//               <div className="flex-1 h-2 bg-gray-100 rounded"><div className="h-2 bg-brand rounded" style={{ width: `${Math.min(100, x.total / 10)}%` }} /></div>
//               <span className="w-20 text-right font-semibold">₹{x.total}</span>
//             </div>
//           )) : <div className="text-gray-400 text-sm">No data yet.</div>}
//         </div>
//         <div className="card p-4">
//           <div className="font-semibold mb-2">Top Products</div>
//           {d.topProducts.map((p) => (
//             <div key={p._id} className="flex justify-between text-sm py-1">
//               <span>{p._id}</span><span className="font-semibold">{p.qty} sold · ₹{p.revenue}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }