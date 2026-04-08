import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { SaveObject } from "services/storage";
import Page from "./";

const ADMIN_USER = {
    id: 1,
    documentId: "admin-doc-01",
    name: "Mateus Sena",
    email: "mateus@senaprices.com",
    role: { name: "admin" },
};

const OPERATOR_USER = {
    id: 2,
    documentId: "user-doc-02",
    name: "João Operador",
    email: "joao@senaprices.com",
    role: { name: "user" },
};

function ensureScrollRoot() {
    if (!document.getElementById("body-scroll")) {
        const scrollRoot = document.createElement("div");
        scrollRoot.id = "body-scroll";
        scrollRoot.scrollTo = () => {};
        document.body.appendChild(scrollRoot);
    }
}

function mountPage() {
    ensureScrollRoot();

    mount(
        <BrowserRouter>
            <CoreState>
                <Page />
                <ToastContainer />
            </CoreState>
        </BrowserRouter>
    );
}

function resetStorage(user = ADMIN_USER) {
    SaveObject("authentication", { jwt: "fake-jwt-token" });
    SaveObject("user", user);
    SaveObject("catalog-items", []);
    SaveObject("catalog-sections", []);
    SaveObject("app-settings", null);
    SaveObject("label-settings", null);
}

describe("Dashboard Settings page", () => {
    beforeEach(() => {
        ensureScrollRoot();
    });

    it("renders governance tabs for management profiles", () => {
        resetStorage(ADMIN_USER);

        cy.window().then((win) => {
            cy.stub(win, "fetch").callsFake((url) => {
                const href = `${url || ""}`;

                if (href.includes("/users")) {
                    return Promise.resolve({
                        json: () => Promise.resolve({
                            data: [
                                {
                                    id: 10,
                                    documentId: "user-doc-10",
                                    name: "Carlos Gestor",
                                    email: "carlos@senaprices.com",
                                    role: { name: "subadmin" },
                                },
                            ],
                        }),
                    });
                }

                return Promise.resolve({
                    json: () => Promise.resolve({}),
                });
            });
        });

        mountPage();

        cy.contains("Definições").should("exist");
        cy.contains("Impressão").should("exist");
        cy.contains("Seções").should("exist");
        cy.contains("Etiquetas").should("exist");
        cy.contains("Acessos").should("exist");
    });

    it("shows restricted guidance for regular users", () => {
        resetStorage(OPERATOR_USER);
        mountPage();

        cy.contains("Governança central restrita").should("exist");
        cy.contains("Falar com suporte").should("exist");
    });
});
