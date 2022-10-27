import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import {
    currencies,
    Currency,
    useCurrency,
} from "../providers/CurrencyProvider";

export const CurrencySelector: React.FC = () => {
    const { currency, updateCurrency } = useCurrency();
    const handleChange = (e: SelectChangeEvent<"USD" | "EUR" | "ARS">) => {
        updateCurrency(e.target.value as Currency);
    };

    return (
        <FormControl fullWidth>
            <Select
                labelId="currency-select-label"
                id="currency-select"
                value={currency}
                onChange={handleChange}
            >
                {currencies.map((currency) => (
                    <MenuItem value={currency} key={currency}>
                        {currency}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
