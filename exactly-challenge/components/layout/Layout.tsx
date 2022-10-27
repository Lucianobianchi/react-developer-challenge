import { Container } from "@mui/material";
import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <>
            <Navbar />
            <main>
                <Container maxWidth="xl">{children}</Container>
            </main>
            <Footer />
        </>
    );
};
