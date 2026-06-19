// // // import { useEffect } from "react";
// // // import { Routes, Route, Navigate } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import Navbar from "./components/common/Navbar";
// // // import Protected from "./components/common/Protected";
// // // import Home from "./pages/customer/Home";
// // // import Cart from "./pages/customer/Cart";
// // // import Checkout from "./pages/customer/Checkout";
// // // import Orders from "./pages/customer/Orders";
// // // import Track from "./pages/customer/Track";
// // // import Login from "./pages/auth/Login";
// // // import Register from "./pages/auth/Register";
// // // import Forgot from "./pages/auth/Forgot";
// // // import AdminDashboard from "./pages/admin/AdminDashboard";
// // // import AdminProducts from "./pages/admin/AdminProducts";
// // // import AdminOrders from "./pages/admin/AdminOrders";
// // // import AdminAI from "./pages/admin/AdminAI";
// // // import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
// // // import AIAssistant from "./components/ai/AIAssistant";
// // // import { fetchCart } from "./features/cart/cartSlice";

// // // export default function App() {
// // //   const user = useSelector((s) => s.auth.user);
// // //   const dispatch = useDispatch();
// // //   useEffect(() => {
// // //     // load Razorpay checkout script
// // //     if (!document.getElementById("rzp-js")) {
// // //       const s = document.createElement("script");
// // //       s.id = "rzp-js"; s.src = "https://checkout.razorpay.com/v1/checkout.js"; document.body.appendChild(s);
// // //     }
// // //     if (user) dispatch(fetchCart());
// // //   }, [user, dispatch]);

// // //   return (
// // //     <>
// // //       <Navbar />
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="/login" element={<Login />} />
// // //         <Route path="/register" element={<Register />} />
// // //         <Route path="/forgot" element={<Forgot />} />
// // //         <Route path="/ai" element={<Protected><AIAssistant /></Protected>} />
// // //         <Route path="/cart" element={<Protected><Cart /></Protected>} />
// // //         <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
// // //         <Route path="/orders" element={<Protected><Orders /></Protected>} />
// // //         <Route path="/track/:id" element={<Protected><Track /></Protected>} />
// // //         <Route path="/admin" element={<Protected roles={["admin","superadmin"]}><AdminDashboard /></Protected>} />
// // //         <Route path="/admin/products" element={<Protected roles={["admin","superadmin"]}><AdminProducts /></Protected>} />
// // //         <Route path="/admin/orders" element={<Protected roles={["admin","superadmin"]}><AdminOrders /></Protected>} />
// // //         <Route path="/admin/ai" element={<Protected roles={["admin","superadmin"]}><AdminAI /></Protected>} />
// // //         <Route path="/delivery" element={<Protected roles={["delivery","admin","superadmin"]}><DeliveryDashboard /></Protected>} />
// // //         <Route path="*" element={<Navigate to="/" />} />
// // //       </Routes>
// // //     </>
// // //   );
// // // }



// // import { useEffect } from "react";
// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import Navbar from "./components/common/Navbar";
// // import Protected from "./components/common/Protected";
// // import Home from "./pages/customer/Home";
// // import Cart from "./pages/customer/Cart";
// // import Checkout from "./pages/customer/Checkout";
// // import Orders from "./pages/customer/Orders";
// // import Track from "./pages/customer/Track";
// // import Profile from "./pages/customer/Profile";        // ← Naya
// // import Wishlist from "./pages/customer/Wishlist";    // ← Naya
// // import Login from "./pages/auth/Login";
// // import Register from "./pages/auth/Register";
// // import Forgot from "./pages/auth/Forgot";
// // import AdminDashboard from "./pages/admin/AdminDashboard";
// // import AdminProducts from "./pages/admin/AdminProducts";
// // import AdminOrders from "./pages/admin/AdminOrders";
// // import AdminAI from "./pages/admin/AdminAI";
// // import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";
// // import AIAssistant from "./components/ai/AIAssistant";
// // import { fetchCart } from "./features/cart/cartSlice";

// // export default function App() {
// //   const user = useSelector((s) => s.auth.user);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     // load Razorpay checkout script
// //     if (!document.getElementById("rzp-js")) {
// //       const s = document.createElement("script");
// //       s.id = "rzp-js"; 
// //       s.src = "https://checkout.razorpay.com/v1/checkout.js"; 
// //       document.body.appendChild(s);
// //     }
// //     if (user) dispatch(fetchCart());
// //   }, [user, dispatch]);

// //   return (
// //     <>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
        
// //         {/* Auth Routes */}
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/forgot" element={<Forgot />} />

// //         {/* Customer Routes */}
// //         <Route path="/ai" element={<Protected><AIAssistant /></Protected>} />
// //         <Route path="/cart" element={<Protected><Cart /></Protected>} />
// //         <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
// //         <Route path="/orders" element={<Protected><Orders /></Protected>} />
// //         <Route path="/track/:id" element={<Protected><Track /></Protected>} />
// //         <Route path="/ai" element={<Protected><AIAssistant/></Protected>} />
        
// //         {/* New Pages Added */}
// //         <Route path="/profile" element={<Protected><Profile /></Protected>} />
// //         <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />

