import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { createPromotionOrder, readPromotionOrders } from "services/promotions";
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

function seedPricingHistory(createdBy = ADMIN_USER.email) {
    return recordPricingOperation({
        source: "manual",
        restoreTarget: "manual",
        createdBy,
        savedAt: "2026-04-08T10:00:00.000Z",
        priceType: "avista",
        paperSize: "A5",
        orientation: "portrait",
        title: "Cafe Pilao 500g",
        offerTitle: "Oferta da Semana",
        summaryLabel: "R$ 12,90 - A5 Retrato",
        restoreDraft: {
            priceType: "avista",
            productName: "Cafe Pilao 500g",
            cashPrice: "12,90",
            paperSize: "A5",
            orientation: "portrait",
        },
        records: [
            {
                title: "Cafe Pilao 500g",
                offerTitle: "Oferta da Semana",
                primaryPrice: "R$ 12,90",
                priceType: "avista",
                paperSize: "A5",
                orientation: "portrait",
            },
        ],
    });
}

function prepareStorage(user) {
    SaveObject("authentication", { jwt: "fake-jwt-token" });
    SaveObject("user", user);
    SaveObject("promotion-orders", []);
    SaveObject("promotion-seed", {});
    SaveObject("pricing-history", []);
    SaveObject("pricing-records", []);
}

describe("Dashboard Promotions page", () => {
    beforeEach(() => {
        cy.window().then((win) => {
            win.fetch = () => Promise.resolve({
                json: async () => ([ADMIN_USER, OPERATOR_USER]),
            });

            const currentScrollRoot = win.document.getElementById("body-scroll");
            if (!currentScrollRoot) {
                const scrollRoot = win.document.createElement("div");
                scrollRoot.id = "body-scroll";
                scrollRoot.scrollTo = () => {};
                win.document.body.appendChild(scrollRoot);
            }
        });
    });

    it("allows admin to assign a promotion to users", () => {
        prepareStorage(ADMIN_USER);
        seedPricingHistory();

        mountPage();

        const validTo = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

        cy.contains("Nova promocao programada").should("exist");
        cy.get('input[placeholder="Ex: Ofertas do fim de semana"]').type("Promocao de teste");
        cy.get('input[placeholder="Ex: Campanha liberada para reposicao entre sexta e domingo"]').type("Material de ponta de gondola");
        cy.get('input[type="date"]').eq(1).clear().type(validTo);
        cy.contains("Joao Operador - joao@senaprices.com").click();
        cy.contains("Cafe Pilao 500g").click();
        cy.contains("Criar promocao").click();

        cy.contains("Promocao enviada para a fila com sucesso.").should("exist");
        cy.contains("Promocao de teste").should("exist");
        cy.wrap(readPromotionOrders()).should((orders) => {
            expect(orders).to.have.length(1);
            expect(orders[0].assignedUserIds).to.deep.equal([OPERATOR_USER.documentId]);
        });
    });

    it("shows only assigned active promotions to regular users", () => {
        prepareStorage(OPERATOR_USER);
        const { historyEntry } = seedPricingHistory(ADMIN_USER.email);

        createPromotionOrder({
            name: "Campanha do cafe",
            description: "Oferta programada para o operador",
            validFrom: new Date().toISOString().slice(0, 10),
            validTo: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
            paperSize: "A5",
            orientation: "portrait",
            historyEntryIds: [historyEntry.id],
            assignedUserIds: [OPERATOR_USER.documentId],
            assignedUserNames: [OPERATOR_USER.name],
            entryTitles: ["Cafe Pilao 500g"],
            totalCards: 1,
        }, ADMIN_USER);

        mountPage();

        cy.contains("Cartazes prontos para impressao").should("exist");
        cy.contains("Nova promocao programada").should("not.exist");
        cy.contains("Campanha do cafe").should("exist");
        cy.contains("Oferta programada para o operador").should("exist");
        cy.contains("Usar como base").should("not.exist");
        cy.contains("Remover").should("not.exist");
        cy.contains("Imprimir").should("exist");
    });
});
