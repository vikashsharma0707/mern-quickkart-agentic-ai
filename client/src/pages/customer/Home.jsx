// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useSearchParams } from "react-router-dom";
// // import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
// // import ProductCard from "../../components/customer/ProductCard";
// // import Loading from "../../components/common/Loading";

// // export default function Home() {
// //   const dispatch = useDispatch();
// //   const { list, categories, loading } = useSelector((s) => s.products);
// //   const [params] = useSearchParams();
// //   const q = params.get("q") || "";
// //   const cat = params.get("category") || "";

// //   useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);
// //   useEffect(() => { dispatch(fetchProducts({ q, category: cat })); }, [dispatch, q, cat]);

// //   return (
// //     <div className="max-w-7xl mx-auto p-4">
// //       <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-2xl p-6 mb-6">
// //         <div className="text-3xl font-extrabold">Groceries delivered in <span className="text-brand">10 minutes</span></div>
// //         <div className="text-sm text-gray-700 mt-1">Powered by 20 autonomous AI agents · Ask, plan, save 💰</div>
// //         <Link to="/ai" className="btn btn-primary mt-3 inline-block">🤖 Try AI Assistant</Link>
// //       </div>

// //       <h2 className="text-xl font-bold mb-3">Shop by category</h2>
// //       <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-6">
// //         {categories.map((c) => (
// //           <Link key={c._id} to={`/?category=${c.slug}`} className="card p-3 text-center hover:shadow-md">
// //             <div className="text-3xl">{c.icon}</div>
// //             <div className="text-xs mt-1 font-medium line-clamp-2">{c.name}</div>
// //           </Link>
// //         ))}
// //       </div>

// //       <h2 className="text-xl font-bold mb-3">{q ? `Results for "${q}"` : "Top picks for you"}</h2>
// //       {loading ? <Loading /> : (
// //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
// //           {list.map((p) => <ProductCard key={p._id} p={p} />)}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useSearchParams } from "react-router-dom";
// import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
// import ProductCard from "../../components/customer/ProductCard";
// import Loading from "../../components/common/Loading";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// export default function Home() {
//   const dispatch = useDispatch();
//   const { list, categories, loading } = useSelector((s) => s.products);

//   const [params] = useSearchParams();
//   const q = params.get("q") || "";
//   const cat = params.get("category") || "";

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchProducts({ q, category: cat }));
//   }, [dispatch, q, cat]);

//   const banners = [
//     {
//       id: 1,
//       image:
//         "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600",
//       title: "Fresh Groceries Delivered",
//       subtitle: "Get your daily essentials in just 10 minutes",
//       button: "Shop Now",
//     },
//     {
//       id: 2,
//       image:
//         "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1600",
//       title: "Mega Savings Everyday",
//       subtitle: "Up to 60% OFF on groceries, fruits & vegetables",
//       button: "Explore Deals",
//     },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-5">

//       {/* Hero Section */}
//       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-8 md:p-12 mb-8 shadow-2xl">

//         <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

//         <div className="relative z-10">
//           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium mb-4">
//             ⚡ 10 Minute Delivery
//           </div>

//           <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
//             Groceries Delivered
//             <br />
//             In <span className="text-yellow-300">10 Minutes</span>
//           </h1>

//           <p className="mt-4 text-lg text-green-50 max-w-2xl">
//             Smart grocery shopping powered by AI. Find products,
//             discover offers, and get lightning-fast delivery.
//           </p>

//           <div className="flex flex-wrap gap-4 mt-6">
//             <Link
//               to="/ai"
//               className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
//             >
//               🤖 AI Assistant
//             </Link>

//             <Link
//               to="/products"
//               className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
//             >
//               Explore Products
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">
//           Shop by Category
//         </h2>

//         <Link
//           to="/categories"
//           className="text-green-600 font-semibold hover:text-green-700"
//         >
//           View All →
//         </Link>
//       </div>

//       <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-10">
//         {categories.map((c) => (
//           <Link
//             key={c._id}
//             to={`/?category=${c.slug}`}
//             className="
//               bg-white
//               rounded-2xl
//               p-4
//               border
//               hover:border-green-500
//               hover:shadow-xl
//               hover:-translate-y-1
//               transition-all
//               duration-300
//               text-center
//             "
//           >
//             <div className="text-4xl mb-2">
//               {c.icon}
//             </div>

