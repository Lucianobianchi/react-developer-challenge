// Component to show coin information
import { Card, CardContent } from "@mui/material";
import React from "react";
import { CoinInfo } from "../../services/CoinGecko/coins";

export const CoinInfoPanel: React.FC<CoinInfo> = ({ market_data }) => {
    const { total_supply, total_volume } = market_data;
    return (
        <Card variant="outlined">
            <CardContent>
                <p>{`Total supply: ${total_supply.toLocaleString()}`}</p>
                <p>{`Total volume (24h): ${total_volume.usd.toLocaleString()}`}</p>
            </CardContent>
        </Card>
    );
};
