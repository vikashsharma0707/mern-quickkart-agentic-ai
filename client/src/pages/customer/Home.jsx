// // // // import { useEffect } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { Link, useSearchParams } from "react-router-dom";
// // // // import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
// // // // import ProductCard from "../../components/customer/ProductCard";
// // // // import Loading from "../../components/common/Loading";

// // // // export default function Home() {
// // // //   const dispatch = useDispatch();
// // // //   const { list, categories, loading } = useSelector((s) => s.products);
// // // //   const [params] = useSearchParams();
// // // //   const q = params.get("q") || "";
// // // //   const cat = params.get("category") || "";

// // // //   useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
// // // //   useEffect(() => { dispatch(fetchProducts({ q, category: cat })); }, [dispatch, q, cat]);

// // // //   return (
// // // //     <div className="max-w-7xl mx-auto p-4">
// // // //       <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-2xl p-6 mb-6">
// // // //         <div className="text-3xl font-extrabold">Groceries delivered in <span className="text-brand">10 minutes</span></div>
// // // //         <div className="text-sm text-gray-700 mt-1">Powered by 20 autonomous AI agents · Ask, plan, save 💰</div>
// // // //         <Link to="/ai" className="btn btn-primary mt-3 inline-block">🤖 Try AI Assistant</Link>
// // // //       </div>

// // // //       <h2 className="text-xl font-bold mb-3">Shop by category</h2>
// // // //       <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
// // // //         {categories.map((c) => (
// // // //           <Link key={c._id} to={`/?category=${c.slug}`} className="card p-3 text-center hover:shadow-md">
// // // //             <div className="text-3xl">{c.icon}</div>
// // // //             <div className="text-xs mt-1 font-medium line-clamp-2">{c.name}</div>
// // // //           </Link>
// // // //         ))}
// // // //       </div>

// // // //       <h2 className="text-xl font-bold mb-3">{q ? `Results for "${q}"` : "Top picks for you"}</h2>
// // // //       {loading ? <Loading /> : (
// // // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
// // // //           {list.map((p) => <ProductCard key={p._id} p={p} />)}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }




// // // import { useEffect } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { Link, useSearchParams } from "react-router-dom";
// // // import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
// // // import ProductCard from "../../components/customer/ProductCard";
// // // import Loading from "../../components/common/Loading";

// // // import { Swiper, SwiperSlide } from "swiper/react";
// // // import { Autoplay, Pagination } from "swiper/modules";

// // // import "swiper/css";
// // // import "swiper/css/pagination";

// // // export default function Home() {
// // //   const dispatch = useDispatch();
// // //   const { list, categories, loading } = useSelector((s) => s.products);

// // //   const [params] = useSearchParams();
// // //   const q = params.get("q") || "";
// // //   const cat = params.get("category") || "";

// // //   useEffect(() => {
// // //     dispatch(fetchCategories());
// // //   }, [dispatch]);

// // //   useEffect(() => {
// // //     dispatch(fetchProducts({ q, category: cat }));
// // //   }, [dispatch, q, cat]);

// // //   const banners = [
// // //     {
// // //       id: 1,
// // //       image:
// // //         "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
// // //       title: "Fresh Groceries Delivered",
// // //       subtitle: "Get your daily essentials in just 10 minutes",
// // //       button: "Shop Now",
// // //     },
// // //     {
// // //       id: 2,
// // //       image:
// // //         "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600",
// // //       title: "Mega Savings Everyday",
// // //       subtitle: "Up to 60% OFF on groceries, fruits & vegetables",
// // //       button: "Explore Deals",
// // //     },
// // //   ];

// // //   return (
// // //     <div className="max-w-7xl mx-auto px-4 py-5">

// // //       {/* Hero Section */}
// // //       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 md:p-12 mb-8 shadow-2xl">

// // //         <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
// // //         <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

// // //         <div className="relative z-10">
// // //           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
// // //             ⚡ 10 Minute Delivery
// // //           </div>

// // //           <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
// // //             Groceries Delivered
// // //             <br />
// // //             In <span className="text-yellow-300">10 Minutes</span>
// // //           </h1>

// // //           <p className="mt-4 text-lg text-green-50 max-w-2xl">
// // //             Smart grocery shopping powered by AI. Find products,
// // //             discover offers, and get lightning-fast delivery.
// // //           </p>

// // //           <div className="flex flex-wrap gap-4 mt-6">
// // //             <Link
// // //               to="/ai"
// // //               className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
// // //             >
// // //               🤖 AI Assistant
// // //             </Link>

// // //             <Link
// // //               to="/products"
// // //               className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
// // //             >
// // //               Explore Products
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Categories */}
// // //       <div className="flex items-center justify-between mb-4">
// // //         <h2 className="text-2xl font-bold">
// // //           Shop by Category
// // //         </h2>

// // //         <Link
// // //           to="/categories"
// // //           className="text-green-600 font-semibold hover:text-green-700"
// // //         >
// // //           View All →
// // //         </Link>
// // //       </div>

// // //       <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-10">
// // //         {categories.map((c) => (
// // //           <Link
// // //             key={c._id}
// // //             to={`/?category=${c.slug}`}
// // //             className="
// // //               bg-white
// // //               rounded-2xl
// // //               p-4
// // //               border
// // //               hover:border-green-500
// // //               hover:shadow-xl
// // //               hover:-translate-y-1
// // //               transition-all
// // //               duration-300
// // //               text-center
// // //             "
// // //           >
// // //             <div className="text-4xl mb-2">
// // //               {c.icon}
// // //             </div>

// // //             <div className="text-xs font-semibold text-gray-700 line-clamp-2">
// // //               {c.name}
// // //             </div>
// // //           </Link>
// // //         ))}
// // //       </div>

      

// // //       {/* Products */}
// // //       <div className="flex items-center justify-between mb-4">
// // //         <h2 className="text-2xl font-bold">
// // //           {q ? `Results for "${q}"` : "Top Picks For You"}
// // //         </h2>

// // //         <Link
// // //           to="/products"
// // //           className="text-green-600 font-semibold hover:text-green-700"
// // //         >
// // //           View All →
// // //         </Link>
// // //       </div>

// // //       {loading ? (
// // //         <Loading />
// // //       ) : (
// // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
// // //           {list.map((p) => (
// // //             <ProductCard
// // //               key={p._id}
// // //               p={p}
// // //             />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }









// // import { useEffect, useState, useRef } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useSearchParams, useNavigate } from "react-router-dom";
// // import {
// //   fetchCategories,
// //   fetchProducts,
// // } from "../../features/products/productsSlice";
// // import { addToCart, updateCart, removeFromCart } from "../../features/cart/cartSlice";

// // /* ─── Skeleton loader card ─── */
// // function SkeletonCard() {
// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
// //       <div className="bg-gray-100 h-36" />
// //       <div className="p-3 space-y-2">
// //         <div className="h-2.5 bg-gray-100 rounded w-1/2" />
// //         <div className="h-3 bg-gray-100 rounded w-5/6" />
// //         <div className="h-2.5 bg-gray-100 rounded w-3/5" />
// //         <div className="h-8 bg-gray-100 rounded-xl mt-3" />
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── Product Card ─── */
// // function ProductCard({ p }) {
// //   const dispatch = useDispatch();
// //   const cartItems = useSelector((s) => s.cart.cart?.items || []);
// //   const item = cartItems.find((i) => i.product?._id === p._id || i.product === p._id);
// //   const qty = item?.quantity || 0;
// //   const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

// //   return (
// //     <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
// //       {/* Image area */}
// //       <div className="relative bg-gray-50 flex items-center justify-center p-3 aspect-square">
// //         <img
// //           src={p.image}
// //           alt={p.name}
// //           loading="lazy"
// //           className="w-full h-full object-contain mix-blend-multiply"
// //           onError={(e) => {
// //             e.target.src = `https://placehold.co/160x160/f1f5f9/94a3b8?text=${encodeURIComponent(
// //               p.name?.slice(0, 2) || "?"
// //             )}`;
// //           }}
// //         />

