import { useContext } from "react";
import { AssetsContext } from "../contexts/AssetsContext";

export const useAssets = () => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetsProvider");
  }
  return context;
};
