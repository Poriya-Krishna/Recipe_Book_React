import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  savedRecipes: [], // No token needed
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user login data
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    // Clear user login data
    setLogout: (state) => {
      state.user = null;
      state.savedRecipes = [];
    },
    // Set saved recipes directly (no token check)
    setSavedRecipes: (state, action) => {
      state.savedRecipes = action.payload.savedRecipes;
    },
  },
});

export const { setLogin, setLogout, setSavedRecipes } = authSlice.actions;
export default authSlice.reducer;
