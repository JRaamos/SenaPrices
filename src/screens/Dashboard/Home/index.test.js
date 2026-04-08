import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Home page", () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            documentId: "user-doc-01",
            name: "Mateus Sena",
            email: "mateus@senaprices.com",
            createdAt: "2026-04-01T10:00:00.000Z",
            created_at: "2026-04-01T10:00:00.000Z",
        };

        const mockSupports = {
            data: [
                {
                    id: 1,
                    documentId: "support-doc-01",
                    title: "Falha ao imprimir cartaz",
                    description: "A impressão não conclui após salvar o produto com oferta.",
                    support_status: "opened",
                    createdAt: "2026-04-08T10:00:00.000Z",
                },
            ],
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 10,
                    pageCount: 1,
                    total: 1,
                },
            },
        };

        SaveObject("authentication", { jwt: "fake-jwt-token" });
        SaveObject("user", mockUser);

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);

            cy.stub(win, "fetch").callsFake((url) => {
                const href = `${url || ""}`;

                if (href.includes("/supports")) {
                    return Promise.resolve({
                        json: () => Promise.resolve(mockSupports),
                    });
                }

                return Promise.resolve({
                    json: () => Promise.resolve(mockUser),
                });
            });
        });
    });

    it("renders dashboard home overview, active modules and roadmap", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Painel SenaPrices").should("exist");
        cy.contains("Resumo operacional").should("exist");
        cy.contains("Módulos ativos").should("exist");
        cy.contains("Próximos módulos mapeados").should("exist");
        cy.contains("Criar Preço").should("exist");
        cy.contains("Suporte").should("exist");
        cy.contains("Falha ao imprimir cartaz").should("exist");
    });
});
