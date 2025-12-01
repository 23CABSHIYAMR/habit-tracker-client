import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./Reducers/Layout/LayoutReducer";
import habitReducer from "./Reducers/Habit/HabitReducer";
import logReducer from "./Reducers/Log/LogReducer";
import dateReducer from "./Reducers/Date/dateSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    habit: habitReducer,
    log:logReducer,
    date:dateReducer  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
