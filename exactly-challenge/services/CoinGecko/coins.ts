import axios from "axios";

// TODO: add to a config file
const COIN_GECKO_API = "https://api.coingecko.com/api/v3";

const axiosInstance = axios.create({
    baseURL: COIN_GECKO_API,
});

export interface Market {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
}

export interface MarketChartResponse {
    market_caps: MarketQuote[];
    prices: MarketQuote[];
    total_volumes: MarketQuote[];
}

export type MarketQuote = [Date, number];

// TODO: use object as parameter instead of positional ones
export const getMarkets = async (page = 1, perPage = 20, currency = "usd") => {
    return axiosInstance.get<Market[]>("/coins/markets", {
        params: {
            vs_currency: currency,
            order: "market_cap_desc",
            per_page: perPage,
            page: page,
            sparkline: false,
        },
    });
};

// TODO: use object as parameter instead of positional ones
export const getMarketChart = async (
    coinId: string,
    fromDaysAgo: number,
    currency = "usd"
) => {
    if (fromDaysAgo < 0) {
        throw new Error(
            `fromDaysAgo must be positive. Received ${fromDaysAgo}`
        );
    }

    return axiosInstance.get<MarketChartResponse>(
        `/coins/${coinId}/market_chart`,
        {
            params: {
                vs_currency: currency,
                days: fromDaysAgo,
            },
        }
    );
};
