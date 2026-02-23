import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "../features/weather/components/WeatherCard";
import * as api from "../features/weather/weatherApi";

jest.mock("../features/weather/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(() => ({
    data: { main: { temp: 20 }, weather: [{ description: "clear sky" }] },
    isFetching: false,
    error: null,
  })),
}));

describe("WeatherCard", () => {
  it("renders city and weather", () => {
    render(
      <WeatherCard
        city="Kyiv"
        onRefresh={jest.fn()}
        onDelete={jest.fn()}
        onClick={jest.fn()}
      />,
    );
    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText(/Temp: 20/)).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
  });

  it("calls onRefresh when refresh button clicked", () => {
    const onRefresh = jest.fn();
    render(
      <WeatherCard
        city="Kyiv"
        onRefresh={onRefresh}
        onDelete={jest.fn()}
        onClick={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /refresh/i }));
    expect(onRefresh).toHaveBeenCalled();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = jest.fn();
    render(
      <WeatherCard
        city="Kyiv"
        onRefresh={jest.fn()}
        onDelete={onDelete}
        onClick={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /delete/i }));
    expect(onDelete).toHaveBeenCalled();
  });
});
