import React from "react";
import WeatherCard from "./WeatherCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { removeCity } from "../citiesSlice";

interface CityListProps {
  onCardClick: (city: string) => void;
  onRefresh: (city: string, refetch: () => void) => void;
}

const CityList: React.FC<CityListProps> = ({ onCardClick, onRefresh }) => {
  const cities = useAppSelector((state) => state.cities.cities);
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {cities.map((city) => (
        <div
          key={city.name}
          style={{ flex: "1 1 250px", minWidth: 250, maxWidth: 350 }}
        >
          <WeatherCard
            city={city.name}
            onClick={() => onCardClick(city.name)}
            onRefresh={(refetch) => onRefresh(city.name, refetch)}
            onDelete={() => dispatch(removeCity(city.name))}
          />
        </div>
      ))}
    </div>
  );
};

export default CityList;
