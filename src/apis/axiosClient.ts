import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:5002/api/v1",
    // withCredentials: true
});

// Attach access token to request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh token logic on 401 errors
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loop
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // Call refresh token endpoint
                const res = await axios.post(
                    "http://localhost:5002/api/v1/refresh",
                    {},
                    {withCredentials: true}
                );

                const newAccessToken = res.data.accessToken;
                localStorage.setItem("accessToken", newAccessToken);

                // Update Authorization header and retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Refresh token failed - log out user or redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
