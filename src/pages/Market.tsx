import Stock from "../components/Stock";
import { useAssets } from "../hooks/useAssets";

function Market() {
  const { assets } = useAssets();

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <Stock key={asset.symbol} stock={asset} />
      ))}
    </div>
  );
}

export default Market;
