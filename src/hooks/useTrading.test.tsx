import { renderHook, act, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { useTrading } from "./useTrading";
import { AssetsContext, AssetsContextType } from "../contexts/AssetsContext";

const mockTrades = {
  trades: [
    {
      timestamp: "2024-01-01T12:00:00Z",
      type: "Buy",
      quantity: 5,
      strikePrice: 180,
    },
  ],
  portfolio: {
    totalShares: 5,
    currentValue: 900,
    averagePrice: 180,
    price: 180,
  },
};

vi.mock("../constants", () => ({
  API_URL: "http://mock-api",
}));

globalThis.fetch = vi.fn((url) => {
  if (url.includes("/trades/")) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockTrades),
    });
  }
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  });
}) as unknown as typeof globalThis.fetch;

describe("useTrading", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  const mockAsset = {
    id: "1",
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 180,
    history: [175, 180, 185],
  };

  const mockContext: AssetsContextType = {
    assets: [mockAsset],
    getAsset: (symbol: string) =>
      mockContext.assets.find((a) => a.symbol === symbol),
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AssetsContext.Provider value={mockContext}>
      {children}
    </AssetsContext.Provider>
  );

  it("should handle buy trade", async () => {
    const { result } = renderHook(
      () => useTrading(mockAsset.symbol, mockAsset.price),
      { wrapper }
    );

    await act(async () => {
      const success = await result.current.handleBuy(2);
      expect(success).toBe(true);
    });

    expect(result.current.trades).toHaveLength(1);
    expect(result.current.portfolio).toStrictEqual({
      averagePrice: 180,
      currentValue: 900,
      price: 180,
      totalShares: 5,
    });

    expect(window.alert).toHaveBeenCalledWith("Purchase successful");
  });

  it("should handle sell trade", async () => {
    const { result } = renderHook(
      () => useTrading(mockAsset.symbol, mockAsset.price),
      { wrapper }
    );

    await act(async () => {
      const success = await result.current.handleSell(1);
      expect(success).toBe(true);
    });

    expect(result.current.trades).toHaveLength(1);
    expect(result.current.portfolio).toStrictEqual({
      averagePrice: 180,
      currentValue: 900,
      price: 180,
      totalShares: 5,
    });
    expect(window.alert).toHaveBeenCalledWith("Sale successful");
  });

  it("should fetch trades", async () => {
    const { result } = renderHook(
      () => useTrading(mockAsset.symbol, mockAsset.price),
      { wrapper }
    );

    await act(async () => {
      await result.current.fetchTrades();
    });

    expect(Array.isArray(result.current.trades)).toBe(true);
  });
});
