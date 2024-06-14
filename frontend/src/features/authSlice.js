import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      console.log("LoginUser payload:", user);
      const response = await axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message =
          error.response.data.message || error.response.data.errorMessage;
        console.error("LoginUser error:", message);
        return thunkAPI.rejectWithValue(message);
      } else {
        console.error("Unexpected error:", error.message);
        return thunkAPI.rejectWithValue("Unexpected error occurred.");
      }
    }
  }
);

// Proteksi dashboard
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message =
        error.response.data.message || error.response.data.errorMessage;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  // Untuk menghandle createAsyncThunk
  extraReducers: (builder) => {
    // Jika pending
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    // Jika tidak pending
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload; // from response.data
      console.log("state.user:", action.payload);
    });
    // Jika terjadi error
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload; // from return thunkAPI.rejectWithValue(message);
    });
    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
