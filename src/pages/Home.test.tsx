import { describe, it, expect, vi } from 'vitest';
import * as marketAssetsHook from '@/hooks/useMarketAssets';
import { MarketAsset } from '@/hooks/useMarketAssets';
import { render, screen } from '@testing-library/react';
import Home from './Home';

vi.mock('@/components/CryptoTable', () => ({
  default: vi.fn(() => <div data-testid="crypto-table" />),
}));

describe('Home', () => {
  it('renders CryptoTable with sorted assets', () => {
    const mockAssets: MarketAsset[] = [
      { id: '1', name: 'Bitcoin', symbol: 'btc', current_price: 50000, image: 'btc.png' },
      { id: '2', name: 'Ethereum', symbol: 'eth', current_price: 4000, image: 'eth.png' },
    ];

    // Mock useMarketAssets
    vi.spyOn(marketAssetsHook, 'useMarketAssets').mockReturnValue({
      data: { pages: [mockAssets] },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<Home />);

    const table = screen.getByTestId('crypto-table');
    expect(table).toBeInTheDocument();
  });
});
