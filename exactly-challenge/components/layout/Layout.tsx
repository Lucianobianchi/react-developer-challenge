import { Container } from "@mui/material";
import React from "react";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar";
import styles from "./Layout.module.css";

export const Layout: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    return (
        <>
            <Navbar />
            <main>
                <Container maxWidth="xl" className={styles["layout-container"]}>
                    {children}
                </Container>
            </main>
            <Footer />
        </>
    );
};
