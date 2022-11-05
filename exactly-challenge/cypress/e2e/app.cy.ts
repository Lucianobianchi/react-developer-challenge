describe("App", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    describe("Currency selector", () => {
        it("Has default currency", () => {
            cy.getCookie("_currency_").should("have.property", "value", "USD");
            cy.get("input[value=USD]").should("exist");
        });

        it("Uses currency from cookie", () => {
            cy.setCookie("_currency_", "EUR");
            cy.reload();
            cy.getCookie("_currency_").should("have.property", "value", "EUR");
            cy.get("input[value=EUR]").should("exist");
        });
    });

    describe("Navigate to coin", () => {
        it("Navigates to coin", () => {
            cy.get("a[href='/coins/bitcoin']").click();
            cy.url().should("include", "/coins/bitcoin");
        });
    });
});

describe("Coin page", () => {
    beforeEach(() => {
        cy.visit("/coins/bitcoin");
    });

    it("Shows coin name", () => {
        cy.get("h1").should("contain", "Bitcoin");
    });

    it("Navigates back to home", () => {
        cy.get("header a[href='/']").click();
        cy.url().should("include", "/");
    });
});
