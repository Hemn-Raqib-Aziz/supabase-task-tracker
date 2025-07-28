import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import type { PasswordChangeState } from "../../types/auth.types";


const initialState: PasswordChangeState = {
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  loading: false,
  resetSuccess: false,
  changeSuccess: false,
  allowedToReset: false
};

// Thunk to send password reset email
export const requestPasswordReset = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("passwordChange/requestPasswordReset", async (email, { rejectWithValue }) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/forgot-password"
  });
  if (error) return rejectWithValue(error.message);
  return true;
});

// Thunk to change password (user already verified)
export const changePassword = createAsyncThunk<
  boolean,
  { password: string },
  { rejectValue: string }
>("passwordChange/changePassword", async ({ password }, { rejectWithValue }) => {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return rejectWithValue(error.message);
  return true;
});

const passwordChangeSlice = createSlice({
  name: "passwordChange",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    clearSuccess: (state) => {
      state.resetSuccess = false;
      state.changeSuccess = false;
    },
    setError: (state, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
  allowPasswordReset: (state) => {
    state.allowedToReset = true;
  },
  disallowPasswordReset: (state) => {
    state.allowedToReset = false;
  },
  },
  extraReducers: (builder) => {
    // requestPasswordReset handlers
    builder
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.resetSuccess = false;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset email";
      });

    // changePassword handlers
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.changeSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.changeSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update password";
      });
  },
});

export const {
  setEmail,
  setPassword,
  setConfirmPassword,
  clearError,
  clearSuccess,
  setError,
  allowPasswordReset,
  disallowPasswordReset
} = passwordChangeSlice.actions;

export default passwordChangeSlice.reducer;
