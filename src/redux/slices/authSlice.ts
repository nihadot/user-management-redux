import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth, loginUser } from '../../services/api';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



export const checkUserLoggedIn = createAsyncThunk(
    'auth/checkUserLoggedIn',
    async (_, { rejectWithValue }) => {
      try {
        const response = await checkAuth();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Authentication check failed');
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
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
      .addCase(checkUserLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(checkUserLoggedIn.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;