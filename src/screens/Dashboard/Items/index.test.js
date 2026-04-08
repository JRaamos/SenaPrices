import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Items page", () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            documentId: "user-doc-01",
            name: "Mateus Sena",
            email: "mateus@senaprices.com",
            createdAt: "2026-04-01T10:00:00.000Z",
            created_at: "2026-04-01T10:00:00.000Z",
        };

        const mockItems = [
            {
                id: "item-01",
                documentId: "catalog-item-01",
                description1: "Cafe Pilao 500g",
                description2: "Torracao media",
                description3: "",
                internalCode: "CAFE-500",
                ean13: "",
                section: "Mercearia",
                unit: "unidade",
                createdAt: "2026-04-08T10:00:00.000Z",
                updatedAt: "2026-04-08T10:00:00.000Z",
            },
            {
                id: "item-02",
                documentId: "catalog-item-02",
                description1: "Arroz Branco 5kg",
                description2: "",
                description3: "",
                internalCode: "ARROZ-5KG",
                ean13: "",
                section: "Mercearia",
                unit: "kg",
                createdAt: "2026-04-07T10:00:00.000Z",
                updatedAt: "2026-04-07T10:00:00.000Z",
            },
        ];

        SaveObject("authentication", { jwt: "fake-jwt-token" });
        SaveObject("user", mockUser);
        SaveObject("catalog-items", mockItems);
        SaveObject("catalog-sections", [{ id: "sec-01", name: "Mercearia" }]);

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);
        });
    });

    it("renders the catalog list and filters the visible items", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Itens").should("exist");
        cy.contains("Base ativa do catalogo").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Arroz Branco 5kg").should("exist");

        cy.get('input[placeholder="Buscar por nome, secao, codigo interno ou EAN"]').type("Cafe");

        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Arroz Branco 5kg").should("not.exist");
    });
});