// //         {/* Admin Routes */}
// //         <Route path="/admin" element={<Protected roles={["admin","superadmin"]}><AdminDashboard /></Protected>} />
// //         <Route path="/admin/products" element={<Protected roles={["admin","superadmin"]}><AdminProducts /></Protected>} />
// //         <Route path="/admin/orders" element={<Protected roles={["admin","superadmin"]}><AdminOrders /></Protected>} />
// //         <Route path="/admin/ai" element={<Protected roles={["admin","superadmin"]}><AdminAI /></Protected>} />

// //         {/* Delivery Routes */}
// //         <Route path="/delivery" element={<Protected roles={["delivery","admin","superadmin"]}><DeliveryDashboard /></Protected>} />

// //         <Route path="*" element={<Navigate to="/" />} />
// //       </Routes>
// //     </>
// //   );
// // }




// import { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Navbar from "./components/common/Navbar";
// import Protected from "./components/common/Protected";
// import FloatingChat from "./components/common/FloatingChat";   // ← Added

// // Customer Pages
// import Home from "./pages/customer/Home";
// import Cart from "./pages/customer/Cart";
// import Checkout from "./pages/customer/Checkout";
// import Orders from "./pages/customer/Orders";
// import Track from "./pages/customer/Track";



// // Auth Pages
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Forgot from "./pages/auth/Forgot";

// // Admin & Delivery
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AdminProducts from "./pages/admin/AdminProducts";
// import AdminOrders from "./pages/admin/AdminOrders";
// import AdminAI from "./pages/admin/AdminAI";
// import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";

// // AI
// import AIAssistant from "./components/ai/AIAssistant";

// import { fetchCart } from "./features/cart/cartSlice";

// export default function App() {
//   const user = useSelector((s) => s.auth.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Load Razorpay Script
//     if (!document.getElementById("rzp-js")) {
//       const s = document.createElement("script");
//       s.id = "rzp-js";
//       s.src = "https://checkout.razorpay.com/v1/checkout.js";
//       document.body.appendChild(s);
//     }

//     if (user) dispatch(fetchCart());
//   }, [user, dispatch]);

//   return (
//     <>
//       <Navbar />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot" element={<Forgot />} />

//         {/* Customer Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/ai" element={<Protected><AIAssistant /></Protected>} />
//         <Route path="/cart" element={<Protected><Cart /></Protected>} />
//         <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
//         <Route path="/orders" element={<Protected><Orders /></Protected>} />
//         <Route path="/track/:id" element={<Protected><Track /></Protected>} />
        

//         {/* Admin Routes */}
//         <Route path="/admin" element={<Protected roles={["admin", "superadmin"]}><AdminDashboard /></Protected>} />
//         <Route path="/admin/products" element={<Protected roles={["admin", "superadmin"]}><AdminProducts /></Protected>} />
//         <Route path="/admin/orders" element={<Protected roles={["admin", "superadmin"]}><AdminOrders /></Protected>} />
//         <Route path="/admin/ai" element={<Protected roles={["admin", "superadmin"]}><AdminAI /></Protected>} />

//         {/* Delivery Routes */}
//         <Route path="/delivery" element={<Protected roles={["delivery", "admin", "superadmin"]}><DeliveryDashboard /></Protected>} />

//         {/* 404 */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>

//       {/* Floating Chat Button (Sirf logged-in users ke liye) */}
//       {user && <FloatingChat />}
//     </>
//   );
// }




import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import Protected from "./components/common/Protected";
import FloatingChat from "./components/common/FloatingChat";

// Customer Pages
import Home from "./pages/customer/Home";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import Track from "./pages/customer/Track";
import Profile from "./pages/customer/Profile";
import Wishlist from "./pages/customer/Wishlist";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";

// Admin & Delivery
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAI from "./pages/admin/AdminAI";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";

// AI
import AIAssistant from "./components/ai/AIAssistant";

import { fetchCart } from "./features/cart/cartSlice";

export default function App() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load Razorpay Script
    if (!document.getElementById("rzp-js")) {
      const s = document.createElement("script");
      s.id = "rzp-js";
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(s);
    }

    if (user) dispatch(fetchCart());
  }, [user, dispatch]);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Protected><AIAssistant /></Protected>} />
        <Route path="/cart" element={<Protected><Cart /></Protected>} />
        <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
        <Route path="/orders" element={<Protected><Orders /></Protected>} />
        <Route path="/track/:id" element={<Protected><Track /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/wishlist" element={<Protected><Wishlist /></Protected>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Protected roles={["admin", "superadmin"]}><AdminDashboard /></Protected>} />
        <Route path="/admin/products" element={<Protected roles={["admin", "superadmin"]}><AdminProducts /></Protected>} />
        <Route path="/admin/orders" element={<Protected roles={["admin", "superadmin"]}><AdminOrders /></Protected>} />
        <Route path="/admin/ai" element={<Protected roles={["admin", "superadmin"]}><AdminAI /></Protected>} />

        {/* Delivery Routes */}
        <Route path="/delivery" element={<Protected roles={["delivery", "admin", "superadmin"]}><DeliveryDashboard /></Protected>} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Chat Button - Sirf Customer ke liye */}
      {user && (user.role === "customer" || user.role === "user") && <FloatingChat />}
    </>
  );
}