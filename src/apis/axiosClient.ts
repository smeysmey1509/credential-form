import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5002/api/v1',
    withCredentials: true, // Required to send cookies like refreshToken
});

// Add the access token to headers on every request
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
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
                    'http://localhost:5002/api/v1/refresh',
                    {},
                    {withCredentials: true}
                );

                const newAccessToken = res.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);

                // Add new token to header and retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshErr) {
                console.error('Refresh failed:', refreshErr);
                // Optional: redirect to login if refresh fails
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
