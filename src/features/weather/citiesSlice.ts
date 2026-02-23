import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitiesState, City } from "./types/types";

let loadedCities: City[] = [];
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem("weather_cities");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) loadedCities = parsed;
    }
  } catch {}
}
const initialState: CitiesState = {
  cities: loadedCities || [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
    },
    addCity(state, action: PayloadAction<City>) {
      if (
        !state.cities.find(
          (c) => c.name.toLowerCase() === action.payload.name.toLowerCase(),
        )
      ) {
        state.cities.push(action.payload);
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter(
        (c) => c.name.toLowerCase() !== action.payload.toLowerCase(),
      );
    },
  },
});

export const { setCities, addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
