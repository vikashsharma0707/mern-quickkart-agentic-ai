// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";

// const u = localStorage.getItem("user");
// const initial = { user: u ? JSON.parse(u) : null, loading: false, error: null };

// export const login = createAsyncThunk("auth/login", async (body) => {
//   const { data } = await api.post("/auth/login", body);
//   localStorage.setItem("accessToken", data.data.accessToken);
//   localStorage.setItem("refreshToken", data.data.refreshToken);
//   localStorage.setItem("user", JSON.stringify(data.data.user));
//   return data.data.user;
// });
// export const register = createAsyncThunk("auth/register", async (body) => {
//   const { data } = await api.post("/auth/register", body);
//   localStorage.setItem("accessToken", data.data.accessToken);
//   localStorage.setItem("refreshToken", data.data.refreshToken);
//   localStorage.setItem("user", JSON.stringify(data.data.user));
//   return data.data.user;
// });
// export const logout = createAsyncThunk("auth/logout", async () => {
//   try { await api.post("/auth/logout", { refreshToken: localStorage.getItem("refreshToken") }); } catch {}
//   localStorage.clear();
// });

// const slice = createSlice({
//   name: "auth", initialState: initial, reducers: {},
//   extraReducers: (b) => {
//     b.addCase(login.pending, (s) => { s.loading = true; s.error = null; });
//     b.addCase(login.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; });
//     b.addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
//     b.addCase(register.fulfilled, (s, a) => { s.user = a.payload; });
//     b.addCase(logout.fulfilled, (s) => { s.user = null; });
//   },
// });
// export default slice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const u = localStorage.getItem("user");
const initial = { 
  user: u ? JSON.parse(u) : null, 
  loading: false, 
  error: null 
};

// Existing Thunks
export const login = createAsyncThunk("auth/login", async (body) => {
  const { data } = await api.post("/auth/login", body);
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.data.user));
  return data.data.user;
});

export const register = createAsyncThunk("auth/register", async (body) => {
  const { data } = await api.post("/auth/register", body);
  localStorage.setItem("accessToken", data.data.accessToken);
  localStorage.setItem("refreshToken", data.data.refreshToken);
  localStorage.setItem("user", JSON.stringify(data.data.user));
  return data.data.user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try { 
    await api.post("/auth/logout", { refreshToken: localStorage.getItem("refreshToken") }); 
  } catch {}
  localStorage.clear();
});

// New Thunk - Update Profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/profile", profileData);
      
      // Update localStorage
      const updatedUser = data.data.user || data.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: initial,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, action) => { 
        state.loading = false; 
        state.user = action.payload; 
      })
      .addCase(login.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.error.message; 
      })

      // Register
      .addCase(register.fulfilled, (state, action) => { 
        state.user = action.payload; 
      })

      // Logout
      .addCase(logout.fulfilled, (state) => { 
        state.user = null; 
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = slice.actions;
export default slice.reducer;