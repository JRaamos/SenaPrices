import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { savePdvConfig } from "services/pdv";
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
    name: "Joao Operador",
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
    SaveObject("pricing-history", []);
    SaveObject("pricing-records", []);
    SaveObject("pdv-config", null);
    SaveObject("pdv-sync-history", []);
}

describe("Dashboard PDV Integration page", () => {
    beforeEach(() => {
        ensureScrollRoot();
    });

    it("renders editable configuration for management profiles", () => {
        resetStorage(ADMIN_USER);
        savePdvConfig({
            active: true,
            type: "api",
            endpoint: "https://pdv.exemplo.com/api/produtos",
            apiKey: "token-seguro",
            autoSync: true,
            syncInterval: 60,
        }, ADMIN_USER);

        mountPage();

        cy.contains("Integracao PDV").should("exist");
        cy.contains("Origem").should("exist");
        cy.contains("Salvar").should("exist");
        cy.contains("Conexao").click();
        cy.contains("Endpoint, conexao ou caminho principal").should("exist");
    });

    it("shows read-only guidance for regular users", () => {
        resetStorage(OPERATOR_USER);
        savePdvConfig({
            active: true,
            type: "api",
            endpoint: "https://pdv.exemplo.com/api/produtos",
            allowUserPriceEdit: false,
        }, ADMIN_USER);

        mountPage();

        cy.contains("modo somente leitura").should("exist");
        cy.contains("Politica").click();
        cy.contains("Como cada perfil usa o preco do PDV").should("exist");
        cy.contains("Salvar").should("not.exist");
    });
});
