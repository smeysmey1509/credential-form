import axios from "axios";
import { getCookie, setCookie } from "../../utils/cookie";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const axiosClientWorker = axios.create({
  baseURL: import.meta.env.VITE_API_URL_WORKER,
  withCredentials: true,
});

// Add the access token to headers on every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    const apiKey = import.meta.env.VITE_API_KEY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (apiKey) {
      config.headers["x-api-key"] = apiKey; // custom header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add the access token to headers on every request for worker
axiosClientWorker.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    const apiKey = import.meta.env.VITE_API_KEY;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
      if (apiKey) {
            config.headers['x-api-key'] = apiKey;
        }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired token (401)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and we haven't already retried this request
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to get a new access token
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/refresh`,
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setCookie("accessToken", newAccessToken, 1);

        // Add new token to header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);
        // Optional: redirect to login if refresh fails
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
