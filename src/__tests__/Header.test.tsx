import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header";

describe("Header", () => {
  it("renders app title", () => {
    render(<Header />);
    expect(screen.getByText("Come Back Agency")).toBeInTheDocument();
  });
});
