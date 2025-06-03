import { useMemo, useState, KeyboardEvent } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMarketAssets } from "../hooks";
import { Select, Button } from "./ui";

enum SortField {
  Name = "name",
  Price = "current_price",
}

enum SortDirection {
  Asc = "asc",
  Desc = "desc",
}

const SortArrow = ({
  active,
  direction,
}: {
  active: boolean;
  direction: SortDirection;
}) =>
  active ? (
    <span className="inline-block ml-1">{direction === "asc" ? "▲" : "▼"}</span>
  ) : null;

export default function CryptoTable() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMarketAssets();

  const assets = data?.pages.flat() ?? [];

  const [sortField, setSortField] = useState<SortField>(SortField.Name);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.Asc
  );

  const onSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
      );
    } else {
      setSortField(field);
      setSortDirection(SortDirection.Asc);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTableHeaderCellElement>,
    field: SortField
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort(field);
    }
  };

  const sorted = useMemo(() => {
    const sortedAssets = [...assets];
    sortedAssets.sort((a, b) => {
      const aVal =
        sortField === SortField.Price
          ? Number(a[sortField])
          : String(a[sortField]).toLowerCase();
      const bVal =
        sortField === SortField.Price
          ? Number(b[sortField])
          : String(b[sortField]).toLowerCase();

      if (aVal < bVal) return sortDirection === SortDirection.Asc ? -1 : 1;
      if (aVal > bVal) return sortDirection === SortDirection.Asc ? 1 : -1;
      return 0;
    });
    return sortedAssets;
  }, [assets, sortField, sortDirection]);

  return (
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <table className="w-full table-auto text-sm text-left text-gray-800 dark:text-gray-100">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <th
              className="px-6 py-4 font-semibold tracking-wide uppercase text-xs cursor-pointer select-none"
              onClick={() => onSort(SortField.Name)}
              role="button"
              aria-sort={
                sortField === SortField.Name
                  ? sortDirection === SortDirection.Asc
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, SortField.Name)}
            >
              Name
              <SortArrow
                active={sortField === SortField.Name}
                direction={sortDirection}
              />
            </th>
            <th
              className="px-6 py-4 font-semibold tracking-wide uppercase text-xs cursor-pointer select-none"
              onClick={() => onSort(SortField.Price)}
              role="button"
              aria-sort={
                sortField === SortField.Price
                  ? sortDirection === SortDirection.Asc
                    ? "ascending"
                    : "descending"
                  : "none"
              }
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, SortField.Price)}
            >
              Price (USD)
              <SortArrow
                active={sortField === SortField.Price}
                direction={sortDirection}
              />
            </th>
            <th className="px-6 py-4 font-semibold tracking-wide uppercase text-xs">
              Buy/Sell
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
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
            : sorted.map((asset) => (
                <tr
                  key={asset.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={asset.image}
                        alt={`${asset.name} logo`}
                        className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm"
                      />
                      <span className="font-medium text-sm">{asset.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                    ${asset.current_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Select
                      className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue=""
                      onChange={(e) =>
                        alert(
                          `You selected ${e.target.value} for ${asset.name}`
                        )
                      }
                    >
                      <option value="" disabled>
                        Buy/Sell
                      </option>
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </Select>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="flex justify-center py-6">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition"
          >
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}
