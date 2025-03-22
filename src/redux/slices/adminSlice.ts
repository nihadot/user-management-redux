import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminLogin, checkAdminAuth } from '../../services/adminApi';

// Async thunk for login
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
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
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

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;