import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WeatherData, HourlyWeatherData } from "./types/types";
import type {
  UseGetWeatherByCityQueryResult,
  UseLazyGetWeatherByCityQueryResult,
  UseGetHourlyByCityQueryResult,
} from "./types/apiTypes";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const defaultData: WeatherData = {
  name: "",
  main: { temp: 0, feels_like: 0, humidity: 0, pressure: 0 },
  weather: [{ main: "Clear", description: "", icon: "" }],
  wind: { speed: 0, deg: 0 },
  visibility: 0,
  clouds: { all: 0 },
  rain: {},
  snow: {},
  sys: { sunrise: 0, sunset: 0 },
};

const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.JEST_WORKER_ID
      ? ""
      : "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherData, string>({
      query: (city) =>
        process.env.JEST_WORKER_ID
          ? ""
          : `weather?q=${city}&appid=${API_KEY}&units=metric`,
    }),
    getHourlyByCity: builder.query<HourlyWeatherData, string>({
      query: (city) =>
        process.env.JEST_WORKER_ID
          ? ""
          : `forecast?q=${city}&appid=${API_KEY}&units=metric`,
    }),
  }),
});

let useGetWeatherByCityQuery: (city: string) => UseGetWeatherByCityQueryResult;
let useLazyGetWeatherByCityQuery: () => UseLazyGetWeatherByCityQueryResult;
let useGetHourlyByCityQuery: (city: string) => UseGetHourlyByCityQueryResult;

if (process.env.JEST_WORKER_ID) {
  useGetWeatherByCityQuery = (
    _city: string,
  ): UseGetWeatherByCityQueryResult => {
    void _city;
    return {
      data: defaultData,
      isFetching: false,
      error: null,
      refetch: () => {},
    };
  };

  useLazyGetWeatherByCityQuery = (): UseLazyGetWeatherByCityQueryResult => {
    const trigger = (city: string) => {
      void city;
      const p = Promise.resolve({ data: defaultData }) as Promise<{
        data: WeatherData;
      }> & {
        unwrap: () => Promise<WeatherData>;
      };
      p.unwrap = () => Promise.resolve(defaultData);
      return p;
    };

    const result = {
      data: null as WeatherData | null,
      isFetching: false,
      error: null,
    };
    return [trigger, result];
  };

  useGetHourlyByCityQuery = (_city: string): UseGetHourlyByCityQueryResult => {
    void _city;
    return { data: null, isFetching: false, error: null };
  };
} else {
  const hooks = weatherApi as unknown as {
    useGetWeatherByCityQuery: (city: string) => UseGetWeatherByCityQueryResult;
    useLazyGetWeatherByCityQuery: () => UseLazyGetWeatherByCityQueryResult;
    useGetHourlyByCityQuery: (city: string) => UseGetHourlyByCityQueryResult;
  };

  useGetWeatherByCityQuery = hooks.useGetWeatherByCityQuery;
  useLazyGetWeatherByCityQuery = hooks.useLazyGetWeatherByCityQuery;
  useGetHourlyByCityQuery = hooks.useGetHourlyByCityQuery;
}

export {
  weatherApi,
  useGetWeatherByCityQuery,
  useLazyGetWeatherByCityQuery,
  useGetHourlyByCityQuery,
};
