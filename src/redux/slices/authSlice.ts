import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem("userToken"),
    signInLoading: false,
    signInError: null,
    signUpLoading: false,
    signupFailure: false,
    signUpError: null,
    fetchProfileLoader: false,
    logoutLoading: true,
    fetchProfileError: null,
    signOutLoading: false,
    profile: {},
    signOutError: null,
  },
  reducers: {



    // signIn
    signInStart: (state) => {
      state.signInLoading = true;
    },
    signInSuccess: (state, action) => {

      console.log(['signInSuccess [Action]', action])

      localStorage.setItem('userToken', action.payload.accessToken)
      state.signInLoading = false;
      state.signInError = null;
      state.isAuthenticated = true;
    },
    signInFailure: (state, action) => {
      state.signInLoading = false;
      state.signInError = action.payload;
    },





    // signUp
    signUpStart: (state) => {
      state.signUpLoading = true;
    },
    signUpSuccess: (state) => {
      state.signUpLoading = false;
      state.signUpError = null;

    },
    signUpFailure: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },



    // signOut
    signOutStart: (state) => {
      state.signOutLoading = true;
    },
    signOutSuccess: (state) => {
      localStorage.removeItem('userToken')
      state.signOutLoading = false;
      state.signOutError = null;
      state.isAuthenticated = false;
    },
    signOutFailure: (state, action) => {
      state.signOutLoading = false;
      state.signOutError = action.payload;

    },











  },
});

export const { signInFailure, signInSuccess, signUpFailure, signUpStart, signUpSuccess,
  signInStart, signOutSuccess, signOutFailure, signOutStart
} = authSlice.actions;
export default authSlice.reducer;

