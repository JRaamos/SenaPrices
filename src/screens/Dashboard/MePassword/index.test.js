import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard MePassword page", () => {
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

    it("renders password security overview and password form", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Senha e segurança").should("exist");
        cy.contains("Resumo de segurança").should("exist");
        cy.contains("Atualizar senha").should("exist");
        cy.contains("Meu perfil").should("exist");
        cy.contains("Abrir ticket").should("exist");
        cy.get("input[type=password]").should("have.length.at.least", 2);
    });
});
