import { useEffect, useMemo } from "react";
import { useAppSelector } from "../store/hooks";

const LOCAL_STORAGE_KEY = "weather_cities";

export function useCitiesLocalStorage() {
  const cities = useAppSelector((state) => state.cities.cities);

  const memoizedCities = useMemo(() => cities, [cities]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(memoizedCities));
  }, [memoizedCities]);
}
