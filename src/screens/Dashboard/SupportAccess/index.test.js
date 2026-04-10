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

const SUBADMIN_USER = {
    id: 2,
    documentId: "subadmin-doc-02",
    name: "Carlos Supervisor",
    email: "carlos@senaprices.com",
    role: { name: "subadmin" },
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
    SaveObject("support-access-logs", [
        {
            id: "support-access-1",
            accessDate: "2026-04-08",
            adminName: "Mateus Sena",
            targetUser: "Loja Centro - Maria",
            justification: "Acesso necessario para validar divergencia em campanha semanal.",
            ticketCode: "#452",
            createdAt: "2026-04-08T10:00:00.000Z",
            createdBy: "admin-doc-01",
        },
    ]);
}

describe("Dashboard SupportAccess page", () => {
    beforeEach(() => {
        ensureScrollRoot();
    });

    it("renders audit page for admin profiles", () => {
        resetStorage(ADMIN_USER);
        mountPage();

        cy.contains("Log de Suporte").should("exist");
        cy.contains("Registrar acesso").should("exist");
        cy.contains("Loja Centro - Maria").should("exist");
        cy.contains("#452").should("exist");
    });

    it("blocks access for non-admin profiles", () => {
        resetStorage(SUBADMIN_USER);
        mountPage();

        cy.contains("Acesso administrativo necessario").should("exist");
        cy.contains("Log de Suporte").should("exist");
    });
});
