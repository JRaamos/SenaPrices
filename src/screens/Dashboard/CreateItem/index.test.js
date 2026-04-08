import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard CreateItem page", () => {
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
        SaveObject("catalog-items", []);
        SaveObject("catalog-sections", []);

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);
        });
    });

    it("renders the item foundation form and saves a new catalog item", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Criar Item").should("exist");
        cy.contains("Base do item").should("exist");
        cy.contains("Checklist do catalogo").should("exist");

        cy.get('input[placeholder="Ex: CAFE-500"]').type("CAFE-500");
        cy.get('input[placeholder="Ex: Cafe Pilao 500g"]').type("Cafe Pilao 500g");
        cy.get('input[placeholder="Ex: Mercearia"]').type("Mercearia");
        cy.contains("Salvar item").click();

        cy.contains("Item cadastrado com sucesso.").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Itens na base").should("exist");
    });
});
