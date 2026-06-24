// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";
// export const fetchProducts = createAsyncThunk("p/fetch", async (params = {}) =>
//   (await api.get("/products", { params })).data.data);
// export const fetchCategories = createAsyncThunk("p/cat", async () => (await api.get("/categories")).data.data);
// const slice = createSlice({
//   name: "products", initialState: { list: [], categories: [], loading: false },
//   reducers: {},
//   extraReducers: (b) => {
//     b.addCase(fetchProducts.pending, (s) => { s.loading = true; });
//     b.addCase(fetchProducts.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; });
//     b.addCase(fetchCategories.fulfilled, (s, a) => { s.categories = a.payload; });
//   },
// });
// export default slice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===================== ASYNC THUNKS =====================

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/products", { params });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/categories");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// ===================== INITIAL STATE =====================

const initialState = {
  list: [],
  categories: [],
  loading: false,
  error: null,
};

// ===================== SLICE =====================

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH PRODUCTS
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      });

    // FETCH CATEGORIES
    builder
      .addCase(fetchCategories.pending, (state) => {
        // Don't set loading for categories
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.categories = [];
      });
  },
});

export const { clearError } = productsSlice.actions;

export default productsSlice.reducer;