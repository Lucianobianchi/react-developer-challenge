import { getMarketChart, getMarkets } from "./coins";

export const coins = {
    getMarkets,
    getMarketChart,
};

export type { CoinInfo, Market, MarketChartResponse } from "./types";
