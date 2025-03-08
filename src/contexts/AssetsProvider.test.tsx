import { render, screen, act, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import AssetsProvider from "./AssetsProvider";
import { useContext } from "react";
import { AssetsContext, AssetsContextType } from "./AssetsContext";

const mockAssetData = [
  { symbol: "AAPL", price: "180" },
  { symbol: "GOOGL", price: "140" },
];

const TestComponent = () => {
  const { assets, getAsset } = useContext(AssetsContext) as AssetsContextType;
  return (
    <div>
      <div data-testid="assets-length">{assets.length}</div>
      <div data-testid="aapl-asset">{getAsset("AAPL")?.price}</div>
    </div>
  );
};

describe("AssetsProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    globalThis.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAssetData),
      })
    ) as unknown as typeof globalThis.fetch;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
    vi.useRealTimers();
    cleanup();
  });

  it("should fetch and provide assets data", async () => {
    const { unmount } = render(
      <AssetsProvider>
        <TestComponent />
      </AssetsProvider>
    );

    await act(async () => {
      await Promise.resolve();
      vi.advanceTimersByTime(0);
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("assets-length").textContent).toBe("2");
    expect(screen.getByTestId("aapl-asset").textContent).toBe("180");
    unmount();
  });

  it("should poll for assets data", async () => {
    const { unmount } = render(
      <AssetsProvider>
        <TestComponent />
      </AssetsProvider>
    );

    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(3);
    unmount();
  });

  it("should handle fetch errors gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Fetch failed"));

    const { unmount } = render(
      <AssetsProvider>
        <TestComponent />
      </AssetsProvider>
    );

    await act(async () => {
      await Promise.resolve();
      vi.advanceTimersByTime(0);
    });

    expect(consoleSpy).toHaveBeenCalled();
    expect(screen.getByTestId("assets-length").textContent).toBe("0");

    consoleSpy.mockRestore();
    unmount();
  });
});
