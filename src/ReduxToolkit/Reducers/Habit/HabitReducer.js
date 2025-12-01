import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
  },
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
