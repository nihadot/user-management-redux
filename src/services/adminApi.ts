import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Allow sending cookies with requests
});



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.get(`${apiUrl}/auth/admin/refresh-token`,{withCredentials:true}); 
        return api(originalRequest); // Retry the original request after successful refresh
      } catch (refreshError) {
        return Promise.reject(refreshError); // Stop infinite loop
      }
    }

    return Promise.reject(error);
  }
);



// API function to login user
export const adminLogin = async (credentials:any) => {
  const response = await api.post('/auth/admin/login', credentials);
  return response.data;
};

export const checkAdminAuth = async () => {
    const response = await api.post('http://localhost:4000/api/v1/auth/admin/refresh-token'); // Replace with your endpoint
    return response;
};

export const logoutAdmin = async () => {
  const response = await api.post(`${apiUrl}auth/admin/logout`);
  return response;
};

export const fetchProfileAdmin = async () => {
  const response = await api.get(`${apiUrl}auth/admin/me`);
  return response;
};

export const isCheckSameMailIs = async (email:string) => {
  const response = await api.post(`${apiUrl}/users/mail-exist/same-user`,{email});
  return response;
};


export const updatedAdminProfile = async (data:any) => {
  const response = await api.put(`${apiUrl}/auth/admin/me`,data);
  return response;
};

export const isLoggedAPIAdmin = async ()=>{
  const response = await api.get(`${apiUrl}/auth/admin/protect-route`);
  return response;
}

export const logoutAuth = async () => {
  const response = await api.get(`${apiUrl}auth/admin/logout`);
  return response;
};


export const fetchAllUsers = async (page = 1, limit = 10, searchQuery = "") => {
  const response = await api.get(`/users?page=${page}&limit=${limit}&search=${searchQuery}`);
  return response.data;
};



export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};


export const updateUser = async (id: string, data: any) => {
  const response = await api.put(`/users/${id}`, { ...data });
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const addUser = async (data: any) => {
  const response = await api.post('/users/', { ...data });
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


export const isUserMailIdExist = async (email: string) => {
  const response = await api.post(`/users/mail-exist`, { email });
  return response.data;
};



export default api;
