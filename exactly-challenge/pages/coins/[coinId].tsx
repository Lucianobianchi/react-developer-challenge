import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    getMarketChart,
    MarketChartResponse,
} from "../../services/CoinGecko/coins";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MarketChartGraph } from "../../components/MarketChartGraph";

const timeframes = ["1d", "1m", "6m", "1y", "5y"] as const;
export type ChartTimeframes = typeof timeframes[number];

const timeframesToDaysAgo: { [tf in ChartTimeframes]: number } = {
    "1d": 1,
    "1m": 30,
    "6m": 180,
    "1y": 360,
    "5y": 1800,
};

export const getServerSideProps = async (context: NextPageContext) => {
    const { coinId } = context.query;

    const markets = await getMarketChart(coinId as any, 1);
    // TODO: error handling
    return {
        props: {
            initialMarketChart: markets.data,
        },
    };
};

const CoinPage: NextPage<{ initialMarketChart: MarketChartResponse }> = ({
    initialMarketChart,
}) => {
    const router = useRouter();
    const { coinId, tf = "1d" } = router.query;

    const [chartTf, setChartTf] = useState<ChartTimeframes>(
        tf as ChartTimeframes
    );

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newTimeframe?: ChartTimeframes
    ) => {
        event.preventDefault();
        if (newTimeframe) {
            setChartTf(newTimeframe);
        }
    };

    const [marketChart, setMarketChart] =
        useState<MarketChartResponse>(initialMarketChart);

    useEffect(() => {
        getMarketChart(coinId as string, timeframesToDaysAgo[chartTf]).then(
            (res) => setMarketChart(res.data)
        );
    }, [coinId, chartTf]);

    console.log(marketChart);

    return (
        <div>
            <p>Coin: {coinId}</p>
            <ToggleButtonGroup
                value={chartTf}
                exclusive
                onChange={handleAlignment}
            >
                {timeframes.map((timeframe) => (
                    <ToggleButton value={timeframe} key={timeframe}>
                        {timeframe}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
            <MarketChartGraph
                marketCaps={marketChart.market_caps}
                prices={marketChart.prices}
            />
        </div>
    );
};

export default CoinPage;
