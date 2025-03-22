import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1/',
  withCredentials: true, // Allow sending cookies with requests
});



// Response Interceptor: Handle authentication-related responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token is expired (401), try refreshing it
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const response = await api.post('/auth/user/refresh-token'); // This will set a new accessToken cookie

        // Retry the original request
        return api(originalRequest);

      } catch (refreshError) {
        // If refresh fails, clear cookies and redirect to login
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API function to login user
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/user/login', credentials);
  return response;
};

export const checkAuth = async () => {
    const response = await api.post('http://localhost:4000/api/v1/auth/user/refresh-token'); // Replace with your endpoint
    return response;
};

export default api;
