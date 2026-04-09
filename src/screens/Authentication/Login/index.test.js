import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import Page from "./";

describe("Login", () => {
    it("renders credentials and pin access flows", () => {
        mount(
            <BrowserRouter>
                <Page />
            </BrowserRouter>
        );

        cy.contains("Entrar na sua conta").should("exist");
        cy.contains("E-mail e senha").should("exist");
        cy.contains("Acesso por PIN").should("exist");
        cy.get("input[placeholder='seu@email.com ou nome completo']").should("exist");
        cy.contains("Administrador: admin@sistema.com").should("exist");
    });
});