// //         {/* Discount badge */}
// //         {discount > 0 && (
// //           <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
// //             {discount}% OFF
// //           </div>
// //         )}

// //         {/* Stock badge */}
// //         {p.stock > 0 && p.stock <= 5 && (
// //           <div className="absolute top-2 right-2 bg-red-50 text-red-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border border-red-100">
// //             Only {p.stock} left
// //           </div>
// //         )}

// //         {/* ETA chip */}
// //         <div className="absolute bottom-2 left-2 bg-white/95 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-100 shadow-sm">
// //           ⚡ 10 min
// //         </div>
// //       </div>

// //       {/* Body */}
// //       <div className="p-3 pt-2">
// //         {/* Rating */}
// //         {p.rating && (
// //           <div className="flex items-center gap-1.5 mb-1.5">
// //             <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-1.5 py-0.5 rounded">
// //               ⭐ {p.rating}
// //             </span>
// //             {p.reviewCount && (
// //               <span className="text-[10px] text-gray-400">
// //                 ({Number(p.reviewCount).toLocaleString()})
// //               </span>
// //             )}
// //           </div>
// //         )}

// //         <p className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug mb-0.5">
// //           {p.name}
// //         </p>

// //         {p.weight && (
// //           <p className="text-[11px] text-gray-400 mb-2">{p.weight}</p>
// //         )}

// //         {/* Price row */}
// //         <div className="flex items-baseline gap-1.5 mb-1">
// //           <span className="text-[15px] font-bold text-gray-900">₹{p.price}</span>
// //           {p.mrp > p.price && (
// //             <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
// //           )}
// //         </div>

// //         {p.soldToday && (
// //           <p className="text-[10px] text-gray-400 mb-2">🔥 {p.soldToday} bought today</p>
// //         )}

// //         {/* ADD / Stepper */}
// //         {qty === 0 ? (
// //           <button
// //             onClick={() => dispatch(addToCart({ productId: p._id, quantity: 1 }))}
// //             className="w-full bg-green-50 hover:bg-green-600 border border-green-400 hover:border-green-600 text-green-700 hover:text-white text-sm font-semibold py-[7px] rounded-xl transition-all duration-150 active:scale-95"
// //           >
// //             ADD
// //           </button>
// //         ) : (
// //           <div className="flex items-center justify-between bg-green-600 rounded-xl px-3 py-1.5">
// //             <button
// //               onClick={() =>
// //                 qty - 1 === 0
// //                   ? dispatch(removeFromCart(p._id))
// //                   : dispatch(updateCart({ productId: p._id, quantity: qty - 1 }))
// //               }
// //               className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform duration-100"
// //             >
// //               −
// //             </button>
// //             <span className="text-white font-bold text-sm tabular-nums">{qty}</span>
// //             <button
// //               onClick={() => dispatch(updateCart({ productId: p._id, quantity: qty + 1 }))}
// //               className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform duration-100"
// //             >
// //               +
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* ─── Rotating offer strip ─── */
// // const OFFERS = [
// //   "🏷️  Use FRESH20 → Save ₹20 on your first order",
// //   "🚚  Free delivery on orders above ₹199",
// //   "⚡  Same-slot express delivery now available",
// //   "🎁  New users get 50% OFF on first 3 orders",
// // ];

// // function OfferStrip() {
// //   const [idx, setIdx] = useState(0);
// //   const [fade, setFade] = useState(true);

// //   useEffect(() => {
// //     const t = setInterval(() => {
// //       setFade(false);
// //       setTimeout(() => {
// //         setIdx((i) => (i + 1) % OFFERS.length);
// //         setFade(true);
// //       }, 350);
// //     }, 3200);
// //     return () => clearInterval(t);
// //   }, []);

// //   return (
// //     <div className="bg-green-700 text-white text-center text-xs font-medium py-2 px-4 select-none">
// //       <span
// //         className="transition-opacity duration-300"
// //         style={{ opacity: fade ? 1 : 0 }}
// //       >
// //         {OFFERS[idx]}
// //       </span>
// //     </div>
// //   );
// // }

// // /* ─── Section tabs ─── */
// // const TABS = [
// //   { key: "best", label: "🔥 Best Sellers" },
// //   { key: "trending", label: "📈 Trending" },
// //   { key: "new", label: "🆕 New Arrivals" },
// //   { key: "deals", label: "⚡ Flash Deals" },
// // ];

// // /* ════════════════════════════════════════
// //    HOME PAGE
// // ════════════════════════════════════════ */
// // export default function Home() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { list, categories, loading } = useSelector((s) => s.products);
// //   const cartItems = useSelector((s) => s.cart.cart?.items || []);
// //   const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
// //   const cartTotal = useSelector((s) => s.cart.cart?.total || 0);

// //   const [params] = useSearchParams();
// //   const q = params.get("q") || "";
// //   const cat = params.get("category") || "";

// //   const [activeTab, setActiveTab] = useState("best");
// //   const [activeCat, setActiveCat] = useState(cat);
// //   const [liveOrders, setLiveOrders] = useState(2417);
// //   const productsRef = useRef(null);

// //   /* Live orders counter (replace with SSE/websocket in production) */
// //   useEffect(() => {
// //     const t = setInterval(
// //       () => setLiveOrders((n) => n + Math.floor(Math.random() * 3 + 1)),
// //       5000
// //     );
// //     return () => clearInterval(t);
// //   }, []);

// //   useEffect(() => {
// //     dispatch(fetchCategories());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     dispatch(fetchProducts({ q, category: activeCat }));
// //   }, [dispatch, q, activeCat]);

// //   const handleCatClick = (slug) => {
// //     setActiveCat(slug === activeCat ? "" : slug);
// //     navigate(slug ? `/?category=${slug}` : "/");
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
// //       <OfferStrip />

// //       <main className="max-w-7xl mx-auto px-4 py-5 pb-28 md:pb-8 space-y-8">

// //         {/* ── HERO ─────────────────────────────── */}
// //         <section className="relative overflow-hidden rounded-3xl bg-green-600 p-8 md:p-12">
// //           {/* Dot-grid texture */}
// //           <div
// //             className="absolute inset-0 opacity-[0.07]"
// //             style={{
// //               backgroundImage:
// //                 "radial-gradient(circle, #fff 1px, transparent 1px)",
// //               backgroundSize: "22px 22px",
// //             }}
// //           />
// //           {/* Decorative circles */}
// //           <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500 rounded-full opacity-40" />
// //           <div className="absolute -bottom-16 -left-8 w-52 h-52 bg-green-700 rounded-full opacity-30" />

// //           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
// //             {/* Left copy */}
// //             <div className="flex-1">
// //               {/* Live badge */}
// //               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium mb-5">
// //                 <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
// //                 {liveOrders.toLocaleString()} orders delivered today
// //               </div>

// //               <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-3">
// //                 Groceries in{" "}
// //                 <span className="text-yellow-300 underline decoration-wavy decoration-yellow-400/50 underline-offset-4">
// //                   10 minutes
// //                 </span>
// //                 <br />
// //                 <span className="text-green-100 font-light text-2xl md:text-3xl">
// //                   right to your door.
// //                 </span>
// //               </h1>

// //               <p className="text-green-50 text-sm md:text-base leading-relaxed max-w-lg mb-6">
// //                 Fresh produce, daily staples, snacks — delivered faster than
// //                 you can find your keys. Powered by AI.
// //               </p>

// //               <div className="flex flex-wrap gap-3">
// //                 <button
// //                   onClick={() =>
// //                     productsRef.current?.scrollIntoView({ behavior: "smooth" })
// //                   }
// //                   className="bg-white text-green-700 hover:bg-green-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150"
// //                 >
// //                   Shop now →
// //                 </button>
// //                 <Link
// //                   to="/ai"
// //                   className="border-2 border-white/50 text-white hover:bg-white/15 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
// //                 >
// //                   🤖 AI assistant
// //                 </Link>
// //               </div>

