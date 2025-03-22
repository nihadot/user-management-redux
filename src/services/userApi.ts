import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Ensures cookies are sent with requests
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken') || localStorage.getItem('adminToken'); // Get token from either source
    console.log(accessToken,'acceaccessTokenaccessTokenaccessTokenssToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor to Handle Token Refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/auth/admin/refresh-token'); // Refresh token
        const newAccessToken = response.data?.accessToken;

        if (newAccessToken) {
          localStorage.setItem('adminToken', newAccessToken)

          // Update the original request's Authorization header
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // ✅ Retry the original request using `api` to ensure it hits the interceptor chain
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        Cookies.remove('accessToken');
        window.location.href = '/admin-login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export const addUser = async (data) => {
  const response = await api.post('/users/',{ ...data });
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await api.get('/users/');
  return response.data;
};


export const fetchUserById = async (id:string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export default api;
