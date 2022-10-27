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

export const CurrencyProvider = (prop: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [currency, setCurrency] = useState<Currency>("USD");

    const updateCurrency = (newCurrency: Currency) => {
        setCurrency(newCurrency);
    };

    return (
        <CurrencyContext.Provider value={{ currency, updateCurrency }}>
            {prop.children}
        </CurrencyContext.Provider>
    );
};
