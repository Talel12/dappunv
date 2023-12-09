import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService, { redirectBasedOnRole } from "../services/auth.services";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await AuthService.login({ username, password });
    // console.log(response);
    const decodedToken = jwtDecode(response.token);
    const userRole = decodedToken.roles;
    const user = await axios
      .get(`/api/auth/users/${jwtDecode(response.token).sub}`, {
        headers: { Authorization: `Bearer ${response.token}` },
      })
      .then((res) => {
        redirectBasedOnRole(userRole);
        return res.data[0];
        // Redirect based on user role
      });

    return await { ...response, ...user };
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, role }) => {
    try {
      const response = await AuthService.register({
        username,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for fetching current user
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    try {
      const response = await AuthService.getCurrentUser();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.auth = null;
      window.location.href = "/";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
