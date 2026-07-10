import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  API_KEY,
  API_URL,
  API_WORKER_URL,
  PRODUCT_GATEWAY_URL,
} from "./config";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const axiosClientWorker = axios.create({
  baseURL: API_WORKER_URL,
  withCredentials: true,
});

export const axiosProductGatewayClient = axios.create({
  baseURL: PRODUCT_GATEWAY_URL,
  withCredentials: true,
});

const authPaths = ["/login", "/register", "/refresh", "/logout"];
let refreshRequest: Promise<string> | null = null;

const isAuthPath = (url?: string) => {
  if (!url) {
    return false;
  }

  return authPaths.some(
    (path) =>
      url === path || url.endsWith(path) || url.includes(`${API_URL}${path}`)
  );
};

const addAuthHeaders = (config: InternalAxiosRequestConfig) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (API_KEY) {
    config.headers["x-api-key"] = API_KEY;
  }
  return config;
};

axiosClient.interceptors.request.use(addAuthHeaders, (error) =>
  Promise.reject(error)
);
axiosClientWorker.interceptors.request.use(addAuthHeaders, (error) =>
  Promise.reject(error)
);
axiosProductGatewayClient.interceptors.request.use(addAuthHeaders, (error) =>
  Promise.reject(error)
);

const addTokenRefresh = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthPath(originalRequest.url)
      ) {
        originalRequest._retry = true;

        try {
          refreshRequest ??= axios
            .post<{ accessToken: string; user?: unknown }>(
              `${API_URL}/refresh`,
              undefined,
              { withCredentials: true }
            )
            .then((response) => {
              const { accessToken, user } = response.data;
              setCookie("accessToken", accessToken, 1);
              if (user) {
                setCookie("user", JSON.stringify(user), 1);
              }
              return accessToken;
            })
            .finally(() => {
              refreshRequest = null;
            });

          const newAccessToken = await refreshRequest;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (refreshError) {
          deleteCookie("accessToken");
          deleteCookie("user");
          if (window.location.pathname !== "/login") {
            window.location.assign("/login");
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

addTokenRefresh(axiosClient);
addTokenRefresh(axiosClientWorker);
addTokenRefresh(axiosProductGatewayClient);

export default axiosClient;
