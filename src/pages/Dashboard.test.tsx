import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        assets: mockAssets,
      }),
  })
) as unknown as {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
};

const mockAssets = {
  AAPL: {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 150.5,
    totalShares: 10,
    averagePrice: 145.0,
  },
  GOOGL: {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    price: 2800.5,
    totalShares: 5,
    averagePrice: 2750.0,
  },
};

vi.mock("../hooks/useAssets", async () => {
  const actual = await vi.importActual("../hooks/useAssets");
  return {
    ...actual,
    useAssets: () => ({
      assets: mockAssets,
    }),
  };
});

vi.mock("../constants", () => ({
  API_URL: "http://mock-api",
}));

describe("Dashboard", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders portfolio summary correctly", async () => {
    render(<Dashboard />);

    expect(await screen.findByText("$15,507.50")).toBeInTheDocument();
    expect(await screen.findByText("$307.50")).toBeInTheDocument();
  });

  it("renders asset cards for owned assets", async () => {
    render(<Dashboard />);

    expect(await screen.findByText("AAPL")).toBeInTheDocument();
    expect(await screen.findByText("GOOGL")).toBeInTheDocument();
  });
});
