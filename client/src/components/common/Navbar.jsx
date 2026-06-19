// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import ThemeToggle from "./ThemeToggle";

// export default function Navbar() {
//   const user = useSelector((s) => s.auth.user);
//   const cart = useSelector((s) => s.cart.cart);
//   const dispatch = useDispatch();
//   const nav = useNavigate();
//   return (
//     <header className="sticky top-0 z-40 bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 h-16">
//         <Link to="/" className="text-2xl font-extrabold text-brand">⚡ QuickKart<span className="text-accent">AI</span></Link>
//         <div className="hidden md:block flex-1">
//           <input className="input" placeholder="Search 'milk', 'onion', 'biscuit'..." onKeyDown={(e) => e.key === "Enter" && nav(`/?q=${e.target.value}`)} />
//         </div>
//         <ThemeToggle/>
//         <Link to="/ai" className="hidden md:inline btn btn-outline">🤖 AI Assistant</Link>
//         {user ? (
//           <>
//             <Link to={user.role === "admin" || user.role === "superadmin" ? "/admin" : user.role === "delivery" ? "/delivery" : "/orders"} className="text-sm">
//               Hi, {user.name.split(" ")[0]}
//             </Link>
//             <Link to="/cart" className="btn btn-primary relative">
//               🛒 ₹{cart.total || 0}
//               {cart.items?.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cart.items.length}</span>
//               )}
//             </Link>
//             <button className="text-sm text-gray-500" onClick={() => { dispatch(logout()); nav("/login"); }}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-outline">Login</Link>
//             <Link to="/register" className="btn btn-primary">Sign up</Link>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((s) => s.auth.user);
  const cart = useSelector((s) => s.cart.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      nav(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    nav("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="text-3xl">⚡</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              QuickKart<span className="text-green-600">AI</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search 'milk', 'bread', 'paneer'..."
                className="input w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-green-500 dark:focus:border-green-500 text-gray-900 dark:text-white"
              />
              <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              to="/ai"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              🤖 AI Assistant
            </Link>

            {user ? (
              <>
                <Link
                  to={
                    user.role === "admin" || user.role === "superadmin"
                      ? "/admin"
                      : user.role === "delivery"
                      ? "/delivery"
                      : "/orders"
                  }
                  className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-green-600 dark:hover:text-green-400 transition"
                >
                  👤 Hi, {user.name?.split(" ")[0]}
                </Link>

                <Link
                  to="/cart"
                  className="relative flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
                >
                  <span className="text-2xl">🛒</span>
                  <span className="hidden sm:inline font-medium">Cart</span>
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cart.items.length}
                    </span>
                  )}
                  <span className="font-semibold">₹{cart?.total || 0}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden md:block text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-5 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}