// //               {/* Trust row */}
// //               <div className="flex flex-wrap gap-5 mt-6">
// //                 {[
// //                   { icon: "⚡", text: "10 min delivery" },
// //                   { icon: "🌿", text: "100% fresh" },
// //                   { icon: "🔒", text: "Secure payments" },
// //                   { icon: "🔄", text: "Easy returns" },
// //                 ].map((b) => (
// //                   <span
// //                     key={b.text}
// //                     className="flex items-center gap-1.5 text-white/80 text-xs"
// //                   >
// //                     {b.icon} {b.text}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Right — category quick grid (hidden mobile) */}
// //             <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
// //               {[
// //                 { emoji: "🥦", label: "Vegetables" },
// //                 { emoji: "🥛", label: "Dairy" },
// //                 { emoji: "🍎", label: "Fruits" },
// //                 { emoji: "🍞", label: "Bakery" },
// //               ].map((item) => (
// //                 <button
// //                   key={item.label}
// //                   onClick={() => {
// //                     productsRef.current?.scrollIntoView({ behavior: "smooth" });
// //                   }}
// //                   className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95"
// //                 >
// //                   <span className="text-4xl">{item.emoji}</span>
// //                   <span className="text-white text-xs font-medium">
// //                     {item.label}
// //                   </span>
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* ── PROMO CARDS ──────────────────────── */}
// //         <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
// //           {[
// //             {
// //               bg: "bg-amber-50 border-amber-100",
// //               textColor: "text-amber-900",
// //               subColor: "text-amber-600",
// //               emoji: "🎉",
// //               title: "50% OFF",
// //               sub: "First 3 orders · New users",
// //               cta: "Claim →",
// //               to: "/register",
// //             },
// //             {
// //               bg: "bg-purple-50 border-purple-100",
// //               textColor: "text-purple-900",
// //               subColor: "text-purple-500",
// //               emoji: "🤖",
// //               title: "AI shopping",
// //               sub: "Build your cart with AI",
// //               cta: "Try it free →",
// //               to: "/ai",
// //             },
// //             {
// //               bg: "bg-green-50 border-green-100",
// //               textColor: "text-green-900",
// //               subColor: "text-green-600",
// //               emoji: "🚚",
// //               title: "Free delivery",
// //               sub: "On orders above ₹199",
// //               cta: "Shop now →",
// //               to: "/products",
// //             },
// //           ].map((card) => (
// //             <Link
// //               key={card.title}
// //               to={card.to}
// //               className={`flex items-center justify-between p-4 rounded-2xl border ${card.bg} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-[0.98]`}
// //             >
// //               <div>
// //                 <p className={`text-[11px] font-medium mb-0.5 ${card.subColor}`}>
// //                   {card.sub}
// //                 </p>
// //                 <p className={`text-base font-bold leading-tight ${card.textColor}`}>
// //                   {card.title}
// //                 </p>
// //                 <p className={`text-xs mt-1.5 font-semibold ${card.subColor}`}>
// //                   {card.cta}
// //                 </p>
// //               </div>
// //               <span className="text-4xl">{card.emoji}</span>
// //             </Link>
// //           ))}
// //         </section>

// //         {/* ── CATEGORIES ───────────────────────── */}
// //         <section>
// //           <div className="flex items-center justify-between mb-4">
// //             <h2 className="text-lg font-bold text-gray-900 dark:text-white">
// //               Shop by category
// //             </h2>
// //             <Link
// //               to="/categories"
// //               className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
// //             >
// //               View all →
// //             </Link>
// //           </div>

// //           {/* Horizontal scroll strip */}
// //           <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory -mx-4 px-4">
// //             {/* "All" chip */}
// //             <button
// //               onClick={() => { setActiveCat(""); navigate("/"); }}
// //               className={`snap-start shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 border transition-all duration-200 min-w-[68px] ${
// //                 activeCat === ""
// //                   ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200"
// //                   : "bg-white border-gray-100 text-gray-700 hover:border-green-300 hover:shadow-sm dark:bg-gray-900 dark:border-gray-800"
// //               }`}
// //             >
// //               <span className="text-2xl">🏪</span>
// //               <span className="text-[10px] font-semibold leading-tight text-center">
// //                 All
// //               </span>
// //             </button>

// //             {categories.map((c) => (
// //               <button
// //                 key={c._id}
// //                 onClick={() => handleCatClick(c.slug)}
// //                 className={`snap-start shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 border transition-all duration-200 min-w-[68px] ${
// //                   activeCat === c.slug
// //                     ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200 -translate-y-0.5"
// //                     : "bg-white border-gray-100 text-gray-700 hover:border-green-300 hover:shadow-sm hover:-translate-y-0.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
// //                 }`}
// //               >
// //                 <span className="text-2xl">{c.icon}</span>
// //                 <span className="text-[10px] font-semibold line-clamp-1 leading-tight text-center">
// //                   {c.name}
// //                 </span>
// //               </button>
// //             ))}
// //           </div>
// //         </section>

// //         {/* ── PRODUCTS ─────────────────────────── */}
// //         <section ref={productsRef}>
// //           {/* Section tabs */}
// //           <div className="flex items-center justify-between mb-3 gap-3">
// //             <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
// //               {TABS.map((tab) => (
// //                 <button
// //                   key={tab.key}
// //                   onClick={() => setActiveTab(tab.key)}
// //                   className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
// //                     activeTab === tab.key
// //                       ? "bg-green-600 text-white border-green-600"
// //                       : "bg-white border-gray-200 text-gray-600 hover:border-green-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
// //                   }`}
// //                 >
// //                   {tab.label}
// //                 </button>
// //               ))}
// //             </div>
// //             <Link
// //               to="/products"
// //               className="hidden md:block text-green-600 text-sm font-semibold hover:text-green-700 shrink-0 whitespace-nowrap"
// //             >
// //               View all →
// //             </Link>
// //           </div>

// //           <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
// //             {q ? (
// //               <>
// //                 Results for{" "}
// //                 <span className="text-green-600">"{q}"</span>
// //               </>
// //             ) : (
// //               "Top picks for you"
// //             )}
// //           </h2>

// //           {loading ? (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
// //               {Array.from({ length: 12 }).map((_, i) => (
// //                 <SkeletonCard key={i} />
// //               ))}
// //             </div>
// //           ) : list.length === 0 ? (
// //             <div className="text-center py-20 text-gray-400">
// //               <p className="text-5xl mb-3">🔍</p>
// //               <p className="text-base font-semibold text-gray-600 dark:text-gray-300">
// //                 No products found
// //               </p>
// //               <p className="text-sm mt-1">Try a different search or category</p>
// //               <button
// //                 onClick={() => { setActiveCat(""); navigate("/"); }}
// //                 className="mt-4 text-sm text-green-600 font-semibold hover:underline"
// //               >
// //                 Clear filters
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
// //               {list.map((p) => (
// //                 <ProductCard key={p._id} p={p} />
// //               ))}
// //             </div>
// //           )}
// //         </section>

// //         {/* ── WHY ZESTO ────────────────────────── */}
// //         <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
// //           <h2 className="text-base font-bold text-gray-900 dark:text-white text-center mb-6">
// //             Why people love us
// //           </h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
// //             {[
// //               { icon: "⚡", title: "10 min delivery", sub: "Fastest in city" },
// //               { icon: "🌿", title: "100% fresh", sub: "Quality guaranteed" },
// //               { icon: "💸", title: "Best prices", sub: "Lowest every day" },
// //               { icon: "🔒", title: "Secure pay", sub: "UPI · Cards · COD" },
// //             ].map((f) => (
// //               <div
// //                 key={f.title}
// //                 className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800"
// //               >
// //                 <div className="text-3xl mb-2">{f.icon}</div>
// //                 <p className="text-xs font-bold text-gray-800 dark:text-gray-100">
// //                   {f.title}
// //                 </p>
// //                 <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
// //                   {f.sub}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       </main>

