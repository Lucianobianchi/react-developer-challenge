import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMarket, getMarketChart } from "../../services/CoinGecko/coins";
import { CoinInfo, MarketChartResponse } from "../../services/CoinGecko";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { MarketChartGraph } from "../../components/MarketChartGraph";
import { Breadcrumbs, Grid, Stack } from "@mui/material";
import {
    getCurrencyFromCookie,
    useCurrency,
} from "../../providers/CurrencyProvider";
import { CoinInfoPanel } from "../../components/CoinInfoPanel/CoinInfoPanel";
import Head from "next/head";

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
    const coinId = context.query.coinId as string;
    const currency = getCurrencyFromCookie(context);
    const marketsPromise = getMarketChart({
        coinId: coinId,
        fromDaysAgo: 1,
        currency,
    });
    const coinInfoPromise = getMarket(coinId);

    const [markets, coinInfo] = await Promise.all([
        marketsPromise,
        coinInfoPromise,
    ]);

    return {
        props: {
            initialMarketChart: markets.data,
            coinInfo: coinInfo.data,
        },
    };
};

interface CoinPageProps {
    initialMarketChart: MarketChartResponse;
    coinInfo: CoinInfo;
}

const CoinPage: NextPage<CoinPageProps> = ({
    initialMarketChart,
    coinInfo,
}) => {
    const router = useRouter();
    const tf = (router.query.tf || "1d") as string;
    const coinId = router.query.coinId as string;
    const { currency } = useCurrency();
    const [chartTf, setChartTf] = useState<ChartTimeframes>(
        tf as ChartTimeframes
    );
    const [marketStat, setMarketStat] = useState<MarketStats>("price");
    const [marketChart, setMarketChart] =
        useState<MarketChartResponse>(initialMarketChart);

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
        getMarketChart({
            coinId,
            fromDaysAgo: timeframesToDaysAgo[chartTf],
            currency,
        }).then((res) => setMarketChart(res.data));
    }, [coinId, chartTf, currency]);

    return (
        <div>
            <Head>
                <title>{`Exactly Challenge | ${coinInfo.name}`}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    All markets
                </Link>
                <Link color="inherit" href={`/coins/${coinId}`}>
                    {coinInfo.name}
                </Link>
            </Breadcrumbs>

            <h1>{coinInfo.name}</h1>
            <h2>{`$${coinInfo.market_data.current_price[
                currency.toLowerCase()
            ].toLocaleString()}`}</h2>

            <Grid container spacing={1}>
                <Grid item xs={12} md={8}>
                    <Stack spacing={4}>
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
                    <CoinInfoPanel {...coinInfo} />
                </Grid>
            </Grid>
        </div>
    );
};

export default CoinPage;
