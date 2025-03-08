import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useAssets } from "./useAssets";
import { AssetsContext, AssetsContextType } from "../contexts/AssetsContext";

describe("useAssets", () => {
  it("should return context when used within provider", () => {
    const mockContext: AssetsContextType = {
      assets: [
        {
          id: "1",
          name: "Apple Inc.",
          symbol: "AAPL",
          price: 180,
          history: [175, 178, 180],
        },
      ],
      getAsset: (symbol: string) =>
        mockContext.assets.find((a) => a.symbol === symbol),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AssetsContext.Provider value={mockContext}>
        {children}
      </AssetsContext.Provider>
    );

    const { result } = renderHook(() => useAssets(), { wrapper });

    expect(result.current).toBe(mockContext);
  });

  it("should throw error when used outside provider", () => {
    expect(() => renderHook(() => useAssets())).toThrow(
      "useAssets must be used within an AssetsProvider"
    );
  });
});
