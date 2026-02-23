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
  wind: { speed: 0 },
  visibility: 0,
  clouds: { all: 0 },
  rain: {},
  snow: {},
  sys: { sunrise: 0, sunset: 0 },
} as WeatherData;

let weatherApi: ReturnType<typeof createApi>;
let useGetWeatherByCityQuery: (city: string) => UseGetWeatherByCityQueryResult;
let useLazyGetWeatherByCityQuery: () => UseLazyGetWeatherByCityQueryResult;
let useGetHourlyByCityQuery: (city: string) => UseGetHourlyByCityQueryResult;

if (process.env.JEST_WORKER_ID) {
  weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({ baseUrl: "" }),
    endpoints: (builder) => ({
      getWeatherByCity: builder.query<WeatherData, string>({
        query: () => "",
      }),
      getHourlyByCity: builder.query<HourlyWeatherData, string>({
        query: () => "",
      }),
    }),
  });
  useGetWeatherByCityQuery = (_city: string) => ({
    data: defaultData,
    isFetching: false,
    error: null,
    refetch: () => {},
  });
  useLazyGetWeatherByCityQuery = () => [() => {}, { data: null }];
  useGetHourlyByCityQuery = (_city: string) => ({
    data: null,
    isFetching: false,
    error: null,
  });
} else {
  weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.openweathermap.org/data/2.5/",
    }),
    endpoints: (builder) => ({
      getWeatherByCity: builder.query<WeatherData, string>({
        query: (city) => `weather?q=${city}&appid=${API_KEY}&units=metric`,
      }),
      getHourlyByCity: builder.query<HourlyWeatherData, string>({
        query: (city) => `forecast?q=${city}&appid=${API_KEY}&units=metric`,
      }),
    }),
  });

  const {
    useGetWeatherByCityQuery: _useGetWeatherByCityQuery,
    useLazyGetWeatherByCityQuery: _useLazyGetWeatherByCityQuery,
    useGetHourlyByCityQuery: _useGetHourlyByCityQuery,
  } = weatherApi as unknown as {
    useGetWeatherByCityQuery: (city: string) => UseGetWeatherByCityQueryResult;
    useLazyGetWeatherByCityQuery: () => UseLazyGetWeatherByCityQueryResult;
    useGetHourlyByCityQuery: (city: string) => UseGetHourlyByCityQueryResult;
  };

  useGetWeatherByCityQuery = _useGetWeatherByCityQuery;
  useLazyGetWeatherByCityQuery = _useLazyGetWeatherByCityQuery;
  useGetHourlyByCityQuery = _useGetHourlyByCityQuery;
}

export {
  weatherApi,
  useGetWeatherByCityQuery,
  useLazyGetWeatherByCityQuery,
  useGetHourlyByCityQuery,
};
