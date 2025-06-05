import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TradePageContent from './TradePageContent';

describe('TradePageContent', () => {
  const mockAssets = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: 'https://example.com/bitcoin.png',
      current_price: 50000,
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image: 'https://example.com/ethereum.png',
      current_price: 4000,
    },
  ];

  it('renders Trade Crypto heading', () => {
    render(<TradePageContent pages={mockAssets} />);
    expect(screen.getByText(/trade crypto/i)).toBeInTheDocument();
  });

  it('renders asset select options', () => {
    render(<TradePageContent pages={mockAssets} />);
    expect(screen.getByRole('option', { name: /bitcoin/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /ethereum/i })).toBeInTheDocument();
  });

  it('renders crypto input and swap button', () => {
    render(<TradePageContent pages={mockAssets} />);
    expect(screen.getByPlaceholderText(/crypto amount/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /swap/i })).toBeInTheDocument();
  });
});
