// src/redux/features/auth.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  loginUser,
  validateToken,
  logoutUser,
} from "client/services/features/authService";

export interface loginResponse {
  user_id: string;
  roles: string[];
  token: string;
}

// Definir el tipo de estado para autenticación
type AuthState = {
  roles: string[];
  token: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user_id: string;
};

// Definir un tipo para la estructura de respuesta de error de tu API
interface ErrorResponse {
  message: string;
}

const initialState: AuthState = {
  roles: [],
  token: "",
  status: "idle",
  error: null,
  user_id: "",
};

// Thunk para manejar el login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await loginUser(email, password);

      return { roles: data.roles, token: data.token, user_id: data.user_id };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Login failed"
      );
    }
  }
);

// Thunk para manejar la validación del token
export const validateUserToken = createAsyncThunk(
  "auth/validateToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await validateToken(token);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Token validation failed"
      );
    }
  }
);

// Thunk para manejar el logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (token: string, { rejectWithValue }) => {
    try {
      await logoutUser(token);
      return;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Logout failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            roles: [];
            token: string;
            user_id: string;
          }>
        ) => {
          state.status = "succeeded";
          state.roles = action.payload.roles;
          state.token = action.payload.token;
          state.user_id = action.payload.user_id;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.roles = [];
        state.token = "";
        state.user_id = "";
        state.status = "idle";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.roles = [];
        state.user_id = "";
        state.token = "";
        state.error = action.payload as string;
      })
      .addCase(validateUserToken.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
