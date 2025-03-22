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
  },
  reducers: {
    addUserStart: (state) => {
      state.addUserLoader = true;
    },
    addUserSuccess: (state, action) => {
      state.users = action.payload.data
      state.addUserLoader = false;
      state.addUserError = null;
    },
    addUserFailure: (state, action) => {
      state.addUserLoader = false;
      state.addUserError = action.payload;
    },



    fetchUsersStart: (state, action) => {
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






    fetchUserByIdStart: (state, action) => {
      state.fetchUsersByIdLoader = false;
      state.fetchUsersByIdError = null;
    },

    fetchUserByIdSuccess: (state, action) => {
      state.users = action.payload;
      state.fetchUsersByIdError = null;
      state.fetchUsersByIdLoader = false;
    },
    fetchUserByIdFailure: (state, action) => {
      state.fetchUsersByIdLoader = false;
      state.fetchUsersByIdError = action.payload
    },


    reFetch: (state, action) => {
      state.refetchLoader = true;
    }
  },
});

export const {
  addUserFailure,
  addUserStart, fetchUsersFailure, addUserSuccess, fetchUsersSuccess, fetchUsersStart,
  fetchUserByIdFailure, fetchUserByIdStart, fetchUserByIdSuccess
} = userSlice.actions;
export default userSlice.reducer;

