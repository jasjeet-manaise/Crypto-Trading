import { useMemo, useState } from 'react';
import CryptoTable from '@/components/CryptoTable';
import { SortDirection, SortField } from '../enums';
import { useMarketAssets } from '../hooks/useMarketAssets';

export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMarketAssets();

  const [sortField, setSortField] = useState<SortField>(SortField.Name);
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Asc);

  const assets = data?.pages.flat() ?? [];

  const sortedAssets = useMemo(() => {
    const sorted = [...assets];
    sorted.sort((a, b) => {
      const aVal =
        sortField === SortField.Price ? Number(a[sortField]) : String(a[sortField]).toLowerCase();
      const bVal =
        sortField === SortField.Price ? Number(b[sortField]) : String(b[sortField]).toLowerCase();
      if (aVal < bVal) return sortDirection === SortDirection.Asc ? -1 : 1;
      if (aVal > bVal) return sortDirection === SortDirection.Asc ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [assets, sortField, sortDirection]);

  return (
    <CryptoTable
      assets={sortedAssets}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      sortField={sortField}
      sortDirection={sortDirection}
      setSortField={setSortField}
      setSortDirection={setSortDirection}
    />
  );
}
