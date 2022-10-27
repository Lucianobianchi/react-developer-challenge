import { Container } from "@mui/material";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer>
            <Container maxWidth="xl">
                <div className={styles.footer}>
                    <p>Luciano Bianchi. 2022.</p>{" "}
                </div>
            </Container>
        </footer>
    );
};
