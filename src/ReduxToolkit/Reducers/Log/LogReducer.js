import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logsByDate: {},
  rangeCache: {},
  analyticsCache: {},
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
    setLogsByRange(state, action) {
      const { key, logs } = action.payload;
      state.rangeCache[key] = logs;
    },
    setAnalyticsByRange(state, action) {
      const { key, analytics } = action.payload;
      state.analyticsCache[key] = analytics;
    }
  },
});

export const { setLogsByDate, updateSingleLog,setLogsByRange,setAnalyticsByRange } = logSlice.actions;
export default logSlice.reducer;
