// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
  admin: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.token = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
