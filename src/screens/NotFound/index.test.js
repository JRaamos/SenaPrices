import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";

import { SaveObject } from "services/storage";
import Page from "./";

function mountPage(pathname) {
    window.history.pushState({}, "", pathname);

    mount(
        <BrowserRouter>
            <Page />
        </BrowserRouter>
    );
}

describe("NotFound page", () => {
    it("renders public recovery actions when user is not authenticated", () => {
        SaveObject("authentication", {});
        mountPage("/rota-inexistente");

        cy.contains("Página não encontrada").should("exist");
        cy.contains("Voltar à apresentação").should("exist");
        cy.contains("Ir para login").should("exist");
    });

    it("renders dashboard recovery actions when user is authenticated", () => {
        SaveObject("authentication", { jwt: "fake-jwt-token" });
        mountPage("/rota-dashboard-inexistente");

        cy.contains("Página não encontrada").should("exist");
        cy.contains("Voltar ao painel").should("exist");
        cy.contains("Abrir suporte").should("exist");
    });
});
