import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logsByDate: {},
};

const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setLogsByDate(state, action) {
      const { date, logs } = action.payload;
      state.logsByDate[date] = logs;
    },
    updateSingleLog(state, action) {
      const { date, habitId, value } = action.payload;
      if (!state.logsByDate[date]) state.logsByDate[date] = {};
      state.logsByDate[date][habitId] = value;
    },
  },
});

export const { setLogsByDate, updateSingleLog } = logSlice.actions;
export default logSlice.reducer;
