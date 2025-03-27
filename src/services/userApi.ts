import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Ensures cookies are sent with requests
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${apiUrl}/auth/users/refresh-token`,{withCredentials:true}); 
        return api(originalRequest); // Retry the original request after successful refresh
      } catch (refreshError) {
        return Promise.reject(refreshError); // Stop infinite loop
      }
    }

    return Promise.reject(error);
  }
);

export const isUserMailIdExist = async (email: string) => {
  const response = await api.post(`/users/mail-exist`, { email });
  return response.data;
};



export const isUserMailExist = async (email: string) => {
  const response = await api.post(`/users/mail-exist/exist-mail`, { email });
  return response.data;
};


export const isUserNameIsExist = async (name: string) => {
  const response = await api.post(`/users/name-exist`, { name });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};


export const getUserProfile = async () => {
  const response = await api.get(`/users/me`);
  return response.data;
};



export const checkAuth = async () => {
  const response = await api.get(`${apiUrl}auth/user/refresh-token`);
  return response;
};









// Ready......................Ready.................................Ready.......


// Log In
export const loginUser = async (credentials: void) => {
  const response = await api.post('/auth/user/login', credentials);
  return response;
};

// Sign Up
export const signUpUser = async (credentials: void) => {
  const response = await api.post('/auth/user/signup', credentials);
  return response;
};

// Log Out
export const logoutAuth = async () => {
  const response = await api.post(`${apiUrl}auth/user/logout`);
  return response;
};


// Ready......................Ready.................................Ready.......


export const isLoggedAPIUser = async ()=>{
  const response = await api.get(`${apiUrl}/auth/user/protect-route`);
  return response;
}


export const updateProfile = async (data:any) => {
  const response = await api.put(`/users/me`,data);
  return response.data;
};



export default api;
