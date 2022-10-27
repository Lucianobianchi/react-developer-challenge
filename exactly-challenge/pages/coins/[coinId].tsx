import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    getMarket,
    getMarketChart,
    MarketChartResponse,
} from "../../services/CoinGecko/coins";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MarketChartGraph } from "../../components/MarketChartGraph";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import {
    getCurrencyFromCookie,
    useCurrency,
} from "../../providers/CurrencyProvider";

const timeframes = ["1d", "1m", "6m", "1y", "5y"] as const;
export type ChartTimeframes = typeof timeframes[number];

type MarketStats = "market_cap" | "price";

const timeframesToDaysAgo: { [tf in ChartTimeframes]: number } = {
    "1d": 1,
    "1m": 30,
    "6m": 180,
    "1y": 360,
    "5y": 1800,
};

export const getServerSideProps = async (context: NextPageContext) => {
    const { coinId } = context.query;
    const currency = getCurrencyFromCookie(context);
    const markets = await getMarketChart(coinId as any, 1, currency);
    const coinInfo = await getMarket(coinId as any);
    console.log(coinInfo);
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
    const { currency } = useCurrency();

    const [chartTf, setChartTf] = useState<ChartTimeframes>(
        tf as ChartTimeframes
    );
    const [marketStat, setMarketStat] = useState<MarketStats>("price");
    const [marketChart, setMarketChart] =
        useState<MarketChartResponse>(initialMarketChart);

    console.log(marketChart);

    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newTimeframe?: ChartTimeframes
    ) => {
        event.preventDefault();
        if (newTimeframe) {
            setChartTf(newTimeframe);
        }
    };

    const handleMarketStat = (
        event: React.MouseEvent<HTMLElement>,
        newStat?: MarketStats
    ) => {
        event.preventDefault();
        if (newStat) {
            setMarketStat(newStat);
        }
    };

    useEffect(() => {
        getMarketChart(
            coinId as string,
            timeframesToDaysAgo[chartTf],
            currency
        ).then((res) => setMarketChart(res.data));
    }, [coinId, chartTf, currency]);

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    All markets
                </Link>
                <Link color="inherit" href={`/coins/${coinId}`}>
                    {coinId}
                </Link>
            </Breadcrumbs>

            <Grid container spacing={1}>
                <Grid item xs={12} md={8}>
                    <Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <ToggleButtonGroup
                                value={marketStat}
                                exclusive
                                onChange={handleMarketStat}
                            >
                                <ToggleButton value={"price"}>
                                    {"Price"}
                                </ToggleButton>
                                <ToggleButton value={"market_cap"}>
                                    {"Market cap"}
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <ToggleButtonGroup
                                value={chartTf}
                                exclusive
                                onChange={handleAlignment}
                            >
                                {timeframes.map((timeframe) => (
                                    <ToggleButton
                                        value={timeframe}
                                        key={timeframe}
                                    >
                                        {timeframe}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Stack>
                        <MarketChartGraph
                            selection={marketStat}
                            marketCaps={marketChart.market_caps}
                            prices={marketChart.prices}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                    <p>some info</p>
                </Grid>
            </Grid>
        </div>
    );
};

export default CoinPage;
