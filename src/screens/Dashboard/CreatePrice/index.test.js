import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard CreatePrice page", () => {
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

    it("renders the pricing studio and updates the preview", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Criar Preco").should("exist");
        cy.contains("Base da composicao").should("exist");
        cy.contains("Regra comercial do cartaz").should("exist");
        cy.contains("Checklist de qualidade").should("exist");

        cy.get('input[placeholder="Ex: Cafe torrado e moido 500g"]').type("Cafe Pilao 500g");
        cy.get('input[placeholder="Ex: 12,99"]').first().type("12,99");

        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Pronto para impressao").should("exist");
    });
});
