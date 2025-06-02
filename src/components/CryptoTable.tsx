import { useMemo, useState, KeyboardEvent } from "react";
import { useMarketAssets } from "../hooks/useMarketAssets";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";

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
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="p-2 text-left cursor-pointer select-none"
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
              Name{" "}
              <SortArrow
                active={sortField === SortField.Name}
                direction={sortDirection}
              />
            </th>
            <th
              className="p-2 text-left cursor-pointer select-none"
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
              Price (USD){" "}
              <SortArrow
                active={sortField === SortField.Price}
                direction={sortDirection}
              />
            </th>
            <th className="p-2 text-left">Buy/Sell</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2 flex gap-2 items-center">
                    <Skeleton circle width={24} height={24} />
                    <Skeleton width={120} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={80} />
                  </td>
                  <td className="p-2">
                    <Skeleton width={100} />
                  </td>
                </tr>
              ))
            : sorted.map((asset) => (
                <tr key={asset.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 flex gap-2 items-center">
                    <img
                      src={asset.image}
                      alt={`${asset.name} logo`}
                      className="w-6 h-6"
                    />
                    {asset.name}
                  </td>
                  <td className="p-2">
                    ${asset.current_price.toLocaleString()}
                  </td>
                  <td className="p-2">
                    <Select
                      className="border rounded px-2 py-1"
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
        <div className="flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
}
