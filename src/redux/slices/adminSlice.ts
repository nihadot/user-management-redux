import { createSlice } from '@reduxjs/toolkit';


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    users: [],

    signInLoading: false,
    signInError: null,


    logoutLoading: false,
    logoutError: null,


    profileLoading: false,
    profileError: null,

    protectedRouteLoading: false,
    protectedRouteError: null,

    fetchUsersLoader: false,
    fetchUsersError: null,

    deletedUsersByIdLoader: false,
    deletedUsersByIdError: null,

    updateUsersByIdLoader: false,
    updateUsersByIdError: null,

    fetchUsersByIdLoader: false,
    fetchUsersByIdError: null,

    addUserLoader:false,
    addUserError:null,
  },
  reducers: {



    signInStart: (state) => {
      state.signInLoading = true;
      state.isCheckingAuth = true;
      state.signInError = null;
    },
    signInSuccess: (state) => {
      state.signInLoading = false;
      state.signInError = null;
      state.isAuthenticated = true;
      state.isCheckingAuth = false;

    },
    signInFailure: (state, action) => {
      state.signInLoading = false;
      state.signInError = action.payload;
      state.isCheckingAuth = true;

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






    updateProfileStart: (state) => {
      state.profileLoading = true;
      state.profileError = null;
    },
    updateProfileSuccess: (state) => {
      state.profileLoading = false;
      state.profileError = null;
    },
    updateProfileFailure: (state, action) => {
      state.profileLoading = false;
      state.profileError = action.payload;
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




    deletedUserByIdStart: (state) => {
      state.deletedUsersByIdLoader = false;
      state.deletedUsersByIdError = null;
    },

    deletedUserByIdSuccess: (state) => {
      state.deletedUsersByIdError = null;
      state.deletedUsersByIdLoader = false;
    },
    deletedUserByIdFailure: (state, action) => {
      state.deletedUsersByIdLoader = false;
      state.deletedUsersByIdError = action.payload
    },






    fetchUserByIdStart: (state) => {
      state.fetchUsersByIdLoader = true;
      state.fetchUsersByIdError = null;
    },

    fetchUserByIdSuccess: (state, action) => {
      state.user = action.payload;
      state.fetchUsersByIdError = null;
      state.fetchUsersByIdLoader = false;
    },
    fetchUserByIdFailure: (state, action) => {
      state.fetchUsersByIdLoader = false;
      state.fetchUsersByIdError = action.payload
    },






    updateUserByIdStart: (state) => {
      state.updateUsersByIdLoader = false;
      state.updateUsersByIdError = null;
    },

    updateUserByIdSuccess: (state) => {
      state.updateUsersByIdError = null;
      state.updateUsersByIdLoader = false;
    },
    updateUserByIdFailure: (state, action) => {
      state.updateUsersByIdLoader = false;
      state.updateUsersByIdError = action.payload
    },



    addUserStart: (state) => {
      state.addUserLoader = true;
    },
    addUserSuccess: (state) => {
      state.addUserLoader = false;
      state.addUserError = null;
    },
    addUserFailure: (state, action) => {
      state.addUserLoader = false;
      state.addUserError = action.payload;
    },


  },
});

export const {
  signInStart,
  signInFailure,
  signInSuccess,

  logoutStart,
  logoutSuccess,
  logoutFailure,

  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,

  protectedRouteStart,
  protectedRouteSuccess,
  protectedRouteFailure,

  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,

  deletedUserByIdStart,
  deletedUserByIdSuccess,
  deletedUserByIdFailure,


  fetchUserByIdStart,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,

  updateUserByIdStart,
  updateUserByIdSuccess,
  updateUserByIdFailure,


  addUserStart,
  addUserSuccess,
  addUserFailure

} = adminSlice.actions;
export default adminSlice.reducer;