// //       {/* ── STICKY BOTTOM CART BAR (mobile only) ── */}
// //       {cartCount > 0 && (
// //         <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden max-w-lg mx-auto">
// //           <Link
// //             to="/cart"
// //             className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-green-300/40 active:scale-[0.98] transition-all duration-150"
// //           >
// //             <div className="flex items-center gap-2.5">
// //               <div className="bg-white/20 rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums">
// //                 {cartCount}
// //               </div>
// //               <span className="text-sm font-medium">
// //                 {cartCount === 1 ? "item" : "items"} in cart
// //               </span>
// //             </div>
// //             <div className="flex items-center gap-1.5 font-bold text-sm">
// //               ₹{Math.round(cartTotal)}
// //               <svg
// //                 className="w-4 h-4"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2.5}
// //                   d="M9 5l7 7-7 7"
// //                 />
// //               </svg>
// //             </div>
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }





// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useSearchParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   fetchCategories,
//   fetchProducts,
// } from "../../features/products/productsSlice";
// import { addToCart, updateCart, removeFromCart } from "../../features/cart/cartSlice";

// /* ══════════════════════════════════════════
//    DESIGN TOKENS
//    Primary: #111827 | Accent: #7C3AED
//    Background: #F8FAFC | Cards: #FFFFFF
// ══════════════════════════════════════════ */

// /* ─── Skeleton Card ─── */
// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
//       <div className="bg-slate-100 h-48 relative overflow-hidden">
//         <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
//           style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)" }} />
//       </div>
//       <div className="p-4 space-y-2.5">
//         <div className="h-2.5 bg-slate-100 rounded-full w-2/3" />
//         <div className="h-3.5 bg-slate-100 rounded-full w-5/6" />
//         <div className="h-2.5 bg-slate-100 rounded-full w-1/2" />
//         <div className="h-10 bg-slate-100 rounded-xl mt-4" />
//       </div>
//     </div>
//   );
// }

// /* ─── Premium Product Card ─── */
// function ProductCard({ p }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cartItems = useSelector((s) => s.cart.cart?.items || []);
//   const item = cartItems.find((i) => i.product?._id === p._id || i.product === p._id);
//   const qty = item?.quantity || 0;
//   const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
//   const [wished, setWished] = useState(false);
//   const [ripple, setRipple] = useState(false);

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setRipple(true);
//     setTimeout(() => setRipple(false), 600);
//     dispatch(addToCart({ productId: p._id, quantity: 1 }));
//   };

//   const handleInc = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     dispatch(updateCart({ productId: p._id, quantity: qty + 1 }));
//   };

//   const handleDec = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     qty - 1 === 0
//       ? dispatch(removeFromCart(p._id))
//       : dispatch(updateCart({ productId: p._id, quantity: qty - 1 }));
//   };

//   const handleWish = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setWished((w) => !w);
//   };

//   const goToProduct = () => navigate(`/product/${p._id}`);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(124,58,237,0.10)] hover:border-violet-100 transition-all duration-300"
//     >
//       {/* Image area — NAVIGATES */}
//       <div
//         onClick={goToProduct}
//         className="relative bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer"
//         style={{ aspectRatio: "1" }}
//       >
//         <motion.img
//           whileHover={{ scale: 1.07 }}
//           transition={{ duration: 0.35 }}
//           src={p.image}
//           alt={p.name}
//           loading="lazy"
//           className="w-full h-full object-contain mix-blend-multiply p-4"
//           onError={(e) => {
//             e.target.src = `https://placehold.co/200x200/f1f5f9/94a3b8?text=${encodeURIComponent(p.name?.slice(0, 2) || "?")}`;
//           }}
//         />

//         {/* Discount badge */}
//         {discount > 0 && (
//           <div className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-md shadow-violet-600/30">
//             {discount}% OFF
//           </div>
//         )}

//         {/* Stock badge */}
//         {p.stock > 0 && p.stock <= 5 && (
//           <div className="absolute top-3 right-10 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
//             Only {p.stock} left
//           </div>
//         )}

//         {/* Wishlist — does NOT navigate */}
//         <button
//           onClick={handleWish}
//           className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm border border-slate-100 hover:scale-110 transition-transform z-10"
//         >
//           <span className={`text-sm transition-colors ${wished ? "text-red-500" : "text-slate-300 hover:text-red-400"}`}>
//             {wished ? "♥" : "♡"}
//           </span>
//         </button>

//         {/* Delivery chip */}
//         <div className="absolute bottom-2.5 left-3 bg-white/95 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
//           ⚡ 10 min
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-3.5">
//         {/* Rating */}
//         {p.rating && (
//           <div className="flex items-center gap-1.5 mb-1.5">
//             <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full">
//               <span className="text-amber-400 text-[10px]">★</span>
//               <span className="text-[10px] font-semibold text-amber-700">{p.rating}</span>
//             </div>
//             {p.reviewCount && (
//               <span className="text-[10px] text-slate-400">({Number(p.reviewCount).toLocaleString()})</span>
//             )}
//           </div>
//         )}

//         <p className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug mb-0.5">
//           {p.name}
//         </p>
//         {p.weight && <p className="text-[11px] text-slate-400 mb-2.5">{p.weight}</p>}

//         {/* Price */}
//         <div className="flex items-baseline gap-1.5 mb-3">
//           <span className="text-base font-bold text-slate-900">₹{p.price}</span>
//           {p.mrp > p.price && (
//             <span className="text-xs text-slate-400 line-through">₹{p.mrp}</span>
//           )}
//         </div>

//         {/* ADD / Stepper — does NOT navigate */}
//         {qty === 0 ? (
//           <button
//             onClick={handleAddToCart}
//             className="relative w-full overflow-hidden border border-violet-200 bg-violet-50 hover:bg-violet-600 text-violet-700 hover:text-white text-sm font-semibold py-2 rounded-xl transition-all duration-200 active:scale-[0.97]"
//           >
//             {ripple && (
//               <span className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
//             )}
//             Add to cart
//           </button>
//         ) : (
//           <div className="flex items-center justify-between bg-violet-600 rounded-xl px-3 py-1.5">
//             <button onClick={handleDec} className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform">−</button>
//             <span className="text-white font-bold text-sm tabular-nums">{qty}</span>
//             <button onClick={handleInc} className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform">+</button>
//           </div>
//         )}

//         {/* View Details — NAVIGATES */}
//         <button
//           onClick={goToProduct}
//           className="w-full text-center text-[11px] text-slate-400 hover:text-violet-600 mt-2 transition-colors"
//         >
//           View details →
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// /* ─── Rotating Offer Strip ─── */
// const OFFERS = [
//   "✦  Use FIRST50 → 50% OFF on your first order",
//   "🚚  Free delivery on orders above ₹199",
//   "⚡  Same-slot express delivery now available",
//   "🎁  New users get 3 months free delivery pass",
// ];

// function OfferStrip() {
//   const [idx, setIdx] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const t = setInterval(() => {
//       setVisible(false);
//       setTimeout(() => { setIdx((i) => (i + 1) % OFFERS.length); setVisible(true); }, 300);
//     }, 3500);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="bg-[#111827] text-slate-300 text-center text-xs font-medium py-2.5 px-4 select-none tracking-wide">
//       <span className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
//         {OFFERS[idx]}
//       </span>
//     </div>
//   );
// }

// /* ─── Category Card ─── */
// const CAT_GRADIENTS = [
//   "from-violet-500 to-purple-600",
//   "from-emerald-500 to-teal-600",
//   "from-orange-400 to-amber-500",
//   "from-blue-500 to-indigo-600",
//   "from-pink-500 to-rose-600",
//   "from-cyan-500 to-sky-600",
//   "from-lime-500 to-green-600",
//   "from-fuchsia-500 to-pink-600",
// ];

