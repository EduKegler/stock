import { test, expect } from "@playwright/test";

const quantity = Math.floor(Math.random() * 10) + 1;

test.describe("Asset Trading Flow", () => {
  test("should be able to buy an asset and see it in trade list", async ({
    page,
  }) => {
    // OPEN ASSET

    await page.goto("http://localhost:5173/assets");

    await page.click('[data-testid="asset-card"]:last-child');

    // BUY
    await page.fill('input[type="number"]', quantity.toString());

    await page.click('[data-testid="buy-button"]');

    const boughtAsset = page.locator(
      '[data-testid="trade-list-item"]:last-child'
    );
    await expect(boughtAsset).toBeVisible();

    let typeCell = boughtAsset.locator("td:nth-child(2)");
    await expect(typeCell).toHaveText("BUY");

    let quantityCell = boughtAsset.locator("td:nth-child(3)");
    await expect(quantityCell).toHaveText(quantity.toString());

    await page.waitForTimeout(3000);

    // SELL
    await page.fill('input[type="number"]', (quantity + 1).toString());
    const sellButton = page.locator('[data-testid="sell-button"]');

    await expect(sellButton).toHaveAttribute("disabled");

    await page.fill('input[type="number"]', quantity.toString());
    await sellButton.click();

    const soldAsset = page.locator(
      '[data-testid="trade-list-item"]:last-child'
    );
    await expect(soldAsset).toBeVisible();

    typeCell = soldAsset.locator("td:nth-child(2)");
    await expect(typeCell).toHaveText("SELL");

    quantityCell = soldAsset.locator("td:nth-child(3)");
    await expect(quantityCell).toHaveText(quantity.toString());
  });
});
