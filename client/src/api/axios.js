// import axios from "axios";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });
// api.interceptors.request.use((c) => {
//   const t = localStorage.getItem("accessToken");
//   if (t) c.headers.Authorization = `Bearer ${t}`;
//   return c;
// });
// api.interceptors.response.use(
//   (r) => r,
//   async (err) => {
//     const orig = err.config;
//     if (err.response?.status === 401 && !orig._retry && localStorage.getItem("refreshToken")) {
//       orig._retry = true;
//       try {
//         const r = await axios.post((import.meta.env.VITE_API_URL || "/api") + "/auth/refresh",
//           { refreshToken: localStorage.getItem("refreshToken") });
//         localStorage.setItem("accessToken", r.data.data.accessToken);
//         localStorage.setItem("refreshToken", r.data.data.refreshToken);
//         orig.headers.Authorization = `Bearer ${r.data.data.accessToken}`;
//         return api(orig);
//       } catch { localStorage.clear(); window.location.href = "/login"; }
//     }
//     return Promise.reject(err);
//   }
// );
// export default api;



import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {
            refreshToken: localStorage.getItem("refreshToken"),
          }
        );

        const { accessToken, refreshToken } = response.data.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;