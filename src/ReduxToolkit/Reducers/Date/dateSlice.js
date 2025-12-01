import { createSlice } from "@reduxjs/toolkit";
import { IsoDate } from "@/utils/helpers/dateFormat";

const today = new Date();

const initialState = {
  selectedDate: today,
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    nextDate(state) {
      const d = new Date(state.selectedDate);
      d.setDate(d.getDate() + 1);
      state.selectedDate = d;
    },
    prevDate(state) {
      const d = new Date(state.selectedDate);
      d.setDate(d.getDate() - 1);
      state.selectedDate = d;
    },
  },
});

export const { setSelectedDate, nextDate, prevDate } = dateSlice.actions;
export default dateSlice.reducer;
