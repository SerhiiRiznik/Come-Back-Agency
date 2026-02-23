"use client";
import React from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import { getWidgetImage } from "@/features/weather/widgetImages";
import Providers from "../../providers";
import Header from "@/components/Header/Header";
import {
  useGetHourlyByCityQuery,
  useGetWeatherByCityQuery,
} from "@/features/weather/weatherApi";
import { HourlyWeatherData } from "@/features/weather/types/types";
import styles from "./CityDetail.module.scss";

function CityDetailBg() {
  const params = useParams();
  const city =
    typeof params.name === "string"
      ? params.name
      : Array.isArray(params.name)
        ? params.name[0]
        : "";
  const { data } = useGetWeatherByCityQuery(city);
  const bgImg = data?.weather?.[0]?.main
    ? getWidgetImage(data.weather[0].main)
    : getWidgetImage("Clear");
  return (
    <div
      className={styles["city-bg"]}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <CityDetail city={city} />
    </div>
  );
}

function CityDetail({ city }: { city: string }) {
  const { data, isFetching, error } = useGetWeatherByCityQuery(city);
  const { data: hourlyData } = useGetHourlyByCityQuery(city);
  const iconUrl = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    : null;
  const hourlyTemps =
    hourlyData?.list
      ?.slice(0, 12)
      .map((h: HourlyWeatherData["list"][number]) => ({
        time: h.dt_txt.split(" ")[1].slice(0, 5),
        temp: h.main.temp,
      })) || [];
  return (
    <Paper elevation={8} className={styles["city-paper"]}>
      <div
        className={styles["city-detail-grid"]}
        data-testid="city-detail-grid"
      >
        <div className={styles["city-detail-left"]}>
          {data && (
            <>
              <Typography
                sx={{
                  textAlign: "left",
                }}
                pb={1}
                variant="body2"
                color="text.secondary"
              >
                Humidity: {data.main.humidity}%<br />
                Pressure: {data.main.pressure} hPa
                <br />
                Wind: {data.wind.speed} m/s, {data.wind.deg}°<br />
                Visibility: {data.visibility / 1000} km
                <br />
                Clouds: {data.clouds.all}%<br />
                {data.rain?.["1h"] ? `Rain (1h): ${data.rain["1h"]} mm` : ""}
                {data.snow?.["1h"] ? `Snow (1h): ${data.snow["1h"]} mm` : ""}
              </Typography>
              <div className={styles["city-sun"]}>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sunrise
                  </Typography>
                  <Typography>
                    {data.sys.sunrise
                      ? new Date(data.sys.sunrise * 1000).toLocaleTimeString()
                      : "-"}
                  </Typography>
                </div>
                <div>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sunset
                  </Typography>
                  <Typography>
                    {data.sys.sunset
                      ? new Date(data.sys.sunset * 1000).toLocaleTimeString()
                      : "-"}
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles["city-detail-right"]}>
          <div className={styles["city-header"]}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 1 }}
              gutterBottom
            >
              {city}
            </Typography>
            {iconUrl && (
              <CardMedia
                component="img"
                image={iconUrl}
                alt={data?.weather?.[0]?.description || "weather icon"}
                className={styles["city-icon"]}
              />
            )}
          </div>
          {isFetching ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">Error loading weather</Typography>
          ) : data ? (
            <>
              <Typography variant="h1" sx={{ fontWeight: 600, mb: 0.5 }}>
                {Math.round(data.main.temp)}°C
              </Typography>
              <Typography sx={{ textTransform: "capitalize", mb: 0.5 }}>
                {data.weather[0].description}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Feels like: {Math.round(data.main.feels_like)}°C
              </Typography>
            </>
          ) : null}
        </div>
      </div>
      {hourlyTemps.length > 0 && (
        <div className={styles["city-chart"]}>
          <Typography variant="h6" sx={{ mb: 1, textAlign: "center" }}>
            Hourly Temperature
          </Typography>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={hourlyTemps}>
              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#1976d2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </Paper>
  );
}

export default function CityDetailPage() {
  return (
    <>
      <Header />
      <Providers>
        <CityDetailBg />
      </Providers>
    </>
  );
}
