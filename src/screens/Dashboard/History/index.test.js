import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { recordPricingOperation } from "services/pricing";
import { SaveObject } from "services/storage";
import Page from "./";

describe("Dashboard History page", () => {
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

    it("renders the shared history and filters records by source", () => {
        mount(
            <BrowserRouter>
                <CoreState>
                    <Page />
                    <ToastContainer />
                </CoreState>
            </BrowserRouter>
        );

        cy.contains("Histórico").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Criar Preço").should("exist");
        cy.contains("Rastro operacional da precificacao").should("exist");

        cy.get('select').eq(0).select("Criar Preço");
        cy.contains("Cafe Pilao 500g").should("exist");
    });
});
