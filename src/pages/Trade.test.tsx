import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Trade from './Trade';

// Mocks
vi.mock('@/components/TradePageContent', () => ({
  default: () => <div>Trade Page</div>,
}));
vi.mock('@/components/ui/Loader', () => ({
  Loader: () => <div>Loading...</div>,
}));
vi.mock('@/hooks/useMarketAssets', () => ({
  useMarketAssets: () => ({
    isLoading: false,
    data: { pages: [[{ id: 'btc', name: 'Bitcoin' }]] },
  }),
}));
vi.mock('@/store/authStore', () => ({
  useAuth: {
    getState: () => ({
      isSessionExpired: () => false,
      logout: vi.fn(),
    }),
  },
}));

describe('Trade', () => {
  it('shows trade page after loading', () => {
    render(<Trade />);
    expect(screen.getByText('Trade Page')).toBeInTheDocument();
  });
});
