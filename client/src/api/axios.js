import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });
api.interceptors.request.use((c) => {
  const t = localStorage.getItem("accessToken");
  if (t) c.headers.Authorization = `Bearer ${t}`;
  return c;
});
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const orig = err.config;
    if (err.response?.status === 401 && !orig._retry && localStorage.getItem("refreshToken")) {
      orig._retry = true;
      try {
        const r = await axios.post((import.meta.env.VITE_API_URL || "/api") + "/auth/refresh",
          { refreshToken: localStorage.getItem("refreshToken") });
        localStorage.setItem("accessToken", r.data.data.accessToken);
        localStorage.setItem("refreshToken", r.data.data.refreshToken);
        orig.headers.Authorization = `Bearer ${r.data.data.accessToken}`;
        return api(orig);
      } catch { localStorage.clear(); window.location.href = "/login"; }
    }
    return Promise.reject(err);
  }
);
export default api;
