import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    // Add other reducers here if needed
    auth: authReducer,
  },
});
export default store;
