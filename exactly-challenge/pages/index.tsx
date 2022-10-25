import { Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { CoinListItem } from "../components/CoinListItem";
import { getMarkets, Market } from "../services/CoinGecko/coins";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async () => {
    const markets = await getMarkets();
    return {
        props: {
            marketList: markets.data,
        },
    };
};

const Home: NextPage<{ marketList: Market[] }> = ({ marketList }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Exactly Challenge</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Exactly Challenge</h1>
                <Stack>
                    {marketList.map((m) => (
                        <CoinListItem market={m} />
                    ))}
                </Stack>
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
};

export default Home;
