import { useState, useEffect, useMemo } from "react";
import { useMarketAssets } from "../hooks/useMarketAssets";
import { useAuth } from "../store/authStore";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Loader } from "../components/ui/Loader";

enum SwapMode {
  CryptoToFiat = "cryptoToFiat",
  FiatToCrypto = "fiatToCrypto",
}

export default function Trade() {
  const { user } = useAuth();
  const { data, isLoading } = useMarketAssets({ getAll: true });
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
  useEffect(() => {
    const { isSessionExpired, logout } = useAuth.getState();
    if (isSessionExpired()) {
      logout();
      alert("Please log in again.");
    }
  }, []);

  // Update inputs based on swap mode and price
  useEffect(() => {
    if (!price) return;

    if (swapMode === SwapMode.CryptoToFiat) {
      const c = parseFloat(cryptoInput);
      setFiatInput(!isNaN(c) ? (c * price).toFixed(2) : "");
    } else {
      const f = parseFloat(fiatInput);
      setCryptoInput(!isNaN(f) ? (f / price).toFixed(6) : "");
    }
  }, [cryptoInput, fiatInput, price, swapMode]);

  if (!user) {
    return (
      <p className="text-red-600 text-center mt-10">
        Please log in to access the Trade page.
      </p>
    );
  }

  const AssetSelect = (
    <Select
      value={selectedId}
      onChange={(e) => setSelectedId(e.target.value)}
      className="min-w-[120px]"
    >
      {assets.map((a) => (
        <option key={a.id} value={a.id}>
          {a.name}
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
            className="flex-1"
          />
          {AssetSelect}
        </div>
      ) : (
        <Input
          type="number"
          value={fiatInput}
          onChange={(e) => setFiatInput(e.target.value)}
          placeholder="USD Amount"
          className="w-full"
        />
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
        <Input
          type="number"
          value={fiatInput}
          readOnly
          placeholder="USD Amount"
          className="w-full bg-gray-100 dark:bg-gray-700"
        />
      )}
    </Card>
  );

  return (
    <div className="max-w-xl mx-auto px-4 mt-10">
      {isLoading ? <Loader /> : TradeCard}
    </div>
  );
}
