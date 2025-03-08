import { memo, useMemo } from "react";
import { Trade } from "../hooks/useTrading";
import TradeRow from "./TradeRow";

type TradesProps = {
  trades: Trade[];
};

function Trades({ trades }: TradesProps) {
  const rows = useMemo(() => {
    return trades.map((trade) => (
      <TradeRow key={trade.timestamp} trade={trade} />
    ));
  }, [trades]);

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-layer-2">
          <th className="text-left py-2 px-4">Date</th>
          <th className="text-left py-2 px-4">Type</th>
          <th className="text-left py-2 px-4">Quantity</th>
          <th className="text-left py-2 px-4">Price</th>
          <th className="text-left py-2 px-4">Total</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default memo(Trades);
