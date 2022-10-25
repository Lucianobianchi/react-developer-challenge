import Link from "next/link";
import { Market } from "../services/CoinGecko/coins";

export const CoinListItem: React.FC<{ market: Market }> = ({ market }) => {
    const { name, current_price, id } = market;

    return (
        <Link href={`/coins/${id}`}>
            <a>
                {name} - ${current_price}
            </a>
        </Link>
    );
};
