import { createSlice } from "@reduxjs/toolkit";

export interface Theme {
  isThemeDark: true | false;
}

const initialState: Theme = {
  isThemeDark: false,
};

export const colorSchemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isThemeDark = !state.isThemeDark;
    },
  },
});

export const { toggleTheme } = colorSchemeSlice.actions;
export default colorSchemeSlice.reducer;