//             <div className="text-xs font-semibold text-gray-700 line-clamp-2">
//               {c.name}
//             </div>
//           </Link>
//         ))}
//       </div>

      

//       {/* Products */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold">
//           {q ? `Results for "${q}"` : "Top Picks For You"}
//         </h2>

//         <Link
//           to="/products"
//           className="text-green-600 font-semibold hover:text-green-700"
//         >
//           View All →
//         </Link>
//       </div>

//       {loading ? (
//         <Loading />
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//           {list.map((p) => (
//             <ProductCard
//               key={p._id}
//               p={p}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  fetchCategories,
  fetchProducts,
} from "../../features/products/productsSlice";
import { addToCart, updateCart, removeFromCart } from "../../features/cart/cartSlice";

/* ─── Skeleton loader card ─── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="bg-gray-100 h-36" />
      <div className="p-3 space-y-2">
        <div className="h-2.5 bg-gray-100 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-2.5 bg-gray-100 rounded w-3/5" />
        <div className="h-8 bg-gray-100 rounded-xl mt-3" />
      </div>
    </div>
  );
}

/* ─── Product Card ─── */
function ProductCard({ p }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.cart?.items || []);
  const item = cartItems.find((i) => i.product?._id === p._id || i.product === p._id);
  const qty = item?.quantity || 0;
  const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      {/* Image area */}
      <div className="relative bg-gray-50 flex items-center justify-center p-3 aspect-square">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply"
          onError={(e) => {
            e.target.src = `https://placehold.co/160x160/f1f5f9/94a3b8?text=${encodeURIComponent(
              p.name?.slice(0, 2) || "?"
            )}`;
          }}
        />

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-wide">
            {discount}% OFF
          </div>
        )}

        {/* Stock badge */}
        {p.stock > 0 && p.stock <= 5 && (
          <div className="absolute top-2 right-2 bg-red-50 text-red-600 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border border-red-100">
            Only {p.stock} left
          </div>
        )}

        {/* ETA chip */}
        <div className="absolute bottom-2 left-2 bg-white/95 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-green-100 shadow-sm">
          ⚡ 10 min
        </div>
      </div>

      {/* Body */}
      <div className="p-3 pt-2">
        {/* Rating */}
        {p.rating && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-[10px] bg-green-50 text-green-700 font-semibold px-1.5 py-0.5 rounded">
              ⭐ {p.rating}
            </span>
            {p.reviewCount && (
              <span className="text-[10px] text-gray-400">
                ({Number(p.reviewCount).toLocaleString()})
              </span>
            )}
          </div>
        )}

        <p className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug mb-0.5">
          {p.name}
        </p>

        {p.weight && (
          <p className="text-[11px] text-gray-400 mb-2">{p.weight}</p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mb-1">
          <span className="text-[15px] font-bold text-gray-900">₹{p.price}</span>
          {p.mrp > p.price && (
            <span className="text-xs text-gray-400 line-through">₹{p.mrp}</span>
          )}
        </div>

        {p.soldToday && (
          <p className="text-[10px] text-gray-400 mb-2">🔥 {p.soldToday} bought today</p>
        )}

        {/* ADD / Stepper */}
        {qty === 0 ? (
          <button
            onClick={() => dispatch(addToCart({ productId: p._id, quantity: 1 }))}
            className="w-full bg-green-50 hover:bg-green-600 border border-green-400 hover:border-green-600 text-green-700 hover:text-white text-sm font-semibold py-[7px] rounded-xl transition-all duration-150 active:scale-95"
          >
            ADD
          </button>
        ) : (
          <div className="flex items-center justify-between bg-green-600 rounded-xl px-3 py-1.5">
            <button
              onClick={() =>
                qty - 1 === 0
                  ? dispatch(removeFromCart(p._id))
                  : dispatch(updateCart({ productId: p._id, quantity: qty - 1 }))
              }
              className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform duration-100"
            >
              −
            </button>
            <span className="text-white font-bold text-sm tabular-nums">{qty}</span>
            <button
              onClick={() => dispatch(updateCart({ productId: p._id, quantity: qty + 1 }))}
              className="text-white font-bold text-lg w-6 text-center leading-none active:scale-125 transition-transform duration-100"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Rotating offer strip ─── */
const OFFERS = [
  "🏷️  Use FRESH20 → Save ₹20 on your first order",
  "🚚  Free delivery on orders above ₹199",
  "⚡  Same-slot express delivery now available",
  "🎁  New users get 50% OFF on first 3 orders",
];

function OfferStrip() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % OFFERS.length);
        setFade(true);
      }, 350);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-green-700 text-white text-center text-xs font-medium py-2 px-4 select-none">
      <span
        className="transition-opacity duration-300"
        style={{ opacity: fade ? 1 : 0 }}
      >
        {OFFERS[idx]}
      </span>
    </div>
  );
}

