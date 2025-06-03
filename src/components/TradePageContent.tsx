import { useState, useEffect, useMemo } from "react";
import { Select } from "./ui/Select";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { MarketAsset } from "../hooks/useMarketAssets";

enum SwapMode {
  CryptoToFiat = "cryptoToFiat",
  FiatToCrypto = "fiatToCrypto",
}

export default function TradePageContent(data:{
  pages: MarketAsset[];
}) {
  const assets = data?.pages.flat() ?? [];
  const [selectedId, setSelectedId] = useState("bitcoin");
  const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.CryptoToFiat);
  const [cryptoInput, setCryptoInput] = useState("");
  const [fiatInput, setFiatInput] = useState("");

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedId),
    [selectedId, assets]
  );
  const price = selectedAsset?.current_price ?? 0;

  // Check for session expiration and logout if needed

  // Update inputs based on swap mode and price
  useEffect(() => {
    if (!price) return;

    if (swapMode === SwapMode.CryptoToFiat) {
      const crypto = parseFloat(cryptoInput);
      setFiatInput(!isNaN(crypto) ? (crypto * price).toFixed(2) : "");
    } else {
      const fiat = parseFloat(fiatInput);
      setCryptoInput(!isNaN(fiat) ? (fiat / price).toFixed(6) : "");
    }
  }, [cryptoInput, fiatInput, price, swapMode]);

  const AssetSelect = (
    <Select
      value={selectedId}
      onChange={(e) => setSelectedId(e.target.value)}
      className="min-w-[120px]"
    >
      {assets.map((asset) => (
        <option key={asset.id} value={asset.id}>
          {asset.name}
        </option>
      ))}
    </Select>
  );

  const TradeCard = (
    <Card className="p-6 space-y-6 shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
        Trade Crypto
      </h1>

      {swapMode === SwapMode.CryptoToFiat ? (
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            value={cryptoInput}
            onChange={(e) => setCryptoInput(e.target.value)}
            placeholder="Crypto Amount"
            className="flex-1 "
          />
          {AssetSelect}
        </div>
      ) : (
        <div className="relative w-full">
          <Input
            type="number"
            value={fiatInput}
            onChange={(e) => setFiatInput(e.target.value)}
            placeholder="USD Amount"
            className="w-full pr-12"
          />
          <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            USD
          </span>
        </div>
      )}

      <div className="text-center">
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-800"
          onClick={() =>
            setSwapMode((mode) =>
              mode === SwapMode.CryptoToFiat
                ? SwapMode.FiatToCrypto
                : SwapMode.CryptoToFiat
            )
          }
        >
          ↕ Swap
        </Button>
      </div>

      {swapMode === SwapMode.FiatToCrypto ? (
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            value={cryptoInput}
            readOnly
            placeholder="Crypto Amount"
            className="flex-1 bg-gray-100 dark:bg-gray-700"
          />
          {AssetSelect}
        </div>
      ) : (
        <div className="relative w-full">
          <Input
            type="number"
            value={fiatInput}
            readOnly
            placeholder="USD Amount"
            className="w-full pr-12 bg-gray-100 dark:bg-gray-700"
          />
          <span className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            USD
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <div className="max-w-xl mx-auto px-4 mt-10">
      {TradeCard}
    </div>
  );
}
