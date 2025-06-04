import { KeyboardEvent } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SortDirection, SortField } from '@/enums';
import { Button } from './ui/Button';
import { Select } from './ui/Select';

const SortArrow = ({ active, direction }: { active: boolean; direction: SortDirection }) =>
  active ? <span className="ml-1 inline-block">{direction === 'asc' ? '▲' : '▼'}</span> : null;

type Props = {
  assets: any[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  sortField: SortField;
  sortDirection: SortDirection;
  setSortField: (field: SortField) => void;
  setSortDirection: (dir: SortDirection) => void;
};

export default function CryptoTable({
  assets,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  sortField,
  sortDirection,
  setSortField,
  setSortDirection,
}: Props) {
  const onSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(
        sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
      );
    } else {
      setSortField(field);
      setSortDirection(SortDirection.Asc);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTableHeaderCellElement>, field: SortField) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSort(field);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900">
      <table className="w-full table-auto text-left text-sm text-gray-800 dark:text-gray-100">
        <thead>
          <tr className="sticky top-[68px] border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <th
              className="cursor-pointer select-none px-6 py-4 text-xs font-semibold uppercase tracking-wide"
              onClick={() => onSort(SortField.Name)}
              role="button"
              aria-sort={
                sortField === SortField.Name
                  ? sortDirection === SortDirection.Asc
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, SortField.Name)}>
              Name
              <SortArrow active={sortField === SortField.Name} direction={sortDirection} />
            </th>
            <th
              className="cursor-pointer select-none px-6 py-4 text-xs font-semibold uppercase tracking-wide"
              onClick={() => onSort(SortField.Price)}
              role="button"
              aria-sort={
                sortField === SortField.Price
                  ? sortDirection === SortDirection.Asc
                    ? 'ascending'
                    : 'descending'
                  : 'none'
              }
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, SortField.Price)}>
              Price (USD)
              <SortArrow active={sortField === SortField.Price} direction={sortDirection} />
            </th>
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide">Buy/Sell</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton circle width={28} height={28} />
                    <Skeleton width={100} height={18} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Skeleton width={60} height={18} />
                </td>
                <td className="px-6 py-4">
                  <Skeleton width={80} height={18} />
                </td>
              </tr>
            ))
          ) : assets.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                No data available.
              </td>
            </tr>
          ) : (
            assets.map(asset => (
              <tr
                key={asset.id}
                className="group border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={asset.image}
                      alt={`${asset.name} logo`}
                      className="h-7 w-7 rounded-full border border-gray-300 shadow-sm dark:border-gray-700"
                    />
                    <span className="text-sm font-medium">{asset.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  ${asset.current_price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <Select
                    defaultValue=""
                    onChange={e => alert(`You selected ${e.target.value} for ${asset.name}`)}>
                    <option value="" disabled>
                      Buy/Sell
                    </option>
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </Select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="flex justify-center py-6">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition hover:bg-blue-700">
            {isFetchingNextPage ? 'Loading...' : 'Show More'}
          </Button>
        </div>
      )}
    </div>
  );
}
