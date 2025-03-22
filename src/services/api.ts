import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL as string

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/user/refresh-token');

        return api(originalRequest);

      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = async (credentials: void) => {
  const response = await api.post('/auth/user/login', credentials);
  return response;
};


export const signupUser = async (credentials: void) => {
  const response = await api.post('/auth/user/signup', credentials);
  return response;
};

export const checkAuth = async () => {
  const response = await api.post(`${apiUrl}auth/user/refresh-token`);
  return response;
};


export const logoutAuth = async () => {
  const response = await api.post(`${apiUrl}auth/user/logout`);
  return response;
};

export default api;
