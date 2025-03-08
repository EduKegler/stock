import { test, expect } from "@playwright/test";

test.describe("Asset Trading Flow", () => {
  test("should update asset prices every 5 seconds", async ({ page }) => {
    await page.goto("http://localhost:5173/assets");

    const firstAssetPrice = await page
      .locator(
        '[data-testid="asset-card"]:first-child [data-testid="stock-price"]'
      )
      .textContent();

    await page.waitForTimeout(5000);

    const updatedPrice = await page
      .locator(
        '[data-testid="asset-card"]:first-child [data-testid="stock-price"]'
      )
      .textContent();

    expect(firstAssetPrice).not.toEqual(updatedPrice);

    const secondPrice = updatedPrice;
    await page.waitForTimeout(5000);

    const thirdPrice = await page
      .locator(
        '[data-testid="asset-card"]:first-child [data-testid="stock-price"]'
      )
      .textContent();
    expect(secondPrice).not.toEqual(thirdPrice);
  });
});
