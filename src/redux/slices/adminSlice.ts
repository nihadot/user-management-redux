import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, checkAdminAuth } from '../../services/adminApi';

export const login = createAsyncThunk(
  'admin/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminLogin(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkLoggedIn = createAsyncThunk(
  'admin/checkAdminLoggedIn',
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAdminAuth();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Authentication check failed');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    user: null,
    isAuthenticated:  !!localStorage.getItem("adminToken"),
    loading: false,
    error: null,
    logoutLoading:false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      console.log(action.payload,'----payload')
      localStorage.setItem('adminToken', action.payload.accessToken)
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart: (state) => {
      state.logoutLoading = true;
    },
    logoutSuccess: (state) => {
      state.logoutLoading = true;
      localStorage.removeItem('adminToken');
    },
    logoutFailure: (state) => {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkLoggedIn.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout
,signInFailure,signInStart,
signInSuccess,
logoutFailure,
logoutStart,
logoutSuccess,

 } = adminSlice.actions;
export default adminSlice.reducer;