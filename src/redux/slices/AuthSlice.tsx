import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import type { AuthState } from "../../types/auth.types";

const initialState: AuthState = {
  email: "",
  password: "",
  error: "",
  isAuthenticated: false,
  loading: false,
};

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return rejectWithValue(error.message);
    return true;
  }
);

export const signInUser = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return rejectWithValue(error.message);
    return true;
  }
);

export const fetchUserSession = createAsyncThunk(
  "auth/fetchUserSession",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return rejectWithValue("No active session");
    }
    const email = data.session.user.email;
    return email;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    clearAuthError: (state) => {
      state.error = "";
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearSignupMessage: (state) => {
      state.signupMessage = ""; // 👈 optional clear action
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.signupMessage = "";
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.signupMessage = "Check your email to confirm your signup."; // 👈 Add this!
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(fetchUserSession.fulfilled, (state, action) => {
        state.email = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserSession.rejected, (state) => {
        state.email = "";
        state.isAuthenticated = false;
      });
  },
});

export const selectUserEmail = (state: { auth: AuthState }) => state.auth.email;

export const {
  setEmail,
  setPassword,
  clearAuthError,
  setAuthError,
  clearSignupMessage,
} = authSlice.actions;
export default authSlice.reducer;
