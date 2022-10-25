import { Market } from "../services/CoinGecko/coins";

export const CoinListItem: React.FC<{ market: Market }> = ({ market }) => {
    const { name, current_price } = market;

    return (
        <div>
            {name} - ${current_price}
        </div>
    );
};
