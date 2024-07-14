import wallStreetHttpClient from "./httpClient";

const fields = "symbol,name,price,percentChange";
const format = "json";
const symbols = "allsymbols";

enum Endpoints {
  LIVE_STOCK_PRICES = "livestockprices",
}

export type Stock = {
  symbol: string;
  name: string;
  price: number;
  percentchange: number;
};

type StockResponse = {
  response: Stock[];
};

export async function getStocksOverview(): Promise<{
  success: boolean;
  data?: Stock[];
}> {
  try {
    const result = await wallStreetHttpClient.get<StockResponse>(
      `/${Endpoints.LIVE_STOCK_PRICES}?fields=${fields}&format=${format}&symbols=${symbols}`
    );
    const data = result.data.response;
    if (data) return { success: true, data };

    return { success: false };
  } catch (error: any) {
    console.error(error);

    return { success: false };
  }
}
