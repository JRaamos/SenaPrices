import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { readPromotionOrders } from "services/promotions";
import { recordPricingOperation } from "services/pricing";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard Promotions page", () => {
    beforeEach(() => {
        const mockUser = {
            id: 1,
            documentId: "user-doc-01",
            name: "Mateus Sena",
            email: "mateus@senaprices.com",
            createdAt: "2026-04-01T10:00:00.000Z",
            created_at: "2026-04-01T10:00:00.000Z",
        };

        SaveObject("authentication", { jwt: "fake-jwt-token" });
        SaveObject("user", mockUser);
        SaveObject("promotion-orders", []);
        SaveObject("promotion-seed", {});
        SaveObject("pricing-history", []);
        SaveObject("pricing-records", []);

        recordPricingOperation({
            source: "manual",
            restoreTarget: "manual",
            createdBy: mockUser.email,
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

        cy.window().then((win) => {
            const scrollRoot = win.document.createElement("div");
            scrollRoot.id = "body-scroll";
            scrollRoot.scrollTo = () => {};
            win.document.body.appendChild(scrollRoot);
        });
    });

    it("creates a promotion from a history entry", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        const validTo = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

        cy.contains("Nova promocao programada").should("exist");
        cy.get('input[placeholder="Ex: Ofertas do fim de semana"]').type("Promocao de teste");
        cy.get('input[type="date"]').eq(1).clear().type(validTo);
        cy.contains("Cafe Pilao 500g").click();
        cy.contains("Criar promocao").click();

        cy.contains("Promocao enviada para a fila com sucesso.").should("exist");
        cy.contains("Promocao de teste").should("exist");
        cy.wrap(readPromotionOrders()).should("have.length", 1);
    });
});
