import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Market from "./Market";
import { MemoryRouter } from "react-router";

const mockAssets = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 151.2,
    history: [145.2, 146.3, 148.4, 149.5, 150.5],
  },
  {
    id: "2",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2800.5,
    history: [2750.1, 2780.3, 2790.4, 2795.5, 2800.5],
  },
];

vi.mock("../hooks/useAssets", async () => {
  const actual = await vi.importActual("../hooks/useAssets");
  return {
    ...actual,
    useAssets: () => ({
      assets: mockAssets,
    }),
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("Market", () => {
  it("renders all assets correctly", () => {
    render(
      <MemoryRouter>
        <Market />
      </MemoryRouter>
    );

    mockAssets.forEach((asset) => {
      expect(screen.getByText(asset.symbol)).toBeInTheDocument();
      expect(screen.getByText(asset.name)).toBeInTheDocument();
      expect(
        screen.getByText(`$${asset.price.toFixed(2)}`)
      ).toBeInTheDocument();
    });
  });
});
