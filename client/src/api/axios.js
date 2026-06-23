


// // import axios from "axios";

// // const BASE_URL = import.meta.env.VITE_API_URL
// //   ? `${import.meta.env.VITE_API_URL}/api`
// //   : "/api";

// // const api = axios.create({
// //   baseURL: BASE_URL,
// //   withCredentials: true,  // ✅ Include credentials with all requests
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // });

// // // ===================== REQUEST INTERCEPTOR =====================
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("accessToken");

// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }

// //     return config;
// //   },
// //   (error) => {
// //     console.error("Request Error:", error);
// //     return Promise.reject(error);
// //   }
// // );

// // // ===================== RESPONSE INTERCEPTOR =====================
// // api.interceptors.response.use(
// //   (response) => response,

// //   async (error) => {
// //     const originalRequest = error.config;

// //     // Avoid infinite loop on retry
// //     if (!originalRequest) {
// //       return Promise.reject(error);
// //     }

// //     // ✅ Handle 401 Unauthorized - Try refresh token
// //     if (
// //       error.response?.status === 401 &&
// //       !originalRequest._retry &&
// //       localStorage.getItem("refreshToken")
// //     ) {
// //       originalRequest._retry = true;

// //       try {
// //         // ✅ Create separate axios instance for refresh (with credentials)
// //         const refreshResponse = await axios.post(
// //           `${BASE_URL}/auth/refresh`,
// //           {
// //             refreshToken: localStorage.getItem("refreshToken"),
// //           },
// //           {
// //             withCredentials: true,  // ← Important: include credentials
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );

// //         const { accessToken, refreshToken } = refreshResponse.data.data;

// //         // Update tokens
// //         localStorage.setItem("accessToken", accessToken);
// //         localStorage.setItem("refreshToken", refreshToken);

// //         // Update original request with new token
// //         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

// //         // Retry original request with new token
// //         return api(originalRequest);
// //       } catch (refreshError) {
// //         // Refresh failed - clear tokens and redirect to login
// //         console.error("Token Refresh Failed:", refreshError);
// //         localStorage.removeItem("accessToken");
// //         localStorage.removeItem("refreshToken");

// //         // Redirect to login
// //         if (typeof window !== "undefined") {
// //           window.location.href = "/login";
// //         }

// //         return Promise.reject(refreshError);
// //       }
// //     }

// //     // ✅ Handle CORS errors
// //     if (error.message === "Network Error" && !error.response) {
// //       console.error("CORS or Network Error:", {
// //         message: error.message,
// //         config: error.config,
// //       });
// //       // Could show user-friendly toast here
// //     }

// //     // ✅ Handle other 4xx/5xx errors
// //     if (error.response) {
// //       console.error(`API Error [${error.response.status}]:`, {
// //         status: error.response.status,
// //         data: error.response.data,
// //         url: error.config?.url,
// //       });
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // export default api;




// import axios from "axios";

// // ===================== BASE URLs =====================
// const API_URL = import.meta.env.VITE_API_URL;

// export const BASE_URL = API_URL 
//   ? `${API_URL}/api`
//   : "/api";

// export const UPLOADS_URL = API_URL 
//   ? `${API_URL}/uploads`
//   : "/uploads";

// console.log("🌍 API_URL:", BASE_URL);
// console.log("📁 UPLOADS_URL:", UPLOADS_URL);

// // ===================== AXIOS INSTANCE =====================
// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ===================== REQUEST INTERCEPTOR =====================
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// // ===================== RESPONSE INTERCEPTOR =====================
// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     // Handle 401 Unauthorized
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refreshToken")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           {
//             refreshToken: localStorage.getItem("refreshToken"),
//           },
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const { accessToken, refreshToken } = refreshResponse.data.data;

//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);

//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Token Refresh Failed:", refreshError);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");

//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle CORS errors
//     if (error.message === "Network Error" && !error.response) {
//       console.error("CORS or Network Error:", {
//         message: error.message,
//         config: error.config,
//       });
//     }

//     // Handle other errors
//     if (error.response) {
//       console.error(`API Error [${error.response.status}]:`, {
//         status: error.response.status,
//         data: error.response.data,
//         url: error.config?.url,
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// // ===================== HELPER: GET IMAGE URL =====================
// export const getImageUrl = (imagePath) => {
//   if (!imagePath) return null;
//   return `${UPLOADS_URL}/${imagePath}`;
// };

// export default api;




import axios from "axios";

// ===================== ENVIRONMENT CONFIG =====================
const API_URL = import.meta.env.VITE_API_URL?.trim();

export const BASE_URL = API_URL 
  ? `${API_URL}/api` 
  : "/api";

export const UPLOADS_BASE_URL = API_URL 
  ? `${API_URL}/uploads` 
  : "/uploads";

console.log("🌍 API Base URL:", BASE_URL);
console.log("📁 Uploads Base URL:", UPLOADS_BASE_URL);

// ===================== AXIOS INSTANCE =====================
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000, // 15 seconds timeout
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
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ===================== RESPONSE INTERCEPTOR =====================
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized with Token Refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          { refreshToken: localStorage.getItem("refreshToken") },
          { withCredentials: true }
        );

        const { accessToken, refreshToken } = refreshResponse.data?.data || refreshResponse.data;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token Refresh Failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    // Network / CORS Error Logging
    if (error.message === "Network Error" || !error.response) {
      console.error("🌐 Network/CORS Error:", {
        url: error.config?.url,
        message: error.message,
      });
    }

    // General Error Logging
    if (error.response) {
      console.error(`❌ API Error [${error.response.status}]:`, {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    }

    return Promise.reject(error);
  }
);

// ===================== IMAGE URL HELPER =====================
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "https://via.placeholder.com/600x600/eee/666?text=No+Image";
  }

  // If it's already a full URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Clean the path
  const cleanPath = imagePath
    .replace(/^\/uploads\//, "")
    .replace(/^\//, "");

  return `${UPLOADS_BASE_URL}/${cleanPath}`;
};

// ===================== EXPORT =====================
export default api;