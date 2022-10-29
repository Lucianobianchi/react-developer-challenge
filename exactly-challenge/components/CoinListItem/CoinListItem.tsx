import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { Market } from "../../services/CoinGecko/coins";
import styles from "./CoinListItem.module.css";
import classNames from "classnames";

export const CoinListHeaderItem = () => {
    return (
        <div className={styles["coin-list-header"]}>
            <Grid container spacing={2}>
                <Grid item xs={8} md={6}>
                    <h3>{"Coin"}</h3>
                </Grid>
                <Grid item xs={2}>
                    <h3 className={styles["end-item"]}>{"24h"}</h3>
                </Grid>
                <Grid item xs={2} sx={{ display: { md: "flex", xs: "none" } }}>
                    <h3 className={styles["end-item"]}>{"Market cap"}</h3>
                </Grid>
                <Grid item xs={2}>
                    <h3 className={styles["end-item"]}>{"Price"}</h3>
                </Grid>
            </Grid>
        </div>
    );
};

export const CoinListItem: React.FC<{ market: Market }> = ({ market }) => {
    const { name, current_price, id } = market;

    return (
        <Link href={`/coins/${id}`}>
            <a className={styles.item}>
                <Grid container spacing={2}>
                    <Grid item xs={8} md={6}>
                        <p>{name}</p>
                    </Grid>
                    <Grid item xs={2}>
                        <p
                            className={classNames(styles["end-item"], {
                                [styles["positive"]]:
                                    market.price_change_percentage_24h > 0,
                                [styles["negative"]]:
                                    market.price_change_percentage_24h < 0,
                            })}
                        >
                            {`${market.price_change_percentage_24h.toFixed(
                                2
                            )}%`}
                        </p>
                    </Grid>
                    <Grid
                        item
                        xs={2}
                        sx={{ display: { md: "flex", xs: "none" } }}
                    >
                        <p className={styles["end-item"]}>
                            {market.market_cap.toLocaleString()}
                        </p>
                    </Grid>
                    <Grid item xs={2}>
                        <p className={styles["end-item"]}>
                            ${current_price.toLocaleString()}
                        </p>
                    </Grid>
                </Grid>
            </a>
        </Link>
    );
};
