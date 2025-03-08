import { createContext } from "react";

export type AssetData = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  history: number[];
};

export type AssetsContextType = {
  assets: AssetData[];
  getAsset: (symbol: string) => AssetData | undefined;
};

export const AssetsContext = createContext<AssetsContextType | null>(null);
