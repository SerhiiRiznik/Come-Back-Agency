import type { WeatherData, HourlyWeatherData } from "./types";

export type UseGetWeatherByCityQueryResult = {
  data: WeatherData | null;
  isFetching: boolean;
  error: unknown | null;
  refetch: () => void;
};

type LazyTrigger<T> = (
  arg: string,
) => Promise<{ data: T }> & { unwrap: () => Promise<T> };

export type UseLazyGetWeatherByCityQueryResult = [
  LazyTrigger<WeatherData>,
  { data: WeatherData | null; isFetching: boolean; error: unknown | null },
];

export type UseGetHourlyByCityQueryResult = {
  data: HourlyWeatherData | null;
  isFetching: boolean;
  error: unknown | null;
};
