import React from "react";
import { mount } from "@cypress/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { CoreState } from "context/CoreContext";
import { createCatalogItem } from "services/catalog";
import { recordPricingOperation } from "services/pricing";
import { SaveObject } from "services/storage";
import Page from "./";

const MOCK_USER = {
    id: 1,
    documentId: "admin-doc-01",
    name: "Mateus Sena",
    email: "mateus@senaprices.com",
    role: { name: "admin" },
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

function resetStorage() {
    SaveObject("authentication", { jwt: "fake-jwt-token" });
    SaveObject("user", MOCK_USER);
    SaveObject("catalog-items", []);
    SaveObject("catalog-sections", []);
    SaveObject("pricing-history", []);
    SaveObject("pricing-records", []);
    SaveObject("label-settings", null);
    SaveObject("label-recent-jobs", []);
}

function seedCatalogAndPricing() {
    createCatalogItem({
        internalCode: "CAFE500",
        ean13: "7891234567895",
        description1: "Cafe Pilao 500g",
        description2: "Tradicional",
        section: "Mercearia",
        unit: "pacote",
    }, MOCK_USER);

    createCatalogItem({
        internalCode: "DET500",
        description1: "Detergente Neutro 500ml",
        description2: "Sem preco no sistema",
        section: "Limpeza",
        unit: "unidade",
    }, MOCK_USER);

    recordPricingOperation({
        source: "manual",
        restoreTarget: "manual",
        createdBy: MOCK_USER.email,
        savedAt: "2026-04-08T14:00:00.000Z",
        priceType: "avista",
        paperSize: "A6",
        orientation: "portrait",
        title: "Cafe Pilao 500g",
        offerTitle: "Oferta da Semana",
        summaryLabel: "R$ 12,90 - A6 Retrato",
        records: [
            {
                title: "Cafe Pilao 500g",
                primaryPrice: "R$ 12,90",
                supportingPrice: "Valido ate domingo",
                offerTitle: "Oferta da Semana",
                priceType: "avista",
                paperSize: "A6",
                orientation: "portrait",
                internalCode: "CAFE500",
                eanCode: "7891234567895",
                sectionName: "Mercearia",
                unitLabel: "pacote",
            },
        ],
    });
}

describe("Dashboard Labels page", () => {
    beforeEach(() => {
        resetStorage();
        seedCatalogAndPricing();

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

    it("renders catalog items and prepares a label lot from a priced item", () => {
        mountPage();

        cy.contains("Etiquetas").should("exist");
        cy.contains("Catalogo pronto para emissao").should("exist");
        cy.contains("Cafe Pilao 500g").should("exist");
        cy.contains("Detergente Neutro 500ml").should("exist");
        cy.contains("Sem preco").should("exist");

        cy.contains("Cafe Pilao 500g").click();

        cy.contains("Lote de etiquetas pronto").should("exist");
        cy.contains("R$ 12,90").should("exist");
        cy.contains("Oferta da Semana").should("exist");
    });

    it("blocks selection when the item does not have traceable pricing", () => {
        mountPage();

        cy.contains("Detergente Neutro 500ml").click();

        cy.contains("Este item ainda nao possui uma precificacao rastreavel para gerar etiqueta.").should("exist");
        cy.contains("Selecao pronta para montar").should("exist");
    });
});
