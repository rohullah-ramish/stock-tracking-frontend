import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { CalendarDaysIcon } from "lucide-react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getStockDetails, Stock } from "@/services/wallstreet";

const CandleChart = dynamic(() => import("./CandleChart"), { ssr: false });

export default function StockDetails() {
  const [symbol, setSymbol] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 5, 30),
  });

  const [series, setSeries] = useState<ApexAxisChartSeries>([]);

  function fetchStockDetails(symbol: string) {
    if (symbol)
      getStockDetails(symbol, "2024-03-01", "2024-06-30").then((response) => {
        if (response.success) {
          setSeries([
            {
              data:
                response.data?.map((item) => ({
                  x: new Date(item.date ?? Date.now()),
                  y: [item.open, item.high, item.low, item.close],
                })) ?? [],
            },
          ]);
        }
      });
  }

  const router = useRouter();

  useEffect(() => {
    const s = router.query.symbol as string;
    if (s) {
      setSymbol(s);
      fetchStockDetails(s);
    } else router.replace("/overview");
  }, [router.query]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">
                Stock Details ({symbol?.toUpperCase()})
              </h1>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span>
                      {dateRange.startDate.toLocaleDateString()} -{" "}
                      {dateRange.endDate.toLocaleDateString()}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div />
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-[500px]">
              <CandleChart title={`${symbol}`} series={series} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
