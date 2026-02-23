"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Providers from "./providers";
import Header from "../components/Header/Header";
import { useLazyGetWeatherByCityQuery } from "@/features/weather/weatherApi";
import { useCitiesLocalStorage } from "@/app/useCitiesLocalStorage";
import { addCity } from "@/features/weather/citiesSlice";
import CityList from "@/features/weather/components/CityList";

export default function Home() {
  return (
    <Providers>
      <Header />
      <HomeContent />
    </Providers>
  );
}

function HomeContent() {
  const dispatch = useAppDispatch();
  const [cityInput, setCityInput] = useState("");
  const [error, setError] = useState("");
  const [trigger, { isFetching }] = useLazyGetWeatherByCityQuery();
  useCitiesLocalStorage();

  const handleAddCity = async () => {
    if (cityInput.trim()) {
      setError("");
      try {
        const result = await trigger(cityInput.trim()).unwrap();
        if (result?.name) {
          dispatch(addCity({ name: cityInput.trim() }));
          setCityInput("");
        }
      } catch {
        setError("City not found or API error");
      }
    }
  };

  const router = useRouter();
  const handleCardClick = (city: string) => {
    router.push(`/city/${encodeURIComponent(city)}`);
  };

  const handleRefresh = (city: string, refetch: () => void) => {
    refetch();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather in Your Cities
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleAddCity();
        }}
        style={{ display: "flex", gap: 8, marginBottom: 24 }}
      >
        <TextField
          label="Add city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          disabled={isFetching}
          size="small"
          sx={{ width: 180 }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isFetching}
          size="small"
          sx={{ minWidth: 90 }}
        >
          {isFetching ? "Checking..." : "Add"}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <CityList onCardClick={handleCardClick} onRefresh={handleRefresh} />
    </Container>
  );
}
