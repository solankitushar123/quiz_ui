import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  category: "",
  subCategory: "",
  level: "",
  mode: "", // new: online/offline
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < 5) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {
  nextStep,
  prevStep,
  setCategory,
  setSubCategory,
  setLevel,
  setMode,
} = quizSlice.actions;
export default quizSlice.reducer;
