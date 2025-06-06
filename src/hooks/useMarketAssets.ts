import axios from 'axios';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export type MarketAsset = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
};

export function useMarketAssets(options?: { getAll?: boolean }) {
  if (options?.getAll) {
    const query = useQuery({
      queryKey: ['market-assets', 'all'],
      queryFn: async () => {
        const response = await axios.get<MarketAsset[]>(API_URL, {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
          },
        });

        return { pages: [response.data] };
      },
    });

    return {
      data: query.data,
      isLoading: query.isLoading,
      isFetchingNextPage: false,
      hasNextPage: false,
      fetchNextPage: () => {},
      isError: query.isError,
      error: query.error,
    };
  }

  const query = useInfiniteQuery({
    queryKey: ['market-assets'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<MarketAsset[]>(API_URL, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: pageParam,
        },
      });

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isError: query.isError,
    error: query.error,
  };
}