// function CategoryCard({ cat, active, onClick, index }) {
//   return (
//     <motion.button
//       onClick={onClick}
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.05 }}
//       whileHover={{ y: -3 }}
//       whileTap={{ scale: 0.96 }}
//       className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 min-w-[88px] ${
//         active
//           ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-600/25"
//           : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-slate-100"
//       }`}
//     >
//       <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${
//         active ? "bg-white/20" : `bg-gradient-to-br ${CAT_GRADIENTS[index % CAT_GRADIENTS.length]} shadow-sm`
//       }`}>
//         {cat.icon}
//       </div>
//       <span className={`text-[11px] font-semibold leading-tight text-center line-clamp-1 ${
//         active ? "text-white" : "text-slate-700"
//       }`}>
//         {cat.name}
//       </span>
//     </motion.button>
//   );
// }

// /* ─── Section tabs ─── */
// const TABS = [
//   { key: "best",     label: "Best Sellers" },
//   { key: "trending", label: "Trending Now" },
//   { key: "new",      label: "New Arrivals" },
//   { key: "ai",       label: "AI Picks ✦"  },
//   { key: "deals",    label: "Flash Deals"  },
// ];

// /* ─── AI Insight Card ─── */
// function InsightCard({ icon, text, color }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.02 }}
//       className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-200 cursor-default"
//     >
//       <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${color}`}>
//         {icon}
//       </div>
//       <p className="text-[12px] text-slate-600 leading-relaxed">{text}</p>
//     </motion.div>
//   );
// }

// /* ══════════════════════════════════════════
//    MAIN HOME PAGE
// ══════════════════════════════════════════ */
// export default function Home() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { list, categories, loading } = useSelector((s) => s.products);
//   const cartItems = useSelector((s) => s.cart.cart?.items || []);
//   const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
//   const cartTotal = useSelector((s) => s.cart.cart?.total || 0);

//   const [params] = useSearchParams();
//   const q = params.get("q") || "";
//   const cat = params.get("category") || "";

//   const [activeTab, setActiveTab] = useState("best");
//   const [activeCat, setActiveCat] = useState(cat);
//   const [liveOrders, setLiveOrders] = useState(24170);
//   const productsRef = useRef(null);

//   useEffect(() => {
//     const t = setInterval(() => setLiveOrders((n) => n + Math.floor(Math.random() * 4 + 1)), 4000);
//     return () => clearInterval(t);
//   }, []);

//   useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchProducts({ q, category: activeCat }));
//   }, [dispatch, q, activeCat]);

//   const handleCatClick = (slug) => {
//     const next = slug === activeCat ? "" : slug;
//     setActiveCat(next);
//     navigate(next ? `/?category=${next}` : "/");
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC]">
//       <OfferStrip />

//       <main className="max-w-7xl mx-auto px-4 py-8 pb-28 md:pb-10 space-y-12">

//         {/* ══ HERO ══════════════════════════════ */}
//         <section className="relative overflow-hidden rounded-3xl bg-[#111827] px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">

//           {/* Background texture */}
//           <div className="absolute inset-0 opacity-[0.035]"
//             style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

//           {/* Accent glow */}
//           <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

//           {/* Left copy */}
//           <div className="relative z-10 flex-1">
//             {/* Eyebrow */}
//             <motion.div
//               initial={{ opacity: 0, y: 8 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 px-3.5 py-1.5 rounded-full mb-5"
//             >
//               <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
//               <span className="text-violet-300 text-xs font-medium tracking-wide">
//                 {liveOrders.toLocaleString()} orders delivered today
//               </span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.08 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
//             >
//               Shop smarter
//               <br />
//               <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
//                 with AI.
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.14 }}
//               className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-7"
//             >
//               Discover products, build carts, compare prices and order in
//               seconds using intelligent shopping assistants.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="flex flex-wrap gap-3"
//             >
//               <button
//                 onClick={() => productsRef.current?.scrollIntoView({ behavior: "smooth" })}
//                 className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 active:scale-95 transition-all duration-150"
//               >
//                 Start shopping
//               </button>
//               <Link
//                 to="/ai"
//                 className="border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
//               >
//                 Try AI assistant ✦
//               </Link>
//             </motion.div>

//             {/* Trust badges */}
//             <div className="flex flex-wrap gap-5 mt-7">
//               {[
//                 { icon: "⚡", text: "10 min delivery" },
//                 { icon: "🤖", text: "AI-powered" },
//                 { icon: "🔒", text: "Secure checkout" },
//                 { icon: "🌿", text: "Fresh quality" },
//               ].map((b) => (
//                 <span key={b.text} className="flex items-center gap-1.5 text-slate-500 text-xs">
//                   <span>{b.icon}</span> {b.text}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Right — floating cards */}
//           <div className="relative z-10 hidden md:flex flex-col gap-3 shrink-0">
//             {/* AI widget card */}
//             <motion.div
//               animate={{ y: [0, -6, 0] }}
//               transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
//               className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl p-4 w-56"
//             >
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-sm">🤖</div>
//                 <span className="text-white/80 text-xs font-medium">AI Assistant</span>
//                 <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//               </div>
//               <p className="text-slate-400 text-[11px] leading-relaxed">
//                 "Build me a weekly meal plan under ₹1500 with fresh produce."
//               </p>
//               <div className="mt-2.5 flex gap-1">
//                 {["Meal plan", "Budget", "Fresh"].map((t) => (
//                   <span key={t} className="text-[9px] bg-violet-600/25 text-violet-300 px-1.5 py-0.5 rounded-full border border-violet-500/20">
//                     {t}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Stats card */}
//             <motion.div
//               animate={{ y: [0, 6, 0] }}
//               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.8 }}
//               className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl p-4 w-56"
//             >
//               <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2.5">This week</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {[
//                   { val: "₹340", label: "Saved" },
//                   { val: "12",   label: "Orders" },
//                   { val: "98%",  label: "On time" },
//                   { val: "4.9★", label: "Rating" },
//                 ].map((s) => (
//                   <div key={s.label} className="bg-white/5 rounded-xl p-2 text-center">
//                     <p className="text-white font-bold text-sm">{s.val}</p>
//                     <p className="text-slate-500 text-[9px]">{s.label}</p>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ══ PROMO BANNERS ═════════════════════ */}
//         <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {[
//             { bg: "bg-gradient-to-br from-violet-600 to-purple-700", emoji: "🎁", title: "50% OFF",       sub: "First order · New users only",     cta: "Claim now →", to: "/register" },
//             { bg: "bg-gradient-to-br from-[#111827] to-slate-800",   emoji: "🤖", title: "AI Shopping",   sub: "Build your cart with 20 AI agents", cta: "Try free →",   to: "/ai"       },
//             { bg: "bg-gradient-to-br from-emerald-600 to-teal-700",  emoji: "🚚", title: "Free delivery", sub: "On all orders above ₹199",          cta: "Shop now →",   to: "/products" },
//           ].map((b) => (
//             <Link
//               key={b.title}
//               to={b.to}
//               className={`${b.bg} rounded-2xl p-5 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 active:scale-[0.98] group`}
//             >
//               <div>
//                 <p className="text-white/60 text-xs mb-0.5">{b.sub}</p>
//                 <p className="text-white font-extrabold text-lg leading-tight">{b.title}</p>
//                 <p className="text-white/70 text-xs mt-2 font-medium group-hover:text-white transition-colors">{b.cta}</p>
//               </div>
//               <span className="text-4xl opacity-90">{b.emoji}</span>
//             </Link>
//           ))}
//         </section>

//         {/* ══ CATEGORIES ════════════════════════ */}
//         <section>
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-0.5">Browse</p>
//               <h2 className="text-xl font-bold text-slate-900">Shop by category</h2>
//             </div>
//             <Link to="/categories" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
//               View all →
//             </Link>
//           </div>

