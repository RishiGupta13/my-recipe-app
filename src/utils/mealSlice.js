import { createSlice } from "@reduxjs/toolkit";

export const mealSlice = createSlice({
  name: "meal",
  initialState: {
    meals: [],
    matchingMeals:[],
    recipeDetails:[],
  },
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload;
    },
    setMatchingMeals: (state, action) => {
        state.matchingMeals.length=0;
        state.matchingMeals.push(action.payload);
      },

      addRecipeDetail: (state, action) => {
        state.recipeDetails.length=0;
        state.recipeDetails.push(action.payload);
      },
  },
});

export const { setMeals,setMatchingMeals,addRecipeDetail } = mealSlice.actions;

export default mealSlice.reducer;
