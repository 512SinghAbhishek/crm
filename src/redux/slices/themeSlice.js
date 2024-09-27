import { createSlice } from '@reduxjs/toolkit';
const initialThemeMode = localStorage.getItem('themeMode') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialThemeMode,
  },
  reducers: {
    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.mode);
    },
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('themeMode', state.mode);
    },
  },
});

export const { toggleThemeMode, setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
