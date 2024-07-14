import wallStreetHttpClient from "./httpClient";

const overviewFields = "symbol,name,price,percentChange";
const format = "json";
const allsymbols = "allsymbols";

enum Endpoints {
  LIVE_STOCK_PRICES = "livestockprices",
  HISTORIC_STOCK_PRICES = "historicstockprices",
}

export type Stock = {
  symbol?: string;
  name?: string;
  price?: number;
  percentchange?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  date?: string;
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
      `/${Endpoints.LIVE_STOCK_PRICES}?fields=${overviewFields}&format=${format}&symbols=${allsymbols}`
    );
    const data = result.data.response;
    if (data) return { success: true, data };

    return { success: false };
  } catch (error: any) {
    console.error(error);

    return { success: false };
  }
}

const historicFields = "date,open,high,low,close";

export async function getStockDetails(
  symbol: string,
  from: string = "1",
  to: string = "1"
): Promise<{
  success: boolean;
  data?: Stock[];
}> {
  try {
    const result = await wallStreetHttpClient.get<StockResponse>(
      `/${Endpoints.HISTORIC_STOCK_PRICES}?&symbol=${symbol}&from=${from}&to=${to}&fields=${historicFields}&format=${format}`
    );
    const data = result.data.response;
    if (data) return { success: true, data: data };

    return { success: false };
  } catch (error: any) {
    console.error(error);

    return { success: false };
  }
}
