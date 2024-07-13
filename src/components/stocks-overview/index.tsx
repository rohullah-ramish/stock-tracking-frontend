import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ListOrderedIcon, Search } from "lucide-react";
import { Input } from "../ui/input";

function StocksOverview() {
  const [sortBy, setSortBy] = useState("price");
  const [sortDirection, setSortDirection] = useState("asc");

  const stockData = [
    {
      id: 1,
      name: "Apple Inc.",
      symbol: "AAPL",
      price: 125.0,
      change: 2.5,
      industry: "Technology",
    },
    {
      id: 2,
      name: "Microsoft Corporation",
      symbol: "MSFT",
      price: 250.0,
      change: -1.2,
      industry: "Technology",
    },
    {
      id: 3,
      name: "Amazon.com, Inc.",
      symbol: "AMZN",
      price: 3200.0,
      change: 0.8,
      industry: "Consumer Discretionary",
    },
    {
      id: 4,
      name: "The Coca-Cola Company",
      symbol: "KO",
      price: 55.0,
      change: -0.5,
      industry: "Consumer Staples",
    },
    {
      id: 5,
      name: "Johnson & Johnson",
      symbol: "JNJ",
      price: 165.0,
      change: 1.0,
      industry: "Healthcare",
    },
    {
      id: 6,
      name: "Exxon Mobil Corporation",
      symbol: "XOM",
      price: 58.0,
      change: -2.1,
      industry: "Energy",
    },
    {
      id: 7,
      name: "The Procter & Gamble Company",
      symbol: "PG",
      price: 135.0,
      change: 0.3,
      industry: "Consumer Staples",
    },
    {
      id: 8,
      name: "JPMorgan Chase & Co.",
      symbol: "JPM",
      price: 150.0,
      change: -0.8,
      industry: "Financials",
    },
    {
      id: 9,
      name: "The Home Depot, Inc.",
      symbol: "HD",
      price: 300.0,
      change: 1.5,
      industry: "Consumer Discretionary",
    },
    {
      id: 10,
      name: "Walmart Inc.",
      symbol: "WMT",
      price: 135.0,
      change: -0.4,
      industry: "Consumer Staples",
    },
  ];

  const filteredStocks = useMemo(() => {
    let filtered = stockData;
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return sortDirection === "asc"
            ? a.price - b.price
            : b.price - a.price;
        case "change":
          return sortDirection === "asc"
            ? a.change - b.change
            : b.change - a.change;
        case "industry":
          return sortDirection === "asc"
            ? a.industry.localeCompare(b.industry)
            : b.industry.localeCompare(a.industry);
        default:
          return 0;
      }
    });
    return filtered;
  }, [stockData, sortBy, sortDirection]);

  const handleSortChange = (by: string, direction: string) => {
    setSortBy(by);
    setSortDirection(direction);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Stock Indices Overview</h1>
        <div className="flex items-center gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
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
                  : `Change (${
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
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStocks.map((stock) => (
            <Card key={stock.id}>
              <CardHeader className="px-6 flex flex-row items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{stock.name}</h3>
                  <p className="text-muted-foreground">{stock.symbol}</p>
                </div>
                <div
                  className={`py-1 px-2 rounded-full text-xs font-medium ${
                    stock.change >= 0
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {stock.change >= 0 ? `+${stock.change}%` : `${stock.change}%`}
                </div>
              </CardHeader>
              <CardContent className="px-6">
                <div className="flex items-center justify-end">
                  <p className="text-xl font-bold">${stock.price.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StocksOverview;
