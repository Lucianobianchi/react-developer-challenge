import { getCookie, hasCookie, setCookie } from "cookies-next";
import { NextPageContext } from "next";
import React, { useState, createContext, useContext } from "react";

export const currencies = ["USD", "EUR", "ARS"] as const;
export type Currency = typeof currencies[number];

export type CurrencyContextType = {
    currency: Currency;
    updateCurrency: (newCurrency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType>({
    currency: "USD",
    updateCurrency: () => {},
});

export const useCurrency = () => useContext(CurrencyContext);

const CURRENCY_COOKIE_NAME = "_currency_";

export const CurrencyProvider = (prop: {
    initialValue: Currency;
    children: JSX.Element | JSX.Element[];
}) => {
    const { initialValue, children } = prop;
    const [currency, setCurrency] = useState<Currency>(initialValue);

    const updateCurrency = (newCurrency: Currency) => {
        setCookie(CURRENCY_COOKIE_NAME, newCurrency);
        setCurrency(newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, updateCurrency }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const getCurrencyFromCookie = (ctx: NextPageContext): Currency => {
    if (!hasCookie(CURRENCY_COOKIE_NAME, ctx)) {
        setCookie(CURRENCY_COOKIE_NAME, "USD", ctx);
        return "USD";
    }

    return getCookie(CURRENCY_COOKIE_NAME, ctx) as Currency;
};
