import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { createPromotionOrder } from "services/promotions";
import { recordPricingOperation } from "services/pricing";
import { SaveObject } from "services/storage";
import Page from "./";

const ADMIN_USER = {
    id: 1,
    documentId: "admin-doc-01",
    name: "Mateus Sena",
    email: "mateus@senaprices.com",
    role: { name: "admin" },
    createdAt: "2026-04-01T10:00:00.000Z",
    created_at: "2026-04-01T10:00:00.000Z",
};

const OPERATOR_USER = {
    id: 2,
    documentId: "user-doc-02",
    name: "Joao Operador",
    email: "joao@senaprices.com",
    role: { name: "user" },
    createdAt: "2026-04-01T10:00:00.000Z",
    created_at: "2026-04-01T10:00:00.000Z",
};

const SECOND_OPERATOR = {
    id: 3,
    documentId: "user-doc-03",
    name: "Maria Operadora",
    email: "maria@senaprices.com",
    role: { name: "user" },
    createdAt: "2026-04-01T10:00:00.000Z",
    created_at: "2026-04-01T10:00:00.000Z",
};

function mountPage() {
    mount(
        <BrowserRouter>
            <CoreState>
                <Page />
                <ToastContainer />
            </CoreState>
        </BrowserRouter>
    );
}

function prepareStorage(user) {
    SaveObject("authentication", { jwt: "fake-jwt-token" });
    SaveObject("user", user);
    SaveObject("promotion-orders", []);
    SaveObject("promotion-seed", {});
    SaveObject("pricing-history", []);
    SaveObject("pricing-records", []);
}

function createHistoryEntry({
    title,
    createdBy,
    savedAt,
}) {
    return recordPricingOperation({
        source: "manual",
        restoreTarget: "manual",
        createdBy,
        savedAt,
        priceType: "avista",
        paperSize: "A5",
        orientation: "portrait",
        title,
        offerTitle: "Oferta da Semana",
        summaryLabel: "R$ 12,90 - A5 Retrato",
        restoreDraft: {
            priceType: "avista",
            productName: title,
            cashPrice: "12,90",
            paperSize: "A5",
            orientation: "portrait",
        },
        records: [
            {
                title,
                offerTitle: "Oferta da Semana",
                primaryPrice: "R$ 12,90",
                priceType: "avista",
                paperSize: "A5",
                orientation: "portrait",
            },
        ],
    }).historyEntry;
}

describe("Dashboard BatchPrint page", () => {
    beforeEach(() => {
        cy.window().then((win) => {
            const currentScrollRoot = win.document.getElementById("body-scroll");
            if (!currentScrollRoot) {
                const scrollRoot = win.document.createElement("div");
                scrollRoot.id = "body-scroll";
                scrollRoot.scrollTo = () => {};
                win.document.body.appendChild(scrollRoot);
            }
        });
    });

    it("shows history and promotions together for admin", () => {
        prepareStorage(ADMIN_USER);
        const historyEntry = createHistoryEntry({
            title: "Cafe Pilao 500g",
            createdBy: ADMIN_USER.email,
            savedAt: "2026-04-08T10:00:00.000Z",
        });

        createPromotionOrder({
            name: "Campanha do cafe",
            description: "Oferta programada para a equipe",
            validFrom: new Date().toISOString().slice(0, 10),
            validTo: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
            paperSize: "A5",
            orientation: "portrait",
            historyEntryIds: [historyEntry.id],
            assignedUserIds: [OPERATOR_USER.documentId],
            assignedUserNames: [OPERATOR_USER.name],
            entryTitles: [historyEntry.title],
            totalCards: 1,
        }, ADMIN_USER);

        mountPage();

        cy.contains("Impressão em Lote").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Campanha do cafe").should("exist");
        cy.get("select").eq(0).select("Promoções programadas");
        cy.contains("Campanha do cafe").should("exist");
    });

    it("limits the queue for regular users to own history and assigned promotions", () => {
        prepareStorage(OPERATOR_USER);

        const ownHistory = createHistoryEntry({
            title: "Leite integral 1L",
            createdBy: OPERATOR_USER.email,
            savedAt: "2026-04-08T10:00:00.000Z",
        });

        const foreignHistory = createHistoryEntry({
            title: "Arroz tipo 1",
            createdBy: ADMIN_USER.email,
            savedAt: "2026-04-08T11:00:00.000Z",
        });

        createPromotionOrder({
            name: "Promocao do leite",
            description: "Atribuida ao operador correto",
            validFrom: new Date().toISOString().slice(0, 10),
            validTo: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
            paperSize: "A5",
            orientation: "portrait",
            historyEntryIds: [ownHistory.id],
            assignedUserIds: [OPERATOR_USER.documentId],
            assignedUserNames: [OPERATOR_USER.name],
            entryTitles: [ownHistory.title],
            totalCards: 1,
        }, ADMIN_USER);

        createPromotionOrder({
            name: "Promocao do arroz",
            description: "Atribuida a outro usuario",
            validFrom: new Date().toISOString().slice(0, 10),
            validTo: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
            paperSize: "A5",
            orientation: "portrait",
            historyEntryIds: [foreignHistory.id],
            assignedUserIds: [SECOND_OPERATOR.documentId],
            assignedUserNames: [SECOND_OPERATOR.name],
            entryTitles: [foreignHistory.title],
            totalCards: 1,
        }, ADMIN_USER);

        mountPage();

        cy.contains("Leite integral 1L").should("exist");
        cy.contains("Promocao do leite").should("exist");
        cy.contains("Arroz tipo 1").should("not.exist");
        cy.contains("Promocao do arroz").should("not.exist");
    });
});
