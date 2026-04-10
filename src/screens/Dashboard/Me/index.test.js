import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Me page", () => {
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

    it("renders account overview, quick actions and profile form", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Minha Conta").should("exist");
        cy.contains("Resumo da conta").should("exist");
        cy.contains("Dados do perfil").should("exist");
        cy.contains("Senha e seguranca").should("exist");
        cy.contains("Abrir ticket").should("exist");
        cy.get("input").should("have.length.at.least", 2);
    });
});
