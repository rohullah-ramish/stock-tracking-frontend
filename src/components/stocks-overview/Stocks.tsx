import { Stock } from "@/services/wallstreet";

import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

type StocksProps = {
  stocksData: Stock[];
};

function Stocks(props: StocksProps) {
  const { stocksData } = props;

  const Cell = ({ index, style }: ListChildComponentProps) => {
    const stock = stocksData[index];

    return (
      <div style={style} className="p-0.5">
        <Card className="duration-200 group cursor-pointer border hover:border-[green]">
          <CardHeader className="px-6 py-3 flex flex-row items-start justify-between">
            <div>
              <h3 className="text-lg flex items-center justify-center gap-2">
                <span>{stock.name}</span>
                {stock.percentchange && (
                  <span
                    className={`py-1 px-2 rounded-full text-xs font-medium ${
                      stock.percentchange >= 0
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {stock.percentchange >= 0
                      ? `+${stock.percentchange}%`
                      : `${stock.percentchange}%`}
                  </span>
                )}
              </h3>
              <p className="text-muted-foreground">{stock.symbol}</p>
            </div>
            <div className="flex items-center gap-10">
              <p className="text-lg text-[green]">${stock.price?.toFixed(2)}</p>
              <Link href={`/${stock.symbol}`}>
                <Button variant="outline" className="duration-300">
                  <span>Details</span>
                  <ChevronRight className="ps-2 text-[16px]" />
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          width={width}
          itemCount={stocksData.length}
          itemSize={90}
        >
          {Cell}
        </List>
      )}
    </AutoSizer>
  );
}

export default Stocks;
