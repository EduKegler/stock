import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Asset from "./Asset";
import { MemoryRouter, Routes, Route } from "react-router";
import { afterEach } from "vitest";
import { useTrading } from "../hooks/useTrading";

const mockAsset = {
  id: "1",
  symbol: "AAPL",
  name: "Apple Inc.",
  price: 151.2,
  history: [145.2, 146.3, 148.4, 149.5, 150.5],
};

const mockTrades = [
  {
    id: "1",
    symbol: "AAPL",
    quantity: 10,
    strikePrice: 150,
    type: "BUY",
    timestamp: "2023-01-01",
  },
];

const mockPortfolio = {
  totalShares: 10,
  currentValue: 1500,
  averagePrice: 150,
  price: 151.2,
};

vi.mock("../hooks/useAssets", () => ({
  useAssets: () => ({
    getAsset: () => mockAsset,
  }),
}));

vi.mock("../hooks/useTrading", () => ({
  useTrading: vi.fn(() => ({
    trades: mockTrades,
    portfolio: mockPortfolio,
    handleBuy: vi.fn(),
    handleSell: vi.fn(),
    fetchTrades: vi.fn(),
  })),
}));

describe("Asset", () => {
  afterEach(() => {
    cleanup();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={["/assets/AAPL"]}>
        <Routes>
          <Route path="/assets/:symbol" element={<Asset />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders asset price chart", () => {
    renderComponent();
    expect(screen.getByRole("figure")).toBeInTheDocument();
  });

  it("renders trading controls", () => {
    renderComponent();
    expect(screen.getByText("Buy")).toBeInTheDocument();
    expect(screen.getByText("Sell")).toBeInTheDocument();
  });

  it("renders trade history", () => {
    renderComponent();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
  });

  it("allows quantity input", () => {
    renderComponent();
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "5" } });
    expect(input).toHaveValue(5);
  });

  it("handles buy action and updates trade list", async () => {
    const mockHandleBuy = vi.fn();
    const mockUseTrading = vi.fn(() => ({
      trades: mockTrades,
      portfolio: mockPortfolio,
      handleBuy: mockHandleBuy,
      handleSell: vi.fn(),
      fetchTrades: vi.fn(),
    }));

    vi.mocked(useTrading).mockImplementation(
      mockUseTrading as unknown as typeof useTrading
    );

    renderComponent();

    const input = screen.getByRole("spinbutton");
    const buyButton = screen.getByText("Buy");

    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(buyButton);

    expect(mockHandleBuy).toHaveBeenCalledWith(5);
  });

  it("handles sell action and updates trade list", async () => {
    const mockHandleSell = vi.fn();
    const mockUseTrading = vi.fn(() => ({
      trades: mockTrades,
      portfolio: mockPortfolio,
      handleBuy: vi.fn(),
      handleSell: mockHandleSell,
      fetchTrades: vi.fn(),
    })) as unknown as typeof useTrading;

    vi.mocked(useTrading).mockImplementation(mockUseTrading);

    renderComponent();

    const input = screen.getByRole("spinbutton");
    const sellButton = screen.getByText("Sell");

    fireEvent.change(input, { target: { value: "5" } });
    fireEvent.click(sellButton);

    expect(mockHandleSell).toHaveBeenCalledWith(5);
  });
});
