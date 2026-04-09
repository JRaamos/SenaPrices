import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import Page from "./";

describe("Landpage", () => {
    it("renders hero, plans and faq content", () => {
        mount(
            <BrowserRouter>
                <Page />
            </BrowserRouter>
        );

        cy.contains("Cartazes promocionais prontos em segundos").should("exist");
        cy.contains("Escolha o nível de maturidade da sua operação").should("exist");
        cy.contains("Essencial").should("exist");
        cy.contains("Perguntas frequentes sobre a operação atual").should("exist");
        cy.contains("Entrar no sistema").should("exist");
    });
});
