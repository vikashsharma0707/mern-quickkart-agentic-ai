// // // import { Link, useNavigate } from "react-router-dom";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { logout } from "../../features/auth/authSlice";
// // // import ThemeToggle from "./ThemeToggle";

// // // export default function Navbar() {
// // //   const user = useSelector((s) => s.auth.user);
// // //   const cart = useSelector((s) => s.cart.cart);
// // //   const dispatch = useDispatch();
// // //   const nav = useNavigate();
// // //   return (
// // //     <header className="sticky top-0 z-40 bg-white shadow-sm">
// // //       <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 h-16">
// // //         <Link to="/" className="text-2xl font-extrabold text-brand">⚡ QuickKart<span className="text-accent">AI</span></Link>
// // //         <div className="hidden md:block flex-1">
// // //           <input className="input" placeholder="Search 'milk', 'onion', 'biscuit'..." onKeyDown={(e) => e.key === "Enter" && nav(`/?q=${e.target.value}`)} />
// // //         </div>
// // //         <ThemeToggle/>
// // //         <Link to="/ai" className="hidden md:inline btn btn-outline">🤖 AI Assistant</Link>
// // //         {user ? (
// // //           <>
// // //             <Link to={user.role === "admin" || user.role === "superadmin" ? "/admin" : user.role === "delivery" ? "/delivery" : "/orders"} className="text-sm">
// // //               Hi, {user.name.split(" ")[0]}
// // //             </Link>
// // //             <Link to="/cart" className="btn btn-primary relative">
// // //               🛒 ₹{cart.total || 0}
// // //               {cart.items?.length > 0 && (
// // //                 <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.items.length}</span>
// // //               )}
// // //             </Link>
// // //             <button className="text-sm text-gray-500" onClick={() => { dispatch(logout()); nav("/login"); }}>Logout</button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             <Link to="/login" className="btn btn-outline">Login</Link>
// // //             <Link to="/register" className="btn btn-primary">Sign up</Link>
// // //           </>
// // //         )}
// // //       </div>
// // //     </header>
// // //   );
// // // }

// // import { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { logout } from "../../features/auth/authSlice";
// // import ThemeToggle from "./ThemeToggle";

// // export default function Navbar() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const user = useSelector((s) => s.auth.user);
// //   const cart = useSelector((s) => s.cart.cart);
// //   const dispatch = useDispatch();
// //   const nav = useNavigate();

// //   const handleSearch = (e) => {
// //     if (e.key === "Enter" && searchQuery.trim()) {
// //       nav(`/?q=${encodeURIComponent(searchQuery.trim())}`);
// //       setSearchQuery("");
// //     }
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     nav("/login");
// //   };

// //   return (
// //     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
// //       <div className="max-w-7xl mx-auto px-4">
// //         <div className="h-16 flex items-center justify-between">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-1">
// //             <span className="text-3xl">⚡</span>
// //             <span className="text-2xl font-bold text-gray-900 dark:text-white">
// //               QuickKart<span className="text-green-600">AI</span>
// //             </span>
// //           </Link>

// //           {/* Search Bar */}
// //           <div className="hidden md:flex flex-1 max-w-xl mx-8">
// //             <div className="relative w-full">
// //               <input
// //                 type="text"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 onKeyDown={handleSearch}
// //                 placeholder="Search 'milk', 'bread', 'paneer'..."
// //                 className="input w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 text-gray-900 dark:text-white"
// //               />
// //               <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
// //             </div>
// //           </div>

// //           {/* Right Side */}
// //           <div className="flex items-center gap-3">
// //             <ThemeToggle />

// //             <Link
// //               to="/ai"
// //               className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
// //             >
// //               🤖 AI Assistant
// //             </Link>

// //             {user ? (
// //               <>
// //                 <Link
// //                   to={
// //                     user.role === "admin" || user.role === "superadmin"
// //                       ? "/admin"
// //                       : user.role === "delivery"
// //                       ? "/delivery"
// //                       : "/orders"
// //                   }
// //                   className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition"
// //                 >
// //                   👤 Hi, {user.name?.split(" ")[0]}
// //                 </Link>

// //                 <Link
// //                   to="/cart"
// //                   className="relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
// //                 >
// //                   <span className="text-2xl">🛒</span>
// //                   <span className="hidden sm:inline font-medium">Cart</span>
// //                   {cart?.items?.length > 0 && (
// //                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
// //                       {cart.items.length}
// //                     </span>
// //                   )}
// //                   <span className="font-semibold">₹{cart?.total || 0}</span>
// //                 </Link>

// //                 <button
// //                   onClick={handleLogout}
// //                   className="hidden md:block text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
// //                 >
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   to="/login"
// //                   className="hidden md:block px-5 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
// //                 >
// //                   Login
// //                 </Link>
// //                 <Link
// //                   to="/register"
// //                   className="px-5 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition"
// //                 >
// //                   Sign up
// //                 </Link>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }




// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import ThemeToggle from "./ThemeToggle";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const user = useSelector((s) => s.auth.user);
//   const cart = useSelector((s) => s.cart.cart);
//   const dispatch = useDispatch();
//   const nav = useNavigate();

