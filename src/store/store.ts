import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../features/weather/weatherApi";
import citiesReducer from "../features/weather/citiesSlice";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [weatherApi.reducerPath]: weatherApi.reducer,
  cities: citiesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
