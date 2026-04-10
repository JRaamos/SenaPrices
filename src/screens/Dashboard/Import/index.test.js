import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { ReadObject, SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Import page", () => {
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

    it("loads a csv file, previews the plan and imports valid rows into the catalog", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        const csvContent = [
            "codigo_interno,ean13,descricao1,descricao2,secao,unidade",
            "CAFE-500,7896003701685,Cafe Pilao 500g,Torracao media,Mercearia,unidade",
        ].join("\n");

        cy.contains("Importacao da base de itens").should("exist");
        cy.get('[data-testid="import-file-input"]').selectFile({
            contents: Cypress.Buffer.from(csvContent),
            fileName: "catalogo.csv",
            mimeType: "text/csv",
        }, { force: true });

        cy.contains("1 linha(s) carregadas para revisao.").should("exist");
        cy.contains("Previa").click();
        cy.contains("Plano de importacao").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Criar: 1").should("exist");

        cy.contains("Importar linhas validas").click();
        cy.contains("1 linha(s) processadas com sucesso na base.").should("exist");
        cy.contains("Resultado").click();
        cy.contains("Ultima importacao").should("exist");

        cy.wrap(ReadObject("catalog-items")).should("have.length", 1);
    });
}
