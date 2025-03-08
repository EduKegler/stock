import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { MemoryRouter } from "react-router";
import MyStock, { MyAsset } from "./MyStock";

describe("MyStock", () => {
  const mockStock: MyAsset = {
    name: "Apple Inc.",
    symbol: "AAPL",
    totalShares: 10,
    price: 150.5,
    averagePrice: 145.3,
  };

  afterEach(() => {
    cleanup();
  });

  it("renders stock information correctly", () => {
    render(
      <MemoryRouter>
        <MyStock stock={mockStock} />
      </MemoryRouter>
    );

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc. - 10 shares")).toBeInTheDocument();
    expect(screen.getByText("$150.50")).toBeInTheDocument();
    expect(screen.getByText("$145.30")).toBeInTheDocument();
    expect(screen.getByText("$1505.00")).toBeInTheDocument();
    expect(screen.getByText("+$52.00")).toBeInTheDocument();
  });

  it("applies correct styling for positive profit", () => {
    render(
      <MemoryRouter>
        <MyStock stock={mockStock} />
      </MemoryRouter>
    );

    const profitElement = screen.getByText("+$52.00");
    expect(profitElement).toHaveClass("text-green-500");
  });

  it("applies correct styling for negative profit", () => {
    const lossStock = {
      ...mockStock,
      price: 140.3,
    };

    render(
      <MemoryRouter>
        <MyStock stock={lossStock} />
      </MemoryRouter>
    );

    const profitElement = screen.getByText("-$50.00");
    expect(profitElement).toHaveClass("text-red-500");
  });

  it("renders correct link to asset details", () => {
    render(
      <MemoryRouter>
        <MyStock stock={mockStock} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/assets/AAPL");
  });
});
