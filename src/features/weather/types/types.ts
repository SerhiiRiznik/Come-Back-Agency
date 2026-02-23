export interface City {
  name: string;
}

export interface CitiesState {
  cities: City[];
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
  };
  snow?: {
    "1h"?: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface HourlyWeatherData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
      feels_like: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    clouds: {
      all: number;
    };
    rain?: {
      "1h"?: number;
    };
    snow?: {
      "1h"?: number;
    };
  }>;
}
