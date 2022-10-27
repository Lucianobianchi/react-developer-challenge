import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CurrencyProvider } from "../providers/CurrencyProvider";
import { Layout } from "../components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CurrencyProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CurrencyProvider>
    );
}

export default MyApp;
