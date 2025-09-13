// // lib/axios.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_BASE_URL, // example: http://localhost:5000/api/v1
//   withCredentials: true, // send cookies if backend uses them
// });

// // Flag to avoid multiple refresh requests
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().accessToken; // ✅ get from zustand
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle expired token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refreshToken = useAuthStore.getState().refreshToken;
//         const { data } = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//           { token: refreshToken },
//           { withCredentials: true }
//         );

//         // Save new token to store
//         useAuthStore.getState().setTokens({
//           accessToken: data.accessToken,
//           refreshToken: data.refreshToken,
//         });

//         api.defaults.headers.common["Authorization"] =
//           "Bearer " + data.accessToken;

//         processQueue(null, data.accessToken);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         useAuthStore.getState().logout(); // clear state
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




// import axios from "axios";
// import useLoadingStore from "../store/useLoading";
// import useAuthStore from "../store/useAuthStore";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, 
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.request.use(
//   (config) => {
//     useLoadingStore.getState().setLoading(true);
//     const token = useAuthStore.getState().accessToken;
//     if (token) config.headers["Authorization"] = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     useLoadingStore.getState().setLoading(false);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     useLoadingStore.getState().setLoading(false);
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     useLoadingStore.getState().setLoading(false);

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//           {}, // no body
//           { withCredentials: true }
//         );

//         useAuthStore.getState().setTokens({ accessToken: data.accessToken });

//         api.defaults.headers.common["Authorization"] =
//           "Bearer " + data.accessToken;

//         processQueue(null, data.accessToken);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         useAuthStore.getState().logout();
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;



// lib/axios.js
// import axios from "axios";
// import useAuthStore from "../store/useAuthStore";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, // allows sending refreshToken cookie
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // Attach access token
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().accessToken;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle expired access token
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 500 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         //  call refresh endpoint (cookie auto-sent)
//         // const { data } = await axios.post(
//         //    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//         //   {},
//         //   { withCredentials: true }
//         // );
//         const { data } = await api.post("/auth/refresh-token", {});


//         useAuthStore.getState().setTokens({ accessToken: data.accessToken });

//         api.defaults.headers.common["Authorization"] =
//           "Bearer " + data.accessToken;

//         processQueue(null, data.accessToken);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         useAuthStore.getState().logout();
//         window.location.href = "/login";
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import useLoadingStore from "../store/useLoading";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // ensures cookies (refreshToken) are sent
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// Attach access token
api.interceptors.request.use(
  (config) => {
    useLoadingStore.getState().setLoading(true);
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
   (error) => {
    useLoadingStore.getState().setLoading(false);
    return Promise.reject(error);
  }
);

// Handle expired access token
api.interceptors.response.use(
    (response) => {
    useLoadingStore.getState().setLoading(false);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    useLoadingStore.getState().setLoading(false);
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post("/auth/refresh-token", {}); // ✅ use `api` not raw axios

        // Save new access token in store
        useAuthStore.getState().setTokens({ accessToken: data.accessToken });

        api.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = "Bearer " + data.accessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