//           <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x -mx-4 px-4">
//             {/* All */}
//             <motion.button
//               onClick={() => { setActiveCat(""); navigate("/"); }}
//               whileTap={{ scale: 0.96 }}
//               className={`snap-start shrink-0 flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 min-w-[88px] ${
//                 activeCat === ""
//                   ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-600/25"
//                   : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md"
//               }`}
//             >
//               <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${
//                 activeCat === "" ? "bg-white/20" : "bg-gradient-to-br from-slate-600 to-slate-700 shadow-sm"
//               }`}>
//                 🏪
//               </div>
//               <span className={`text-[11px] font-semibold ${activeCat === "" ? "text-white" : "text-slate-700"}`}>
//                 All
//               </span>
//             </motion.button>

//             {categories.map((c, i) => (
//               <div key={c._id} className="snap-start shrink-0">
//                 <CategoryCard
//                   cat={c}
//                   active={activeCat === c.slug}
//                   onClick={() => handleCatClick(c.slug)}
//                   index={i}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ══ AI RECOMMENDATIONS ════════════════ */}
//         <section className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-6">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-lg shadow-md shadow-violet-600/30">
//               🤖
//             </div>
//             <div>
//               <p className="text-[11px] text-violet-500 uppercase tracking-widest font-medium">Powered by AI</p>
//               <h2 className="text-lg font-bold text-slate-900">Recommended for you</h2>
//             </div>
//             <Link to="/ai" className="ml-auto text-sm font-semibold text-violet-600 hover:text-violet-700">
//               Ask AI →
//             </Link>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             {[
//               { icon: "💡", text: "You usually buy milk every 6 days — running low?", color: "bg-blue-50 text-blue-600" },
//               { icon: "📉", text: "Potato prices are 18% lower this week. Good time to stock up.", color: "bg-emerald-50 text-emerald-600" },
//               { icon: "💰", text: "Switch to Fortune oil — save ₹80 vs your usual brand.", color: "bg-amber-50 text-amber-600" },
//               { icon: "🥗", text: "Protein intake below target. Try adding Greek yogurt this week.", color: "bg-rose-50 text-rose-600" },
//             ].map((ins, i) => (
//               <InsightCard key={i} {...ins} />
//             ))}
//           </div>
//         </section>

//         {/* ══ PRODUCTS ══════════════════════════ */}
//         <section ref={productsRef}>
//           {/* Header */}
//           <div className="flex items-center justify-between mb-5">
//             <div>
//               <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-0.5">
//                 {q ? "Search results" : "Products"}
//               </p>
//               <h2 className="text-xl font-bold text-slate-900">
//                 {q ? <>Results for <span className="text-violet-600">"{q}"</span></> : "Top picks for you"}
//               </h2>
//             </div>
//             <Link to="/products" className="text-sm font-semibold text-violet-600 hover:text-violet-700">
//               View all →
//             </Link>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
//                   activeTab === tab.key
//                     ? "bg-[#111827] text-white border-[#111827] shadow-sm"
//                     : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Grid */}
//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
//               {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
//             </div>
//           ) : list.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-24"
//             >
//               <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4">🔍</div>
//               <p className="text-lg font-bold text-slate-700 mb-1">Nothing found</p>
//               <p className="text-sm text-slate-400 mb-5">Try a different search or category</p>
//               <button
//                 onClick={() => { setActiveCat(""); navigate("/"); }}
//                 className="text-sm text-violet-600 font-semibold border border-violet-200 bg-violet-50 hover:bg-violet-600 hover:text-white px-5 py-2 rounded-xl transition-all"
//               >
//                 Clear filters
//               </button>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial="hidden"
//               animate="visible"
//               variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
//               className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
//             >
//               {list.map((p) => <ProductCard key={p._id} p={p} />)}
//             </motion.div>
//           )}
//         </section>

//         {/* ══ WHY US ════════════════════════════ */}
//         <section className="bg-white border border-slate-100 rounded-3xl p-8">
//           <div className="text-center mb-8">
//             <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-1">Why QuickKart</p>
//             <h2 className="text-xl font-bold text-slate-900">Built for how people actually shop</h2>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { icon: "⚡", title: "10 min delivery",  sub: "Fastest in the city",     bg: "bg-amber-50",   ic: "text-amber-500"   },
//               { icon: "🤖", title: "20 AI agents",     sub: "Shopping on autopilot",   bg: "bg-violet-50",  ic: "text-violet-600"  },
//               { icon: "💸", title: "Best prices",       sub: "AI finds the best deals", bg: "bg-emerald-50", ic: "text-emerald-600" },
//               { icon: "🔒", title: "Secure checkout",  sub: "UPI · Cards · COD",       bg: "bg-blue-50",    ic: "text-blue-600"    },
//             ].map((f) => (
//               <motion.div
//                 key={f.title}
//                 whileHover={{ scale: 1.02 }}
//                 className={`${f.bg} rounded-2xl p-5 text-center hover:shadow-sm transition-all duration-200`}
//               >
//                 <div className={`text-3xl mb-3 ${f.ic}`}>{f.icon}</div>
//                 <p className="text-sm font-bold text-slate-800 mb-0.5">{f.title}</p>
//                 <p className="text-[11px] text-slate-500">{f.sub}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* ══ STICKY CART BAR (mobile) ══════════ */}
//       <AnimatePresence>
//         {cartCount > 0 && (
//           <motion.div
//             initial={{ y: 80, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 80, opacity: 0 }}
//             className="fixed bottom-4 left-4 right-4 z-50 md:hidden max-w-lg mx-auto"
//           >
//             <Link
//               to="/cart"
//               className="flex items-center justify-between bg-[#111827] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/30 active:scale-[0.98] transition-all"
//             >
//               <div className="flex items-center gap-2.5">
//                 <div className="bg-violet-600 rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums">
//                   {cartCount}
//                 </div>
//                 <span className="text-sm font-medium text-slate-300">
//                   {cartCount === 1 ? "item" : "items"} in cart
//                 </span>
//               </div>
//               <div className="flex items-center gap-1.5 font-bold text-sm">
//                 ₹{Math.round(cartTotal)}
//                 <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
//                 </svg>
//               </div>
//             </Link>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../api/axios";
import {
  fetchCategories,
  fetchProducts,
} from "../../features/products/productsSlice";
import {
  fetchCart,
  addToCart,
  updateCart,
  removeFromCart,
} from "../../features/cart/cartSlice";

/* ══════════════════════════════════════════
   DESIGN TOKENS
   Primary: #111827 | Accent: #7C3AED
   Background: #F8FAFC | Cards: #FFFFFF
══════════════════════════════════════════ */

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100">
      <div className="bg-slate-100 h-48 relative overflow-hidden">
        <div
          className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)",
          }}
        />
      </div>
      <div className="p-4 space-y-2.5">
        <div className="h-2.5 bg-slate-100 rounded-full w-2/3" />
        <div className="h-3.5 bg-slate-100 rounded-full w-5/6" />
        <div className="h-2.5 bg-slate-100 rounded-full w-1/2" />
        <div className="h-10 bg-slate-100 rounded-xl mt-4" />
      </div>
    </div>
  );
}

