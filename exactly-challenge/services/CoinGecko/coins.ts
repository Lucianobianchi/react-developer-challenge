import axios from "axios";
import { CoinInfo, Market, MarketChartResponse } from "./types";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_COINGECKO_API_URL,
});

interface GetMarketOptions {
    page?: number;
    perPage?: number;
    currency?: string;
}
export const getMarkets = async ({
    page = 1,
    perPage = 20,
    currency = "usd",
}: GetMarketOptions) => {
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

export const getMarket = async (coinId: string) => {
    return axiosInstance.get<CoinInfo>(`/coins/${coinId}`, {
        params: {
            vs_currency: "usd",
        },
    });
};

interface GetMarketChartOptions {
    coinId: string;
    fromDaysAgo: number;
    currency?: string;
}

export const getMarketChart = async ({
    coinId,
    fromDaysAgo,
    currency = "usd",
}: GetMarketChartOptions) => {
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
