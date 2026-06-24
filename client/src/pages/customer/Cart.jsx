// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { fetchCart, updateCart, removeFromCart, clearCart } from "../../features/cart/cartSlice";

// export default function Cart() {
//   const dispatch = useDispatch(); const nav = useNavigate();
//   const { cart } = useSelector((s) => s.cart);
//   useEffect(() => { dispatch(fetchCart()); }, [dispatch]);
//   if (!cart.items?.length) return (
//     <div className="text-center p-10">
//       <div className="text-6xl">🛒</div>
//       <div className="mt-3 text-lg">Your cart is empty</div>
//       <Link to="/" className="btn btn-primary mt-4 inline-block">Shop now</Link>
//     </div>
//   );
//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Cart</h1>
//       <div className="card divide-y">
//         {cart.items.map((i) => (
//           <div key={i.product._id} className="p-3 flex items-center gap-3">
//             <img src={i.product.images?.[0]} className="w-16 h-16 object-contain" alt="" />
//             <div className="flex-1">
//               <div className="font-semibold">{i.product.name}</div>
//               <div className="text-xs text-gray-500">{i.product.unit} · ₹{i.price}</div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button className="btn btn-outline px-2 py-0" onClick={() => dispatch(updateCart({ productId: i.product._id, qty: i.qty - 1 }))}>-</button>
//               <span>{i.qty}</span>
//               <button className="btn btn-outline px-2 py-0" onClick={() => dispatch(updateCart({ productId: i.product._id, qty: i.qty + 1 }))}>+</button>
//             </div>
//             <div className="w-20 text-right font-semibold">₹{i.price * i.qty}</div>
//             <button className="text-red-500 text-sm" onClick={() => dispatch(removeFromCart(i.product._id))}>✕</button>
//           </div>
//         ))}
//       </div>
//       <div className="card p-4 mt-4 flex items-center justify-between">
//         <div className="text-xl font-bold">Total: ₹{cart.total}</div>
//         <div className="flex gap-2">
//           <button className="btn btn-outline" onClick={() => dispatch(clearCart())}>Clear</button>
//           <button className="btn btn-primary" onClick={() => nav("/checkout")}>Checkout</button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl } from "../../api/axios";
import {
  fetchCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((s) => s.cart);
  const [removing, setRemoving] = useState(null);

  // ===================== FETCH CART (WITH TOKEN CHECK) =====================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      console.log("✅ User authenticated, fetching cart");
      dispatch(fetchCart());
    } else {
      console.log("⚠️ User not authenticated, redirecting to login");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  // ===================== HANDLE QUANTITY UPDATE =====================
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty === 0) {
      handleRemoveItem(productId);
    } else {
      dispatch(updateCart({ productId, quantity: newQty }));
    }
  };

  // ===================== HANDLE REMOVE ITEM =====================
  const handleRemoveItem = (productId) => {
    setRemoving(productId);
    setTimeout(() => {
      dispatch(removeFromCart(productId));
      setRemoving(null);
    }, 300);
  };

  // ===================== HANDLE CLEAR CART =====================
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  // ===================== HANDLE CHECKOUT =====================
  const handleCheckout = () => {
    if (!cart.items || cart.items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  // ===================== LOADING STATE =====================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 h-24 animate-pulse border border-slate-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===================== EMPTY CART =====================
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
            🛒
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cart is empty</h2>
          <p className="text-slate-600 mb-8">
            Add items to your cart and they will appear here.
          </p>
          <Link
            to="/"
            className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all active:scale-95"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  // ===================== MAIN CART VIEW =====================
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">
            {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Cart Items */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
          <AnimatePresence mode="popLayout">
            {cart.items.map((item, index) => (
              <motion.div
                key={item.product._id}
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-4 p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors ${
                  removing === item.product._id ? "opacity-50" : ""
                }`}
              >
                {/* Product Image */}
                <div className="w-20 h-20 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={getImageUrl(item.product.image)}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x100/f1f5f9/94a3b8?text=Image";
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {item.product.weight || "N/A"} · ₹{item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.product._id,
                        item.quantity - 1
                      )
                    }
                    disabled={loading || removing === item.product._id}
                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-slate-700"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-semibold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.product._id,
                        item.quantity + 1
                      )
                    }
                    disabled={loading || removing === item.product._id}
                    className="w-8 h-8 rounded flex items-center justify-center hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-slate-700"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="w-24 text-right">
                  <p className="font-bold text-slate-900">
                    ₹{Math.round(item.price * item.quantity)}
                  </p>
                  <p className="text-xs text-slate-500">
                    ₹{item.price} each
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item.product._id)}
                  disabled={loading || removing === item.product._id}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Remove from cart"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary & Checkout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-6"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{Math.round(cart.total || 0)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (est.)</span>
                <span className="font-semibold">₹0</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-violet-600">
                ₹{Math.round(cart.total || 0)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleClearCart}
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>

          {/* Checkout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={handleCheckout}
              disabled={loading || !cart.items || cart.items.length === 0}
              className="w-full h-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-violet-600/30 hover:shadow-violet-500/40 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              Proceed to Checkout
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: "⚡", text: "10 min delivery" },
            { icon: "🔒", text: "Secure checkout" },
            { icon: "↩️", text: "Easy returns" },
            { icon: "🌿", text: "Fresh quality" },
          ].map((b) => (
            <div
              key={b.text}
              className="bg-white rounded-xl border border-slate-100 p-4 text-center hover:border-violet-200 hover:shadow-md transition-all duration-200"
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <p className="text-sm font-medium text-slate-700">{b.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}