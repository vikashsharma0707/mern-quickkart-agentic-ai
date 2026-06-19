// // import axios from "axios";
// // const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });
// // api.interceptors.request.use((c) => {
// //   const t = localStorage.getItem("accessToken");
// //   if (t) c.headers.Authorization = `Bearer ${t}`;
// //   return c;
// // });
// // api.interceptors.response.use(
// //   (r) => r,
// //   async (err) => {
// //     const orig = err.config;
// //     if (err.response?.status === 401 && !orig._retry && localStorage.getItem("refreshToken")) {
// //       orig._retry = true;
// //       try {
// //         const r = await axios.post((import.meta.env.VITE_API_URL || "/api") + "/auth/refresh",
// //           { refreshToken: localStorage.getItem("refreshToken") });
// //         localStorage.setItem("accessToken", r.data.data.accessToken);
// //         localStorage.setItem("refreshToken", r.data.data.refreshToken);
// //         orig.headers.Authorization = `Bearer ${r.data.data.accessToken}`;
// //         return api(orig);
// //       } catch { localStorage.clear(); window.location.href = "/login"; }
// //     }
// //     return Promise.reject(err);
// //   }
// // );
// // export default api;



// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL
//   ? `${import.meta.env.VITE_API_URL}/api`
//   : "/api";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           {
//             refreshToken: localStorage.getItem("refreshToken"),
//           }
//         );

//         const { accessToken, refreshToken } = response.data.data;

//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);

//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         window.location.href = "/login";

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,  // ✅ Include credentials with all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// ===================== REQUEST INTERCEPTOR =====================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// ===================== RESPONSE INTERCEPTOR =====================
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Avoid infinite loop on retry
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ✅ Handle 401 Unauthorized - Try refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        // ✅ Create separate axios instance for refresh (with credentials)
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
          {
            withCredentials: true,  // ← Important: include credentials
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { accessToken, refreshToken } = refreshResponse.data.data;

        // Update tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Update original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        // Retry original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        console.error("Token Refresh Failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // ✅ Handle CORS errors
    if (error.message === "Network Error" && !error.response) {
      console.error("CORS or Network Error:", {
        message: error.message,
        config: error.config,
      });
      // Could show user-friendly toast here
    }

    // ✅ Handle other 4xx/5xx errors
    if (error.response) {
      console.error(`API Error [${error.response.status}]:`, {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
    }

    return Promise.reject(error);
  }
);

export default api;