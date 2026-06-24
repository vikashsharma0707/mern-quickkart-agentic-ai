// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../api/axios";
// // export const fetchCart = createAsyncThunk("cart/fetch", async () => (await api.get("/cart")).data.data);
// // export const addToCart = createAsyncThunk("cart/add", async (b) => (await api.post("/cart/add", b)).data.data);
// // export const updateCart = createAsyncThunk("cart/update", async (b) => (await api.put("/cart", b)).data.data);
// // export const removeFromCart = createAsyncThunk("cart/remove", async (pid) => (await api.delete("/cart/" + pid)).data.data);
// // export const clearCart = createAsyncThunk("cart/clear", async () => (await api.delete("/cart/clear")).data.data);
// // const slice = createSlice({
// //   name: "cart", initialState: { cart: { items: [], total: 0 }, loading: false },
// //   reducers: {},
// //   extraReducers: (b) => {
// //     [fetchCart, addToCart, updateCart, removeFromCart, clearCart].forEach((t) =>
// //       b.addCase(t.fulfilled, (s, a) => { if (a.payload) s.cart = a.payload; }));
// //   },
// // });
// // export default slice.reducer;






// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// // ✅ FETCH CART ONLY IF LOGGED IN
// export const fetchCart = createAsyncThunk(
//   "cart/fetch",
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem("accessToken");
    
//     // If no token, reject silently (user not logged in)
//     if (!token) {
//       console.log("⚠️ No token found, skipping cart fetch");
//       return rejectWithValue("Not authenticated");
//     }

//     try {
//       const response = await api.get("/cart");
//       return response.data.data;
//     } catch (error) {
//       console.error("❌ Cart fetch error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
//     }
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/add",
//   async (item, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/cart/add", item);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
//     }
//   }
// );

// export const updateCart = createAsyncThunk(
//   "cart/update",
//   async (item, { rejectWithValue }) => {
//     try {
//       const response = await api.put("/cart", item);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update cart");
//     }
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   "cart/remove",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await api.delete(`/cart/${productId}`);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
//     }
//   }
// );

// export const clearCart = createAsyncThunk(
//   "cart/clear",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.delete("/cart/clear");
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
//     }
//   }
// );

// const slice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: { items: [], total: 0 },
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCartLocal: (state) => {
//       state.cart = { items: [], total: 0 };
//     },
//   },
//   extraReducers: (builder) => {
//     // Fetch Cart
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) {
//           state.cart = action.payload;
//         }
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         // Don't show error for unauthenticated users
//         if (action.payload !== "Not authenticated") {
//           console.warn("Cart fetch rejected:", action.payload);
//         }
//       });

//     // Add to Cart
//     builder
//       .addCase(addToCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         if (action.payload) {
//           state.cart = action.payload;
//         }
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // Update Cart
//     builder
//       .addCase(updateCart.fulfilled, (state, action) => {
//         if (action.payload) {
//           state.cart = action.payload;
//         }
//       });

//     // Remove from Cart
//     builder
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         if (action.payload) {
//           state.cart = action.payload;
//         }
//       });

//     // Clear Cart
//     builder
//       .addCase(clearCart.fulfilled, (state) => {
//         state.cart = { items: [], total: 0 };
//       });
//   },
// });

// export const { clearCartLocal } = slice.actions;
// export default slice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===================== ASYNC THUNKS =====================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("⚠️ No token, skipping cart fetch");
      return rejectWithValue("Not authenticated");
    }

    try {
      const response = await api.get("/cart");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await api.post("/cart/add", item);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await api.put("/cart", item);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/${productId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove from cart");
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart/clear");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
    }
  }
);

// ===================== INITIAL STATE =====================

const initialState = {
  cart: {
    items: [],
    total: 0,
  },
  loading: false,
  error: null,
};

// ===================== SLICE =====================

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartLocal: (state) => {
      state.cart = { items: [], total: 0 };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH CART
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Not authenticated") {
          state.error = action.payload;
        }
      });

    // ADD TO CART
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE CART
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // REMOVE FROM CART
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CLEAR CART
    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = { items: [], total: 0 };
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartLocal, clearError } = cartSlice.actions;

export default cartSlice.reducer;