/* ─── Section tabs ─── */
const TABS = [
  { key: "best", label: "🔥 Best Sellers" },
  { key: "trending", label: "📈 Trending" },
  { key: "new", label: "🆕 New Arrivals" },
  { key: "deals", label: "⚡ Flash Deals" },
];

/* ════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════ */
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
  const [liveOrders, setLiveOrders] = useState(2417);
  const productsRef = useRef(null);

  /* Live orders counter (replace with SSE/websocket in production) */
  useEffect(() => {
    const t = setInterval(
      () => setLiveOrders((n) => n + Math.floor(Math.random() * 3 + 1)),
      5000
    );
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ q, category: activeCat }));
  }, [dispatch, q, activeCat]);

  const handleCatClick = (slug) => {
    setActiveCat(slug === activeCat ? "" : slug);
    navigate(slug ? `/?category=${slug}` : "/");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <OfferStrip />

      <main className="max-w-7xl mx-auto px-4 py-5 pb-28 md:pb-8 space-y-8">

        {/* ── HERO ─────────────────────────────── */}
        <section className="relative overflow-hidden rounded-3xl bg-green-600 p-8 md:p-12">
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500 rounded-full opacity-40" />
          <div className="absolute -bottom-16 -left-8 w-52 h-52 bg-green-700 rounded-full opacity-30" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Left copy */}
            <div className="flex-1">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium mb-5">
                <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                {liveOrders.toLocaleString()} orders delivered today
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-3">
                Groceries in{" "}
                <span className="text-yellow-300 underline decoration-wavy decoration-yellow-400/50 underline-offset-4">
                  10 minutes
                </span>
                <br />
                <span className="text-green-100 font-light text-2xl md:text-3xl">
                  right to your door.
                </span>
              </h1>

              <p className="text-green-50 text-sm md:text-base leading-relaxed max-w-lg mb-6">
                Fresh produce, daily staples, snacks — delivered faster than
                you can find your keys. Powered by AI.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    productsRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-green-700 hover:bg-green-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150"
                >
                  Shop now →
                </button>
                <Link
                  to="/ai"
                  className="border-2 border-white/50 text-white hover:bg-white/15 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
                >
                  🤖 AI assistant
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-5 mt-6">
                {[
                  { icon: "⚡", text: "10 min delivery" },
                  { icon: "🌿", text: "100% fresh" },
                  { icon: "🔒", text: "Secure payments" },
                  { icon: "🔄", text: "Easy returns" },
                ].map((b) => (
                  <span
                    key={b.text}
                    className="flex items-center gap-1.5 text-white/80 text-xs"
                  >
                    {b.icon} {b.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — category quick grid (hidden mobile) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
              {[
                { emoji: "🥦", label: "Vegetables" },
                { emoji: "🥛", label: "Dairy" },
                { emoji: "🍎", label: "Fruits" },
                { emoji: "🍞", label: "Bakery" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    productsRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl w-28 h-28 flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                >
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="text-white text-xs font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROMO CARDS ──────────────────────── */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              bg: "bg-amber-50 border-amber-100",
              textColor: "text-amber-900",
              subColor: "text-amber-600",
              emoji: "🎉",
              title: "50% OFF",
              sub: "First 3 orders · New users",
              cta: "Claim →",
              to: "/register",
            },
            {
              bg: "bg-purple-50 border-purple-100",
              textColor: "text-purple-900",
              subColor: "text-purple-500",
              emoji: "🤖",
              title: "AI shopping",
              sub: "Build your cart with AI",
              cta: "Try it free →",
              to: "/ai",
            },
            {
              bg: "bg-green-50 border-green-100",
              textColor: "text-green-900",
              subColor: "text-green-600",
              emoji: "🚚",
              title: "Free delivery",
              sub: "On orders above ₹199",
              cta: "Shop now →",
              to: "/products",
            },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className={`flex items-center justify-between p-4 rounded-2xl border ${card.bg} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-[0.98]`}
            >
              <div>
                <p className={`text-[11px] font-medium mb-0.5 ${card.subColor}`}>
                  {card.sub}
                </p>
                <p className={`text-base font-bold leading-tight ${card.textColor}`}>
                  {card.title}
                </p>
                <p className={`text-xs mt-1.5 font-semibold ${card.subColor}`}>
                  {card.cta}
                </p>
              </div>
              <span className="text-4xl">{card.emoji}</span>
            </Link>
          ))}
        </section>

        {/* ── CATEGORIES ───────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Shop by category
            </h2>
            <Link
              to="/categories"
              className="text-green-600 text-sm font-semibold hover:text-green-700 transition-colors"
            >
              View all →
            </Link>
          </div>

          {/* Horizontal scroll strip */}
          <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory -mx-4 px-4">
            {/* "All" chip */}
            <button
              onClick={() => { setActiveCat(""); navigate("/"); }}
              className={`snap-start shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 border transition-all duration-200 min-w-[68px] ${
                activeCat === ""
                  ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200"
                  : "bg-white border-gray-100 text-gray-700 hover:border-green-300 hover:shadow-sm dark:bg-gray-900 dark:border-gray-800"
              }`}
            >
              <span className="text-2xl">🏪</span>
              <span className="text-[10px] font-semibold leading-tight text-center">
                All
              </span>
            </button>

            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => handleCatClick(c.slug)}
                className={`snap-start shrink-0 flex flex-col items-center gap-1.5 rounded-2xl px-3 py-3 border transition-all duration-200 min-w-[68px] ${
                  activeCat === c.slug
                    ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200 -translate-y-0.5"
                    : "bg-white border-gray-100 text-gray-700 hover:border-green-300 hover:shadow-sm hover:-translate-y-0.5 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-200"
                }`}
              >
                <span className="text-2xl">{c.icon}</span>
                <span className="text-[10px] font-semibold line-clamp-1 leading-tight text-center">
                  {c.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────── */}
        <section ref={productsRef}>
          {/* Section tabs */}
          <div className="flex items-center justify-between mb-3 gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                    activeTab === tab.key
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white border-gray-200 text-gray-600 hover:border-green-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <Link
              to="/products"
              className="hidden md:block text-green-600 text-sm font-semibold hover:text-green-700 shrink-0 whitespace-nowrap"
            >
              View all →
            </Link>
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {q ? (
              <>
                Results for{" "}
                <span className="text-green-600">"{q}"</span>
              </>
            ) : (
              "Top picks for you"
            )}
          </h2>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-base font-semibold text-gray-600 dark:text-gray-300">
                No products found
              </p>
              <p className="text-sm mt-1">Try a different search or category</p>
              <button
                onClick={() => { setActiveCat(""); navigate("/"); }}
                className="mt-4 text-sm text-green-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {list.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))}
            </div>
          )}
        </section>

        {/* ── WHY ZESTO ────────────────────────── */}
        <section className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <h2 className="text-base font-bold text-gray-900 dark:text-white text-center mb-6">
            Why people love us
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { icon: "⚡", title: "10 min delivery", sub: "Fastest in city" },
              { icon: "🌿", title: "100% fresh", sub: "Quality guaranteed" },
              { icon: "💸", title: "Best prices", sub: "Lowest every day" },
              { icon: "🔒", title: "Secure pay", sub: "UPI · Cards · COD" },
            ].map((f) => (
              <div
                key={f.title}
                className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800"
              >
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-xs font-bold text-gray-800 dark:text-gray-100">
                  {f.title}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {f.sub}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── STICKY BOTTOM CART BAR (mobile only) ── */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden max-w-lg mx-auto">
          <Link
            to="/cart"
            className="flex items-center justify-between bg-green-600 hover:bg-green-700 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-green-300/40 active:scale-[0.98] transition-all duration-150"
          >
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 rounded-lg px-2 py-0.5 text-sm font-bold tabular-nums">
                {cartCount}
              </div>
              <span className="text-sm font-medium">
                {cartCount === 1 ? "item" : "items"} in cart
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              ₹{Math.round(cartTotal)}
              <svg
                className="w-4 h-4"
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
        </div>
      )}
    </div>
  );
}