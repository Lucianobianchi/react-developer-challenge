import { Stack } from "@mui/material";
import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CoinListItem } from "../components/CoinListItem";
import { CurrencySelector } from "../components/CurrencySelector";
import { useCurrency } from "../providers/CurrencyProvider";
import { getMarkets, Market } from "../services/CoinGecko/coins";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (context: NextPageContext) => {
    const markets = await getMarkets(1 /* page */, 20 /* per page*/, "USD");
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
        getMarkets(1 /* page */, 20 /* per page*/, currency).then((res) => {
            setMarketList(res.data);
        });
    }, [currency]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Exactly Challenge</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1 className={styles.title}>All markets</h1>
            <Stack>
                {marketList.map((m) => (
                    <CoinListItem market={m} key={m.name} />
                ))}
            </Stack>
        </div>
    );
};

export default Home;
