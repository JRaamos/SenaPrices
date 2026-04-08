import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Support page", () => {
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
                    description: "O sistema não conclui a impressão após preencher os dados do item.",
                    support_status: "opened",
                    createdAt: "2026-04-08T10:00:00.000Z",
                },
                {
                    id: 2,
                    documentId: "support-doc-02",
                    title: "Dúvida sobre etiqueta",
                    description: "Necessário validar o preset mais adequado para a impressora atual.",
                    support_status: "answered",
                    createdAt: "2026-04-07T14:30:00.000Z",
                },
            ],
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 10,
                    pageCount: 1,
                    total: 2,
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

    it("renders support overview and support table", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Suporte").should("exist");
        cy.contains("Resumo dos tickets").should("exist");
        cy.contains("Tickets cadastrados").should("exist");
        cy.contains("Falha ao imprimir cartaz").should("exist");
        cy.contains("Dúvida sobre etiqueta").should("exist");
        cy.contains("Novo ticket").should("exist");
    });
});
