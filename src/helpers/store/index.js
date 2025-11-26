import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "./actionSlice";
const store = configureStore({
  reducer: {
    action: actionSlice,
  },
});
export default store;
