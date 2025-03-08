import { useState, useCallback, useEffect, useMemo } from "react";
import { memo } from "react";
import { API_URL } from "../constants";
import { AssetData, AssetsContext } from "./AssetsContext";

function AssetsProvider({ children }: { children: React.ReactNode }) {
  const [assets, setAssets] = useState<AssetData[]>([]);

  const fetchAsset = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/assets`);
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      console.error("Failed to fetch asset data:", error);
    }
  }, []);

  const getAsset = useCallback(
    (symbol: string) => {
      return assets.find((asset) => asset.symbol === symbol);
    },
    [assets]
  );

  const startPolling = useCallback(() => {
    const interval = setInterval(() => {
      fetchAsset();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchAsset]);

  useEffect(() => {
    const cleanup = startPolling();
    return () => cleanup();
  }, [startPolling]);

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  const value = useMemo(
    () => ({
      assets,
      getAsset,
    }),
    [assets, getAsset]
  );

  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
}

export default memo(AssetsProvider);
