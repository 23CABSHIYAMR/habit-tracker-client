import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBarToggle: false,
  removeSidebar: false,
  editHabitData: null,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setSideBarToggle: (state, action) => {
      state.sideBarToggle = action.payload;
    },
    setRemoveSidebar: (state, action) => {
      state.removeSidebar = action.payload;
    },
    setEditHabitData: (state, action) => {
      state.editHabitData = action.payload;
    },
  },
});

export const { setSideBarToggle, setRemoveSidebar, setEditHabitData } = layoutSlice.actions;
export default layoutSlice.reducer;
