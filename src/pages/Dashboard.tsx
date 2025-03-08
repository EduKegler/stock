import { memo, useCallback, useEffect, useMemo, useState } from "react";
import PortfolioCard from "../components/PortfolioCard";
import { API_URL } from "../constants";
import MyStock, { MyAsset } from "../components/MyStock";

function Dashboard() {
  const [assets, setAssets] = useState<{ [key: string]: MyAsset }>({});

  const fetchAssets = useCallback(async () => {
    const response = await fetch(`${API_URL}/portfolio`);
    const data = await response.json();
    setAssets(data.assets);
  }, []);

  const { portfolioValue, allTimeProfit, bestPerformer } = useMemo(() => {
    const { portfolioValue, allTimeProfit, bestPerformer } = Object.values(
      assets
    ).reduce(
      (acc, asset) => {
        return {
          portfolioValue: acc.portfolioValue + asset.totalShares * asset.price,
          allTimeProfit:
            acc.allTimeProfit +
            asset.totalShares * (asset.price - asset.averagePrice),
          bestPerformer: Math.max(
            acc.bestPerformer,
            asset.totalShares * (asset.price - asset.averagePrice)
          ),
        };
      },
      { portfolioValue: 0, allTimeProfit: 0, bestPerformer: 0 }
    );
    return { portfolioValue, allTimeProfit, bestPerformer };
  }, [assets]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const myAssets = useMemo(() => {
    return Object.values(assets).filter((asset) => asset.totalShares > 0);
  }, [assets]);

  return (
    <div className="flex min-h-full flex-col gap-4 p-6">
      <PortfolioCard
        portfolioValue={portfolioValue}
        allTimeProfit={allTimeProfit}
        bestPerformer={bestPerformer}
      />
      <div className="bg-layer-0 rounded-lg p-4 shadow-xs">
        <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myAssets.map((asset) => {
            return <MyStock key={asset.name} stock={asset} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
