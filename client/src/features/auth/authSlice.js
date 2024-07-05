import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (user) => {
  const response = await axios.post(
    "http://localhost:4321/user/register",
    user
  );
  return response.data;
});

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:4321/user/login",
    credentials
  );
  return response.data;
});

axios.defaults.withCredentials = true;

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        console.log("Action payload:", action.payload);
        state.token = action.payload.token;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
