import { useState, useEffect, useMemo } from 'react';
import { SwapMode } from '@/enums';
import { MarketAsset } from '@/hooks/useMarketAssets';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

export default function TradePageContent(data: { pages: MarketAsset[] }) {
  const assets = data?.pages.flat() ?? [];
  const [selectedId, setSelectedId] = useState('bitcoin');
  const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.CryptoToFiat);
  const [cryptoInput, setCryptoInput] = useState('');
  const [fiatInput, setFiatInput] = useState('');

  const selectedAsset = useMemo(() => assets.find(a => a.id === selectedId), [selectedId, assets]);
  const price = selectedAsset?.current_price ?? 0;

  // Update inputs based on swap mode and price
  useEffect(() => {
    if (!price) return;

    if (swapMode === SwapMode.CryptoToFiat) {
      const crypto = parseFloat(cryptoInput);
      setFiatInput(!isNaN(crypto) ? (crypto * price).toFixed(2) : '');
    } else {
      const fiat = parseFloat(fiatInput);
      setCryptoInput(!isNaN(fiat) ? (fiat / price).toFixed(6) : '');
    }
  }, [cryptoInput, fiatInput, price, swapMode]);

  const AssetSelect = (
    <Select
      value={selectedId}
      onChange={e => setSelectedId(e.target.value)}
      className="min-w-[120px]">
      {assets.map(asset => (
        <option key={asset.id} value={asset.id}>
          {asset.name}
        </option>
      ))}
    </Select>
  );

  const TradeCard = (
    <Card className="space-y-6 border border-gray-200 p-6 shadow-md dark:border-gray-700">
      <h1 className="text-center text-2xl font-semibold text-gray-800 dark:text-white">
        Trade Crypto
      </h1>

      {swapMode === SwapMode.CryptoToFiat ? (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={cryptoInput}
            onChange={e => setCryptoInput(e.target.value)}
            placeholder="Crypto Amount"
            className="flex-1"
          />
          {AssetSelect}
        </div>
      ) : (
        <div className="relative w-full">
          <Input
            type="number"
            value={fiatInput}
            onChange={e => setFiatInput(e.target.value)}
            placeholder="USD Amount"
            className="w-full pr-12"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
            USD
          </span>
        </div>
      )}

      <div className="text-center">
        <Button
          variant="ghost"
          className="text-blue-600 hover:text-blue-800"
          onClick={() =>
            setSwapMode(mode =>
              mode === SwapMode.CryptoToFiat ? SwapMode.FiatToCrypto : SwapMode.CryptoToFiat
            )
          }>
          ↕ Swap
        </Button>
      </div>

      {swapMode === SwapMode.FiatToCrypto ? (
        <div className="flex items-center gap-2">
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
            className="w-full bg-gray-100 pr-12 dark:bg-gray-700"
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 transform text-sm text-gray-500">
            USD
          </span>
        </div>
      )}
    </Card>
  );

  return <div className="mx-auto mt-10 max-w-xl px-4">{TradeCard}</div>;
}
