import { useParams } from "react-router";
import { useMemo, useState, useCallback, useEffect } from "react";
import { memo } from "react";
import { useAssets } from "../hooks/useAssets";
import { useTrading } from "../hooks/useTrading";
import Trades from "../components/Trades";
import Button from "../components/Button";
import AssetGraph from "../components/AssetGraph";

function Asset() {
  const { symbol } = useParams();
  const { getAsset } = useAssets();
  const assetData = getAsset(symbol || "");
  const [quantity, setQuantity] = useState<number>(1);

  const { trades, portfolio, handleBuy, handleSell, fetchTrades } = useTrading(
    symbol || "",
    assetData?.price
  );

  const chartData = useMemo(() => {
    if (!assetData?.history) return [];
    const dates = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return assetData.history.map((price, i) => ({
      date: dates[i],
      price,
    }));
  }, [assetData?.history]);

  useEffect(() => {
    fetchTrades();
  }, [fetchTrades]);

  const handleBuyClick = useCallback(() => {
    handleBuy(quantity);
  }, [handleBuy, quantity]);

  const handleSellClick = useCallback(() => {
    handleSell(quantity);
  }, [handleSell, quantity]);

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      setQuantity(value);
    },
    []
  );

  const percentageChange = useMemo(() => {
    if (!assetData) return 0;
    const lastPrice = assetData?.history[assetData?.history.length - 1];
    return ((assetData?.price - lastPrice) / lastPrice) * 100;
  }, [assetData]);

  const totalValue = useMemo(() => {
    if (!assetData) return "0.00";
    return quantity ? (quantity * assetData?.price).toFixed(2) : "0.00";
  }, [assetData, quantity]);

  if (!assetData || !portfolio) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-layer-0 rounded-lg p-6 shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{assetData?.symbol}</h1>
              <p className="text-foreground-muted">{assetData?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                ${assetData?.price.toFixed(2)}
              </p>
              <p
                className={`text-sm ${
                  percentageChange > 0 ? "text-primary" : "text-red-500"
                }`}
              >
                {percentageChange > 0 ? "↑" : "↓"} {percentageChange.toFixed(2)}
                %
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-layer-0 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">History</h2>
            <AssetGraph chartData={chartData} />
          </div>

          <div className="bg-layer-0 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Trade</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full rounded-md border p-2"
                  placeholder="Enter quantity"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleBuyClick}
                  disabled={quantity <= 0}
                >
                  Buy
                </Button>
                <Button
                  variant="danger"
                  onClick={handleSellClick}
                  disabled={quantity > portfolio.totalShares}
                >
                  Sell
                </Button>
              </div>

              <div className="mt-4 p-4 bg-layer-1 rounded-md">
                <p className="text-sm">Total Value: ${totalValue}</p>
                <div className="mt-2 pt-2 border-t border-layer-2">
                  <h3 className="text-sm font-medium mb-1">Your Holdings</h3>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Shares Owned: {portfolio.totalShares}
                    </p>
                    <p className="text-sm">
                      Total Value: $
                      {(
                        portfolio.totalShares * (assetData?.price ?? 0)
                      ).toFixed(2)}
                    </p>
                    <p className="text-sm">
                      Average Price: ${portfolio.averagePrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-layer-0 rounded-lg p-6 shadow-sm mt-4">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <Trades trades={trades} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Asset);
