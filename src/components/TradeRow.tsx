import { memo } from "react";
import { Trade } from "../hooks/useTrading";

type TradesProps = {
  trade: Trade;
};

function TradeRow({ trade }: TradesProps) {
  const total = trade.quantity * trade.strikePrice;

  return (
    <tr data-testid="trade-list-item" className="border-b border-layer-2">
      <td className="py-2 px-4">
        {new Date(trade.timestamp).toLocaleString()}
      </td>
      <td
        className={`py-2 px-4 ${
          trade.type === "Buy" ? "text-green-500" : "text-red-500"
        }`}
      >
        {trade.type}
      </td>
      <td className="py-2 px-4">{trade.quantity}</td>
      <td className="py-2 px-4">${trade.strikePrice.toFixed(2)}</td>
      <td className="py-2 px-4">${total.toFixed(2)}</td>
    </tr>
  );
}

export default memo(TradeRow);