//   const handleSearch = (e) => {
//     if (e.key === "Enter" && searchQuery.trim()) {
//       nav(`/?q=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     nav("/login");
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="h-16 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-1">
//             <span className="text-3xl">⚡</span>
//             <span className="text-2xl font-bold text-gray-900 dark:text-white">
//               QuickKart<span className="text-green-600">AI</span>
//             </span>
//           </Link>

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 placeholder="Search 'milk', 'rice', 'paneer'..."
//                 className="input w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500"
//               />
//               <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-3">
//             {/* Theme Toggle */}
//             <ThemeToggle />

//             {/* Shop / Products Link */}
//             <Link
//               to="/products"
//               className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition"
//             >
//               🛍️ Shop
//             </Link>

//             <Link
//               to="/ai"
//               className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//             >
//               🤖 AI Assistant
//             </Link>

//             {user ? (
//               <>
//                 <Link
//                   to={
//                     user.role === "admin" || user.role === "superadmin"
//                       ? "/admin"
//                       : user.role === "delivery"
//                       ? "/delivery"
//                       : "/orders"
//                   }
//                   className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition"
//                 >
//                   👤 Hi, {user.name?.split(" ")[0]}
//                 </Link>

//                 <Link
//                   to="/cart"
//                   className="relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
//                 >
//                   <span className="text-2xl">🛒</span>
//                   <span className="hidden sm:inline font-medium">Cart</span>
//                   {cart?.items?.length > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                       {cart.items.length}
//                     </span>
//                   )}
//                   <span className="font-semibold">₹{cart?.total || 0}</span>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="hidden md:block text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="hidden md:block px-5 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-5 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition"
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }






import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);

  const user = useSelector((s) => s.auth.user);
  const cartItems = useSelector((s) => s.cart.cart?.items || []);
  const cartTotal = useSelector((s) => s.cart.cart?.total || 0);
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /* Close mobile menu on route change */
  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      searchRef.current?.blur();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* Determine dashboard link for user role */
  const dashboardLink =
    user?.role === "admin" || user?.role === "superadmin"
      ? "/admin"
      : user?.role === "delivery"
      ? "/delivery"
      : "/orders";

  return (
    <>
      {/* ─── MAIN HEADER ─────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center gap-3">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 shrink-0 group"
            >
              <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
                <span className="text-lg">⚡</span>
              </div>
              <span className="font-extrabold text-gray-900 dark:text-white text-lg tracking-tight hidden sm:block">
                Quick<span className="text-green-600">Kart</span>
              </span>
            </Link>

            {/* Location selector */}
            <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shrink-0 max-w-[160px]">
              <svg
                className="w-3.5 h-3.5 text-green-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate">Hinjawadi, Phase 1</span>
              <svg
                className="w-3 h-3 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Search bar */}
            <div
              className={`flex-1 flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 border ${
                searchFocused
                  ? "bg-white dark:bg-gray-800 border-green-400 shadow-sm shadow-green-100 dark:shadow-none"
                  : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder='Search "atta", "milk", "chips"...'
                className="flex-1 bg-transparent text-sm outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Desktop right actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <ThemeToggle />

              <Link
                to="/ai"
                className="flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 px-3 py-2 rounded-xl transition-all duration-150"
              >
                🤖 AI
              </Link>

              {user ? (
                <>
                  <Link
                    to={dashboardLink}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <div className="w-7 h-7 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-xs font-bold text-green-700 dark:text-green-300">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[80px] truncate">
                      {user.name?.split(" ")[0]}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors px-2 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all active:scale-95"
                  >
                    Sign up
                  </Link>
                </>
              )}

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-150"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4 5H17M9 19a1 1 0 102 0 1 1 0 00-2 0zm8 0a1 1 0 102 0 1 1 0 00-2 0z" />
                </svg>
                {cartCount > 0 ? (
                  <>
                    <div className="bg-white/20 rounded-md px-1.5 text-xs font-bold tabular-nums">
                      {cartCount}
                    </div>
                    <span className="tabular-nums">₹{Math.round(cartTotal)}</span>
                  </>
                ) : (
                  <span>Cart</span>
                )}
              </Link>
            </div>

            {/* Mobile: cart icon + hamburger */}
            <div className="flex md:hidden items-center gap-2 shrink-0 ml-auto">
              <Link
                to="/cart"
                className="relative p-2 text-gray-700 dark:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4 5H17M9 19a1 1 0 102 0 1 1 0 00-2 0zm8 0a1 1 0 102 0 1 1 0 00-2 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full tabular-nums">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* ─── MOBILE MENU ──────────────────────── */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-2">
            {/* Location */}
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 w-full py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Hinjawadi, Phase 1
            </button>

            <Link to="/products" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              🛍️ Shop all products
            </Link>

            <Link to="/ai" className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 py-2.5 px-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 transition">
              🤖 AI Assistant
            </Link>

            {user ? (
              <>
                <Link to={dashboardLink} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 py-2.5 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  👤 Hi, {user.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm font-medium text-red-500 py-2.5 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link to="/login" className="flex-1 text-center text-sm font-medium border border-gray-200 dark:border-gray-700 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200">
                  Log in
                </Link>
                <Link to="/register" className="flex-1 text-center text-sm font-semibold bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition">
                  Sign up
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between py-1 px-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </header>
    </>
  );
}