import { memo, useMemo } from "react";
import { AssetData } from "../contexts/AssetsContext";

export type StockProps = {
  stock: AssetData;
};

function Stock({ stock }: StockProps) {
  const percentageChange = useMemo(() => {
    const lastPrice = stock.history[stock.history.length - 1];
    return ((stock.price - lastPrice) / lastPrice) * 100;
  }, [stock.price, stock.history]);

  const isPositive = useMemo(() => percentageChange > 0, [percentageChange]);

  return (
    <a
      className="bg-layer-0 rounded-lg p-4 shadow-sm"
      href={`/assets/${stock.symbol}`}
    >
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-foreground-muted">{stock.name}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold">${stock.price.toFixed(2)}</span>
        <span
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : "-"}
          {Math.abs(percentageChange).toFixed(2)}%
        </span>
      </div>
    </a>
  );
}

export default memo(Stock);
