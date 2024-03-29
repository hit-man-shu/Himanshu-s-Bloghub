import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", isAuthenticate: false },

  reducers: {
    login: (state, action) => {
      state.isAuthenticate = true;
      state.token = action.payload;
    },

    logout: (state) => {
      state.isAuthenticate = false;
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
