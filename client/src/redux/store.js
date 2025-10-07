// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import designReducer from "./designSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    design: designReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // for handling non-serializable data like canvas JSON if needed
    }),
});

export default store;
