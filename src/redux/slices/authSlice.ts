import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkAuth, loginUser } from '../../services/api';


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
    isAuthenticated: !!localStorage.getItem("userToken"),
    loading: false,
    error: null,
    signUpLoading:false,
    signupFailure:false,
    signupError:null,
    logoutLoading:true,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      localStorage.setItem('userToken', action.payload.accessToken)
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpStart: (state) => {
      state.signUpLoading = true;
    },
    signUpSuccess: (state, action) => {
      state.signUpLoading = false;
      state.signupError = null;

    },
    signInFailure: (state, action) => {
      state.signupFailure = false;
      state.error = action.payload;
    },
    adminLogin: (state, action) => {
      state.user = action.payload.data;
      state.isAuthenticated = !!action.payload.data;
      state.error = null;

    },
    logoutStart: (state) => {
      state.logoutLoading = true;
    },
    logoutSuccess: (state) => {
      state.logoutLoading = true;
    },
    logoutFailure: (state) => {
      localStorage.removeItem('userToken')
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    protectRoute: (state, action) => {
      console.log(action, 'action')
      // state.isAuthenticated = true;
    }
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

export const { signInStart,logoutStart,logoutSuccess,logoutFailure, signInFailure, signInSuccess,signUpFailure,signUpStart,signUpSuccess } = authSlice.actions;
export default authSlice.reducer;

