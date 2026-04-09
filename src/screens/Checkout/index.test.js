import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import Page from "./";

describe("Checkout", () => {
    it("renders selected plan and billing data", () => {
        window.history.pushState({}, "", "/checkout?plan=profissional&billing=annual");

        mount(
            <BrowserRouter>
                <Page />
            </BrowserRouter>
        );

        cy.contains("Checkout SenaPrices").should("exist");
        cy.contains("Profissional").should("exist");
        cy.contains("Anual").should("exist");
        cy.contains("Continuar com cadastro").should("exist");
    });
});
