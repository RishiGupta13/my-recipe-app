import { configureStore } from "@reduxjs/toolkit";
import mealReducer from './mealSlice';

export const appStore=configureStore({
    reducer:{
        meal:mealReducer,
    }
})

