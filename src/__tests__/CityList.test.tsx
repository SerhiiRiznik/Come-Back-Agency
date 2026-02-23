import { render, screen } from "@testing-library/react";
import CityList from "../features/weather/components/CityList";

describe("CityList", () => {
  const mockCities = [{ name: "Kyiv" }, { name: "London" }];
  const mockOnCardClick = jest.fn();
  const mockOnRefresh = jest.fn();
  const mockOnDelete = jest.fn();

  it("renders city cards", () => {
    render(
      <CityList onCardClick={mockOnCardClick} onRefresh={mockOnRefresh} />,
    );
    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
  });
});
