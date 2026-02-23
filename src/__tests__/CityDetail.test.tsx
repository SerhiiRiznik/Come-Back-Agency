import { render, screen } from "@testing-library/react";
import CityDetail from "../app/city/[name]/page";

describe("CityDetail page", () => {
  it("renders city detail blocks", () => {
    render(<CityDetail />);
    expect(screen.getByText(/Kyiv/i)).toBeInTheDocument();
    expect(screen.getByTestId("city-detail-grid")).toBeInTheDocument();
  });
});
