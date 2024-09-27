import { createSlice } from '@reduxjs/toolkit';

const tokens = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!tokens,
  tokens: tokens || null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.tokens = action.payload.tokens;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.tokens = null;
      state.user = null;
      localStorage.removeItem('tokens');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
