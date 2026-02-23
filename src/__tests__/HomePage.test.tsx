import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders main title", () => {
    render(<Home />);
    expect(screen.getByText(/Weather in Your Cities/i)).toBeInTheDocument();
  });
});
