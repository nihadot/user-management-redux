import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    addUserLoader: false,
    editUserLoader: false,
    deleteUserLoader: false,

    addUserError: null,
    editUserError: null,
    deleteUserError: null,

    refetchLoader: false,
    refetchError: null,

    fetchUsersLoader: false,
    fetchUsersError: null,

    fetchUsersByIdLoader: false,
    fetchUsersByIdError: null,

    updateUsersByIdLoader: false,
    updateUsersByIdError: null,



    fetchProfileLoader: false,
    fetchProfileError: null,
    profile: {},

    fetchUserProfileLoader: false,
    fetchUserProfileError: null,

    signInLoading: false,
    signInError: null,
    isAuthenticated: false,

    signUpLoading: false,
    signUpError: null,

    logoutLoading: false,
    logoutError: null,

    protectedRouteLoading: false,
    protectedRouteError: null,

    signOutLoading: false,
    signOutError: null,

    updatedProfileLoading: false,
    updateProfileError: null,
  },
  reducers: {




    signInStart: (state) => {
      state.signInLoading = true;
      state.signInError = null;
    },
    signInSuccess: (state) => {
      state.signInLoading = false;
      state.signInError = null;
      state.isAuthenticated = true;

    },
    signInFailure: (state, action) => {
      state.signInLoading = false;
      state.signInError = action.payload;
    },





    signUpStart: (state) => {
      state.signUpLoading = true;
      state.signUpError = null;
    },
    signUpSuccess: (state) => {
      state.signUpLoading = false;
      state.signUpError = null;

    },
    signUpFailure: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },





    logoutStart: (state) => {
      state.logoutLoading = true;
      state.logoutError = null;
    },
    logoutSuccess: (state) => {
      state.logoutLoading = true;
      state.isAuthenticated = false;
    },
    logoutFailure: (state) => {
      state.logoutLoading = false;
      state.logoutError = null;
    },






    fetchUserProfileStart: (state) => {
      state.fetchUserProfileLoader = true;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.fetchUserProfileLoader = false;
      state.fetchUserProfileError = null;
      state.profile = action.payload;
    },
    fetchUserProfileFailure: (state, action) => {
      state.fetchUserProfileLoader = false;
      state.fetchUserProfileError = action.payload;
    },







    fetchUsersStart: (state) => {
      state.fetchUsersLoader = false;
      state.fetchUsersError = null;
    },

    fetchUsersSuccess: (state, action) => {
      state.users = action.payload.data;
      state.fetchUsersError = null;
      state.fetchUsersLoader = false;
    },
    fetchUsersFailure: (state, action) => {
      state.fetchUsersLoader = false;
      state.fetchUsersError = action.payload
    },



    fetchProfileStart: (state) => {
      state.fetchProfileLoader = true;
      state.fetchProfileError = null;

    },
    fetchProfileSuccess: (state, action) => {
      state.fetchProfileLoader = false;
      state.fetchProfileError = null
      state.profile = action.payload;
    },
    fetchProfileFailure: (state, action) => {
      state.fetchProfileLoader = false;
      state.fetchProfileError = action.payload;
    },


    reFetch: (state) => {
      state.refetchLoader = true;
    },



    protectedRouteStart: (state) => {
      state.protectedRouteLoading = true;
      state.protectedRouteError = null;
    },
    protectedRouteSuccess: (state) => {
      state.protectedRouteLoading = false;
      state.protectedRouteError = null;
      state.isAuthenticated = true;
    },
    protectedRouteFailure: (state, action) => {
      state.protectedRouteLoading = false;
      state.protectedRouteError = action.payload;
    },






    // signOut
    signOutStart: (state) => {
      state.signOutLoading = true;
    },
    signOutSuccess: (state) => {
      state.signOutLoading = false;
      state.signOutError = null;
      state.isAuthenticated = false;
    },
    signOutFailure: (state, action) => {
      state.signOutLoading = false;
      state.signOutError = action.payload;

    },



    updateProfileStart: (state) => {
      state.updatedProfileLoading = true;
      state.updateProfileError = null;
    },
    updateProfileSuccess: (state) => {
      state.updatedProfileLoading = false;
      state.updateProfileError = null;
    },
    updateProfileFailure: (state,action) => {
      state.updatedProfileLoading = false;
      state.updateProfileError = action.payload;
    },



  },
});

export const {

  fetchProfileFailure, fetchProfileStart, fetchProfileSuccess,
  fetchUsersFailure, fetchUsersSuccess, fetchUsersStart,

  signInStart,
  signInSuccess,
  signInFailure,


  signUpStart,
  signUpSuccess,
  signUpFailure,

  protectedRouteStart,
  protectedRouteSuccess,
  protectedRouteFailure,

  signOutStart,
  signOutSuccess,
  signOutFailure,


  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,

} = userSlice.actions;

export default userSlice.reducer;

