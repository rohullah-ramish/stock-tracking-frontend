import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getStockDetails } from "@/services/wallstreet";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

const CandleChart = dynamic(() => import("./CandleChart"), { ssr: false });

export default function StockDetails() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 1, 1),
    to: new Date(2024, 3, 30),
  });

  const [series, setSeries] = useState<ApexAxisChartSeries>([]);

  function fetchStockDetails(
    symbol: string,
    from: string = "2024-03-01",
    to: string = "2024-06-30"
  ) {
    if (symbol)
      getStockDetails(symbol, from, to).then((response) => {
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
      if (date?.from && date?.to) {
        fetchStockDetails(
          s,
          `${date?.from?.getFullYear()}-${(date?.from?.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date?.from
            ?.getDate()
            .toString()
            .padStart(2, "0")}`,
          `${date?.to?.getFullYear()}-${(date?.to?.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date?.to
            ?.getDate()
            .toString()
            .padStart(2, "0")}`
        );
      }
    } else router.replace("/overview");
  }, [router.query, date?.from, date?.to]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">
                Stock Details ({(router.query.symbol as string)?.toUpperCase()})
              </h1>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="h-[500px]">
              <CandleChart title={`${router.query.symbol}`} series={series} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
