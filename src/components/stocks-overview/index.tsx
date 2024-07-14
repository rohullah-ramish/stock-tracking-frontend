import { useEffect, useMemo, useState } from "react";
import { ListOrderedIcon, LoaderCircle, Search } from "lucide-react";
import { Input } from "../ui/input";
import { getStocksOverview, Stock } from "@/services/wallstreet";
import { Skeleton } from "../ui/skeleton";
import Stocks from "./Stocks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const __ = [
  {
    symbol: "CSLR",
    name: "1 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "2 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "3 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "4 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "5 Complete Solaria Inc. Common Stock",
    price: 12.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "6 Complete Solaria Inc. Common Stock",
    price: 5.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "7 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 8.6957,
  },
  {
    symbol: "CSLR",
    name: "8 Complete Solaria Inc. Common Stock",
    price: 0.75,
    percentchange: -8.6957,
  },
  {
    symbol: "CSLR",
    name: "9 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 5.6957,
  },
  {
    symbol: "CSLR",
    name: "10 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 1.6957,
  },
  {
    symbol: "CSLR",
    name: "11 Complete Solaria Inc. Common Stock",
    price: 1.75,
    percentchange: 9.6957,
  },
];

function StocksOverview() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const [stocksData, setStocksData] = useState<Stock[]>(__);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState("price");
  const [sortDirection, setSortDirection] = useState("des");

  function fetchStocksData() {
    setLoading(true);
    getStocksOverview()
      .then((result) => {
        if (result.success) {
          const data = result.data;
          if (data) return setStocksData(data);
        }

        // TODO: Show it in the fallback screen
        setError("Could not fetch stock indices");
      })
      .catch(() => setError("Could not fetch stock indices"))
      .finally(() => setLoading(false));
  }

  // useEffect(() => fetchStocksData(), []);

  const filteredStocks = useMemo(() => {
    let filtered = stocksData;

    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||
        item.symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
    );

    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return sortDirection === "asc"
            ? a.price - b.price
            : b.price - a.price;
        case "change":
          return sortDirection === "asc"
            ? a.percentchange - b.percentchange
            : b.percentchange - a.percentchange;
        default:
          return 0;
      }
    });
    return filtered;
  }, [searchQuery, stocksData, sortBy, sortDirection]);

  const handleSortChange = (by: string, direction: string) => {
    setSortBy(by);
    setSortDirection(direction);
  };

  return (
    <div className="min-h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.18))]">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex gap-2 items-center justify-center">
          {isLoading && <LoaderCircle className="animate-spin" />}
          <span>Overview</span>
        </h1>
        {isLoading ? (
          <Skeleton className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] h-[30px] rounded" />
        ) : (
          <div className="flex items-center gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ListOrderedIcon className="w-4 h-4 mr-2" />
                  {sortBy === "price"
                    ? `Price (${
                        sortDirection === "asc" ? "Ascending" : "Descending"
                      })`
                    : sortBy === "change"
                    ? `Change (${
                        sortDirection === "asc" ? "Ascending" : "Descending"
                      })`
                    : `Industry (${
                        sortDirection === "asc" ? "Ascending" : "Descending"
                      })`}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup
                  value={`${sortBy}-${sortDirection}`}
                  onValueChange={(value) => {
                    const [by, direction] = value.split("-");
                    handleSortChange(by, direction);
                  }}
                >
                  <DropdownMenuRadioItem value="price-asc">
                    Price: Ascending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc">
                    Price: Descending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="change-asc">
                    Change: Ascending
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="change-desc">
                    Change: Descending
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </header>
      <div className="w-full flex items-start justify-start">
        <div className="w-full overflow-auto p-6 h-[calc(100vh_-_theme(spacing.16)_-_theme(spacing.16))]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from(new Array(9)).map((_, i) => (
                <Skeleton key={i} className="pl-8 w-full h-[150px] rounded" />
              ))}
            </div>
          ) : (
            <Stocks stocksData={filteredStocks} />
          )}
        </div>
      </div>
    </div>
  );
}

export default StocksOverview;
