import { useCallback, useState } from "react";
import { API_URL } from "../constants";

export type Trade = {
  timestamp: string;
  type: "Buy" | "Sell";
  quantity: number;
  strikePrice: number;
};

type PortfolioData = {
  totalShares: number;
  currentValue: number;
  averagePrice: number;
  price: number;
};

export const useTrading = (symbol: string, price: number | undefined) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalShares: 0,
    currentValue: 0,
    averagePrice: 0,
    price: 0,
  });

  const fetchTrades = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/trades/${symbol}`);
      if (response.ok) {
        const data = await response.json();
        setTrades(data.trades);
        setPortfolio(data.portfolio);
      }
    } catch (error) {
      console.error("Failed to fetch trades:", error);
    }
  }, [symbol]);

  const handleBuy = useCallback(
    async (quantity: number) => {
      if (quantity > 0) {
        const response = await fetch(`${API_URL}/buy`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol,
            quantity,
            strikePrice: price,
          }),
        });

        if (response.ok) {
          alert("Purchase successful");
          fetchTrades();
          return true;
        } else {
          alert("Purchase failed");
          return false;
        }
      }
      return false;
    },
    [symbol, price, fetchTrades]
  );

  const handleSell = useCallback(
    async (quantity: number) => {
      if (quantity > 0) {
        const response = await fetch(`${API_URL}/sell`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symbol,
            quantity,
            strikePrice: price,
          }),
        });

        if (response.ok) {
          alert("Sale successful");
          fetchTrades();
          return true;
        } else {
          alert("Sale failed");
          return false;
        }
      }
      return false;
    },
    [symbol, price, fetchTrades]
  );

  return {
    trades,
    portfolio,
    handleBuy,
    handleSell,
    fetchTrades,
  };
};
