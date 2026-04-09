import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import Page from "./";

describe("Register", () => {
    it("renders account creation flow and selected commercial data", () => {
        window.history.pushState({}, "", "/register?plan=profissional&billing=annual");

        mount(
            <BrowserRouter>
                <Page />
            </BrowserRouter>
        );

        cy.contains("Crie sua conta SenaPrices").should("exist");
        cy.contains("Plano selecionado").should("exist");
        cy.contains("Profissional").should("exist");
        cy.contains("Criar conta").should("exist");
    });
});
