import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
export const fetchProducts = createAsyncThunk("p/fetch", async (params = {}) =>
  (await api.get("/products", { params })).data.data);
export const fetchCategories = createAsyncThunk("p/cat", async () => (await api.get("/categories")).data.data);
const slice = createSlice({
  name: "products", initialState: { list: [], categories: [], loading: false },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => { s.loading = true; });
    b.addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; });
    b.addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload; });
  },
});
export default slice.reducer;