/* ─── Premium Product Card ─── */
function ProductCard({ p }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((s) => s.cart.cart?.items || []);
  const item = cartItems.find(
    (i) => i.product?._id === p._id || i.product === p._id
  );
  const qty = item?.quantity || 0;
  const discount =
    p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
  const [wished, setWished] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
    dispatch(addToCart({ productId: p._id, quantity: 1 }));
  };

  const handleInc = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(updateCart({ productId: p._id, quantity: qty + 1 }));
  };

  const handleDec = (e) => {
    e.stopPropagation();
    e.preventDefault();
    qty - 1 === 0
      ? dispatch(removeFromCart(p._id))
      : dispatch(updateCart({ productId: p._id, quantity: qty - 1 }));
  };

  const handleWish = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setWished((w) => !w);
  };

  const goToProduct = () => navigate(`/product/${p._id}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(124,58,237,0.10)] hover:border-violet-100 transition-all duration-300"
    >
      {/* Image area — NAVIGATES */}
      <div
        onClick={goToProduct}
        className="relative bg-slate-50 flex items-center justify-center overflow-hidden cursor-pointer"
        style={{ aspectRatio: "1" }}
      >
        <motion.img
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.35 }}
          src={getImageUrl(p.image)}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply p-4"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x300/f1f5f9/94a3b8?text=${encodeURIComponent(
              p.name?.slice(0, 10) || "Product"
            )}`;
          }}
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide shadow-md shadow-violet-600/30">
            {discount}% OFF
          </div>
        )}

        {/* Stock badge */}
        {p.stock > 0 && p.stock <= 5 && (
          <div className="absolute top-3 right-10 bg-amber-50 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-200">
            Only {p.stock} left
          </div>
        )}

        {/* Wishlist — does NOT navigate */}
        <button
          onClick={handleWish}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm border border-slate-100 hover:scale-110 transition-transform z-10"
        >
          <span
            className={`text-sm transition-colors ${
              wished
                ? "text-red-500"
                : "text-slate-300 hover:text-red-400"
            }`}
          >
            {wished ? "♥" : "♡"}
          </span>
        </button>

        {/* Delivery chip */}
        <div className="absolute bottom-2.5 left-3 bg-white/95 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
          ⚡ 10 min
        </div>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {/* Rating */}
        {p.rating && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full">
              <span className="text-amber-400 text-[10px]">★</span>
              <span className="text-[10px] font-semibold text-amber-700">
                {p.rating}
              </span>
            </div>
            {p.reviewCount && (
              <span className="text-[10px] text-slate-400">
                ({Number(p.reviewCount).toLocaleString()})
              </span>
            )}
          </div>
        )}

        <p className="text-[13px] font-semibold text-slate-800 line-clamp-2 leading-snug mb-0.5">
          {p.name}
        </p>
        {p.weight && (
          <p className="text-[11px] text-slate-400 mb-2.5">{p.weight}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-base font-bold text-slate-900">₹{p.price}</span>
          {p.mrp > p.price && (
            <span className="text-xs text-slate-400 line-through">
              ₹{p.mrp}
            </span>
          )}
        </div>

        {/* ADD / Stepper — does NOT navigate */}
        {qty === 0 ? (
          <button
            onClick={handleAddToCart}
            className="relative w-full overflow-hidden border border-violet-200 bg-violet-50 hover:bg-violet-600 text-violet-700 hover:text-white text-sm font-semibold py-2 rounded-xl transition-all duration-200 active:scale-[0.97]"
          >
            {ripple && (
              <span className="absolute inset-0 bg-white/30 rounded-xl animate-ping" />
            )}
            Add to cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-violet-600 rounded-xl px-3 py-1.5">
            <button
              onClick={handleDec}
              className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform"
            >
              −
            </button>
            <span className="text-white font-bold text-sm tabular-nums">
              {qty}
            </span>
            <button
              onClick={handleInc}
              className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform"
            >
              +
            </button>
          </div>
        )}

        {/* View Details — NAVIGATES */}
        <button
          onClick={goToProduct}
          className="w-full text-center text-[11px] text-slate-400 hover:text-violet-600 mt-2 transition-colors"
        >
          View details →
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Rotating Offer Strip ─── */
const OFFERS = [
  "✦  Use FIRST50 → 50% OFF on your first order",
  "🚚  Free delivery on orders above ₹199",
  "⚡  Same-slot express delivery now available",
  "🎁  New users get 3 months free delivery pass",
];

function OfferStrip() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % OFFERS.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#111827] text-slate-300 text-center text-xs font-medium py-2.5 px-4 select-none tracking-wide">
      <span
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {OFFERS[idx]}
      </span>
    </div>
  );
}

/* ─── Category Card ─── */
const CAT_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-400 to-amber-500",
  "from-blue-500 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-sky-600",
  "from-lime-500 to-green-600",
  "from-fuchsia-500 to-pink-600",
];

