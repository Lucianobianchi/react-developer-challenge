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

export type MarketQuote = [number, number];

export interface CoinInfo {
    id: string;
    symbol: string;
    name: string;
    image: string;
    market_data: {
        current_price: { [key: string]: number };
        total_supply?: number;
        total_volume: { [key: string]: number };
    };
}
