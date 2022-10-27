import { Grid } from "@mui/material";
import Link from "next/link";
import { Market } from "../services/CoinGecko/coins";

export const CoinListItem: React.FC<{ market: Market }> = ({ market }) => {
    const { name, current_price, id } = market;
    console.log(market);
    return (
        <Link href={`/coins/${id}`}>
            <a>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <p>{name}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p>{market.price_change_percentage_24h}</p>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        sx={{ display: { md: "flex", xs: "none" } }}
                    >
                        <p>{market.fully_diluted_valuation}</p>
                    </Grid>
                    <Grid item xs="auto">
                        <p>${current_price}</p>
                    </Grid>
                </Grid>
            </a>
        </Link>
    );
};
