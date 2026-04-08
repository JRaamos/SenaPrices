import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard SupportForm page", () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            documentId: "user-doc-01",
            name: "Mateus Sena",
            email: "mateus@senaprices.com",
            createdAt: "2026-04-01T10:00:00.000Z",
            created_at: "2026-04-01T10:00:00.000Z",
            updatedAt: "2026-04-08T12:00:00.000Z",
            updated_at: "2026-04-08T12:00:00.000Z",
        };

        SaveObject("authentication", { jwt: "fake-jwt-token" });
        SaveObject("user", mockUser);

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);

            cy.stub(win, "fetch").callsFake(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockUser),
                })
            );
        });
    });

    it("renders support ticket summary and create form", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Novo ticket de suporte").should("exist");
        cy.contains("Resumo do ticket").should("exist");
        cy.contains("Abrir ticket").should("exist");
        cy.contains("Todos os tickets").should("exist");
        cy.contains("Minha conta").should("exist");
        cy.get("input").should("have.length.at.least", 1);
        cy.get("textarea").should("have.length.at.least", 1);
    });
});
