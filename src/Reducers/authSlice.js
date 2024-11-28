import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null, // This will store user data, including userId
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
    },
    authFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    finishLoading(state) {
      state.loading = false;
    },
    setUser(state, action) {
      state.user = action.payload; // This will store the user object (including userId)
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logout,
  finishLoading,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
