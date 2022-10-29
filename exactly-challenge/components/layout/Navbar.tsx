import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { CurrencySelector } from "../CurrencySelector";

export const Navbar = () => {
    return (
        <AppBar position="relative">
            <Container maxWidth="xl">
                <Toolbar disableGutters={true}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link href="/">Exactly Challenge</Link>
                    </Typography>
                    <div style={{ padding: "8px" }}>
                        <CurrencySelector />
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
