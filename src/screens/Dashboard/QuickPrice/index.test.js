import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard QuickPrice page", () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            documentId: "user-doc-01",
            name: "Mateus Sena",
            email: "mateus@senaprices.com",
            createdAt: "2026-04-01T10:00:00.000Z",
            created_at: "2026-04-01T10:00:00.000Z",
        };

        SaveObject("authentication", { jwt: "fake-jwt-token" });
        SaveObject("user", mockUser);

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);
        });
    });

    it("renders the quick batch flow and updates the active preview", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Criacao Rapida").should("exist");
        cy.contains("Lote rapido de cartazes").should("exist");
        cy.contains("Checklist de operacao").should("exist");

        cy.get('input[placeholder="Ex: Cafe Pilao 500g ou 7891234567890"]').type("Arroz Tipo 1");
        cy.get('input[placeholder="Ex: 12,99"]').first().type("12,99");

        cy.contains("Linha pronta para entrar no lote.").should("exist");
        cy.contains("Lote consistente").should("exist");
        cy.contains("Arroz Tipo 1").should("exist");
        cy.contains("R$ 12,99").should("exist");
    });
});
