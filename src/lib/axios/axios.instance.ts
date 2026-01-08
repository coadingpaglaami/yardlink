import axios from "axios";
import { getAccessToken } from "../cookies";

export const axiosInstance = axios.create({
  baseURL: "https://zznkjkkp-8000.inc1.devtunnels.ms/api/",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = getRefreshToken();
//         const res = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           { refreshToken }
//         );

//         setTokens(res.data.accessToken, res.data.refreshToken);
//         originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

//         return api(originalRequest);
//       } catch {
//         clearTokens();
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