function CategoryCard({ cat, active, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 min-w-[88px] ${
        active
          ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-600/25"
          : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-slate-100"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${
          active
            ? "bg-white/20"
            : `bg-gradient-to-br ${CAT_GRADIENTS[index % CAT_GRADIENTS.length]} shadow-sm`
        }`}
      >
        {cat.icon}
      </div>
      <span
        className={`text-[11px] font-semibold leading-tight text-center line-clamp-1 ${
          active ? "text-white" : "text-slate-700"
        }`}
      >
        {cat.name}
      </span>
    </motion.button>
  );
}

/* ─── Section tabs ─── */
const TABS = [
  { key: "best", label: "Best Sellers" },
  { key: "trending", label: "Trending Now" },
  { key: "new", label: "New Arrivals" },
  { key: "ai", label: "AI Picks ✦" },
  { key: "deals", label: "Flash Deals" },
];

/* ─── AI Insight Card ─── */
function InsightCard({ icon, text, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-200 cursor-default"
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0 ${color}`}>
        {icon}
      </div>
      <p className="text-[12px] text-slate-600 leading-relaxed">{text}</p>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN HOME PAGE
══════════════════════════════════════════ */
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, categories, loading } = useSelector((s) => s.products);
  const cartItems = useSelector((s) => s.cart.cart?.items || []);
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);
  const cartTotal = useSelector((s) => s.cart.cart?.total || 0);

  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const cat = params.get("category") || "";

  const [activeTab, setActiveTab] = useState("best");
  const [activeCat, setActiveCat] = useState(cat);
  const [liveOrders, setLiveOrders] = useState(24170);
  const productsRef = useRef(null);

  // ===================== LIVE ORDERS COUNTER =====================
  useEffect(() => {
    const t = setInterval(
      () => setLiveOrders((n) => n + Math.floor(Math.random() * 4 + 1)),
      4000
    );
    return () => clearInterval(t);
  }, []);

  // ===================== FETCH CATEGORIES =====================
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ===================== FETCH PRODUCTS =====================
  useEffect(() => {
    dispatch(fetchProducts({ q, category: activeCat }));
  }, [dispatch, q, activeCat]);

  // ===================== FETCH CART (WITH TOKEN CHECK) =====================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("✅ User authenticated, fetching cart");
      dispatch(fetchCart());
    } else {
      console.log("⚠️ User not authenticated, skipping cart fetch");
    }
  }, [dispatch]);

  // ===================== HANDLE CATEGORY CLICK =====================
  const handleCatClick = (slug) => {
    const next = slug === activeCat ? "" : slug;
    setActiveCat(next);
    navigate(next ? `/?category=${next}` : "/");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <OfferStrip />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-28 md:pb-10 space-y-12">

        {/* ══ HERO ══════════════════════════════ */}
        <section className="relative overflow-hidden rounded-3xl bg-[#111827] px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">

          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Accent glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left copy */}
          <div className="relative z-10 flex-1">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 px-3.5 py-1.5 rounded-full mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-violet-300 text-xs font-medium tracking-wide">
                {liveOrders.toLocaleString()} orders delivered today
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4"
            >
              Shop smarter
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                with AI.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-7"
            >
              Discover products, build carts, compare prices and order in
              seconds using intelligent shopping assistants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() =>
                  productsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 active:scale-95 transition-all duration-150"
              >
                Start shopping
              </button>
              <Link
                to="/ai"
                className="border border-white/15 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
              >
                Try AI assistant ✦
              </Link>
            </motion.div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-7">
              {[
                { icon: "⚡", text: "10 min delivery" },
                { icon: "🤖", text: "AI-powered" },
                { icon: "🔒", text: "Secure checkout" },
                { icon: "🌿", text: "Fresh quality" },
              ].map((b) => (
                <span
                  key={b.text}
                  className="flex items-center gap-1.5 text-slate-500 text-xs"
                >
                  <span>{b.icon}</span> {b.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative z-10 hidden md:flex flex-col gap-3 shrink-0">
            {/* AI widget card */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl p-4 w-56"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center text-sm">
                  🤖
                </div>
                <span className="text-white/80 text-xs font-medium">
                  AI Assistant
                </span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                "Build me a weekly meal plan under ₹1500 with fresh produce."
              </p>
              <div className="mt-2.5 flex gap-1">
                {["Meal plan", "Budget", "Fresh"].map((t) => (
                  <span
                    key={t}
                    className="text-[9px] bg-violet-600/25 text-violet-300 px-1.5 py-0.5 rounded-full border border-violet-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Stats card */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
                delay: 0.8,
              }}
              className="bg-white/[0.06] backdrop-blur border border-white/10 rounded-2xl p-4 w-56"
            >
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2.5">
                This week
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: "₹340", label: "Saved" },
                  { val: "12", label: "Orders" },
                  { val: "98%", label: "On time" },
                  { val: "4.9★", label: "Rating" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-xl p-2 text-center">
                    <p className="text-white font-bold text-sm">{s.val}</p>
                    <p className="text-slate-500 text-[9px]">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ PROMO BANNERS ═════════════════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              bg: "bg-gradient-to-br from-violet-600 to-purple-700",
              emoji: "🎁",
              title: "50% OFF",
              sub: "First order · New users only",
              cta: "Claim now →",
              to: "/register",
            },
            {
              bg: "bg-gradient-to-br from-[#111827] to-slate-800",
              emoji: "🤖",
              title: "AI Shopping",
              sub: "Build your cart with 20 AI agents",
              cta: "Try free →",
              to: "/ai",
            },
            {
              bg: "bg-gradient-to-br from-emerald-600 to-teal-700",
              emoji: "🚚",
              title: "Free delivery",
              sub: "On all orders above ₹199",
              cta: "Shop now →",
              to: "/products",
            },
          ].map((b) => (
            <Link
              key={b.title}
              to={b.to}
              className={`${b.bg} rounded-2xl p-5 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl transition-all duration-200 active:scale-[0.98] group`}
            >
              <div>
                <p className="text-white/60 text-xs mb-0.5">{b.sub}</p>
                <p className="text-white font-extrabold text-lg leading-tight">
                  {b.title}
                </p>
                <p className="text-white/70 text-xs mt-2 font-medium group-hover:text-white transition-colors">
                  {b.cta}
                </p>
              </div>
              <span className="text-4xl opacity-90">{b.emoji}</span>
            </Link>
          ))}
        </section>

        {/* ══ CATEGORIES ════════════════════════ */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-0.5">
                Browse
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                Shop by category
              </h2>
            </div>
            <Link
              to="/categories"
              className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x -mx-4 px-4">
            {/* All */}
            <motion.button
              onClick={() => {
                setActiveCat("");
                navigate("/");
              }}
              whileTap={{ scale: 0.96 }}
              className={`snap-start shrink-0 flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 min-w-[88px] ${
                activeCat === ""
                  ? "bg-violet-600 border-violet-600 shadow-lg shadow-violet-600/25"
                  : "bg-white border-slate-100 hover:border-violet-200 hover:shadow-md"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl ${
                  activeCat === ""
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-slate-600 to-slate-700 shadow-sm"
                }`}
              >
                🏪
              </div>
              <span
                className={`text-[11px] font-semibold ${
                  activeCat === "" ? "text-white" : "text-slate-700"
                }`}
              >
                All
              </span>
            </motion.button>

            {categories.map((c, i) => (
              <div key={c._id} className="snap-start shrink-0">
                <CategoryCard
                  cat={c}
                  active={activeCat === c.slug}
                  onClick={() => handleCatClick(c.slug)}
                  index={i}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══ AI RECOMMENDATIONS ════════════════ */}
        <section className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-lg shadow-md shadow-violet-600/30">
              🤖
            </div>
            <div>
              <p className="text-[11px] text-violet-500 uppercase tracking-widest font-medium">
                Powered by AI
              </p>
              <h2 className="text-lg font-bold text-slate-900">
                Recommended for you
              </h2>
            </div>
            <Link
              to="/ai"
              className="ml-auto text-sm font-semibold text-violet-600 hover:text-violet-700"
            >
              Ask AI →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                icon: "💡",
                text: "You usually buy milk every 6 days — running low?",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: "📉",
                text: "Potato prices are 18% lower this week. Good time to stock up.",
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                icon: "💰",
                text: "Switch to Fortune oil — save ₹80 vs your usual brand.",
                color: "bg-amber-50 text-amber-600",
              },
              {
                icon: "🥗",
                text: "Protein intake below target. Try adding Greek yogurt this week.",
                color: "bg-rose-50 text-rose-600",
              },
            ].map((ins, i) => (
              <InsightCard key={i} {...ins} />
            ))}
          </div>
        </section>

        {/* ══ PRODUCTS ══════════════════════════ */}
        <section ref={productsRef}>
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-0.5">
                {q ? "Search results" : "Products"}
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                {q ? (
                  <>
                    Results for{" "}
                    <span className="text-violet-600">"{q}"</span>
                  </>
                ) : (
                  "Top picks for you"
                )}
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-violet-600 hover:text-violet-700"
            >
              View all →
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  activeTab === tab.key
                    ? "bg-[#111827] text-white border-[#111827] shadow-sm"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : list.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4">
                🔍
              </div>
              <p className="text-lg font-bold text-slate-700 mb-1">
                Nothing found
              </p>
              <p className="text-sm text-slate-400 mb-5">
                Try a different search or category
              </p>
              <button
                onClick={() => {
                  setActiveCat("");
                  navigate("/");
                }}
                className="text-sm text-violet-600 font-semibold border border-violet-200 bg-violet-50 hover:bg-violet-600 hover:text-white px-5 py-2 rounded-xl transition-all"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            >
              {list.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </motion.div>
          )}
        </section>

        {/* ══ WHY US ════════════════════════════ */}
        <section className="bg-white border border-slate-100 rounded-3xl p-8">
          <div className="text-center mb-8">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-medium mb-1">
              Why QuickKart
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Built for how people actually shop
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "⚡",
                title: "10 min delivery",
                sub: "Fastest in the city",
                bg: "bg-amber-50",
                ic: "text-amber-500",
              },
              {
                icon: "🤖",
                title: "20 AI agents",
                sub: "Shopping on autopilot",
                bg: "bg-violet-50",
                ic: "text-violet-600",
              },
              {
                icon: "💸",
                title: "Best prices",
                sub: "AI finds the best deals",
                bg: "bg-emerald-50",
                ic: "text-emerald-600",
              },
              {
                icon: "🔒",
                title: "Secure checkout",
                sub: "UPI · Cards · COD",
                bg: "bg-blue-50",
                ic: "text-blue-600",
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ scale: 1.02 }}
                className={`${f.bg} rounded-2xl p-5 text-center hover:shadow-sm transition-all duration-200`}
              >
                <div className={`text-3xl mb-3 ${f.ic}`}>{f.icon}</div>
                <p className="text-sm font-bold text-slate-800 mb-0.5">
                  {f.title}
                </p>
                <p className="text-[11px] text-slate-500">{f.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* ══ STICKY CART BAR (mobile) ══════════ */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden max-w-lg mx-auto"
          >
            <Link
              to="/cart"
              className="flex items-center justify-between bg-[#111827] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/30 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="bg-violet-600 rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums">
                  {cartCount}
                </div>
                <span className="text-sm font-medium text-slate-300">
                  {cartCount === 1 ? "item" : "items"} in cart
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                ₹{Math.round(cartTotal)}
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}