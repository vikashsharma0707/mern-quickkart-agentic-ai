import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const fetchCart = createAsyncThunk("cart/fetch", async () => (await api.get("/cart")).data.data);
export const addToCart = createAsyncThunk("cart/add", async (b) => (await api.post("/cart/add", b)).data.data);
export const updateCart = createAsyncThunk("cart/update", async (b) => (await api.put("/cart", b)).data.data);
export const removeFromCart = createAsyncThunk("cart/remove", async (pid) => (await api.delete("/cart/" + pid)).data.data);
export const clearCart = createAsyncThunk("cart/clear", async () => (await api.delete("/cart/clear")).data.data);
const slice = createSlice({
  name: "cart", initialState: { cart: { items: [], total: 0 }, loading: false },
  reducers: {},
  extraReducers: (b) => {
    [fetchCart, addToCart, updateCart, removeFromCart, clearCart].forEach((t) =>
      b.addCase(t.fulfilled, (s, a) => { if (a.payload) s.cart = a.payload; }));
  },
});
export default slice.reducer;
