import { Stack } from "@mui/material";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
    CoinListHeaderItem,
    CoinListItem,
} from "../components/CoinListItem/CoinListItem";
import {
    getCurrencyFromCookie,
    useCurrency,
} from "../providers/CurrencyProvider";
import { Market } from "../services/CoinGecko";
import { getMarkets } from "../services/CoinGecko/coins";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (context: NextPageContext) => {
    const currency = getCurrencyFromCookie(context);
    const markets = await getMarkets({
        page: 1,
        perPage: 20,
        currency,
    });

    return {
        props: {
            marketList: markets.data,
        },
    };
};

const Home: NextPage<{ marketList: Market[] }> = ({
    marketList: initialMarketList,
}) => {
    const [marketList, setMarketList] = useState<Market[]>(initialMarketList);
    const { currency } = useCurrency();

    useEffect(() => {
        getMarkets({
            page: 1,
            perPage: 20,
            currency,
        }).then((res) => {
            setMarketList(res.data);
        });
    }, [currency]);

    return (
        <div>
            <Head>
                <title>Exactly Challenge</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className={styles.title}>All markets</h1>
            <Stack>
                <CoinListHeaderItem />
                {marketList.map((m) => (
                    <CoinListItem market={m} key={m.name} />
                ))}
            </Stack>
        </div>
    );
};

export default Home;
