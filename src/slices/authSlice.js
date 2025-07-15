import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  signupData: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Store token in Redux and localStorage
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    // Store user in Redux and localStorage
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },

    // Toggle loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Logout user
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    setSignupData: (state, action) => {
  state.signupData = action.payload;
}

  },
});

export const { setToken, setUser, setLoading, logout ,setSignupData} = authSlice.actions;
export default authSlice.reducer;
