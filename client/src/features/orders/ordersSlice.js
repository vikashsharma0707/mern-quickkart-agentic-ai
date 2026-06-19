// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";
// export const placeOrder = createAsyncThunk("o/place", async (b) => (await api.post("/orders", b)).data.data);
// export const fetchOrders = createAsyncThunk("o/list", async () => (await api.get("/orders")).data.data);
// export const fetchOrder = createAsyncThunk("o/get", async (id) => (await api.get("/orders/" + id)).data.data);
// const slice = createSlice({
//   name: "orders", initialState: { list: [], current: null, loading: false },
//   reducers: { setCurrent: (s, a) => { s.current = a.payload; } },
//   extraReducers: (b) => {
//     b.addCase(fetchOrders.fulfilled, (s, a) => { s.list = a.payload; });
//     b.addCase(fetchOrder.fulfilled, (s, a) => { s.current = a.payload; });
//     b.addCase(placeOrder.fulfilled, (s, a) => { s.current = a.payload; });
//   },
// });
// export const { setCurrent } = slice.actions;
// export default slice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunks
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/orders", orderData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to place order");
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch order");
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to cancel order");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    current: null,
    loading: false,
    error: null,
  },

  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Order
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.current = action.payload;
      })

      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        // Optionally add to list
        state.list.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.current?._id === action.payload._id) {
          state.current = action.payload;
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setCurrent, clearError } = ordersSlice.actions;
export default ordersSlice.reducer;