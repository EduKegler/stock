import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import Stock from "./Stock";

describe("Stock", () => {
  const mockStock = {
    id: "something",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 151.2,
    history: [145.2, 146.3, 148.4, 149.5, 150.5],
  };

  afterEach(() => {
    cleanup();
  });

  it("renders stock information correctly", () => {
    render(
      <MemoryRouter>
        <Stock stock={mockStock} />
      </MemoryRouter>
    );

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
    expect(screen.getByText("$151.20")).toBeInTheDocument();
  });

  it("calculates and displays positive percentage change correctly", () => {
    render(
      <MemoryRouter>
        <Stock stock={mockStock} />
      </MemoryRouter>
    );

    expect(screen.getByText("+0.47%")).toBeInTheDocument();
  });

  it("calculates and displays negative percentage change correctly", () => {
    const negativeStock = {
      ...mockStock,
      price: 144.2,
      history: [145.2, 146.3, 148.4, 149.5, 150.5],
    };

    render(
      <MemoryRouter>
        <Stock stock={negativeStock} />
      </MemoryRouter>
    );

    expect(screen.getByText("-4.19%")).toBeInTheDocument();
  });

  it("renders with correct link", () => {
    render(
      <MemoryRouter>
        <Stock stock={mockStock} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/assets/AAPL");
  });
});
