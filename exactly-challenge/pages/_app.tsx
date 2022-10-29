import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import {
    Currency,
    CurrencyProvider,
    getCurrencyFromCookie,
} from "../providers/CurrencyProvider";
import { Layout } from "../components/layout/Layout";
import App from "next/app";

interface CustomAppProps extends AppProps {
    currency: Currency;
}

// TODO add transition and loading between pages
const MyApp: any = ({ Component, pageProps, currency }: CustomAppProps) => {
    return (
        <CurrencyProvider initialValue={currency}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CurrencyProvider>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const { ctx } = appContext;
    const currency = getCurrencyFromCookie(ctx);
    return { ...appProps, currency };
};

export default MyApp;
