import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetWeatherByCityQuery } from "../weatherApi";
import CardMedia from "@mui/material/CardMedia";
import { getWidgetImage } from "../widgetImages";
import styles from "./WeatherCard.module.scss";

interface WeatherCardProps {
  city: string;
  onRefresh: (refetch: () => void) => void;
  onDelete: () => void;
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  onRefresh,
  onDelete,
  onClick,
}) => {
  const { data, isFetching, error, refetch } = useGetWeatherByCityQuery(city);
  const iconUrl = data?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : null;

  const widgetBg = data?.weather?.[0]?.main
    ? getWidgetImage(data.weather[0].main)
    : null;

  return (
    <Card
      className={styles.card}
      sx={{
        background: widgetBg
          ? `linear-gradient(120deg, rgba(255,255,255,0.25) 60%, rgba(30,144,255,0.10)), url(${widgetBg}) center/cover no-repeat`
          : "linear-gradient(120deg, rgba(255,255,255,0.25) 60%, rgba(30,144,255,0.10))",
        color: widgetBg ? "#fff" : "#1a237e",
      }}
      onClick={onClick}
    >
      <CardContent className={styles.cardContent}>
        <div className={styles.container}>
          <div className={styles.iconWrapper}>
            {iconUrl ? (
              <CardMedia
                component="img"
                image={iconUrl}
                alt={data?.weather?.[0]?.description || "weather icon"}
                sx={{ width: 80, height: 80, objectFit: "contain" }}
              />
            ) : (
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                sx={{ bgcolor: "#e3eafc" }}
              />
            )}
          </div>

          <div className={styles.contentArea}>
            <div
              aria-hidden={isFetching}
              className={styles.contentInner}
              style={{ opacity: isFetching ? 0.25 : 1 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                {city}
              </Typography>

              {error ? (
                <Typography color="error">Error loading weather</Typography>
              ) : data ? (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {Math.round(data?.main?.temp ?? 0)}°C
                  </Typography>
                  <div className={styles.hiddenText}>
                    Temp: {Math.round(data?.main?.temp ?? 0)}
                  </div>
                  <Typography sx={{ textTransform: "capitalize", mb: 1 }}>
                    {data.weather[0].description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Humidity: {data?.main?.humidity ?? 0}% | Wind:{" "}
                    {data?.wind?.speed ?? 0} m/s
                  </Typography>
                </>
              ) : null}
            </div>

            {isFetching && (
              <div className={styles.loadingOverlay}>
                <Skeleton
                  variant="text"
                  width={140}
                  height={28}
                  sx={{ mb: 1, bgcolor: "#e3eafc" }}
                />
                <Skeleton
                  variant="text"
                  width={80}
                  height={40}
                  sx={{ mb: 1, bgcolor: "#e3eafc" }}
                />
                <Skeleton
                  variant="text"
                  width={120}
                  height={20}
                  sx={{ mb: 1, bgcolor: "#e3eafc" }}
                />
                <div className={styles.loadingInner}>
                  <CircularProgress
                    size={32}
                    thickness={4}
                    sx={{ color: "#1976d2", mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ mt: 1, color: "#1976d2" }}>
                    Updating...
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actionsRow}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onRefresh(refetch);
            }}
            size="medium"
            aria-label="refresh"
            sx={{
              background: "rgba(25, 118, 210, 0.10)",
              borderRadius: 2,
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
              color: "#1976d2",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#1976d2",
                color: "#fff",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size="medium"
            aria-label="delete"
            sx={{
              background: "rgba(244, 67, 54, 0.10)",
              borderRadius: 2,
              boxShadow: "0 2px 8px 0 rgba(244, 67, 54, 0.10)",
              color: "#f44336",
              transition: "background 0.2s, color 0.2s",
              "&:hover": {
                background: "#f44336",
                color: "#fff",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
