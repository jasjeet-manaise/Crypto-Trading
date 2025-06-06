import { useEffect } from 'react';
import TradePageContent from '@/components/TradePageContent';
import { Loader } from '@/components/ui/Loader';
import { useMarketAssets } from '@/hooks/useMarketAssets';
import { useAuth } from '@/store/authStore';

export default function Trade() {
  const { data, isLoading } = useMarketAssets({ getAll: true });

  useEffect(() => {
    const { isSessionExpired, logout } = useAuth.getState();
    if (isSessionExpired()) {
      logout();
      alert('Please log in again.');
    }
  }, []);
  return isLoading ? <Loader /> : <TradePageContent pages={data?.pages?.flat() ?? []} />;
}
