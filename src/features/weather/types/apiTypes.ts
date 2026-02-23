import type { WeatherData, HourlyWeatherData } from "./types";

export type UseGetWeatherByCityQueryResult = {
  data: WeatherData | null;
  isFetching: boolean;
  error: unknown | null;
  refetch: () => void;
};

export type UseLazyGetWeatherByCityQueryResult = [
  () => void,
  { data: HourlyWeatherData | null },
];

export type UseGetHourlyByCityQueryResult = {
  data: HourlyWeatherData | null;
  isFetching: boolean;
  error: unknown | null;
};
