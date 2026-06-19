// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/axios";
// export const askAssistant = createAsyncThunk("ai/ask", async (message) =>
//   (await api.post("/ai/assistant", { message })).data.data);
// export const runAgent = createAsyncThunk("ai/agent", async ({ key, message }) =>
//   (await api.post(`/ai/agents/${key}`, { message })).data.data);
// export const askRag = createAsyncThunk("ai/rag", async (question) =>
//   (await api.post("/ai/rag", { question })).data.data);
// const slice = createSlice({
//   name: "ai", initialState: { history: [], loading: false, last: null },
//   reducers: {
//     pushUser: (s, a) => s.history.push({ role: "user", text: a.payload }),
//     clear: (s) => { s.history = []; },
//   },
//   extraReducers: (b) => {
//     [askAssistant, runAgent, askRag].forEach((t) => {
//       b.addCase(t.pending, (s) => { s.loading = true; });
//       b.addCase(t.fulfilled, (s, a) => {
//         s.loading = false; s.last = a.payload;
//         s.history.push({ role: "assistant", payload: a.payload });
//       });
//       b.addCase(t.rejected, (s) => { s.loading = false; });
//     });
//   },
// });
// export const { pushUser, clear } = slice.actions;
// export default slice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const askAssistant = createAsyncThunk(
  "ai/ask",
  async (message) => (await api.post("/ai/assistant", { message })).data.data
);

export const runAgent = createAsyncThunk(
  "ai/agent",
  async ({ key, message }) => (await api.post(`/ai/agents/${key}`, { message })).data.data
);

export const askRag = createAsyncThunk(
  "ai/rag",
  async (question) => (await api.post("/ai/rag", { question })).data.data
);

const aiSlice = createSlice({
  name: "ai",
  initialState: { 
    history: [], 
    loading: false, 
    last: null 
  },
  reducers: {
    pushUser: (state, action) => {
      state.history.push({ 
        role: "user", 
        text: action.payload 
      });
    },

    clear: (state) => {
      state.history = [];
      state.last = null;
    },
  },
  extraReducers: (builder) => {
    const thunks = [askAssistant, runAgent, askRag];

    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.last = action.payload;

          state.history.push({
            role: "assistant",
            payload: action.payload
          });
        })
        .addCase(thunk.rejected, (state) => {
          state.loading = false;
        });
    });
  },
});

export const { pushUser, clear } = aiSlice.actions;
export default aiSlice.reducer;