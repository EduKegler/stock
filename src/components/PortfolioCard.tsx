import { memo } from "react";

type PortfolioCardProps = {
  portfolioValue: number;
  allTimeProfit: number;
  bestPerformer: number;
};

function PortfolioCard({
  portfolioValue,
  allTimeProfit,
  bestPerformer,
}: PortfolioCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="bg-layer-0 rounded-lg p-4 shadow-xs">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-foreground text-lg">Portfolio value</h2>
        <button className="text-foreground-muted">
          <span className="sr-only">Menu</span>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <span className="text-4xl font-bold">
          {formatCurrency(portfolioValue)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-foreground-muted text-sm">All time profit</p>
            <p className="font-semibold">{formatCurrency(allTimeProfit)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <p className="text-foreground-muted text-sm">Best performer</p>
            <p className="font-semibold text-green-600">
              +{formatCurrency(bestPerformer)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PortfolioCard);
