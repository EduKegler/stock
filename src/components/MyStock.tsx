import { memo, useMemo } from "react";

export type MyAsset = {
  name: string;
  symbol: string;
  totalShares: number;
  price: number;
  averagePrice: number;
};

export type MyStockProps = {
  stock: MyAsset;
};

function MyStock({ stock }: MyStockProps) {
  const profit = useMemo(() => {
    return stock.totalShares * (stock.price - stock.averagePrice);
  }, [stock]);

  return (
    <a
      key={stock.name}
      className="bg-layer-0 rounded-lg p-4 shadow-sm"
      href={`/assets/${stock.symbol}`}
    >
      <div className="flex items-center gap-3">
        <div>
          <h3 className="font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-foreground-muted">
            {stock.name} - {stock.totalShares} shares
          </p>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Current Price:</span>
          <span className="text-lg font-bold">${stock.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Avg Price:</span>
          <span className="font-medium">${stock.averagePrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Total Value:</span>
          <span className="font-medium">
            ${(stock.totalShares * stock.price).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Profit:</span>
          <span
            className={`font-medium ${
              profit >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profit >= 0 ? "+" : "-"}${Math.abs(profit).toFixed(2)}
          </span>
        </div>
      </div>
    </a>
  );
}

export default memo(MyStock);
