// import { configureStore } from "@reduxjs/toolkit";
// import auth from "../features/auth/authSlice";
// import cart from "../features/cart/cartSlice";
// import products from "../features/products/productsSlice";
// import orders from "../features/orders/ordersSlice";
// import ai from "../features/ai/aiSlice";
// export const store = configureStore({ reducer: { auth, cart, products, orders, ai } });



import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import cart from "../features/cart/cartSlice";
import products from "../features/products/productsSlice";
import orders from "../features/orders/ordersSlice";
import ai from "../features/ai/aiSlice";
import wishlist from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth,
    cart,
    products,
    orders,
    ai,
    wishlist,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Razorpay ke liye useful
    }),
  devTools: true,
});